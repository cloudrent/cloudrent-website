'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle,
  ChevronRight,
  Play,
  Package,
  Calendar,
  Truck,
  FileText,
  BarChart3,
  Smartphone,
  DollarSign,
  AlertTriangle,
  Users,
  Layers,
  X,
  Bell,
  MapPin,
  Wifi,
  PenTool,
  Camera,
  Phone,
  Globe,
  Headphones,
  Database,
} from 'lucide-react'
import { useUTMParams } from '@/hooks/useUTMParams'
import {
  trackLandingPageEvent,
  trackLandingPageView,
} from '@/utilities/trackLandingPageEvent'
import { LandingFooter } from '@/components/LandingFooter'
import { EngageCTA } from '@/components/EngageCTA'

const painPoints = [
  {
    icon: Globe,
    title: "Generic software doesn't fit",
    subtitle: 'Built overseas, not for AU',
    description:
      "Most rental software is built overseas and doesn't understand Australian hire workflows, tax codes, or business practices.",
  },
  {
    icon: Phone,
    title: 'No local support',
    subtitle: 'Offshore teams are slow',
    description:
      "When something goes wrong, you need someone who answers fast. Offshore support teams don't cut it.",
  },
  {
    icon: FileText,
    title: 'Wrong invoicing format',
    subtitle: 'US tax formats, not GST',
    description:
      'Australian hire businesses need GST-compliant invoicing, Xero sync, and local payment options. Not US tax formats.',
  },
  {
    icon: AlertTriangle,
    title: 'Slow onboarding',
    subtitle: 'Migration is painful',
    description:
      "Moving to new software is painful. CloudRent's team handles migration so you don't lose a day of trading.",
  },
]

const features = [
  {
    icon: DollarSign,
    title: 'Australian invoicing',
    description:
      'GST-compliant invoices with correct tax codes and Xero two-way sync built in.',
  },
  {
    icon: Headphones,
    title: 'Local support team',
    description:
      'Based on the Gold Coast. Real people who answer fast and know the hire industry.',
  },
  {
    icon: Layers,
    title: 'AU-fit workflows',
    description:
      'Built around how Australian hire businesses actually operate, not overseas assumptions.',
  },
  {
    icon: Database,
    title: 'Data migration included',
    description:
      'We handle your existing data so the switch is smooth.',
  },
  {
    icon: BarChart3,
    title: 'Xero integration',
    description:
      'Two-way sync keeps your accounts up to date without double entry.',
  },
  {
    icon: Package,
    title: 'AUD pricing',
    description:
      'No currency surprises. All pricing is in Australian dollars, billed monthly.',
  },
]

const stats = [
  { value: '100%', label: 'Australian-owned' },
  { value: 'Gold Coast', label: 'HQ' },
  { value: '18+', label: 'Years hire expertise' },
  { value: '25+', label: 'Countries served' },
]

const howItWorks = [
  {
    step: 1,
    title: 'Book a demo',
    description:
      "Talk to the CloudRent team. We'll show you the platform and answer your specific questions.",
    icon: Calendar,
  },
  {
    step: 2,
    title: 'We migrate your data',
    description:
      "Our team handles the import so you don't have to start from scratch.",
    icon: Database,
  },
  {
    step: 3,
    title: 'Your team gets trained',
    description:
      'We walk your staff through the system before you go live.',
    icon: Users,
  },
  {
    step: 4,
    title: 'You run a tighter operation',
    description:
      'Bookings, dispatch, invoicing, and reporting all in one place.',
    icon: BarChart3,
  },
]

const useCaseTypes = [
  { title: 'Construction hire', description: 'Heavy equipment' },
  { title: 'Plant hire', description: 'Excavators, loaders' },
  { title: 'Tool hire', description: 'Power tools, hand tools' },
  { title: 'Event hire', description: 'Furniture, marquees' },
  { title: 'Temporary fencing', description: 'Panels, gates' },
  { title: 'Toilet hire', description: 'Portable sanitation' },
  { title: 'General equipment', description: 'Mixed inventory' },
  { title: 'Party hire', description: 'Tables, chairs, decor' },
]

const mobileFeatures = [
  { icon: Bell, label: 'Job notifications' },
  { icon: PenTool, label: 'Digital signatures' },
  { icon: Camera, label: 'Photo capture' },
  { icon: MapPin, label: 'GPS tracking' },
  { icon: Wifi, label: 'Offline support' },
]

