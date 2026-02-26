'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

const STORAGE_KEY = 'trial-popup-dismissed'

// Don't show popup on these pages
const EXCLUDED_PATHS = ['/launch', '/pricing', '/contact', '/register']

export function TrialPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Don't show on excluded pages
    if (EXCLUDED_PATHS.some(path => pathname.includes(path))) {
      return
    }

    // Check if already dismissed this session
    const dismissed = sessionStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      // Wait 30 seconds before showing popup
      const showTimer = setTimeout(() => {
        setIsVisible(true)
        // Track popup view in GTM
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'trial_popup_view',
          })
        }
      }, 30000)
      return () => clearTimeout(showTimer)
    }
  }, [pathname])

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem(STORAGE_KEY, 'true')
  }

  const handleCtaClick = () => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'trial_popup_cta_click',
      })
    }
    handleDismiss()
  }

  if (!isVisible) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={handleDismiss}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(136,27,169,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 z-20 rounded-full bg-black/50 p-2 text-gray-400 transition-colors hover:bg-black/70 hover:text-white"
          aria-label="Close popup"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Animated Content */}
        <div className="relative bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#3d2010] overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#881ba9] blur-[80px] opacity-30 top-[20%] right-[20%] animate-pulse-glow" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#c2410c] blur-[80px] opacity-30 bottom-[10%] right-[30%] animate-pulse-glow-delayed" />

          <div className="flex flex-col lg:flex-row min-h-[500px]">
            {/* Left Section */}
            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center z-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight mb-4 animate-slide-in">
                <span className="block">One Platform.</span>
                <span className="block">Everything Covered.</span>
              </h2>
              <p className="text-lg text-gray-400 mb-8 animate-fade-in">
                The all-in-one solution for your operations.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { name: 'AI Damage Detection', gold: true },
                  { name: 'Xero Integration', gold: false },
                  { name: 'Fleet Management', gold: false },
                  { name: 'Booking System', gold: false },
                  { name: 'Maintenance Tracker', gold: false },
                  { name: 'Safety & Compliance', gold: true },
                ].map((feature, i) => (
                  <span
                    key={feature.name}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold animate-pill-pop ${
                      feature.gold
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 shadow-[0_4px_15px_rgba(251,191,36,0.4)]'
                        : 'bg-gradient-to-r from-[#881ba9] to-[#6d1587] text-white shadow-[0_4px_15px_rgba(136,27,169,0.4)]'
                    }`}
                    style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                  >
                    {feature.name}
                  </span>
                ))}
              </div>

              {/* Pricing */}
              <div className="flex items-center gap-4 mb-8 animate-fade-in-delayed">
                <span className="text-5xl lg:text-6xl font-extrabold text-white">$85</span>
                <span className="text-lg text-white italic">
                  Locked in for life.
                  <span className="block text-amber-400">First 100 customers only.</span>
                </span>
              </div>

              {/* CTA Button */}
              <a
                href="https://app.cloudrent.me/register"
                onClick={handleCtaClick}
                className="inline-block w-full lg:w-auto text-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#881ba9] to-[#6d1587] text-white text-lg font-bold shadow-[0_10px_40px_rgba(136,27,169,0.5)] hover:from-[#9b2cb8] hover:to-[#881ba9] transition-all animate-slide-up relative overflow-hidden group"
              >
                <span className="relative z-10">Get your FREE 30 day trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
            </div>

            {/* Right Section - Badge */}
            <div className="flex-1 flex items-center justify-center p-8 z-10">
              <div className="relative animate-shield-appear">
                <img
                  src="/images/30-day-trial-badge.png"
                  alt="30 Day Free Trial - No Credit Card Required"
                  className="w-64 lg:w-80 h-auto drop-shadow-[0_10px_30px_rgba(136,27,169,0.5)] animate-shield-float"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pill-pop {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shield-appear {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shield-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        .animate-pulse-glow-delayed {
          animation: pulse-glow 4s ease-in-out infinite 2s;
        }
        .animate-slide-in {
          animation: slide-in 0.8s ease-out forwards;
        }
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.8s ease-out 0.4s forwards;
        }
        .animate-fade-in-delayed {
          opacity: 0;
          animation: fade-in 0.8s ease-out 1.3s forwards;
        }
        .animate-pill-pop {
          opacity: 0;
          animation: pill-pop 0.5s ease-out forwards;
        }
        .animate-slide-up {
          opacity: 0;
          animation: slide-up 0.6s ease-out 1.6s forwards;
        }
        .animate-shield-appear {
          opacity: 0;
          animation: shield-appear 0.8s ease-out 0.8s forwards;
        }
        .animate-shield-float {
          animation: shield-float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
