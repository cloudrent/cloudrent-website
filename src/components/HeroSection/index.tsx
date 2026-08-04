'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, CheckCircle, ChevronRight, Gauge } from 'lucide-react'
import { LogoMarquee } from '@/components/LogoMarquee'
import { IntegrationsRow } from '@/components/IntegrationsRow'
import { appendUTMParams } from '@/utilities/appendUTMParams'

// ─── FLOATING FLYOUT CARDS ────────────────────────────────────────────────────

function FlyoutCard({
  className,
  children,
  animationDelay = 0,
  visible = true,
  fadeInDelay = 0,
}: {
  className?: string
  children: React.ReactNode
  animationDelay?: number
  visible?: boolean
  fadeInDelay?: number
}) {
  return (
    <div
      className={`
        absolute z-50 min-w-[200px] max-w-[220px] rounded-2xl
        border border-purple-500/40 bg-[#0e0f14]/95
        p-4 backdrop-blur-xl
        shadow-[0_0_30px_rgba(136,27,169,0.2),0_20px_50px_rgba(0,0,0,0.5)]
        transition-opacity duration-1000 ease-out
        ${visible ? 'opacity-100' : 'pointer-events-none opacity-0'}
        ${className}
      `}
      style={{
        animation: visible ? `float 4s ease-in-out infinite` : 'none',
        animationDelay: `${animationDelay}s`,
        transitionDelay: `${fadeInDelay}s`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-50"
        style={{
          background: 'linear-gradient(135deg, rgba(136,27,169,0.1) 0%, transparent 50%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface HeroSectionProps {
  /**
   * 'homepage' - Shows both trial CTA and scorecard button
   * 'trial' - Shows only the single green trial CTA
   */
  variant?: 'homepage' | 'trial'
  /**
   * Callback when scorecard button is clicked (homepage variant only)
   */
  onScorecardClick?: () => void
  /**
   * Whether to show the floating flyout cards
   */
  showFlyouts?: boolean
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────

export function HeroSection({
  variant = 'homepage',
  onScorecardClick,
  showFlyouts: showFlyoutsProp,
}: HeroSectionProps) {
  const [showFlyouts, setShowFlyouts] = useState(false)
  const [signupUrl, setSignupUrl] = useState('https://app.cloudrent.me/register')

  // Delay flyouts appearance
  useEffect(() => {
    if (showFlyoutsProp !== false) {
      const timer = setTimeout(() => setShowFlyouts(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [showFlyoutsProp])

  // Append UTM params on client
  useEffect(() => {
    setSignupUrl(appendUTMParams('https://app.cloudrent.me/register'))
  }, [])

  const isTrialVariant = variant === 'trial'

  return (
    <section className="relative w-full overflow-hidden pb-8 pt-12">
      {/* CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[700px] w-[1200px] -translate-x-1/2"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(136,27,169,0.15) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Headlines */}
          <div className="text-left">
            <h1 className="mb-6 text-4xl font-black leading-[0.95] tracking-tight text-white md:text-5xl lg:text-6xl">
              Still Juggling Multiple Systems?{' '}
              <span className="block bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                Run Your Entire Hire Business in One Platform — Not Five.
              </span>
            </h1>

            <p className="mb-6 max-w-lg text-lg leading-relaxed text-white/70">
              Bookings, dispatch, invoicing and safety — all in one system built for hire & rental
              businesses. No more missed jobs. No more double handling. No more chaos.
            </p>

            {/* Bridge line - homepage only */}
            {!isTrialVariant && onScorecardClick && (
              <p className="mb-7 text-base text-white/70">
                <span className="font-medium text-white">
                  Curious how much multiple systems are costing you?
                </span>{' '}
                <button
                  onClick={onScorecardClick}
                  className="text-purple-300 underline decoration-purple-300/35 underline-offset-[3px] transition-colors hover:text-purple-200 hover:decoration-purple-200/70"
                >
                  Find out in 2 minutes →
                </button>
              </p>
            )}

            {/* CTAs */}
            <div className="mb-8 flex flex-wrap gap-3">
              {isTrialVariant ? (
                /* Trial variant: Single green CTA */
                <a
                  href={signupUrl}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-brand-green px-7 py-4 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-brand-green/90 hover:shadow-[0_8px_32px_rgba(65,171,1,0.35)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <div className="relative z-10 flex flex-col items-start">
                    <span className="text-[15px] font-bold">Start your $1 first month</span>
                    <span className="text-[11px] font-normal text-white/70">
                      Full access · No setup · Cancel anytime
                    </span>
                  </div>
                  <ChevronRight className="relative z-10 h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                </a>
              ) : (
                /* Homepage variant: Purple CTA + Scorecard button */
                <>
                  <a
                    href={signupUrl}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-purple-600 px-7 py-4 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(136,27,169,0.45)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="relative z-10 flex flex-col items-start">
                      <span className="text-[15px] font-bold">Start Your $1 First Month</span>
                      <span className="text-[11px] font-normal text-white/55">
                        Full access · No setup · Cancel anytime
                      </span>
                    </div>
                    <ChevronRight className="relative z-10 h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </a>

                  {onScorecardClick && (
                    <button
                      onClick={onScorecardClick}
                      className="flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-5 py-4 text-sm font-medium text-purple-300 transition-all hover:border-purple-500/50 hover:bg-purple-500/20 hover:text-purple-200"
                    >
                      <Gauge className="h-4 w-4" />
                      Take the Scorecard
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/35">
              {['Full access', 'No setup', 'Cancel anytime'].map((chip, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle className="h-3 w-3 text-green-500/70" />
                  {chip}
                </div>
              ))}
            </div>

            {/* Tertiary demo link - homepage only */}
            {!isTrialVariant && (
              <Link
                href="/videos"
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white/60"
              >
                <Play className="h-3 w-3" />
                Or watch the 2-minute demo
              </Link>
            )}
          </div>

          {/* Right Column - Dashboard + Flyouts */}
          <div className="relative overflow-visible lg:pl-4">
            <div className="relative lg:my-10 lg:origin-center lg:scale-[1.15]">
              {/* Dashboard glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-60"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(136,27,169,0.2) 0%, transparent 70%)',
                  transform: 'scale(1.1)',
                  filter: 'blur(40px)',
                }}
              />

              {/* Dashboard Image */}
              <Image
                src="/images/cloudrent-pro-dashboard-imacs-dark.webp"
                alt="CloudRent Pro Dashboard"
                width={2503}
                height={1906}
                priority
                className="relative z-10 w-full rounded-xl shadow-2xl shadow-black/50"
              />

              {/* Flyout: Today's Revenue */}
              <FlyoutCard
                className="left-[0%] -top-[5%] hidden lg:-left-[8%] lg:block"
                animationDelay={0}
                visible={showFlyouts}
                fadeInDelay={0}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20">
                    <span className="text-sm">💰</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                    Today&apos;s Revenue
                  </span>
                </div>
                <div className="text-3xl font-black text-white">$1,550</div>
                <div className="mb-2 text-xs text-white/40">Across 7 active rentals</div>
                <div className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2 py-1 text-[10px] font-bold text-green-400">
                  ↑ 18% vs last week
                </div>
              </FlyoutCard>

              {/* Flyout: Maintenance Alert */}
              <FlyoutCard
                className="-bottom-[6%] left-[6%] hidden lg:left-[0%] lg:block"
                animationDelay={0.8}
                visible={showFlyouts}
                fadeInDelay={0.3}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20">
                    <span className="text-sm">🔧</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                    Maintenance Alert
                  </span>
                </div>
                <div className="mb-0.5 text-sm font-bold text-white">Service Due in 3 Days</div>
                <div className="mb-2 text-xs text-white/40">20T Excavator · 250 hrs</div>
                <div className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-1 text-[10px] font-bold text-amber-400">
                  ⚠ Schedule now
                </div>
              </FlyoutCard>

              {/* Flyout: AI Damage Detection */}
              <FlyoutCard
                className="-right-[5%] -top-[16%] hidden lg:-right-[12%] lg:block"
                animationDelay={0.4}
                visible={showFlyouts}
                fadeInDelay={0.6}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20">
                    <span className="text-sm">🔍</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                    AI Damage Detection
                  </span>
                </div>
                <div className="mb-1 text-sm font-bold text-white">Scratch · Right Side Panel</div>
                <div className="mb-1 text-xs text-white/40">
                  Est. repair: <span className="text-white/70">$50</span>
                </div>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-white/40">AI Confidence</span>
                  <span className="font-bold text-purple-400">92%</span>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-1 text-[10px] font-bold text-amber-400">
                  MODERATE severity
                </div>
              </FlyoutCard>

              {/* Flyout: Safety Compliance */}
              <FlyoutCard
                className="-bottom-[2%] -right-[3%] hidden lg:-right-[10%] lg:block"
                animationDelay={1.2}
                visible={showFlyouts}
                fadeInDelay={0.9}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/20">
                    <span className="text-sm">🛡️</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                    Safety Compliance
                  </span>
                </div>
                <div className="text-3xl font-black text-white">100%</div>
                <div className="mb-2 text-xs text-white/40">SWMS signed · 5 active jobs</div>
                <div className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2 py-1 text-[10px] font-bold text-green-400">
                  ✓ Audit ready
                </div>
              </FlyoutCard>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Strip */}
      <div className="relative z-10 mt-12 border-t border-white/[0.05] bg-black/20 py-8">
        <div className="mx-auto max-w-7xl">
          <LogoMarquee />
          <div className="mx-auto mt-8 max-w-7xl">
            <IntegrationsRow />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
