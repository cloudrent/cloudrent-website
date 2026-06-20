'use client'

import React, { useState, useMemo, useCallback, useRef } from 'react'
import InputForm from './InputForm'
import ScanningState from './ScanningState'
import TeaserResult from './TeaserResult'
import ContactGate from './ContactGate'
import FullReport from './FullReport'

type Stage = 'input' | 'scanning' | 'teaser' | 'gate' | 'report'

export interface EngineResult {
  engine: 'google' | 'google_ai' | 'chatgpt' | 'perplexity' | 'copilot' | 'gemini'
  engineLabel: string
  keyword: string
  status: 'found' | 'not_found' | 'timeout' | 'error'
  snippets: string[]
  rank?: number
  competitorMentions: string[]
}

interface FormData {
  firstName: string
  businessName: string
  keywords: string[]
}

interface ContactData {
  email: string
  phone: string
}

// Track events for GTM
function trackEvent(eventName: string, data: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && (window as { dataLayer?: unknown[] }).dataLayer) {
    ;(window as { dataLayer?: unknown[] }).dataLayer?.push({
      event: eventName,
      ...data,
    })
  }
}

export default function AIVisibilityChecker() {
  const [stage, setStage] = useState<Stage>('input')
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    businessName: '',
    keywords: [
      'equipment rental software australia',
      'scaffold hire management system',
      'temporary fencing hire software',
    ],
  })
  const [contactData, setContactData] = useState<ContactData>({ email: '', phone: '' })
  const [results, setResults] = useState<EngineResult[] | null>(null)
  const [runId, setRunId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const pollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const score = useMemo(() => {
    if (!results) return { found: 0, total: 0 }
    // Get unique engines
    const engineMap = new Map<string, EngineResult>()
    for (const r of results) {
      const existing = engineMap.get(r.engine)
      if (!existing || (r.status === 'found' && existing.status !== 'found')) {
        engineMap.set(r.engine, r)
      }
    }
    const unique = Array.from(engineMap.values())
    const found = unique.filter((r) => r.status === 'found').length
    const total = unique.filter((r) => r.status === 'found' || r.status === 'not_found').length
    return { found, total: total || 6 }
  }, [results])

  const handleStartScan = useCallback(async () => {
    if (!formData.businessName.trim()) {
      setError('Please enter your business name')
      return
    }

    setStage('scanning')
    setError(null)
    setResults(null)

    trackEvent('ai_visibility_scan_started', {
      business_name: formData.businessName,
    })

    try {
      const response = await fetch('/api/ai-visibility/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          businessName: formData.businessName,
          keywords: formData.keywords.filter((k) => k.trim()),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start scan')
      }

      if (data.cached) {
        // Use cached results
        setResults(data.results || [])
        trackEvent('ai_visibility_cached_results', {
          business_name: formData.businessName,
          score: data.score,
        })
        setStage('teaser')
        return
      }

      setRunId(data.runId)
      pollForResults(data.runId)
    } catch (err) {
      console.error('Scan error:', err)
      setError(err instanceof Error ? err.message : 'Failed to start scan')
      setStage('input')
    }
  }, [formData])

  const pollForResults = useCallback(
    (currentRunId: string) => {
      const startTime = Date.now()
      const timeout = 90000 // 90 seconds
      const interval = 3000 // 3 seconds

      const poll = async () => {
        if (Date.now() - startTime > timeout) {
          setError('Search timed out. Please try again.')
          setStage('input')
          trackEvent('ai_visibility_timeout', {
            business_name: formData.businessName,
          })
          return
        }

        try {
          const params = new URLSearchParams({
            runId: currentRunId,
            businessName: formData.businessName,
            keywords: formData.keywords.filter((k) => k.trim()).join(','),
          })

          const response = await fetch(`/api/ai-visibility/result?${params}`)
          const data = await response.json()

          if (data.status === 'complete') {
            setResults(data.results || [])
            trackEvent('ai_visibility_scan_completed', {
              business_name: formData.businessName,
              score: data.score,
              total_engines: data.totalEngines,
            })
            setStage('teaser')
          } else if (data.status === 'failed' || data.status === 'error') {
            setError(data.error || 'Search failed')
            setStage('input')
          } else {
            // Still running, poll again
            pollTimeoutRef.current = setTimeout(poll, interval)
          }
        } catch (err) {
          console.error('Poll error:', err)
          // Retry on network errors
          pollTimeoutRef.current = setTimeout(poll, interval)
        }
      }

      poll()
    },
    [formData]
  )

  const handleContactSubmit = useCallback(async () => {
    if (!contactData.email.includes('@')) {
      setError('Please enter a valid email')
      return
    }
    if (!contactData.phone.trim()) {
      setError('Please enter your phone number')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/ai-visibility/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          businessName: formData.businessName,
          email: contactData.email,
          phone: contactData.phone,
          keywords: formData.keywords.filter((k) => k.trim()),
          results,
          score: score.found,
          totalEngines: score.total,
          apifyRunId: runId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit')
      }

      trackEvent('ai_visibility_lead_captured', {
        business_name: formData.businessName,
        email: contactData.email,
        score: score.found,
      })

      setStage('report')
    } catch (err) {
      console.error('Contact submit error:', err)
      setError(err instanceof Error ? err.message : 'Failed to submit')
    } finally {
      setIsSubmitting(false)
    }
  }, [contactData, formData, results, score, runId])

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (pollTimeoutRef.current) {
        clearTimeout(pollTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {stage === 'input' && (
        <InputForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleStartScan}
          error={error}
        />
      )}

      {stage === 'scanning' && <ScanningState businessName={formData.businessName} />}

      {stage === 'teaser' && results && (
        <TeaserResult
          results={results}
          keywords={formData.keywords}
          score={score}
          onUnlock={() => setStage('gate')}
        />
      )}

      {stage === 'gate' && (
        <ContactGate
          firstName={formData.firstName}
          businessName={formData.businessName}
          contactData={contactData}
          setContactData={setContactData}
          onSubmit={handleContactSubmit}
          onBack={() => setStage('teaser')}
          isSubmitting={isSubmitting}
          error={error}
        />
      )}

      {stage === 'report' && results && (
        <FullReport
          results={results}
          keywords={formData.keywords}
          businessName={formData.businessName}
          score={score}
          email={contactData.email}
        />
      )}
    </div>
  )
}
