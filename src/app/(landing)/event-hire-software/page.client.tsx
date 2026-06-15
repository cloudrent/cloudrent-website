'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  CheckCircle,
  ChevronRight,
  Play,
  PartyPopper,
  MapPin,
  Truck,
  Calendar,
  FileText,
  BarChart3,
  Smartphone,
  Package,
  DollarSign,
  Clock,
  AlertTriangle,
  Users,
  Calculator,
  Layers,
  Quote,
} from 'lucide-react'
import { useUTMParams } from '@/hooks/useUTMParams'
import {
  trackLandingPageEvent,
  trackLandingPageView,
} from '@/utilities/trackLandingPageEvent'

const painPoints = [
  {
    icon: AlertTriangle,
    title: 'Quote Chaos',
    subtitle: 'Hours spent on each quote',
    description:
      'Building quotes manually for weddings, corporate events, and festivals. Pricing tables, packages, variations — it takes forever and errors creep in.',
  },
  {
    icon: DollarSign,
    title: 'Deposit Tracking',
    subtitle: 'Who\'s paid? Who hasn\'t?',
    description:
      'Deposits, final payments, refunds — tracking it all in spreadsheets means things slip through. Events happen and you haven\'t been paid.',
  },
  {
    icon: Clock,
    title: 'Logistics Nightmare',
    subtitle: 'Multiple deliveries, tight timelines',
    description:
      'Same-day bump-ins and bump-outs. Multiple deliveries to the same venue. Coordinating trucks and crew without a proper system is chaos.',
  },
  {
    icon: FileText,
    title: 'Inventory Juggling',
    subtitle: 'What\'s available when?',
    description:
      'Items booked across overlapping events. You need to know instantly if you can accept a booking — not after calling the warehouse.',
  },
]

const features = [
  {
    icon: Quote,
    title: 'Quote Builder',
    description:
      'Build professional quotes in minutes. Drag-and-drop items, create packages, add options and upgrades. Send and track online.',
  },
  {
    icon: Layers,
    title: 'Kit & Package Management',
    description:
      'Create event packages — furniture suites, marquee setups, lighting rigs. One click adds everything with correct quantities.',
  },
  {
    icon: Calendar,
    title: 'Event Timeline',
    description:
      'See all events on a calendar. Delivery, setup, event duration, bump-out. Never double-book equipment again.',
  },
  {
    icon: Truck,
    title: 'Delivery Scheduling',
    description:
      'Schedule deliveries and pickups to the minute. Drivers see their run sheet with venue contacts and access notes.',
  },
  {
    icon: DollarSign,
    title: 'Payment Tracking',
    description:
      'Track deposits, progress payments, and final balances. Automatic reminders for overdue payments.',
  },
  {
    icon: BarChart3,
    title: 'Event Analytics',
    description:
      'See revenue by event type, venue, and season. Track your most popular items and profitable packages.',
  },
]

const stats = [
  { value: '75%', label: 'Faster quoting' },
  { value: '0', label: 'Double bookings' },
  { value: '100%', label: 'Payment visibility' },
  { value: '24/7', label: 'Access anywhere' },
]

const howItWorks = [
  {
    step: 1,
    title: 'Build Inventory',
    description: 'Import your marquees, furniture, lighting, and AV equipment. Create packages.',
    icon: Package,
  },
  {
    step: 2,
    title: 'Quote & Book',
    description: 'Build quotes in the drag-and-drop editor. Convert to bookings with one click.',
    icon: Quote,
  },
  {
    step: 3,
    title: 'Deliver & Setup',
    description: 'Schedule logistics. Drivers confirm on the app with photos and signatures.',
    icon: Truck,
  },
  {
    step: 4,
    title: 'Collect & Report',
    description: 'Schedule pickups. Generate invoices. Track payments and profitability.',
    icon: BarChart3,
  },
]

const eventTypes = [
  { title: 'Weddings', description: 'Furniture, marquees, decor' },
  { title: 'Corporate Events', description: 'AV, staging, seating' },
  { title: 'Festivals', description: 'Large-scale logistics' },
  { title: 'Private Parties', description: 'Tables, chairs, linen' },
  { title: 'Exhibitions', description: 'Display furniture, lighting' },
  { title: 'Funerals', description: 'Seating, marquees' },
  { title: 'Sporting Events', description: 'Crowd control, staging' },
  { title: 'School Events', description: 'PA systems, staging' },
]

export default function EventHireClient() {
  const utmString = useUTMParams()

  useEffect(() => {
    trackLandingPageView('event-hire')
  }, [])

  const handleTrialClick = () => {
    trackLandingPageEvent('begin_trial', 'event-hire')
  }

  const handleDemoClick = () => {
    trackLandingPageEvent('book_demo', 'event-hire')
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
              <PartyPopper className="h-4 w-4" />
              Built for Event & Party Hire
            </div>

            <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
              Event Hire{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                Software
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/60 md:text-xl">
              Purpose-built for Australian event and party hire businesses. Build quotes fast.
              Track marquees, furniture, and AV equipment. Manage logistics for weddings,
              corporate events, and festivals.{' '}
              <strong className="text-white">Quote to invoice in one system.</strong>
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
              Event hire without proper software{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                is exhausting.
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
              From enquiry to invoice in{' '}
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

      {/* EVENT TYPES */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              Event Types
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl">
              Works for{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                every type of event
              </span>
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {eventTypes.map((item, i) => (
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
                run event hire
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
            We used to spend hours building wedding quotes in spreadsheets. Now we drag-and-drop
            items, hit send, and the customer can accept online. It&apos;s completely transformed
            our quoting process and we&apos;re winning more jobs.
          </blockquote>
          <p className="text-sm text-white/50">
            — CloudRent Pro Customer | Event & Party Hire, SA
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
            Ready to streamline your{' '}
            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
              event hire business?
            </span>
          </h2>

          <p className="mx-auto mb-8 max-w-xl text-lg text-white/60">
            Try CloudRent Pro for 30 days with full access to every feature — including quote
            builder, package management, and delivery scheduling.
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