export default function EquipmentRentalAustraliaClient() {
  const utmString = useUTMParams()
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  useEffect(() => {
    trackLandingPageView('equipment-rental-au')
  }, [])

  const handleTrialClick = () => {
    trackLandingPageEvent('begin_trial', 'equipment-rental-au')
  }

  const handleDemoClick = () => {
    trackLandingPageEvent('book_demo', 'equipment-rental-au')
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
              <MapPin className="h-4 w-4" />
              Built for Australian Hire Businesses
            </div>

            <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
              Australian Equipment Rental Software for{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                Hire Businesses
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/60 md:text-xl">
              CloudRent is designed and supported in Australia. Built around the workflows, tax
              requirements, and business practices{' '}
              <strong className="text-white">Australian hire operators actually use.</strong>
            </p>

            <div className="mb-6 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={trialUrl}
                onClick={handleTrialClick}
                className="group flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-purple-500 hover:shadow-[0_8px_32px_rgba(136,27,169,0.4)]"
              >
                Start free trial
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href={demoUrl}
                onClick={handleDemoClick}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
              >
                <Play className="h-5 w-5" />
                Book a demo
              </Link>
            </div>

            <p className="text-sm text-white/40">
              $1 for 30 days full access. Cancel anytime.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 blur-2xl" />
            <div
              className="relative cursor-pointer transition-transform hover:scale-[1.01]"
              onClick={() => setLightboxImage('/images/landing/event-dashboard.webp')}
            >
              <Image
                src="/images/landing/event-dashboard.webp"
                alt="CloudRent Pro Australian equipment rental software dashboard"
                width={1920}
                height={1032}
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
              Generic rental software{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                doesn&apos;t fit Australian businesses.
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

      {/* FEATURE IMAGE SECTION */}
      <section className="relative border-y border-white/[0.08] bg-white/[0.02] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
                Made for Australia
              </p>
              <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">
                Rental software that fits the way{' '}
                <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                  Australian hire businesses operate
                </span>
              </h2>
              <p className="mb-6 text-lg text-white/60">
                From GST-compliant invoicing to AEST support hours, CloudRent is built around
                Australian business practices.
              </p>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  GST-compliant invoicing and Xero sync
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  Australian business number and tax fields
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  Local phone support during AEST business hours
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  Workflows built around AU hire industry practices
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  Onboarding support included
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  Pricing in AUD, no currency conversion surprises
                </li>
              </ul>
            </div>
            <div
              className="relative cursor-pointer transition-transform hover:scale-[1.01]"
              onClick={() => setLightboxImage('/images/landing/event-quote-sections.webp')}
            >
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 blur-xl" />
              <Image
                src="/images/landing/event-quote-sections.webp"
                alt="CloudRent Pro Australian hire business workflow"
                width={1200}
                height={900}
                className="relative rounded-xl border border-white/10"
              />
            </div>
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
              Get started in{' '}
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

      {/* USE CASE TYPES */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              Use Cases
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl">
              Works for{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                every type of hire business
              </span>
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {useCaseTypes.map((item, i) => (
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
              Built for{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                Australian hire businesses
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

      {/* MOBILE APP IMAGE */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div
              className="relative order-2 cursor-pointer transition-transform hover:scale-[1.01] lg:order-1"
              onClick={() => setLightboxImage('/images/landing/event-mobile-app.webp')}
            >
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 blur-xl" />
              <Image
                src="/images/landing/event-mobile-app.webp"
                alt="CloudRent Crew mobile app for Australian hire teams"
                width={1200}
                height={800}
                className="relative rounded-xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
                Mobile App
              </p>
              <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">
                Australian hire teams love{' '}
                <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                  CloudRent Crew
                </span>
              </h2>
              <p className="mb-6 text-lg text-white/60">
                CloudRent Crew gives your Australian drivers and warehouse staff everything they
                need on the job, built around local hire workflows.
              </p>
              <div className="flex flex-wrap gap-3">
                {mobileFeatures.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
                  >
                    <feature.icon className="h-4 w-4 text-purple-400" />
                    {feature.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="relative py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <div className="mb-6 text-5xl text-purple-500">&quot;</div>
          <blockquote className="mb-6 text-xl font-semibold leading-relaxed text-white md:text-2xl">
            CloudRent replaced four different tools we were using. Now everything is in one place
            and the whole team can see what is happening.
          </blockquote>
          <p className="text-sm text-white/50">— Stevens Equipment Rental</p>
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
            Australian hire software{' '}
            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
              built for businesses like yours
            </span>
          </h2>

          <p className="mx-auto mb-8 max-w-xl text-lg text-white/60">
            30-day free trial. Local onboarding support included. No credit card required.
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
              Start free trial — $1 for 30 days
              <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
            {[
              'Australian-owned',
              'Gold Coast HQ',
              'Local support',
              'Xero integration',
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
              Prefer a live walkthrough? Book a demo with our team &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ENGAGE CTA */}
      <section className="relative py-14">
        <div className="mx-auto max-w-5xl px-5">
          <EngageCTA />
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
