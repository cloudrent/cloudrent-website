'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  CheckCircle,
  ChevronRight,
  Play,
  Wrench,
  MapPin,
  Truck,
  Calendar,
  FileText,
  BarChart3,
  Smartphone,
  Settings,
  DollarSign,
  Clock,
  AlertTriangle,
  Package,
  Calculator,
  Users,
  Shield,
} from 'lucide-react'
import { useUTMParams } from '@/hooks/useUTMParams'
import {
  trackLandingPageEvent,
  trackLandingPageView,
} from '@/utilities/trackLandingPageEvent'

const painPoints = [
  {
    icon: AlertTriangle,
    title: 'Availability Confusion',
    subtitle: 'Is it available? Who knows.',
    description:
      'Equipment gets double-booked because availability isn\'t tracked properly. Customers arrive and the excavator they reserved isn\'t there.',
  },
  {
    icon: DollarSign,
    title: 'Billing Complexity',
    subtitle: 'Wet hire, dry hire, operator charges',
    description:
      'Different rates for everything — daily, weekly, monthly, with operator, without. Manual calculations mean errors and missed revenue.',
  },
  {
    icon: Clock,
    title: 'Maintenance Gaps',
    subtitle: 'Servicing gets missed',
    description:
      'Equipment goes out without proper checks. Service intervals are missed. You only find out when something breaks on site.',
  },
  {
    icon: FileText,
    title: 'Paper Chaos',
    subtitle: 'Contracts, inspections, everywhere',
    description:
      'Hire agreements on paper, inspection checklists in folders, customer details in spreadsheets. Nothing connects.',
  },
]

const features = [
  {
    icon: Package,
    title: 'Equipment Tracking',
    description:
      'Track every excavator, generator, compressor, and power tool. Real-time availability across your entire fleet.',
  },
  {
    icon: Calendar,
    title: 'Smart Availability',
    description:
      'Calendar view of all equipment. See what\'s booked, what\'s available, and what\'s in maintenance at a glance.',
  },
  {
    icon: Users,
    title: 'Wet & Dry Hire',
    description:
      'Support for both wet hire (with operator) and dry hire. Track operator assignments and separate billing.',
  },
  {
    icon: Settings,
    title: 'Maintenance Scheduling',
    description:
      'Set service intervals by hours or date. Get alerts before equipment is due. Log all maintenance history.',
  },
  {
    icon: Shield,
    title: 'Damage Documentation',
    description:
      'Photos at dispatch and return. AI-powered damage detection. Complete audit trail for disputes.',
  },
  {
    icon: BarChart3,
    title: 'Utilisation Reports',
    description:
      'See which equipment earns money and which sits idle. Track revenue by machine, category, and customer.',
  },
]

const stats = [
  { value: '100%', label: 'Real-time availability' },
  { value: '50%', label: 'Less admin time' },
  { value: '0', label: 'Double bookings' },
  { value: '24/7', label: 'Access anywhere' },
]

const howItWorks = [
  {
    step: 1,
    title: 'Add Your Fleet',
    description: 'Import your equipment. Set rates, service intervals, and categories.',
    icon: Package,
  },
  {
    step: 2,
    title: 'Take Bookings',
    description: 'Book equipment to customers. Choose wet or dry hire. Set dates and rates.',
    icon: Calendar,
  },
  {
    step: 3,
    title: 'Dispatch & Track',
    description: 'Drivers confirm pickup on the app. Capture photos and get signatures.',
    icon: Truck,
  },
  {
    step: 4,
    title: 'Bill & Maintain',
    description: 'Invoices generate automatically. Maintenance alerts keep equipment healthy.',
    icon: BarChart3,
  },
]

const equipmentTypes = [
  { title: 'Excavators', description: 'Mini to 30 tonne' },
  { title: 'Generators', description: 'Portable to site power' },
  { title: 'Compressors', description: 'Diesel and electric' },
  { title: 'Power Tools', description: 'Drills, saws, grinders' },
  { title: 'Loaders', description: 'Skid steers and wheel loaders' },
  { title: 'Lighting', description: 'Tower lights and floods' },
  { title: 'Compactors', description: 'Plates and rollers' },
  { title: 'Welders', description: 'MIG, TIG, stick' },
]

