'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { X } from 'lucide-react'

const STORAGE_KEY = 'trial-popup-dismissed'

// Don't show popup on these pages
const EXCLUDED_PATHS = ['/launch', '/pricing', '/contact', '/register']

export function TrialPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Don't show on mobile
    if (isMobile) {
      return
    }

    // Don't show on excluded pages
    if (EXCLUDED_PATHS.some(path => pathname.includes(path))) {
      return
    }

    // Check if already dismissed this session
    const dismissed = sessionStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      // Wait 90 seconds (1.5 minutes) before showing popup
      const showTimer = setTimeout(() => {
        setIsVisible(true)
        // Track popup view in GTM
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'trial_popup_view',
          })
        }
      }, 90000)
      return () => clearTimeout(showTimer)
    }
  }, [pathname, isMobile])

  const handleDismiss = () => {
    setIsClosing(true)
    sessionStorage.setItem(STORAGE_KEY, 'true')

    // Wait for animation to complete
    setTimeout(() => {
      setIsVisible(false)
    }, 500)
  }

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'trial_popup_cta_click',
      })
    }

    // Start fade out animation
    setIsClosing(true)
    sessionStorage.setItem(STORAGE_KEY, 'true')

    // Wait for animation to complete, then navigate
    setTimeout(() => {
      setIsVisible(false)
      router.push('https://app.cloudrent.me/register')
    }, 500)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-500 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleDismiss}
    >
      <div
        className={`relative w-full max-w-5xl overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(136,27,169,0.5)] transition-all duration-500 ${
          isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
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

            {/* Right Section - Monitor & Cards */}
            <div className="flex-1 relative hidden lg:flex items-center justify-center p-8 z-10 min-h-[500px]">
              {/* Feature Cards */}
              <div className="absolute top-12 left-8 bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg animate-float-feature z-10" style={{ animationDelay: '1s' }}>
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center text-lg">⚙️</div>
                <div className="text-sm font-bold text-gray-900 leading-tight">AI Damage<br/>Detection</div>
              </div>

              <div className="absolute top-12 right-8 bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg animate-float-feature z-10" style={{ animationDelay: '1.1s' }}>
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center text-lg">📝</div>
                <div className="text-sm font-bold text-gray-900 leading-tight">Digital<br/>Signatures</div>
              </div>

              <div className="absolute bottom-16 left-12 bg-gradient-to-r from-[#881ba9] to-[#6d1587] px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg animate-float-feature z-10" style={{ animationDelay: '1.2s' }}>
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center text-lg">🕐</div>
                <div className="text-sm font-bold text-white leading-tight">24/7<br/>Customer<br/>Portal</div>
              </div>

              <div className="absolute bottom-16 right-12 bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg animate-float-feature z-10" style={{ animationDelay: '1.3s' }}>
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center text-xs font-bold">xero</div>
                <div className="text-sm font-bold text-gray-900 leading-tight">Xero<br/>Integration</div>
              </div>

              {/* Monitor */}
              <div className="relative animate-monitor-appear">
                {/* Screen */}
                <div className="bg-gradient-to-b from-[#2a1040] to-[#3d1a50] rounded-xl p-4 border-[3px] border-[#5a1680] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(136,27,169,0.3)] w-[320px]">
                  <div className="bg-[#0f0a1f] rounded-lg p-4 space-y-3">
                    {/* Dashboard Row 1 */}
                    <div className="flex gap-3">
                      <div className="flex-1 bg-gradient-to-br from-[#2a1040] to-[#3d1a50] rounded-md p-2 animate-card-appear" style={{ animationDelay: '1.2s' }}>
                        <div className="text-[10px] text-[#c77ddb]">Location</div>
                        <div className="w-8 h-8 bg-[#5a1680] rounded-full mt-2" />
                      </div>
                      <div className="flex-1 bg-gradient-to-br from-[#2a1040] to-[#3d1a50] rounded-md p-2 animate-card-appear" style={{ animationDelay: '1.3s' }}>
                        <div className="text-[10px] text-[#c77ddb]">Bookings</div>
                        <div className="flex items-end gap-1 h-10 mt-2">
                          <div className="w-3 bg-gradient-to-t from-amber-500 to-amber-400 rounded-sm animate-bar-grow" style={{ height: '60%', animationDelay: '1.8s' }} />
                          <div className="w-3 bg-gradient-to-t from-amber-500 to-amber-400 rounded-sm animate-bar-grow" style={{ height: '80%', animationDelay: '1.9s' }} />
                          <div className="w-3 bg-gradient-to-t from-amber-500 to-amber-400 rounded-sm animate-bar-grow" style={{ height: '40%', animationDelay: '2s' }} />
                          <div className="w-3 bg-gradient-to-t from-amber-500 to-amber-400 rounded-sm animate-bar-grow" style={{ height: '90%', animationDelay: '2.1s' }} />
                          <div className="w-3 bg-gradient-to-t from-amber-500 to-amber-400 rounded-sm animate-bar-grow" style={{ height: '70%', animationDelay: '2.2s' }} />
                        </div>
                      </div>
                      <div className="flex-1 bg-gradient-to-br from-[#2a1040] to-[#3d1a50] rounded-md p-2 animate-card-appear" style={{ animationDelay: '1.4s' }}>
                        <div className="text-[10px] text-[#c77ddb]">Revenue</div>
                        <div className="text-amber-400 font-bold text-sm mt-3">$12.4K</div>
                      </div>
                    </div>
                    {/* Dashboard Row 2 */}
                    <div className="flex gap-3">
                      <div className="flex-[2] bg-gradient-to-br from-[#2a1040] to-[#3d1a50] rounded-md p-2 animate-card-appear" style={{ animationDelay: '1.5s' }}>
                        <div className="text-[10px] text-[#c77ddb]">Progress</div>
                        <div className="h-2 bg-[#5a1680] rounded-full mt-3 overflow-hidden">
                          <div className="h-full w-[70%] bg-gradient-to-r from-[#881ba9] to-[#a832c7]" />
                        </div>
                      </div>
                      <div className="flex-1 bg-gradient-to-br from-[#2a1040] to-[#3d1a50] rounded-md p-2 animate-card-appear" style={{ animationDelay: '1.6s' }}>
                        <div className="text-[10px] text-[#c77ddb]">Revenues</div>
                        <div className="flex items-end gap-1 h-8 mt-1">
                          <div className="w-2 bg-gradient-to-t from-amber-500 to-amber-400 rounded-sm" style={{ height: '50%' }} />
                          <div className="w-2 bg-gradient-to-t from-amber-500 to-amber-400 rounded-sm" style={{ height: '70%' }} />
                          <div className="w-2 bg-gradient-to-t from-amber-500 to-amber-400 rounded-sm" style={{ height: '90%' }} />
                          <div className="w-2 bg-gradient-to-t from-amber-500 to-amber-400 rounded-sm" style={{ height: '60%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Stand */}
                <div className="w-24 h-14 bg-gradient-to-b from-[#881ba9] to-[#6d1587] mx-auto" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }} />
                <div className="w-40 h-4 bg-gradient-to-b from-[#9b2cb8] to-[#881ba9] mx-auto rounded-b-lg" />
              </div>

              {/* Badge overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 animate-shield-appear" style={{ marginTop: '20px' }}>
                <img
                  src="/images/30-day-trial-badge.png"
                  alt="30 Day Free Trial - No Credit Card Required"
                  className="w-48 h-auto drop-shadow-[0_10px_30px_rgba(136,27,169,0.5)] animate-shield-float"
                />
              </div>

              {/* Integration Logos */}
              <div className="absolute bottom-4 right-4 flex gap-3 animate-integrations">
                <div className="w-10 h-10 bg-[#2ca01c] rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">QB</span>
                </div>
                <div className="w-10 h-10 bg-[#881ba9] rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-[10px] font-bold">myob</span>
                </div>
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
        @keyframes float-feature {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-feature {
          opacity: 0;
          animation: float-feature 0.6s ease-out forwards, bob 3s ease-in-out 1.6s infinite;
        }
        @keyframes monitor-appear {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-monitor-appear {
          opacity: 0;
          animation: monitor-appear 1s ease-out 0.3s forwards;
        }
        @keyframes card-appear {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-card-appear {
          opacity: 0;
          animation: card-appear 0.5s ease-out forwards;
        }
        @keyframes bar-grow {
          from { height: 0; }
        }
        .animate-bar-grow {
          animation: bar-grow 1s ease-out forwards;
        }
        .animate-integrations {
          opacity: 0;
          animation: fade-in 0.8s ease-out 2s forwards;
        }
      `}</style>
    </div>
  )
}
