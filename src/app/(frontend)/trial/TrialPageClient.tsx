'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Check,
  ChevronRight,
  ChevronDown,
  Users,
  Globe,
  Zap,
  Clock,
  Shield,
  RefreshCw,
} from 'lucide-react'
import { FAQSchema } from '@/components/StructuredData'

// ─── TRUST BADGES ──────────────────────────────────────────────────────────────

const trustBadges = [
  'Australian Built',
  'GST Ready',
  'Xero Two-Way Sync',
  'Stripe Payments',
  'Foundation Pricing Locked for Life',
]

// ─── PAIN POINTS DATA ──────────────────────────────────────────────────────────

const painPoints = [
  {
    tag: 'CloudRent Connect',
    title: "The phone won't stop ringing",
    description:
      'Every availability check, every booking, every "is it back yet?" interrupts your day. Connect gives your customers a self-service portal to check availability and book online, 24 hours a day — so your counter staff can serve the people standing in front of them.',
  },
  {
    tag: 'Real-time Availability',
    title: 'Double bookings cost you money and trust',
    description:
      "CloudRent checks every booking against every other booking in real time. Conflicts are caught before they're saved, and the availability calendar shows your whole fleet at a glance — so gear is never promised twice.",
  },
  {
    tag: 'Quote → Invoice → Signed',
    title: 'Still quoting from spreadsheets?',
    description:
      'One flow from quote to booking to invoice to signed contract. Digital signatures included, payments through Stripe, everything synced to Xero automatically. No re-keying, no chasing paper.',
  },
]

// ─── MIGRATION FEATURES ────────────────────────────────────────────────────────

const migrationFeatures = [
  'Equipment records migrated',
  'Customer records migrated',
  'Pricing structures migrated',
  'Done for you, not DIY',
]

// ─── FAQ DATA ──────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'What happens after the 30 days?',
    a: 'Your trial converts to the Foundation Customer rate of A$85 per user per month — locked for life for the first 100 customers. We\'ll remind you before the trial ends, and you can cancel in one click beforehand.',
  },
  {
    q: 'Is my card charged more than $1 during the trial?',
    a: 'No. One dollar, once, at signup. Nothing else is charged until your trial ends and you choose to continue.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes — one click from your account settings, any time during the trial or after. No phone calls, no retention scripts.',
  },
  {
    q: 'How long does setup take?',
    a: "Most businesses are taking bookings the same day. Add your equipment, set your rates, and you're running. If you're switching from another system, CloudRent Migrate does the heavy lifting for you.",
  },
  {
    q: 'Do you migrate my existing data?',
    a: 'Yes. CloudRent Migrate moves your equipment records, customer records and pricing structures as a managed service — our team does it for you.',
  },
]

// ─── AVAILABILITY CALENDAR COMPONENT ───────────────────────────────────────────

