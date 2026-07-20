'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Check,
  Shield,
  Zap,
  Users,
  Star,
  MessageSquare,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { FAQSchema } from '@/components/StructuredData'

const LAUNCH_DATE = new Date('2026-07-31T23:59:59+10:00')
const SPOTS_CLAIMED = 64
const TOTAL_SPOTS = 100

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

const benefits = [
  {
    icon: Shield,
    title: 'Never Pay More',
    description: 'Your price is locked permanently — no future increases',
  },
  {
    icon: Zap,
    title: 'Everything Included',
    description: 'All modules, integrations, and future updates',
  },
  {
    icon: Users,
    title: 'Priority Onboarding',
    description: 'Get set up faster with direct support from our team',
  },
  {
    icon: MessageSquare,
    title: 'Direct Access',
    description: 'Work directly with the people building the product',
  },
  {
    icon: Star,
    title: 'Influence the Platform',
    description: 'Your feedback helps shape what gets built next',
  },
]

const includedFeatures = [
  'Xero/QuickBooks Integration',
  'Marketing Tools',
  'AI Features',
]

const faqs = [
  {
    q: 'Is this suitable for small and multi-location rental businesses?',
    a: 'Yes. CloudRent Pro is designed to scale with your business. Whether you have one location or many, the system adapts to your needs. Small businesses love the simplicity, while larger operations benefit from multi-location inventory management and consolidated reporting.',
  },
  {
    q: 'Can we manage safety and compliance in the same system?',
    a: 'Absolutely. CloudRent Pro includes SWMS documentation, inspection checklists, digital signatures, and compliance tracking all in one place. No more juggling separate systems for safety management.',
  },
  {
    q: 'Does it work on mobile?',
    a: 'Yes. Our mobile app works on iOS and Android with full offline sync. Your team can manage deliveries, capture signatures, scan barcodes, and update jobs from anywhere — even without internet.',
  },
  {
    q: 'Can customers book and pay online?',
    a: 'Yes. The included Customer Portal lets your customers check availability, make bookings, view invoices, and pay online 24/7. It integrates seamlessly with your main system.',
  },
  {
    q: 'Is this built for Australian businesses?',
    a: "100%. CloudRent Pro is built on the Gold Coast by Australians, for Australian businesses. We understand local tax requirements, integrate with Xero, and provide support in your timezone.",
  },
  {
    q: 'How quickly can we get started?',
    a: "Most businesses are up and running within days, not weeks. We offer free data migration and priority onboarding for Launch Partners. You'll have a dedicated team member to guide you through setup.",
  },
]

