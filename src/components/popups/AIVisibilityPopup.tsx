'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { X, Bot, Clock, Search, Sparkles, MessageSquare } from 'lucide-react'
import { usePopupSuppression } from '@/hooks/usePopupSuppression'
import { useExitIntent } from '@/hooks/useExitIntent'

const STORAGE_KEY = 'crp_ai_popup_suppressed'
const SESSION_KEY = 'crp_ai_popup_shown_this_session'
const REVENUE_VISIBLE_KEY = 'crp_revenue_popup_visible'

// Don't show on these pages
const EXCLUDED_PATHS = ['/ai-check', '/try', '/pricing', '/contact', '/register', '/launch']

// Simple email validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Google icon SVG component
function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export function AIVisibilityPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [revenuePopupActive, setRevenuePopupActive] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const popupRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const { isSuppressed, suppress } = usePopupSuppression(STORAGE_KEY)

  const isExcluded = EXCLUDED_PATHS.some((path) => pathname.includes(path))

  // Watch for Revenue popup visibility changes
  useEffect(() => {
    const checkRevenuePopup = () => {
      setRevenuePopupActive(!!document.querySelector('[data-popup="revenue-leak"]'))
    }

    // Check initially and on DOM changes
    checkRevenuePopup()
    const observer = new MutationObserver(checkRevenuePopup)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  // Only enable exit intent when not suppressed, not excluded, and revenue popup is not active
  const shouldEnable = !isSuppressed && !isExcluded && !revenuePopupActive

  // Exit intent trigger - wait 65s so Revenue popup (60s) gets first chance
  useExitIntent({
    enabled: shouldEnable,
    minTimeOnPage: 65000, // 65 seconds (after Revenue popup's 60s trigger)
    mobileInactivityDelay: 70000, // 70 seconds on mobile (after Revenue popup)
    onTrigger: () => {
      setIsVisible(true)
      sessionStorage.setItem(SESSION_KEY, 'true')

      // Track popup view in GTM
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        ;(window as any).dataLayer.push({ event: 'ai_visibility_popup_view' })
      }
    },
  })

  // Focus trap and escape key
  useEffect(() => {
    if (!isVisible) return

    // Store current focus
    previousFocusRef.current = document.activeElement as HTMLElement

    // Focus popup
    popupRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss()
        return
      }

      // Focus trap
      if (e.key === 'Tab' && popupRef.current) {
        const focusable = popupRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [isVisible])

  const handleDismiss = () => {
    setIsClosing(true)
    suppress()
    setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/popup-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'ai-visibility-popup' }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save lead')
      }

      // Track CTA click in GTM
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        ;(window as any).dataLayer.push({ event: 'ai_visibility_popup_cta_click' })
      }

      suppress()
      setIsVisible(false)

      // Redirect to ai-check with email pre-filled
      router.push(`/ai-check?email=${encodeURIComponent(email)}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={handleDismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-popup-title"
    >
      <div
        ref={popupRef}
        tabIndex={-1}
        className={`relative w-full max-w-[520px] overflow-hidden rounded-2xl transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{
          backgroundColor: '#0f0a1a',
          border: '1px solid #3d1f6e',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-white/10"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
          aria-label="Close popup"
        >
          <X className="h-4 w-4 text-white/60" />
        </button>

        {/* Header section */}
        <div
          className="p-6 pb-5"
          style={{
            backgroundColor: '#1a0d2e',
            borderBottom: '1px solid #3d1f6e',
          }}
        >
          {/* Badge row */}
          <div className="mb-4 flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ backgroundColor: '#881BA9' }}
            >
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <div
                className="text-[11px] font-medium uppercase tracking-wider"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Free tool
              </div>
              <div className="text-[13px] font-medium" style={{ color: '#c084fc' }}>
                AI Visibility Checker
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2
            id="ai-popup-title"
            className="text-[32px] font-medium leading-[1.15] sm:text-[38px]"
            style={{ color: 'white' }}
          >
            Your competitor just got recommended by ChatGPT.
            <br />
            <span style={{ color: '#c084fc' }}>Did you?</span>
          </h2>
        </div>

        {/* Body section */}
        <div className="p-6 pt-5">
          {/* Subtext */}
          <p className="mb-5 text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            ChatGPT, Perplexity, Google AI Mode, Gemini, and Copilot are answering hire industry
            questions right now. Find out if your business is being cited — or if a competitor is.
          </p>

          {/* 2x2 Engine grid */}
          <div className="mb-4 grid grid-cols-2 gap-2">
            {[
              { icon: GoogleIcon, text: 'Google AI Mode', isComponent: true },
              { icon: MessageSquare, text: 'ChatGPT' },
              { icon: Search, text: 'Perplexity' },
              { icon: Sparkles, text: 'Gemini + Copilot' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '0.5px solid rgba(255,255,255,0.1)',
                }}
              >
                {item.isComponent ? (
                  <GoogleIcon />
                ) : (
                  <item.icon className="h-4 w-4" style={{ color: 'rgba(255,255,255,0.7)' }} />
                )}
                <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Urgency strip */}
          <div
            className="mb-4 flex items-center gap-2.5 rounded-lg px-3.5 py-2.5"
            style={{
              backgroundColor: 'rgba(136,27,169,0.15)',
              border: '0.5px solid rgba(136,27,169,0.4)',
            }}
          >
            <Clock className="h-4 w-4 flex-shrink-0" style={{ color: '#ffd166' }} />
            <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Takes 30 seconds · Free · Results shown instantly
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email input */}
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              placeholder="Enter your work email"
              className="mb-2.5 w-full rounded-lg px-3.5 py-3 text-[14px] text-white placeholder:text-white/40 focus:outline-none"
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: error ? '1px solid #ef4444' : '0.5px solid rgba(255,255,255,0.15)',
              }}
              onFocus={(e) => {
                e.target.style.border = '1px solid #881BA9'
              }}
              onBlur={(e) => {
                e.target.style.border = error
                  ? '1px solid #ef4444'
                  : '0.5px solid rgba(255,255,255,0.15)'
              }}
            />

            {/* Error message */}
            {error && (
              <p className="mb-2.5 text-[12px] text-red-400">{error}</p>
            )}

            {/* CTA button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-[10px] px-6 py-3.5 text-[15px] font-medium text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              style={{ backgroundColor: '#881BA9' }}
            >
              {isSubmitting ? 'Checking...' : "Check my AI visibility — free"}
            </button>
          </form>

          {/* Fine print */}
          <p
            className="mt-4 text-center text-[11px]"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            No signup required to see your score
          </p>
        </div>
      </div>
    </div>
  )
}
