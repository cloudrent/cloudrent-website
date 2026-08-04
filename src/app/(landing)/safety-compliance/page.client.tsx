'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  Shield,
  FileText,
  CheckCircle,
  ChevronRight,
  Play,
  AlertTriangle,
  Clock,
  PenTool,
  Camera,
  Bell,
  FolderOpen,
  Smartphone,
  Users,
  Wrench,
  HardHat,
  Truck,
  Clapperboard,
  TreePine,
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
    icon: FileText,
    title: 'No SWMS = No Cover',
    subtitle: 'Safe Work Australia holds you responsible',
    description:
      'If your equipment is on a worksite without a valid Safe Work Method Statement, you\'re liable. Full stop. No SWMS, no legal protection.',
  },
  {
    icon: FolderOpen,
    title: 'Paper Forms Get Lost',
    subtitle: 'Scrambling for paperwork is not a defence',
    description:
      'Clipboards go missing. PDFs sit in email chains. When an inspector arrives, scrambling for paperwork won\'t protect you.',
  },
  {
    icon: PenTool,
    title: 'Signatures Disputed',
    subtitle: 'No proof anyone actually read and agreed',
    description:
      'Paper sign-offs are easily disputed. Without timestamped digital records, you have no proof anyone actually agreed to the SWMS.',
  },
  {
    icon: Clock,
    title: 'Expired Documents',
    subtitle: 'A full-time job keeping track',
    description:
      'SWMS documents expire. Tracking what\'s current across multiple jobs is a nightmare. Equipment goes to site on expired documents.',
  },
]

const features = [
  {
    icon: FileText,
    title: 'SWMS Creation',
    description:
      'Build Safe Work Method Statements directly inside CloudRent Pro. Guided workflow for hazards, controls, and task steps.',
    tag: 'Built In',
  },
  {
    icon: PenTool,
    title: 'Digital Sign-Off',
    description:
      'Multiple signatories. On-site signing via mobile. Timestamped, legally sound, stored against the booking.',
    tag: 'Mobile Ready',
  },
  {
    icon: Camera,
    title: 'Photo Evidence',
    description:
      'Attach photos of site conditions to the SWMS. Documented proof of what was assessed on the day.',
    tag: 'Site Proof',
  },
  {
    icon: FileText,
    title: 'PDF Generation',
    description:
      'Generate professional SWMS PDFs on demand. Share with site managers, inspectors, or clients in seconds.',
    tag: 'Instant PDF',
  },
  {
    icon: Bell,
    title: 'Expiry Alerts',
    description:
      'CloudRent Pro tracks every SWMS and flags documents before they expire. Never send equipment on an expired document.',
    tag: 'Auto-Alerts',
  },
  {
    icon: FolderOpen,
    title: 'Audit-Ready Records',
    description:
      'Every SWMS stored against the booking, linked to the customer. Status tracked: Draft → Pending → Active.',
    tag: 'Fully Traceable',
  },
]

const segments = [
  { icon: HardHat, name: 'Construction & Plant Hire' },
  { icon: Wrench, name: 'Scaffold & Fencing' },
  { icon: Wrench, name: 'Tool Hire' },
  { icon: Users, name: 'Event & Party Hire' },
  { icon: Clapperboard, name: 'AV & Film' },
  { icon: TreePine, name: 'Landscaping & Civil' },
]

const proofItems = [
  'Construction & Plant Hire',
  'Scaffold & Fencing',
  'Tool Hire',
  'Event & Party',
  'AV & Film',
  'Australian-Made. GST Ready.',
]

// ============================================
// COMPONENT
// ============================================

