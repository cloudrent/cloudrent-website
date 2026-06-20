'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle,
  ChevronRight,
  Play,
  Fence,
  MapPin,
  Truck,
  Calendar,
  FileText,
  BarChart3,
  Smartphone,
  Users,
  DollarSign,
  Clock,
  AlertTriangle,
  Package,
  Calculator,
  X,
} from 'lucide-react'
import { useUTMParams } from '@/hooks/useUTMParams'
import {
  trackLandingPageEvent,
  trackLandingPageView,
} from '@/utilities/trackLandingPageEvent'
import { LandingFooter } from '@/components/LandingFooter'

const painPoints = [
  {
    icon: AlertTriangle,
    title: 'Lost Panels & Components',
    subtitle: 'Where did that panel go?',
    description:
      'Panels, feet, and clamps go out to sites and never come back. Without proper tracking, you\'re bleeding inventory and don\'t know which customer has what.',
  },
  {
    icon: DollarSign,
    title: 'Billing Headaches',
    subtitle: 'Manual calculations, missed revenue',
    description:
      'Calculating hire periods, site variations, and extensions by hand. Invoices go out late or wrong. Revenue slips through the cracks.',
  },
  {
    icon: Clock,
    title: 'Delivery Chaos',
    subtitle: 'Double-bookings and missed pickups',
    description:
      'Coordinating deliveries and pickups across multiple sites with paper or spreadsheets. Trucks arrive at the wrong place or wrong time.',
  },
  {
    icon: FileText,
    title: 'No Site Visibility',
    subtitle: 'Which fence is where?',
    description:
      'You have fencing at dozens of sites but no easy way to see what\'s out, what\'s due back, or which sites are over their agreed period.',
  },
]

const features = [
  {
    icon: Package,
    title: 'Panel & Component Tracking',
    description:
      'Track every panel, foot, clamp, and brace. Know exactly what\'s at each site and what\'s available in the yard.',
  },
  {
    icon: MapPin,
    title: 'Site-Based Management',
    description:
      'Organize hires by site address. See all equipment at a location, track site history, and manage multiple sites per customer.',
  },
  {
    icon: Truck,
    title: 'Delivery & Pickup Scheduling',
    description:
      'Schedule deliveries and pickups with drag-and-drop. Drivers see their run sheet on the mobile app with GPS navigation.',
  },
  {
    icon: Calculator,
    title: 'Automated Billing',
    description:
      'Set your rates — daily, weekly, monthly. CloudRent Pro calculates hire charges automatically and generates invoices on your schedule.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Driver App',
    description:
      'Drivers confirm deliveries and pickups on the app. Capture photos, get signatures, and sync instantly to the office.',
  },
  {
    icon: BarChart3,
    title: 'Utilisation Reports',
    description:
      'See which panels are earning money and which are sitting idle. Track revenue per site, customer, and equipment type.',
  },
]

const stats = [
  { value: '100%', label: 'Component visibility' },
  { value: '50%', label: 'Less admin time' },
  { value: '0', label: 'Lost panels' },
  { value: '24/7', label: 'Access anywhere' },
]

const howItWorks = [
  {
    step: 1,
    title: 'Add Your Fleet',
    description: 'Import your panels, feet, clamps, and bracing. Set quantities and rates.',
    icon: Package,
  },
  {
    step: 2,
    title: 'Create Bookings',
    description: 'Book equipment to sites. Set delivery dates, hire periods, and pricing.',
    icon: Calendar,
  },
  {
    step: 3,
    title: 'Dispatch & Track',
    description: 'Schedule deliveries. Drivers confirm on the app with photos and signatures.',
    icon: Truck,
  },
  {
    step: 4,
    title: 'Bill & Report',
    description: 'Invoices generate automatically. See utilisation and revenue at a glance.',
    icon: BarChart3,
  },
]

const useCases = [
  { title: 'Construction Sites', description: 'Long-term hires with extensions and variations' },
  { title: 'Events & Festivals', description: 'Short-term hires with tight turnarounds' },
  { title: 'Development Projects', description: 'Multi-stage installations over months' },
  { title: 'Emergency Response', description: 'Fast deployment with clear tracking' },
]

