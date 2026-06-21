'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { X, AlertTriangle, DollarSign, Clock, ReceiptText } from 'lucide-react'
import { usePopupSuppression } from '@/hooks/usePopupSuppression'
import { usePageTimer } from '@/hooks/usePageTimer'

const STORAGE_KEY = 'crp_revenue_popup_suppressed'
const SESSION_KEY = 'crp_ai_popup_shown_this_session'

// Don't show on these pages
const EXCLUDED_PATHS = ['/ai-check', '/try', '/scorecard', '/pricing', '/contact', '/register', '/launch']

export function RevenueLeakPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const popupRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const { isSuppressed, suppress } = usePopupSuppression(STORAGE_KEY)

  // Check if AI popup was shown this session
  const [aiPopupShownThisSession, setAiPopupShownThisSession] = useState(false)
  useEffect(() => {
    setAiPopupShownThisSession(sessionStorage.getItem(SESSION_KEY) === 'true')
  }, [])

  const isExcluded = EXCLUDED_PATHS.some((path) => pathname.includes(path))
  const shouldEnable = !isSuppressed && !isExcluded && !aiPopupShownThisSession

  // Timer trigger
  const handleTimerTrigger = useCallback(() => {
    // Double-check conditions at trigger time
    if (sessionStorage.getItem(SESSION_KEY) === 'true') return
    setIsVisible(true)
    // Track popup view in GTM
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      ;(window as any).dataLayer.push({ event: 'revenue_popup_view' })
    }
  }, [])

  usePageTimer({
    delay: 60000, // 60 seconds
    enabled: shouldEnable,
    onTrigger: handleTimerTrigger,
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

  const handleCtaClick = () => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      ;(window as any).dataLayer.push({ event: 'revenue_popup_cta_click' })
    }
    suppress()
    setIsVisible(false)
    router.push('/scorecard')
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
      aria-labelledby="revenue-popup-title"
    >
      <div
        ref={popupRef}
        tabIndex={-1}
        data-popup="revenue-leak"
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
              <AlertTriangle className="h-5 w-5" style={{ color: '#ffd166' }} />
            </div>
            <div>
              <div
                className="text-[11px] font-medium uppercase tracking-wider"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Revenue health check
              </div>
              <div className="text-[13px] font-medium" style={{ color: '#c084fc' }}>
                Free 2-minute scorecard
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2
            id="revenue-popup-title"
            className="text-[32px] font-medium leading-[1.15] sm:text-[38px]"
            style={{ color: 'white' }}
          >
            The average hire business loses{' '}
            <span style={{ color: '#ffd166' }}>$2,300 a month</span> without knowing it.
          </h2>
        </div>

        {/* Body section */}
        <div className="p-6 pt-5">
          {/* Subtext */}
          <p className="mb-5 text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Unbilled hours, missed extensions, late invoices — the leaks are small but they add up
            fast. Take our free scorecard and find out exactly where your money is going.
          </p>

          {/* Pain point rows */}
          <div className="mb-5 space-y-2">
            {[
              { icon: DollarSign, text: 'Unbilled equipment sitting idle' },
              { icon: Clock, text: 'Rentals running over with no extension charge' },
              { icon: ReceiptText, text: 'Invoices going out late — or not at all' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg px-3.5 py-2.5"
                style={{
                  backgroundColor: 'rgba(136,27,169,0.12)',
                  border: '0.5px solid rgba(136,27,169,0.3)',
                }}
              >
                <item.icon className="h-[18px] w-[18px] flex-shrink-0" style={{ color: '#c084fc' }} />
                <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <button
            onClick={handleCtaClick}
            className="w-full rounded-[10px] px-6 py-3.5 text-[15px] font-medium text-white transition-all hover:brightness-110"
            style={{ backgroundColor: '#881BA9' }}
          >
            Check my revenue leaks — it&apos;s free
          </button>

          {/* Fine print */}
          <p
            className="mt-4 text-center text-[11px]"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Takes 2 minutes · No credit card · Instant results
          </p>
        </div>
      </div>
    </div>
  )
}
