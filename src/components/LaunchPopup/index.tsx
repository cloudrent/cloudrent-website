'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { X } from 'lucide-react'

const LAUNCH_DATE = new Date('2026-02-23T00:00:00+10:00') // AEST
const STORAGE_KEY = 'launch-popup-dismissed'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(): TimeLeft {
  const difference = LAUNCH_DATE.getTime() - new Date().getTime()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

// Don't show popup on these pages
const EXCLUDED_PATHS = ['/founding', '/pricing', '/contact']

export function LaunchPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())
  const pathname = usePathname()

  useEffect(() => {
    // Don't show on excluded pages
    if (EXCLUDED_PATHS.includes(pathname)) {
      return
    }

    // Check if already dismissed this session
    const dismissed = sessionStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      // Wait 60 seconds before showing popup
      const showTimer = setTimeout(() => {
        setIsVisible(true)
        // Track popup view in GTM
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'launch_popup_view',
          })
        }
      }, 60000)
      return () => clearTimeout(showTimer)
    }
  }, [pathname])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem(STORAGE_KEY, 'true')
  }

  const handleCtaClick = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'launch_popup_cta_click',
      })
    }
    handleDismiss()
  }

  // Don't render if dismissed or countdown is over
  if (!isVisible || (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0)) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={handleDismiss}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-br from-[#0a0a1a] to-purple-900/40 shadow-[0_20px_60px_rgba(136,27,169,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-gray-400 transition-colors hover:bg-white/20 hover:text-white"
          aria-label="Close popup"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 12px)',
          }}
        />

        <div className="relative p-8 text-center">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-amber-500" />
            Limited Time Offer
          </div>

          {/* Headline */}
          <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
            Founding Customer Program
          </h2>
          <p className="mb-6 text-gray-300">
            Lock in <span className="font-bold text-amber-400">every feature</span> at just{' '}
            <span className="font-bold text-amber-400">$85/user/mo</span> — forever.
          </p>

          {/* Countdown */}
          <div className="mb-6">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-purple-300">
              CloudRent Pro launching in
            </p>
            <div className="flex justify-center gap-3">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Mins' },
                { value: timeLeft.seconds, label: 'Secs' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center rounded-xl border border-purple-500/30 bg-purple-900/50 px-4 py-3"
                >
                  <span className="text-2xl font-bold tabular-nums text-white sm:text-3xl">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-purple-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-6 flex flex-wrap justify-center gap-2 text-sm">
            {['All modules included', 'Rate locked forever', 'Priority onboarding'].map((benefit) => (
              <span
                key={benefit}
                className="rounded-full border border-purple-500/20 bg-purple-900/30 px-3 py-1 text-purple-200"
              >
                {benefit}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href="https://app.cloudrent.me/founder"
            onClick={handleCtaClick}
            className="inline-block w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-8 py-4 text-base font-bold text-purple-900 shadow-[0_4px_20px_rgba(251,191,36,0.35)] transition-all hover:from-amber-300 hover:to-amber-400 sm:w-auto"
          >
            Claim Your Founding Spot
          </a>

          <p className="mt-4 text-xs text-gray-500">
            Only available to the first 100 customers. Once spots fill up, this offer is gone.
          </p>

          <Link
            href="/founding"
            onClick={handleDismiss}
            className="mt-2 inline-block text-sm text-purple-400 hover:text-purple-300"
          >
            Learn more about the Founding Customer Program →
          </Link>
        </div>
      </div>
    </div>
  )
}
