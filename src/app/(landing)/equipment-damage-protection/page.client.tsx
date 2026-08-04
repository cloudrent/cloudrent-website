'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  Camera,
  FileText,
  CheckCircle,
  ChevronRight,
  Play,
  Shield,
  Zap,
  DollarSign,
  Clock,
  AlertTriangle,
  Scan,
  PenTool,
  RefreshCw,
  BarChart3,
  Smartphone,
} from 'lucide-react'
import { useUTMParams } from '@/hooks/useUTMParams'
import {
  trackLandingPageEvent,
  trackLandingPageView,
} from '@/utilities/trackLandingPageEvent'

// ============================================
// DATA
// ============================================

const painPoints = [
  {
    icon: AlertTriangle,
    title: 'Disputed Damage',
    subtitle: 'Customer says "it was already like that"',
    description:
      'Equipment comes back damaged but you have no proof of condition at dispatch. Without photos, it\'s your word against theirs — and you absorb the cost.',
  },
  {
    icon: DollarSign,
    title: 'Lost Revenue',
    subtitle: 'Insurance claims rejected without evidence',
    description:
      'You lodge a damage claim but the insurer wants timestamped photos showing before and after condition. You have nothing. Claim denied.',
  },
  {
    icon: Clock,
    title: 'Time Wasted',
    subtitle: 'Hours spent on manual inspections',
    description:
      'Staff eyeball equipment at return, trying to remember what it looked like before. Damage gets missed. Patterns go unnoticed.',
  },
  {
    icon: FileText,
    title: 'No Paper Trail',
    subtitle: 'Nothing to show when it matters',
    description:
      'When a dispute escalates, you need documented proof. But your condition records are scattered across phones, emails, and memory.',
  },
]

const features = [
  {
    icon: Camera,
    title: 'Photo Capture at Dispatch',
    description:
      'Staff photographs equipment condition before it leaves. Timestamped, GPS-tagged, stored against the booking.',
  },
  {
    icon: PenTool,
    title: 'Digital Sign-Off',
    description:
      'Customer acknowledges condition on delivery. Legally sound, timestamped signature — no ambiguity.',
  },
  {
    icon: RefreshCw,
    title: 'Return Comparison',
    description:
      'Return photos captured on the spot. Side-by-side with dispatch photos. Condition delta is immediately visible.',
  },
  {
    icon: Scan,
    title: 'AI Damage Detection',
    description:
      'AI automatically compares before/after photos, flags visual differences, and scores damage likelihood.',
  },
  {
    icon: FileText,
    title: 'PDF Condition Reports',
    description:
      'Generate professional before-and-after reports in one click. Share with customer, insurer, or legal.',
  },
  {
    icon: BarChart3,
    title: 'Damage Analytics',
    description:
      'See which customers, equipment, or job sites generate the most damage. Data to protect your margins.',
  },
]

const stats = [
  { value: '1 in 3', label: 'Damage disputes end in no recovery' },
  { value: '60%', label: 'Faster damage documentation' },
  { value: '3x', label: 'More successful damage claims' },
  { value: '$$$', label: 'Recovered damage costs' },
]

const howItWorks = [
  {
    step: 1,
    title: 'Photo at Dispatch',
    description: 'Staff captures equipment condition before it leaves the yard.',
    icon: Camera,
  },
  {
    step: 2,
    title: 'Customer Signs',
    description: 'Customer digitally acknowledges condition at pickup.',
    icon: PenTool,
  },
  {
    step: 3,
    title: 'Photo at Return',
    description: 'Return photos captured and compared to dispatch.',
    icon: RefreshCw,
  },
  {
    step: 4,
    title: 'AI Analysis',
    description: 'AI flags damage automatically. Generate reports instantly.',
    icon: Scan,
  },
]

// ============================================
// COMPONENT
// ============================================