export default function SafetyComplianceClient() {
  const utmString = useUTMParams()

  useEffect(() => {
    trackLandingPageView('safety')
  }, [])

  const handleTrialClick = () => {
    trackLandingPageEvent('begin_trial', 'safety')
  }

  const handleDemoClick = () => {
    trackLandingPageEvent('book_demo', 'safety')
  }

  const handleNavCtaClick = () => {
    trackLandingPageEvent('nav_cta_click', 'safety')
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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              WHS &amp; Safe Work Compliance
            </div>

            <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
              Your Hire Business{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                Needs SWMS.
              </span>{' '}
              Not Paperwork.
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/60 md:text-xl">
              Safe Work Method Statements built into your hire software — not a bolt-on, not an
              afterthought.{' '}
              <strong className="text-white">
                CloudRent Pro is the only hire management platform with SWMS compliance built in
                from day one.
              </strong>
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
                Book a Live Demo
              </Link>
            </div>

            <p className="text-sm text-white/40">
              Credit card required for $1 charge. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PROOF BAR
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-white/[0.08] bg-white/[0.02] py-5">
        <div className="mx-auto max-w-6xl overflow-x-auto px-5">
          <div className="flex items-center justify-center gap-8 whitespace-nowrap text-sm text-white/50">
            {proofItems.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i === proofItems.length - 1 ? (
                  <span className="text-lg">🇦🇺</span>
                ) : (
                  <span className="text-lg">🏗️</span>
                )}
                {item}
              </span>
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
              The Real Problem
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl lg:text-5xl">
              When someone gets hurt on site —{' '}
              <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                who&apos;s liable?
              </span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {painPoints.map((card, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40"
              >
                <div className="absolute right-4 top-4 text-5xl font-black text-red-500/10">
                  0{i + 1}
                </div>
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
          SOLUTION / FEATURES
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative border-y border-white/[0.08] bg-white/[0.02] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 grid items-end gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
                How CloudRent Pro Solves It
              </p>
              <h2 className="text-3xl font-black text-white md:text-4xl">
                Built-In Safety.{' '}
                <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                  Zero Extra Software.
                </span>
              </h2>
            </div>
            <p className="border-l-2 border-purple-500 pl-4 text-white/60">
              Every SWMS is created, signed, stored, and tracked inside the same platform you use to
              manage bookings, invoices, and dispatch. One login. Total compliance.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40"
              >
                <div className="absolute bottom-0 left-0 top-0 w-1 scale-y-0 bg-purple-500 transition-transform duration-300 group-hover:scale-y-100" />
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15">
                    <feature.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                  <p className="mb-3 text-sm leading-relaxed text-white/50">{feature.description}</p>
                  <span className="inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
                    {feature.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          COMPLIANCE CALLOUT
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-900/20 to-transparent p-8 md:p-12">
            <div className="absolute -bottom-20 -right-20 text-[200px] opacity-[0.03]">⚠</div>
            <div className="relative z-10 grid items-center gap-8 md:grid-cols-[1fr,auto]">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-amber-500">
                  Australian WHS Law
                </p>
                <h3 className="mb-4 text-2xl font-black text-white md:text-3xl">
                  Safe Work Australia{' '}
                  <span className="text-amber-400">Fines Are Real.</span>
                </h3>
                <p className="mb-4 text-white/60">
                  Under Australian WHS legislation, hire businesses that supply plant or equipment
                  to a worksite are classified as a &quot;person conducting a business or
                  undertaking&quot; (PCBU). That means you share the duty of care — and the legal
                  exposure — if something goes wrong without proper documentation.
                </p>
                <p className="font-semibold text-white">
                  CloudRent Pro gives you the paper trail to prove you did everything right.
                </p>
              </div>
              <div className="flex-shrink-0 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-8 py-6 text-center">
                <div className="text-5xl font-black text-amber-400 md:text-6xl">$3.8M</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-amber-300/70">
                  Max WHS penalty
                  <br />
                  for corporations
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TESTIMONIAL
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative border-y border-purple-500/30 bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-purple-900/30 py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <div className="mb-6 text-6xl font-black text-purple-500/30">&quot;</div>
          <blockquote className="mb-6 text-xl font-semibold leading-relaxed text-white md:text-2xl">
            We used to have SWMS on paper. CloudRent Pro changed everything — our team signs off on
            site from their phone and the record is there instantly. An inspector turned up last
            month and we had everything ready in 30 seconds.
          </blockquote>
          <p className="text-sm text-white/50">
            — CloudRent Pro Customer | Plant Hire Business, QLD
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SEGMENTS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              Who It&apos;s Built For
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl">
              Every Hire Segment.{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                One Platform.
              </span>
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {segments.map((segment, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 transition-all hover:border-purple-500/40"
              >
                <div className="flex items-center gap-3">
                  <segment.icon className="h-6 w-6 text-purple-400" />
                  <span className="font-semibold text-white">{segment.name}</span>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            ))}
          </div>
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
            Start Safe.{' '}
            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
              Start Today.
            </span>
          </h2>

          <p className="mx-auto mb-8 max-w-xl text-lg text-white/60">
            Full access to every feature — including SWMS, digital sign-off, and dispatch. One
            price. No lock-in.
          </p>

          <div className="mb-8 flex justify-center">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black text-purple-500">$1</span>
              <span className="text-lg text-white/50">/ 30 days full access</span>
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
              'Full feature access from day one',
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
