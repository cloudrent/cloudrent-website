'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Check, Clock, Shield, Zap, Users, Star, Gift, Lock } from 'lucide-react'

const LAUNCH_DATE = new Date('2026-02-23T00:00:00+10:00')

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

const allFeatures = [
  'Equipment catalog & management',
  'Reservations & calendar',
  'Customer management',
  'Invoicing & PDF contracts',
  'Digital signatures',
  'All staff roles (unlimited)',
  'Xero accounting integration',
  'SWMS & safety documentation',
  'Stocktakes & asset management',
  'Inspection forms & checklists',
  'Tiered pricing engine',
  'Email integration (Gmail / Outlook)',
  'Advanced reporting',
  'Marketing system & bulk email',
  'Damage detection module',
  'GPS & telematics tracking',
  'AI-powered support agent',
  'Advanced analytics dashboard',
  'Roster & time clock',
  'Staff chat system',
  'Custom integrations',
  'Dedicated account manager',
  'Phone & live chat support',
]

const benefits = [
  {
    icon: Lock,
    title: 'Price Locked Forever',
    description: "Your $85/user/mo rate is locked in for as long as you're subscribed. No surprise increases, ever.",
  },
  {
    icon: Zap,
    title: 'Every Feature Included',
    description: 'Get the full Business plan with all modules, integrations, and future updates at no extra cost.',
  },
  {
    icon: Users,
    title: 'Priority Onboarding',
    description: 'Skip the queue. Our team will personally help you migrate and get set up within days.',
  },
  {
    icon: Star,
    title: 'Shape the Product',
    description: 'Direct line to our developers. Your feature requests get priority consideration.',
  },
]

const faqs = [
  {
    q: 'What exactly do I get as a Founding Customer?',
    a: 'You get the complete Business plan — every feature, every integration, every future update — locked in at $85/user/mo. This is normally $129/user/mo. Your rate never increases as long as you remain subscribed.',
  },
  {
    q: 'How long does this offer last?',
    a: "Until we reach 100 customers or February 23rd, 2026 — whichever comes first. Once spots are filled, this offer is permanently closed. We won't be running it again.",
  },
  {
    q: 'What happens if I cancel and rejoin later?',
    a: "If you cancel your subscription, you lose your Founding Customer status. If you rejoin later, you'll be on standard pricing ($129/user/mo for Business plan).",
  },
  {
    q: 'Is there a contract or minimum commitment?',
    a: "No contracts. You can cancel anytime. But remember — if you cancel, you can't get the Founding Customer rate back.",
  },
  {
    q: 'Can I start with a free trial?',
    a: "Yes. You get a full 30-day free trial with access to all features. No credit card required to start.",
  },
  {
    q: "What if a feature I need isn't built yet?",
    a: "Tell us. Founding Customers get priority feature requests. We ship fast — most features are delivered in 2-4 weeks, not months.",
  },
]