export default function EquipmentDamageProtectionClient() {
  const utmString = useUTMParams()

  useEffect(() => {
    trackLandingPageView('damage')
  }, [])

  const handleTrialClick = () => {
    trackLandingPageEvent('begin_trial', 'damage')
  }

  const handleDemoClick = () => {
    trackLandingPageEvent('book_demo', 'damage')
  }

  const handleNavCtaClick = () => {
    trackLandingPageEvent('nav_cta_click', 'damage')
  }

  const trialUrl = `https://app.cloudrent.me/register${utmString}`
  const demoUrl = `/demo${utmString}`

  return (
    <div className="min-h-screen bg-[#08080c]">
      {/* ═══════════════════════════════════════════════════════════════════════
          NAV
      ═══════════════════════════════════════════════════════════════════════ */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.08] bg-[#08080c]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-lg font-bold text-white">
            CloudRent <span className="text-purple-500">Pro</span>
          </Link>
          <Link
            href={demoUrl}
            onClick={handleNavCtaClick}
            className="rounded-lg bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-500"
          >
            Book a Demo
          </Link>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pb-16 pt-28">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(136,27,169,0.15) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
              <Scan className="h-4 w-4" />
              AI-Powered Damage Detection
            </div>

            <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
              Stop Eating the Cost of{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                Disputed Damage
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/60 md:text-xl">
              Equipment comes back damaged and the customer says &quot;it was like that when we got
              it.&quot; CloudRent Pro captures photos at dispatch and return — then AI automatically
              compares them and flags the damage.{' '}
              <strong className="text-white">Proof in seconds.</strong>
            </p>

            {/* CTAs */}
            <div className="mb-6 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={trialUrl}
                onClick={handleTrialClick}
                className="group flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-purple-500 hover:shadow-[0_8px_32px_rgba(136,27,169,0.4)]"
              >
                Start $1 First Month — 30 Days Full Access
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href={demoUrl}
                onClick={handleDemoClick}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
              >
                <Play className="h-5 w-5" />
                Book a Demo
              </Link>
            </div>

            <p className="text-sm text-white/40">
              Credit card required for $1 charge. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-white/[0.08] bg-white/[0.02] py-10">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="mb-1 text-3xl font-black text-white md:text-4xl">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PAIN POINTS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              The Problem
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl lg:text-5xl">
              You&apos;ve heard every excuse.{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                Without proof, you&apos;re stuck.
              </span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {painPoints.map((card, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40"
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 0%, rgba(136,27,169,0.15) 0%, transparent 70%)',
                  }}
                />
                <div className="relative z-10">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/15">
                    <card.icon className="h-7 w-7 text-red-400" />
                  </div>
                  <h3 className="mb-1 text-lg font-extrabold text-white">{card.title}</h3>
                  <p className="mb-2 text-sm font-semibold text-white/70">{card.subtitle}</p>
                  <p className="text-sm leading-relaxed text-white/50">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative border-y border-white/[0.08] bg-white/[0.02] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              How It Works
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl">
              Four steps to{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                bulletproof documentation
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {howItWorks.map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/15">
                  <item.icon className="h-8 w-8 text-purple-400" />
                </div>
                <div className="mb-2 text-xs font-bold uppercase tracking-widest text-purple-500">
                  Step {item.step}
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-white/50">{item.description}</p>

                {i < howItWorks.length - 1 && (
                  <ChevronRight className="absolute -right-3 top-8 hidden h-6 w-6 text-purple-500/30 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          AI CALLOUT
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-transparent p-8 md:p-12">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 80% 20%, rgba(136,27,169,0.2) 0%, transparent 50%)',
              }}
            />
            <div className="relative z-10 grid items-center gap-8 md:grid-cols-2">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-300">
                  <Zap className="h-3 w-3" />
                  AI Powered
                </div>
                <h3 className="mb-4 text-2xl font-black text-white md:text-3xl">
                  AI Damage Detection —{' '}
                  <span className="text-purple-400">Live &amp; Built In</span>
                </h3>
                <p className="text-white/60">
                  CloudRent Pro&apos;s AI automatically compares dispatch and return photos —
                  flagging visual differences, scoring damage likelihood, and surfacing only the
                  issues that need your attention. No manual side-by-side. No missed damage. No
                  other hire software does this.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="rounded-2xl bg-purple-500/20 p-8 text-center">
                  <Scan className="mx-auto mb-4 h-16 w-16 text-purple-400" />
                  <div className="text-4xl font-black text-white">AI</div>
                  <div className="text-sm text-purple-300">Powered &amp; Live</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURES GRID
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              Features
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                protect your equipment
              </span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15">
                  <feature.icon className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TESTIMONIAL
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative border-y border-white/[0.08] bg-white/[0.02] py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <div className="mb-6 text-5xl text-purple-500">&quot;</div>
          <blockquote className="mb-6 text-xl font-semibold leading-relaxed text-white md:text-2xl">
            Before CloudRent Pro, we had no way to prove condition at pickup. We absorbed damage
            costs constantly and it was just accepted as part of the business. Now every hire goes
            out with photos and a digital sign-off — the disputes have basically stopped.
          </blockquote>
          <p className="text-sm text-white/50">
            — CloudRent Pro Customer | Construction Plant Hire, QLD
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(136,27,169,0.1) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
          <h2 className="mb-4 text-4xl font-black text-white md:text-5xl lg:text-6xl">
            Protect Your{' '}
            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
              Equipment. Protect Your Margins.
            </span>
          </h2>

          <p className="mx-auto mb-8 max-w-xl text-lg text-white/60">
            Try CloudRent Pro for 30 days with full access to every feature — including damage
            documentation, AI detection, and customer sign-off.
          </p>

          <div className="mb-8 flex justify-center">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black text-purple-500">$1</span>
              <span className="text-lg text-white/50">/ 30-day access</span>
            </div>
          </div>

          <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={trialUrl}
              onClick={handleTrialClick}
              className="group flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-10 py-5 text-xl font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-purple-500 hover:shadow-[0_8px_32px_rgba(136,27,169,0.4)]"
            >
              Start Your $1 First Month Now
              <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
            {[
              'Credit card required for $1',
              'Full feature access',
              'Cancel anytime',
              'Australian-made & supported',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href={demoUrl}
              onClick={handleDemoClick}
              className="text-purple-400 underline underline-offset-4 transition-colors hover:text-purple-300"
            >
              Prefer a live walkthrough? Book a demo with Ron →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-white/[0.08] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-center sm:flex-row sm:text-left">
          <div className="text-lg font-bold text-white">
            CloudRent <span className="text-purple-500">Pro</span>
          </div>
          <p className="text-sm text-white/40">
            Built for Australian hire businesses. GST compliant. © 2026 CloudRent Pro.
          </p>
          <p className="text-sm text-white/40">
            Questions?{' '}
            <a
              href="mailto:support@cloudrent.me"
              className="text-purple-400 hover:text-purple-300"
            >
              support@cloudrent.me
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