export default function TempFenceHireClient() {
  const utmString = useUTMParams()
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  useEffect(() => {
    trackLandingPageView('temp-fence')
  }, [])

  const handleTrialClick = () => {
    trackLandingPageEvent('begin_trial', 'temp-fence')
  }

  const handleDemoClick = () => {
    trackLandingPageEvent('book_demo', 'temp-fence')
  }

  const trialUrl = `https://app.cloudrent.me/register${utmString}`
  const demoUrl = `/demo${utmString}`

  return (
    <div className="min-h-screen bg-[#08080c]">
      {/* LIGHTBOX MODAL */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <Image
            src={lightboxImage}
            alt="Full size preview"
            width={1920}
            height={1080}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* NAV */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.08] bg-[#08080c]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/CloudRent Logo Hex.svg"
              alt="CloudRent"
              width={32}
              height={32}
            />
            <span className="text-lg font-bold text-white">
              CloudRent <span className="text-purple-500">Pro</span>
            </span>
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
              <Fence className="h-4 w-4" />
              Built for Temp Fence Hire
            </div>

            <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
              Temporary Fence Hire{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                Software
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/60 md:text-xl">
              Purpose-built for Australian temporary fencing companies. Track every panel, foot, and
              clamp. Schedule deliveries and pickups. Automate billing.{' '}
              <strong className="text-white">Know exactly what&apos;s where.</strong>
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

          {/* Hero Image - Dashboard Screenshot */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 blur-2xl" />
            <div
              className="relative cursor-pointer transition-transform hover:scale-[1.01]"
              onClick={() => setLightboxImage('/images/landing/temp-fence-dashboard.webp')}
            >
              <Image
                src="/images/landing/temp-fence-dashboard.webp"
                alt="CloudRent Pro rental software displayed on desktop, laptop, tablet and mobile devices"
                width={1400}
                height={800}
                className="w-full"
                priority
              />
            </div>
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
              Running temp fence on spreadsheets{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                is costing you.
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

      {/* MID-HIRE CHANGES FEATURE */}
      <section className="relative border-y border-white/[0.08] bg-white/[0.02] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              Mid-Hire Changes
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl lg:text-5xl">
              Customers add panels mid-hire?{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                Billing adjusts automatically.
              </span>
            </h2>
          </div>

          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-6 text-lg text-white/70">
                Your customer calls: &quot;We need another 20 panels for a new section.&quot; No problem.
                Create a service job, your driver adds the equipment on site, and CloudRent Pro
                tracks exactly when those panels went out.
              </p>
              <p className="mb-6 text-lg text-white/70">
                When the next invoice generates, the system automatically pro-rates the additional
                equipment from the date it was delivered. No manual checking. No missed charges.
                No spreadsheet calculations.
              </p>
              <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-5">
                <p className="mb-2 text-sm font-bold uppercase tracking-wider text-purple-400">
                  The Old Way
                </p>
                <p className="text-white/60">
                  Check each job for changes → Find the date equipment was added → Calculate
                  pro-rated charges → Manually add line items to invoice → Hope you didn&apos;t miss anything
                </p>
              </div>
            </div>
            <div
              className="relative cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => setLightboxImage('/images/landing/temp-fence-mid-hire.webp')}
            >
              <Image
                src="/images/landing/temp-fence-mid-hire.webp"
                alt="CloudRent Pro automatically adjusts billing when equipment is added mid-hire"
                width={1200}
                height={800}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-20">
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

          {/* Mobile App Screenshot */}
          <div className="mt-16 grid items-center gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold text-white">
                Drivers confirm on the{' '}
                <span className="text-purple-400">mobile app</span>
              </h3>
              <p className="mb-6 text-white/60">
                Your drivers see their delivery and pickup run sheet on the CloudRent Pro app.
                They confirm each job with photos and customer signatures — syncing instantly
                back to the office.
              </p>
              <ul className="space-y-3">
                {['GPS navigation to site', 'Photo capture at delivery', 'Digital customer signature', 'Offline mode for remote sites'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70">
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="relative cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => setLightboxImage('/images/landing/temp-fence-mobile-app.webp')}
            >
              <Image
                src="/images/landing/temp-fence-mobile-app.webp"
                alt="CloudRent Pro mobile app screens showing dashboard, SWMS signing, GPS navigation, and calendar"
                width={1200}
                height={600}
                className="w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              Use Cases
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl">
              Works for{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                every type of fencing job
              </span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-center"
              >
                <h3 className="mb-2 font-bold text-white">{item.title}</h3>
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
                run temp fence hire
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
      <section className="relative border-t border-white/[0.08] py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <div className="mb-6 text-5xl text-purple-500">&quot;</div>
          <blockquote className="mb-6 text-xl font-semibold leading-relaxed text-white md:text-2xl">
            We add and remove panels throughout a hire all the time — customers extend areas,
            reduce sections, whatever they need. Before CloudRent Pro, we&apos;d have to check every
            job and manually add charges to invoices. Now the system tracks every change and
            bills it automatically. We&apos;re not leaving money on the table anymore.
          </blockquote>
          <p className="text-sm text-white/50">
            — CloudRent Pro Customer | Temporary Fencing Hire, NSW
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
            Ready to take control of your{' '}
            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
              temp fence fleet?
            </span>
          </h2>

          <p className="mx-auto mb-8 max-w-xl text-lg text-white/60">
            Try CloudRent Pro for 30 days with full access to every feature — including panel
            tracking, delivery scheduling, and automated billing.
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

      <LandingFooter />
    </div>
  )
}
