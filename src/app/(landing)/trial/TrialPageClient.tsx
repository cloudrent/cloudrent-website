'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, ChevronDown, ChevronRight } from 'lucide-react'
import { HeroSection } from '@/components/HeroSection'
import { ProblemCardsSection } from '@/components/ProblemCardsSection'
import { PublicChatWidget } from '@/components/PublicChatWidget'
import { FAQSchema } from '@/components/StructuredData'
import { appendUTMParams } from '@/utilities/appendUTMParams'

// ─── FAQ DATA ──────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'What happens after the 30 days?',
    a: "Your trial converts to the Foundation Customer rate of A$85 per user per month, locked for life for the first 100 customers. We'll remind you before the trial ends, and you can cancel in one click beforehand.",
  },
  {
    q: 'Is my card charged more than $1 during the trial?',
    a: 'No. One dollar, once, at signup. Nothing else is charged until your trial ends and you choose to continue.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes, one click from your account settings, any time during the trial or after. No phone calls, no retention scripts.',
  },
  {
    q: 'How long does setup take?',
    a: "Most businesses are taking bookings the same day. Add your equipment, set your rates, and you're running. If you're switching from another system, CloudRent Migrate does the heavy lifting for you.",
  },
  {
    q: 'Do you migrate my existing data?',
    a: 'Yes. CloudRent Migrate moves your equipment records, customer records and pricing structures as a managed service. Our team does it for you.',
  },
]

// ─── MIGRATION FEATURES ────────────────────────────────────────────────────────

const migrationFeatures = [
  'Equipment records migrated',
  'Customer records migrated',
  'Pricing structures migrated',
  'Done for you, not DIY',
]

// ─── SLIM HEADER ───────────────────────────────────────────────────────────────

function SlimHeader() {
  return (
    <header className="px-5 py-7">
      <div className="mx-auto max-w-6xl">
        <a href="#start" className="flex items-center gap-2.5">
          <Image
            src="/images/CloudRent Logo Hex.svg"
            alt="CloudRent"
            width={32}
            height={32}
          />
          <span className="text-lg font-medium text-white">
            CloudRent <span className="text-purple-400">Pro</span>
          </span>
        </a>
      </div>
    </header>
  )
}

// ─── RECEIPT COMPONENT ─────────────────────────────────────────────────────────

function TrialReceipt() {
  return (
    <div className="mx-auto max-w-sm -rotate-1 rounded bg-[#f5f2ea] p-7 font-mono text-sm leading-[1.9] text-[#1c1c24] shadow-2xl shadow-black/50">
      <div className="border-b border-dashed border-gray-400 pb-3 text-center text-xs font-medium uppercase tracking-wider">
        CloudRent Pro
        <br />
        Tax invoice — trial
      </div>
      <div className="mt-4 space-y-1">
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
        <span>Total (inc GST)</span>
        <span>$1.00</span>
      </div>
      <div className="mt-4 text-center text-[10px] tracking-wide text-gray-500">
        cancel anytime · one click · no questions
      </div>
    </div>
  )
}

// ─── SLIM LEGAL FOOTER ─────────────────────────────────────────────────────────

function SlimLegalFooter() {
  return (
    <footer className="border-t border-white/[0.06] py-6">
      <div className="mx-auto max-w-6xl px-5 text-center font-mono text-xs text-white/40">
        cloudrent pty ltd · abn 55 619 933 167 · mudgeeraba qld · support@cloudrent.me ·{' '}
        <Link
          href="/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white/60"
        >
          Terms of Service
        </Link>{' '}
        ·{' '}
        <Link
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white/60"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function TrialPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [signupUrl, setSignupUrl] = useState('https://app.cloudrent.me/register')

  // Append UTM params on client
  useEffect(() => {
    setSignupUrl(appendUTMParams('https://app.cloudrent.me/register'))
  }, [])

  const faqSchemaData = faqs.map((faq) => ({
    question: faq.q,
    answer: faq.a,
  }))

  return (
    <div className="min-h-screen text-white">
      <FAQSchema faqs={faqSchemaData} />

      {/* Slim Header */}
      <SlimHeader />

      {/* Hero Section (shared component, trial variant) */}
      <HeroSection variant="trial" />

      {/* Problem Cards (shared component) */}
      <ProblemCardsSection />

      {/* ═══════════════════════════════════════════════════════════════════════
          WHY $1 SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-white/[0.06] bg-[#12122a] px-5 py-20">
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
                The dollar keeps the tyre-kickers out and proves you&apos;re serious, that&apos;s
                it. You get every feature for 30 days: bookings, dispatch, invoicing, the customer
                portal, all of it.
              </p>
              <p className="mb-8 text-white/60">
                After the trial it&apos;s A$85 per user per month on our Foundation Customer rate,
                locked for life for the first 100 customers. Cancel anytime in one click and
                you&apos;ve spent a dollar.
              </p>
              <a
                href={signupUrl}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-green px-8 py-4 text-lg font-medium text-white shadow-lg shadow-green-900/30 transition-all hover:-translate-y-0.5 hover:bg-brand-green/90"
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
          MIGRATE SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="px-5 py-20">
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
                CloudRent Migrate is a managed migration. Our team moves your equipment records,
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
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Fair questions</h2>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {faqs.map((faq, i) => (
              <div key={i}>
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
        className="relative px-5 py-24"
        style={{
          background:
            'radial-gradient(ellipse 70% 90% at 50% 110%, rgba(136,27,169,0.25), transparent)',
        }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Your next hire could be booked while you sleep
          </h2>
          <p className="mb-8 text-white/60">Every feature. 30 days. One dollar.</p>
          <a
            href={signupUrl}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-green px-8 py-4 text-lg font-medium text-white shadow-lg shadow-green-900/30 transition-all hover:-translate-y-0.5 hover:bg-brand-green/90"
          >
            Start your $1 trial
            <ChevronRight className="h-5 w-5" />
          </a>
          <span className="mt-4 block text-sm text-white/50">
            Takes about two minutes · Cancel anytime
          </span>
        </div>
      </section>

      {/* Slim Legal Footer */}
      <SlimLegalFooter />

      {/* Chat Widget (included per Ron's request) */}
      <PublicChatWidget />
    </div>
  )
}