export default function FoundingPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-16 pt-12">
        {/* Extra glow effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-purple-600/30 blur-[150px]" />
          <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-amber-500/20 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/20 px-5 py-2 text-sm font-bold uppercase tracking-wider text-amber-400">
            <Gift className="h-4 w-4" />
            Limited to First 100 Customers
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Become a{' '}
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
              Founding Customer
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
            Lock in <span className="font-bold text-white">every feature</span> of CloudRent Pro at{' '}
            <span className="font-bold text-amber-400">$85/user/mo</span> — forever.
            <br />
            <span className="text-gray-400">That's $44/user/mo less than our standard Business plan.</span>
          </p>

          {/* Countdown */}
          <div className="mb-10">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-purple-300">
              Offer ends at launch
            </p>
            <div className="flex justify-center gap-3 sm:gap-4">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Mins' },
                { value: timeLeft.seconds, label: 'Secs' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center rounded-2xl border border-purple-500/30 bg-purple-900/50 px-4 py-4 sm:px-6"
                >
                  <span className="text-3xl font-bold tabular-nums text-white sm:text-4xl">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-purple-300 sm:text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="inline-block rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-10 py-5 text-lg font-bold text-purple-900 shadow-[0_8px_30px_rgba(251,191,36,0.4)] transition-all hover:from-amber-300 hover:to-amber-400 hover:shadow-[0_8px_40px_rgba(251,191,36,0.5)]"
          >
            Claim Your Founding Spot
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            30-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Price Comparison */}
      <section className="relative mx-auto max-w-4xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Regular Price */}
          <div className="rounded-2xl border border-gray-700 bg-gray-900/50 p-8 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-500">
              Standard Business Plan
            </p>
            <div className="mb-4 flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-gray-500 line-through">$129</span>
              <span className="text-gray-600">/user/mo</span>
            </div>
            <p className="text-gray-500">Regular pricing after launch</p>
          </div>

          {/* Founding Price */}
          <div className="relative rounded-2xl border-2 border-amber-500/50 bg-gradient-to-br from-purple-900/60 to-amber-900/30 p-8 text-center shadow-[0_0_40px_rgba(251,191,36,0.15)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-4 py-1 text-xs font-bold uppercase text-purple-900">
              Save $44/user/mo
            </div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-amber-400">
              Founding Customer Price
            </p>
            <div className="mb-4 flex items-baseline justify-center gap-1">
              <span className="text-5xl font-bold text-white">$85</span>
              <span className="text-gray-400">/user/mo</span>
            </div>
            <p className="font-medium text-amber-400">Locked in forever</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative mx-auto max-w-5xl px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Why Become a{' '}
          <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
            Founding Customer
          </span>
          ?
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="rounded-2xl border border-purple-500/20 bg-purple-900/30 p-6 transition-all hover:border-purple-500/40 hover:bg-purple-900/50"
              >
                <div className="mb-4 inline-flex rounded-xl bg-amber-500/20 p-3">
                  <Icon className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* All Features */}
      <section className="relative mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-2xl border border-purple-500/20 bg-purple-900/20 p-8 md:p-12">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Everything in the{' '}
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Business Plan
            </span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-gray-400">
            As a Founding Customer, you get access to every single feature — no restrictions, no upsells, no hidden costs.
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Plus every future feature and update — included at no extra cost.
          </p>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="relative mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-900/40 to-fuchsia-900/40 p-8 text-center md:p-12">
          <div className="mb-6 flex justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-current" />
            ))}
          </div>
          <blockquote className="mb-6 text-xl italic text-gray-300 md:text-2xl">
            "The Xero integration alone saves us hours every week. But what really sets CloudRent apart is how quickly they respond to feature requests. We asked for a specific report format and had it within days."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/20">
              <span className="text-lg font-semibold text-purple-400">MH</span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-white">Michael Harrison</p>
              <p className="text-sm text-gray-400">Operations Manager, Hunter Valley Equipment Hire</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold">Frequently Asked Questions</h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl border transition-colors ${
                openFaq === i
                  ? 'border-purple-500/50 bg-purple-900/40'
                  : 'border-purple-500/20 bg-purple-900/20'
              }`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="pr-4 font-semibold text-white">{faq.q}</span>
                <span
                  className={`shrink-0 text-xl text-purple-400 transition-transform ${
                    openFaq === i ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === i ? 'max-h-52' : 'max-h-0'
                }`}
              >
                <p className="px-5 pb-5 text-gray-400">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative mx-auto max-w-4xl px-4 py-16">
        <div className="overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-purple-900/60 to-amber-900/40 p-8 text-center shadow-[0_8px_40px_rgba(251,191,36,0.2)] md:p-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-300">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />
            Only available to the first 100 customers
          </div>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Don't Miss Your Chance
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-gray-300">
            Once we hit 100 Founding Customers, this offer closes permanently. Lock in your rate today and join the businesses shaping the future of CloudRent Pro.
          </p>

          <Link
            href="/contact"
            className="inline-block rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-10 py-5 text-lg font-bold text-purple-900 shadow-[0_8px_30px_rgba(251,191,36,0.4)] transition-all hover:from-amber-300 hover:to-amber-400"
          >
            Claim Your Founding Spot
          </Link>

          <p className="mt-6 text-sm text-gray-500">
            Questions? Contact us at{' '}
            <a href="mailto:sales@cloudrent.me" className="text-purple-400 hover:text-purple-300">
              sales@cloudrent.me
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