export default function PlantToolHireClient() {
  const utmString = useUTMParams()

  useEffect(() => {
    trackLandingPageView('plant-tool')
  }, [])

  const handleTrialClick = () => {
    trackLandingPageEvent('begin_trial', 'plant-tool')
  }

  const handleDemoClick = () => {
    trackLandingPageEvent('book_demo', 'plant-tool')
  }

  const trialUrl = `https://app.cloudrent.me/register${utmString}`
  const demoUrl = `/demo${utmString}`

  return (
    <div className="min-h-screen bg-[#08080c]">
      {/* NAV */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.08] bg-[#08080c]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-lg font-bold text-white">
            CloudRent <span className="text-purple-500">Pro</span>
          </Link>
          <Link
            href={demoUrl}
            onClick={handleDemoClick}
            className="rounded-lg bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-500"
          >
            Book a Demo
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-28">
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
              <Wrench className="h-4 w-4" />
              Built for Plant & Tool Hire
            </div>

            <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
              Plant & Tool Hire{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                Software
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/60 md:text-xl">
              Complete rental software for Australian plant and tool hire businesses. Track
              excavators, generators, power tools and more. Manage bookings, maintenance, and
              billing.{' '}
              <strong className="text-white">Real-time availability, zero double bookings.</strong>
            </p>

            <div className="mb-6 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={trialUrl}
                onClick={handleTrialClick}
                className="group flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-purple-500 hover:shadow-[0_8px_32px_rgba(136,27,169,0.4)]"
              >
                Start $1 Trial — 30 Days Full Access
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

      {/* STATS */}
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

      {/* PAIN POINTS */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              Sound Familiar?
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl lg:text-5xl">
              Managing plant hire on spreadsheets{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                doesn&apos;t scale.
              </span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {painPoints.map((card, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40"
              >
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

      {/* HOW IT WORKS */}
      <section className="relative border-y border-white/[0.08] bg-white/[0.02] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              How It Works
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl">
              From booking to billing in{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                four simple steps
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

      {/* EQUIPMENT TYPES */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              Equipment Types
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl">
              Works for{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                all your equipment
              </span>
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {equipmentTypes.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center"
              >
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="text-sm text-white/50">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative border-y border-white/[0.08] bg-white/[0.02] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              Features
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                run plant & tool hire
              </span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-white/[0.08] bg-[#08080c] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40"
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

      {/* TESTIMONIAL */}
      <section className="relative py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <div className="mb-6 text-5xl text-purple-500">&quot;</div>
          <blockquote className="mb-6 text-xl font-semibold leading-relaxed text-white md:text-2xl">
            We went from double-booking excavators weekly to never. CloudRent Pro shows us
            exactly what&apos;s available in real-time. The maintenance alerts have saved us from
            sending equipment out that needed servicing.
          </blockquote>
          <p className="text-sm text-white/50">
            — CloudRent Pro Customer | Plant & Tool Hire, QLD
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative border-t border-white/[0.08] py-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(136,27,169,0.1) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
          <h2 className="mb-4 text-4xl font-black text-white md:text-5xl lg:text-6xl">
            Ready to modernise your{' '}
            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
              plant & tool hire?
            </span>
          </h2>

          <p className="mx-auto mb-8 max-w-xl text-lg text-white/60">
            Try CloudRent Pro for 30 days with full access to every feature — including equipment
            tracking, maintenance scheduling, and automated billing.
          </p>

          <div className="mb-8 flex justify-center">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black text-purple-500">$1</span>
              <span className="text-lg text-white/50">/ 30-day trial</span>
            </div>
          </div>

          <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={trialUrl}
              onClick={handleTrialClick}
              className="group flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-10 py-5 text-xl font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-purple-500 hover:shadow-[0_8px_32px_rgba(136,27,169,0.4)]"
            >
              Start Your $1 Trial Now
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

      {/* FOOTER */}
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
            <a href="mailto:support@cloudrent.me" className="text-purple-400 hover:text-purple-300">
              support@cloudrent.me
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