function AvailabilityCalendar() {
  const rows = [
    {
      label: '1.5t Excavator #02',
      bars: [
        { left: '4%', width: '38%', color: 'bg-blue-500', text: 'ABC Constructions' },
        { left: '52%', width: '30%', color: 'bg-purple-500', text: 'Hillside Civil' },
      ],
    },
    {
      label: 'Scissor lift 19ft',
      bars: [{ left: '14%', width: '52%', color: 'bg-green-500', text: 'Meridian Build' }],
    },
    {
      label: 'Tipper truck',
      bars: [
        { left: '0%', width: '26%', color: 'bg-purple-500', text: 'GC Landscapes' },
        { left: '60%', width: '34%', color: 'bg-blue-500', text: 'R. Whitfield' },
      ],
    },
    {
      label: 'Plate compactor',
      bars: [{ left: '30%', width: '40%', color: 'bg-amber-500', text: 'Pending return' }],
    },
  ]

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#16163a] p-5 shadow-2xl shadow-black/40">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-white">Availability — this week</span>
        <span className="rounded-full bg-green-500/15 px-3 py-1 font-mono text-[10px] font-medium text-green-400">
          live
        </span>
      </div>
      <div className="space-y-0">
        {rows.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-[100px_1fr] items-center gap-3 border-t border-white/[0.06] py-2"
          >
            <span className="truncate text-xs text-white/50">{row.label}</span>
            <div className="relative h-5 rounded bg-white/[0.03]">
              {row.bars.map((bar, j) => (
                <span
                  key={j}
                  className={`absolute top-0 flex h-full items-center truncate rounded px-2 font-mono text-[9px] text-white ${bar.color}`}
                  style={{ left: bar.left, width: bar.width }}
                >
                  {bar.text}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-amber-400">
        <span className="h-2 w-2 rounded-full bg-amber-500" />
        conflict blocked: excavator #02 double-booking prevented
      </div>
    </div>
  )
}

// ─── BOOKING PORTAL CARD ───────────────────────────────────────────────────────

function BookingPortalCard() {
  const slots = [
    { day: 'mon 13', status: 'avail' },
    { day: 'tue 14', status: 'avail' },
    { day: 'wed 15', status: 'booked' },
    { day: 'thu 16', status: 'booked' },
    { day: 'fri 17', status: 'avail' },
    { day: 'sat 18', status: 'avail' },
    { day: 'mon 20', status: 'avail' },
    { day: 'tue 21', status: 'avail' },
  ]

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#16163a] p-5 shadow-2xl shadow-black/40">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-white">Book online — 1.5t excavator</span>
        <span className="rounded-full bg-purple-500/15 px-3 py-1 font-mono text-[10px] font-medium text-purple-400">
          customer portal
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {slots.map((slot, i) => (
          <span
            key={i}
            className={`rounded-lg py-2 text-center font-mono text-[10px] ${
              slot.status === 'avail'
                ? 'bg-green-500/15 text-green-400'
                : 'bg-red-500/15 text-red-400 line-through'
            }`}
          >
            {slot.day}
          </span>
        ))}
      </div>
      <button className="mt-4 w-full rounded-lg bg-purple-600 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-500">
        Request booking
      </button>
    </div>
  )
}

// ─── CONFLICT DETECTION CARD ───────────────────────────────────────────────────

function ConflictCard() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#16163a] p-5 shadow-2xl shadow-black/40">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-white">New booking — check</span>
        <span className="rounded-full bg-amber-500/15 px-3 py-1 font-mono text-[10px] font-medium text-amber-400">
          conflict found
        </span>
      </div>
      <div className="grid grid-cols-[100px_1fr] items-center gap-3 border-t border-white/[0.06] py-2">
        <span className="truncate text-xs text-white/50">Excavator #02</span>
        <div className="relative h-5 rounded bg-white/[0.03]">
          <span
            className="absolute top-0 flex h-full items-center truncate rounded bg-blue-500 px-2 font-mono text-[9px] text-white"
            style={{ left: '10%', width: '44%' }}
          >
            existing hire
          </span>
          <span
            className="absolute top-0 flex h-full items-center truncate rounded bg-red-600/85 px-2 font-mono text-[9px] text-white"
            style={{ left: '40%', width: '36%' }}
          >
            requested dates
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-amber-400">
        <span className="h-2 w-2 rounded-full bg-amber-500" />
        overlap on 3 days — suggest excavator #04 (available)
      </div>
    </div>
  )
}

// ─── QUOTE FLOW CARD ───────────────────────────────────────────────────────────

function QuoteFlowCard() {
  const steps = [
    { done: true, text: 'Quote sent', meta: 'tue 9:14am · opened 9:31am' },
    { done: true, text: 'Contract signed', meta: 'digital signature · tue 11:02am' },
    { done: true, text: 'Invoice paid', meta: 'stripe · $1,842.50 inc gst' },
    { done: false, text: 'Synced to Xero', meta: 'automatic' },
  ]

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#16163a] p-5 shadow-2xl shadow-black/40">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-white">Hire #1042 — Meridian Build</span>
        <span className="rounded-full bg-green-500/15 px-3 py-1 font-mono text-[10px] font-medium text-green-400">
          in progress
        </span>
      </div>
      <div className="space-y-0">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`h-3 w-3 rounded-full border-2 ${
                  step.done ? 'border-green-500 bg-green-500' : 'border-blue-500 bg-transparent'
                }`}
              />
              {i < steps.length - 1 && <span className="w-0.5 flex-1 bg-white/[0.08]" />}
            </div>
            <div className="pb-4">
              <p className="text-sm text-white">{step.text}</p>
              <span className="font-mono text-[10px] text-white/40">{step.meta}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── RECEIPT COMPONENT ─────────────────────────────────────────────────────────