export default function LaunchPageClient() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const faqSchemaData = faqs.map((faq) => ({
    question: faq.q,
    answer: faq.a,
  }))

  const progressPercentage = (SPOTS_CLAIMED / TOTAL_SPOTS) * 100

  return (
    <div className="min-h-screen text-white">
      <FAQSchema faqs={faqSchemaData} />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-8 pt-12">
        <div className="relative mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-amber-400">
            <Sparkles className="h-4 w-4" />
            Limited Launch Offer
          </div>

          {/* Headline */}
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Join the First 100 Launch Partners
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              on CloudRent Pro
            </span>
          </h1>
        </div>
      </section>

      {/* Main Card Section */}
      <section className="relative mx-auto max-w-5xl px-4 py-8">
        <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-purple-900/40 to-purple-900/20 p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Launch Partner Card Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-500/20 to-amber-500/20 blur-2xl" />
                <Image
                  src="/images/cloudrent-founders-club.webp"
                  alt="CloudRent Launch Partner Card"
                  width={300}
                  height={400}
                  className="relative rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            {/* Text Content */}
            <div>
              <p className="mb-4 text-gray-400">
                We&apos;ve been helping hire businesses since 2017.
                <br />
                CloudRent Pro is our next evolution — rebuilt from the ground up based on real-world
                operations.
              </p>
              <p className="mb-4 font-semibold text-amber-400">
                Now we&apos;re opening it to a small group of launch partners.
              </p>
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Run your entire hire business on one system — without the chaos.
              </h2>
              <p className="text-gray-300">
                Lock in full access for{' '}
                <span className="font-bold text-amber-400">$85/user/month</span> — forever
              </p>
            </div>
          </div>

          {/* Price Comparison */}
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {/* Standard Price */}
            <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-6 text-center">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                Standard Price
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-bold text-gray-500 line-through">$129</span>
                <span className="text-gray-600">/user/mo</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">Regular pricing after launch</p>
            </div>

            {/* Launch Price */}
            <div className="relative rounded-xl border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-green-900/10 p-6 text-center">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-green-500 px-3 py-1 text-xs font-bold uppercase text-black">
                Save $44/user/mo — Forever
              </div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-green-400">
                Launch Partner Price
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-white">$85</span>
                <span className="text-gray-400">/user/mo</span>
              </div>
              <p className="mt-2 text-sm text-green-400">Locked in for life</p>
            </div>
          </div>

          {/* Everything Included */}
          <div className="mt-8 text-center">
            <p className="mb-4 text-sm text-gray-400">
              All Business features included — optional add-ons available
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {includedFeatures.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-gray-600 bg-gray-800/50 px-4 py-1.5 text-sm text-gray-300"
                >
                  {feature}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-400">
              → Total value: <span className="font-semibold text-green-400">$178+/mo</span> — you
              pay just <span className="font-semibold text-amber-400">$85</span>
            </p>
            <p className="mt-3 text-xs text-gray-500">
              * CloudRent Connect (Customer Portal) is not included
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative mx-auto max-w-5xl px-4 py-12">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-gray-500">
          As a Launch Partner, you get:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="rounded-xl border border-purple-500/20 bg-purple-900/20 p-5 text-center transition-all hover:border-purple-500/40"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                  <Icon className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-white">{benefit.title}</h3>
                <p className="text-xs text-gray-400">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Progress & Countdown Section */}
      <section className="relative mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-900/40 to-purple-900/20 p-8 text-center">
          {/* Progress Bar */}
          <div className="mb-6">
            <p className="mb-3 text-sm font-medium text-amber-400">
              <span className="font-bold">{SPOTS_CLAIMED}</span> of {TOTAL_SPOTS} launch partner
              spots claimed
            </p>
            <div className="mx-auto h-3 max-w-md overflow-hidden rounded-full bg-gray-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-gray-500">
              This offer won&apos;t be available once all 100 spots are filled.
            </p>
          </div>

          {/* Countdown */}
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-gray-500">
            Offer Closes In
          </p>
          <div className="flex justify-center gap-3">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hrs' },
              { value: timeLeft.minutes, label: 'Min' },
              { value: timeLeft.seconds, label: 'Sec' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center rounded-xl border border-gray-700 bg-gray-900/80 px-4 py-3"
              >
                <span className="text-2xl font-bold tabular-nums text-white">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-xs text-gray-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-b from-purple-900/60 to-purple-900/30 p-8 text-center md:p-12">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            This Is Your Chance to Run Your Business Properly
          </h2>
          <p className="mb-2 text-gray-400">Stop juggling systems. Stop fixing mistakes.</p>
          <p className="mb-4 text-gray-400">
            Start running your operations with full control, visibility, and confidence.
          </p>
          <p className="mb-8 font-semibold text-white">
            Once the first 100 launch partners are in, this offer disappears —<br />
            permanently.
          </p>

          <a
            href="https://app.cloudrent.me/launch"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-8 py-4 text-lg font-bold text-black shadow-[0_8px_30px_rgba(251,191,36,0.3)] transition-all hover:from-amber-300 hover:to-amber-400 hover:shadow-[0_8px_40px_rgba(251,191,36,0.4)]"
          >
            Lock in Launch Partner Pricing
            <ChevronRight className="h-5 w-5" />
          </a>

          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-green-400" />
              30-day money-back guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-green-400" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-green-400" />
              Free data migration
            </span>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Questions?{' '}
            <Link href="/demo" className="text-purple-400 hover:text-purple-300">
              Talk to our team →
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-4 text-center text-3xl font-bold">Frequently Asked Questions</h2>
        <p className="mb-10 text-center text-gray-400">Got questions? We&apos;ve got answers.</p>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl border transition-colors ${
                openFaq === i
                  ? 'border-purple-500/50 bg-purple-900/40'
                  : 'border-gray-700 bg-gray-900/50'
              }`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="pr-4 font-medium text-white">{faq.q}</span>
                <ChevronRight
                  className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${
                    openFaq === i ? 'rotate-90' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === i ? 'max-h-60' : 'max-h-0'
                }`}
              >
                <p className="px-5 pb-5 text-gray-400">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-gray-500">
          Still have questions?{' '}
          <Link href="/demo" className="text-purple-400 hover:text-purple-300">
            Book a 20-minute demo with our team →
          </Link>
        </p>
      </section>

      {/* Footer Note */}
      <section className="border-t border-gray-800 py-8 text-center">
        <p className="text-sm text-gray-400">
          <span className="mr-1">🇦🇺</span> Proudly Australian <span className="ml-1">🇦🇺</span>
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Built on the Gold Coast, supporting businesses nationwide
        </p>
      </section>
    </div>
  )
}