function TrialReceipt() {
  return (
    <div className="mx-auto max-w-sm -rotate-1 rounded bg-[#f5f2ea] p-7 font-mono text-sm text-[#1c1c24] shadow-2xl shadow-black/50">
      <div className="border-b border-dashed border-gray-400 pb-3 text-center text-xs font-medium tracking-wider">
        CLOUDRENT PRO
        <br />
        TAX INVOICE — TRIAL
      </div>
      <div className="mt-4 space-y-2 leading-relaxed">
        <div className="flex justify-between gap-4">
          <span>Full platform access, 30 days</span>
          <span className="font-medium">$1.00</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Every feature unlocked</span>
          <span className="font-medium">$0.00</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Setup fees</span>
          <span className="font-medium">$0.00</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Lock-in contract</span>
          <span className="font-medium">$0.00</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Hidden charges</span>
          <span className="font-medium">$0.00</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between border-t border-dashed border-gray-400 pt-3 font-medium">
        <span>TOTAL (inc GST)</span>
        <span>$1.00</span>
      </div>
      <div className="mt-4 text-center text-[10px] tracking-wide text-gray-500">
        cancel anytime · one click · no questions
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function TrialPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const faqSchemaData = faqs.map((faq) => ({
    question: faq.q,
    answer: faq.a,
  }))

  return (
    <div className="min-h-screen text-white">
      <FAQSchema faqs={faqSchemaData} />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden px-4 pb-16 pt-12">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[700px] w-[1200px] -translate-x-1/2"
          style={{
            background: 'radial-gradient(ellipse at 50% 20%, rgba(136,27,169,0.15) 0%, transparent 60%)',
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Column */}
            <div
              className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              <div className="mb-5 font-mono text-xs uppercase tracking-[0.14em] text-purple-400">
                Equipment hire software · AU + NZ
              </div>
              <h1 className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-[54px]">
                Run your entire hire business from{' '}
                <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text italic text-transparent">
                  one platform
                </span>
              </h1>
              <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/60">
                Bookings, availability, dispatch, invoicing, digital contracts and a 24/7 customer
                portal. Built for Australian and NZ hire companies.
              </p>
              <a
                href="https://app.cloudrent.me/register"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-4 text-lg font-medium text-white shadow-lg shadow-green-900/30 transition-all hover:-translate-y-0.5 hover:bg-green-500 hover:shadow-xl hover:shadow-green-900/40"
              >
                Start your $1 trial
                <ChevronRight className="h-5 w-5" />
              </a>
              <span className="mt-4 block text-sm text-white/50">
                Full access for 30 days · Cancel anytime · GST ready
              </span>
            </div>

            {/* Right Column - UI Preview */}
            <div
              className={`transition-all delay-200 duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              <AvailabilityCalendar />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TRUST STRIP
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-white/[0.06] bg-[#12122a] py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-9 gap-y-3 px-4">
          {trustBadges.map((badge) => (
            <span key={badge} className="font-mono text-xs tracking-wide text-white/40">
              {badge.toLowerCase()}
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PAIN POINTS SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <div className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-purple-400">
              Sound familiar?
            </div>
            <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
              Three problems every hire company knows too well
            </h2>
          </div>

          {/* Pain Point 1 */}
          <div className="mb-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="mb-3 inline-block font-mono text-xs uppercase tracking-wide text-blue-400">
                {painPoints[0].tag}
              </span>
              <h3 className="mb-4 text-2xl font-bold md:text-3xl">{painPoints[0].title}</h3>
              <p className="max-w-lg text-white/60">{painPoints[0].description}</p>
            </div>
            <BookingPortalCard />
          </div>

          {/* Pain Point 2 */}
          <div className="mb-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="lg:order-2">
              <span className="mb-3 inline-block font-mono text-xs uppercase tracking-wide text-blue-400">
                {painPoints[1].tag}
              </span>
              <h3 className="mb-4 text-2xl font-bold md:text-3xl">{painPoints[1].title}</h3>
              <p className="max-w-lg text-white/60">{painPoints[1].description}</p>
            </div>
            <div className="lg:order-1">
              <ConflictCard />
            </div>
          </div>

          {/* Pain Point 3 */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="mb-3 inline-block font-mono text-xs uppercase tracking-wide text-blue-400">
                {painPoints[2].tag}
              </span>
              <h3 className="mb-4 text-2xl font-bold md:text-3xl">{painPoints[2].title}</h3>
              <p className="max-w-lg text-white/60">{painPoints[2].description}</p>
            </div>
            <QuoteFlowCard />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WHY $1 SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-white/[0.06] bg-[#12122a] px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-purple-400">
                Why a dollar?
              </div>
              <h2 className="mb-5 text-3xl font-bold leading-tight md:text-4xl">
                The whole platform. One dollar. No catch.
              </h2>
              <p className="mb-4 text-white/60">
                The dollar keeps the tyre-kickers out and proves you&apos;re serious — that&apos;s
                it. You get every feature for 30 days: bookings, dispatch, invoicing, the customer
                portal, all of it.
              </p>
              <p className="mb-8 text-white/60">
                After the trial it&apos;s A$85 per user per month on our Foundation Customer rate,
                locked for life for the first 100 customers. Cancel anytime in one click and
                you&apos;ve spent a dollar.
              </p>
              <a
                href="https://app.cloudrent.me/register"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-4 text-lg font-medium text-white shadow-lg shadow-green-900/30 transition-all hover:-translate-y-0.5 hover:bg-green-500"
              >
                Start your $1 trial
                <ChevronRight className="h-5 w-5" />
              </a>
            </div>
            <TrialReceipt />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          MIGRATION SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 rounded-2xl border border-white/[0.08] bg-[#16163a] p-8 md:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
            <div>
              <div className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-purple-400">
                Switching?
              </div>
              <h2 className="mb-4 text-2xl font-bold leading-tight md:text-3xl">
                Already on another system? We&apos;ll move you.
              </h2>
              <p className="text-white/60">
                CloudRent Migrate is a managed migration — our team moves your equipment records,
                customer records and pricing structures for you. No spreadsheet exports, no weekend
                of data entry.
              </p>
            </div>
            <ul className="space-y-3 font-mono text-sm">
              {migrationFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20 text-xs text-green-400">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Fair questions</h2>
          <div className="divide-y divide-white/[0.06]">
            {faqs.map((faq, i) => (
              <div key={i} className="border-t border-white/[0.06] first:border-t-0">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-medium text-white">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-purple-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-5' : 'max-h-0'}`}
                >
                  <p className="text-white/60">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FINAL CTA SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="start"
        className="relative px-4 py-24"
        style={{
          background: 'radial-gradient(ellipse 70% 90% at 50% 110%, rgba(136,27,169,0.25), transparent)',
        }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Your next hire could be booked while you sleep
          </h2>
          <p className="mb-8 text-white/60">Every feature. 30 days. One dollar.</p>
          <a
            href="https://app.cloudrent.me/register"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-4 text-lg font-medium text-white shadow-lg shadow-green-900/30 transition-all hover:-translate-y-0.5 hover:bg-green-500"
          >
            Start your $1 trial
            <ChevronRight className="h-5 w-5" />
          </a>
          <span className="mt-4 block text-sm text-white/50">
            Takes about two minutes · Cancel anytime
          </span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-white/[0.06] py-6 text-center">
        <p className="font-mono text-xs text-white/40">
          cloudrent pty ltd · abn 55 619 933 167 · mudgeeraba qld · support@cloudrent.me
        </p>
      </footer>
    </div>
  )
}
