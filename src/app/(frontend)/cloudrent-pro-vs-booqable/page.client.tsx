'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { EngageCTA } from '@/components/EngageCTA'

// Checkmark icon
function Check({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={cn('shrink-0', className)}
    >
      <circle cx="9" cy="9" r="9" fill="currentColor" opacity="0.12" />
      <path
        d="M5.5 9.2L7.8 11.5L12.5 6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface ComparisonRow {
  category: string
  cloudrent: string
  competitor: string
}

const comparisonData: ComparisonRow[] = [
  {
    category: 'Australian company',
    cloudrent: 'Yes',
    competitor: 'No (Dutch-headquartered, founded Amsterdam 2014)',
  },
  {
    category: 'Years in market',
    cloudrent: 'Since 2004, originally HireEzy; CloudRent name adopted in 2017',
    competitor: 'Founded 2014',
  },
  {
    category: 'Pricing visibility',
    cloudrent: 'Public per-user pricing',
    competitor: 'Public per-plan pricing; $29–$149/month USD',
  },
  {
    category: 'Free trial',
    cloudrent: 'Yes — $1 trial available',
    competitor: 'Yes — 14-day free trial, no credit card required',
  },
  {
    category: 'User limits',
    cloudrent: 'Per user per month',
    competitor: 'Capped per plan (1, 6 or 11 active users)',
  },
  {
    category: 'Deployment',
    cloudrent: 'Cloud',
    competitor: 'Cloud',
  },
  {
    category: 'Mobile apps',
    cloudrent: 'Native mobile workflows for managers and field crews',
    competitor: 'iOS and Android app; reviewers note limited mobile functionality vs desktop',
  },
  {
    category: 'Contracts and e-signatures',
    cloudrent: 'Full contract management with e-signatures',
    competitor: 'Limited; users report inability to upload documents or collect e-signatures',
  },
  {
    category: 'Customer portal',
    cloudrent: 'CloudRent Connect customer self-service',
    competitor: 'Online booking store; customers can browse, reserve and pay',
  },
  {
    category: 'Accounting integrations',
    cloudrent: 'Xero, MYOB and QuickBooks',
    competitor: 'Xero, Stripe, PayPal and Zapier',
  },
  {
    category: 'AI features',
    cloudrent: 'AI damage detection, support automation and inventory assistance in rollout',
    competitor: 'None publicly announced',
  },
  {
    category: 'Best suited to',
    cloudrent: 'Growing Australian hire businesses needing professional workflows, mobile teams and contract management',
    competitor: 'Early-stage or very small rental businesses primarily needing online bookings and basic inventory',
  },
]

const cloudrentFits = [
  'You operate a growing hire business across tool hire, event hire, scaffolding, plant hire or AV equipment.',
  'You need full contract management and e-signatures built into your rental workflow.',
  'You want dedicated mobile apps for managers, dispatchers and field crews.',
  'You want transparent per-user pricing that scales with your team.',
  'You operate in Australia and want local support.',
  'You want AI-assisted rental workflows as part of your platform.',
  'You want customer self-service that integrates with your core hire operations.',
  'You want software built on more than 20 years of hire industry experience.',
]

const competitorFits = [
  'You are an early-stage or very small rental business primarily needing an online booking page.',
  'You primarily rent event items, party equipment, bikes or camera gear to consumers.',
  'You have a very small team of one to six people.',
  'You do not yet require full contract management, e-signatures or field crew mobile workflows.',
  'You want the lowest possible entry price to get started quickly.',
  'You already use Shopify, WordPress or Squarespace and want a direct integration.',
]

const faqs = [
  {
    q: 'What is the biggest difference between CloudRent Pro and Booqable?',
    a: 'CloudRent Pro is built for growing hire businesses that need professional contract management, mobile field crew workflows, AI-assisted tools and enterprise-grade operations. Booqable is better suited to early-stage or very small rental businesses that primarily need an online booking page and basic inventory management.',
  },
  {
    q: 'Is Booqable suitable for commercial hire businesses in Australia?',
    a: 'Booqable can work for very small or early-stage hire businesses. However, reviewers consistently note limitations around contract management, e-signatures and mobile functionality that may not meet the requirements of commercial hire operations.',
  },
  {
    q: 'Does Booqable have a free trial?',
    a: 'Yes. Booqable offers a 14-day free trial with no credit card required. CloudRent Pro offers a $1 trial.',
  },
  {
    q: 'Is Booqable available in Australia?',
    a: 'Yes. Booqable is available globally and is used by some Australian rental businesses. It is headquartered in Amsterdam.',
  },
  {
    q: 'Does CloudRent Pro have AI features?',
    a: 'CloudRent Pro is developing and rolling out AI-assisted functionality including damage detection, support automation and inventory assistance.',
  },
  {
    q: 'Can I migrate from Booqable to CloudRent Pro?',
    a: 'Yes. CloudRent Pro provides migration assistance for eligible customers. Migration scope depends on data availability and export options from your current platform. Our team will assess what is transferable during your migration discussion.',
  },
]

const sources = [
  { label: 'Booqable website', url: 'https://booqable.com/' },
  { label: 'Booqable pricing page', url: 'https://booqable.com/pricing/' },
  { label: 'Capterra Australia — Booqable listing', url: 'https://www.capterra.com.au/software/138689/booqable' },
  { label: 'G2 — Booqable reviews', url: 'https://www.g2.com/products/booqable-rental-software/reviews' },
  { label: 'GetApp Australia — Booqable listing', url: 'https://www.getapp.com.au/software/138689/booqable' },
  { label: 'ACCC guidance on false or misleading claims', url: 'https://www.accc.gov.au/consumers/advertising-and-promotions/false-or-misleading-claims' },
]

export default function PageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0a0a1a] font-sans text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
      </div>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <div className="relative px-5 pb-10 pt-20 text-center">
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-5 inline-block rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-1.5 text-[15px] font-semibold uppercase tracking-wider text-purple-300">
            Equipment hire software comparison
          </div>

          <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            CloudRent Pro vs{' '}
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Booqable
            </span>
          </h1>

          <p className="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-gray-400">
            A 2026 comparison for equipment hire businesses evaluating rental software,
            online bookings, mobile workflows and customer self-service.
          </p>

          <p className="text-sm text-gray-500">Last updated: June 2026 · Author: Ron Neville</p>
        </div>
      </div>

      {/* ═══════════════ HERO IMAGE ═══════════════ */}
      <div className="relative mx-auto max-w-5xl px-5 pb-10">
        <Image
          src="/images/comparison-cloudrent-vs-booqable-hero.webp"
          alt="CloudRent Pro vs Booqable software comparison"
          width={1400}
          height={788}
          className="my-8 w-full rounded-xl"
          priority
        />
      </div>

      {/* ═══════════════ QUICK VERDICT ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-purple-900/40 p-8 shadow-[0_8px_32px_rgba(136,27,169,0.2)]">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 12px)',
            }}
          />

          <div className="relative">
            <h2 className="mb-4 text-2xl font-bold text-white">Quick verdict</h2>

            <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
              <strong className="text-white">
                CloudRent Pro and Booqable are both cloud-native rental software platforms, but they are designed for different stages of business and different operational needs.
              </strong>{' '}
              Booqable was founded in 2014 and is headquartered in Amsterdam, serving more than 8,000 small rental businesses globally across event hire, party, bike, camera and AV equipment sectors. CloudRent&apos;s origins trace back to HireEzy in 2004, with more than 20 years of rental software experience behind the platform.
            </p>

            <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
              CloudRent Pro is built for growing hire businesses that need professional workflows, mobile-first operations, enterprise-grade contracts and direct support. Booqable may be a better fit for very small or early-stage rental businesses that primarily need an online booking page and basic inventory management.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/pricing"
                className="inline-block cursor-pointer rounded-xl border-none bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:from-purple-400 hover:to-fuchsia-400"
              >
                Start $1 trial
              </Link>
              <Link
                href="/demo"
                className="inline-block cursor-pointer rounded-xl border border-purple-400/50 bg-transparent px-8 py-3.5 text-[15px] font-semibold text-purple-200 transition-all hover:bg-purple-500/20"
              >
                Book a 20-minute demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ COMPARISON TABLE ═══════════════ */}
      <div className="relative mx-auto max-w-5xl px-5 pb-14">
        <h2 className="mb-3 text-3xl font-bold text-white">At-a-glance comparison</h2>
        <p className="mb-8 text-[15px] text-gray-400">
          This table compares publicly available information and CloudRent product information. Features and
          pricing may change, so buyers should confirm current details directly with each provider.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-purple-500/20 bg-purple-900/30">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                <th className="w-1/4 border-b-2 border-purple-500/30 p-4 text-left font-semibold text-gray-400">
                  Category
                </th>
                <th className="w-[37.5%] border-b-2 border-purple-500 p-4 text-left font-bold text-purple-400">
                  CloudRent Pro
                </th>
                <th className="w-[37.5%] border-b-2 border-purple-500/30 p-4 text-left font-semibold text-gray-400">
                  Booqable
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-purple-900/20' : 'bg-transparent'}>
                  <td className="p-4 font-semibold text-purple-300">{row.category}</td>
                  <td className="p-4 text-gray-200">{row.cloudrent}</td>
                  <td className="p-4 text-gray-400">{row.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══════════════ FIT CARDS ═══════════════ */}
      <div className="relative mx-auto grid max-w-5xl gap-6 px-5 pb-14 md:grid-cols-2">
        {/* CloudRent Fit */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-purple-500 bg-purple-900/40 p-7 shadow-[0_12px_40px_rgba(136,27,169,0.25)]">
          <div className="mb-4 inline-block rounded-full border border-purple-500/30 bg-purple-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-300">
            CloudRent fit
          </div>
          <h3 className="mb-5 text-xl font-bold text-white">When CloudRent Pro may be the better fit</h3>
          <ul className="flex flex-col gap-2.5">
            {cloudrentFits.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check className="mt-0.5 text-green-400" />
                <span className="text-[15px] leading-snug text-gray-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Booqable Fit */}
        <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-purple-900/30 p-7">
          <div className="mb-4 inline-block rounded-full border border-purple-500/20 bg-purple-900/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-400">
            Booqable fit
          </div>
          <h3 className="mb-5 text-xl font-bold text-white">When Booqable may be the better fit</h3>
          <ul className="flex flex-col gap-2.5">
            {competitorFits.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check className="mt-0.5 text-gray-500" />
                <span className="text-[15px] leading-snug text-gray-400">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ═══════════════ FEATURES IMAGE ═══════════════ */}
      <div className="relative mx-auto max-w-5xl px-5 pb-14">
        <Image
          src="/images/comparison-cloudrent-vs-booqable-features.webp"
          alt="CloudRent Pro vs Booqable feature comparison"
          width={1200}
          height={500}
          className="my-6 w-full rounded-xl"
        />
      </div>

      {/* ═══════════════ PRICING SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Pricing and transparency</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          Both platforms publish pricing publicly.
        </p>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          Booqable&apos;s plans are priced per plan rather than per user, with active user caps at each tier — 1 user on Start ($29/month USD), up to 6 on Grow ($69/month USD), and up to 11 on Scale ($149/month USD). Some reviewers note additional costs for bundles, delivery tools and reporting features on lower tiers.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro is priced per user per month, making it straightforward to calculate costs as your team grows without hitting plan-level user caps.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> Booqable&apos;s entry price is lower, making it accessible for very small or early-stage businesses. CloudRent Pro&apos;s per-user model scales more predictably for growing hire businesses with larger teams.
          </p>
        </div>
      </div>

      {/* ═══════════════ MOBILE SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Mobile experience</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          Booqable offers iOS and Android apps for managing rentals on the go. However, reviewers consistently note that the mobile version is less functional than the desktop platform, with missing features and occasional usability issues on smartphones.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro is designed around mobile-first workflows, with dedicated apps for different roles across the business including managers, dispatchers and field crews.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> CloudRent Pro offers a more complete mobile experience for hire businesses with field teams. Booqable&apos;s mobile app is functional for basic tasks but is not designed around field crew or multi-role operations.
          </p>
        </div>
      </div>

      {/* ═══════════════ CONTRACT SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Contract management</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          Contract management is a critical part of professional hire operations. Reviewers of Booqable consistently report limitations around contracts, including the inability to upload documents, collect electronic signatures, or include legal terms directly in the platform.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro includes full contract management with e-signatures as part of the core platform, designed for the compliance and documentation requirements of professional hire businesses.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> For hire businesses that require professional contract management and e-signatures, CloudRent Pro is the stronger fit. Booqable&apos;s contract capabilities are limited and may not meet the requirements of commercial hire operations.
          </p>
        </div>
      </div>

      {/* ═══════════════ CUSTOMER PORTAL SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Customer self-service</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          Booqable includes a hosted online booking store where customers can browse equipment, check availability, make reservations and pay. It also integrates with Shopify, WordPress and Squarespace for businesses that want to embed booking into an existing website.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro includes CloudRent Connect as its customer self-service experience, enabling customers to access bookings, contracts and account information online as part of a managed hire relationship rather than a transactional storefront.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> Booqable&apos;s online store is well suited to consumer-facing transactional rentals. CloudRent Connect is designed for ongoing customer relationships typical of commercial and business-to-business hire operations.
          </p>
        </div>
      </div>

      {/* ═══════════════ AI SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">AI-assisted rental workflows</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro is developing and rolling out AI-assisted features including damage detection, support automation and inventory assistance, designed for practical day-to-day hire workflows.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          Booqable has no publicly announced AI features as at June 2026.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> CloudRent Pro is ahead on AI investment for rental operations. Businesses looking for AI-assisted workflows will find more on the CloudRent Pro roadmap.
          </p>
        </div>
      </div>

      {/* ═══════════════ HISTORY SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">
          Two platforms, different stages of maturity
        </h2>
        <div className="rounded-2xl border border-purple-500/20 bg-purple-900/30 p-7">
          <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
            CloudRent Pro draws on more than 20 years of rental software experience through its origins as HireEzy, launched in 2004 for the Australian hire industry.
          </p>
          <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
            Booqable was founded in 2014 and has grown to serve more than 8,000 small rental businesses globally, with a strong focus on event, party and consumer equipment rental.
          </p>
          <p className="m-0 text-[15px] leading-relaxed text-gray-300">
            Businesses that need a platform with deep hire industry heritage and enterprise-grade workflows will find CloudRent Pro the more mature choice. Booqable is a capable entry-level product for smaller or simpler operations.
          </p>
        </div>
      </div>

      {/* ═══════════════ MIGRATION SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Switching from Booqable to CloudRent Pro</h2>
        <div className="rounded-2xl border border-purple-500/20 bg-purple-900/30 p-7">
          <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
            CloudRent Pro supports migration for eligible customers moving from another rental platform.
          </p>
          <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
            Migration scope depends on data availability and export options from your current platform. Typical transferable areas may include equipment records, customer records and pricing structures. Our team will assess what is available during your migration discussion.
          </p>

          {/* Migration Image */}
          <Image
            src="/images/comparison-cloudrent-vs-booqable-migration.webp"
            alt="Migrating from Booqable to CloudRent Pro"
            width={1200}
            height={500}
            className="my-6 w-full rounded-xl"
          />

          <div className="flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="inline-block cursor-pointer rounded-xl border-none bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:from-purple-400 hover:to-fuchsia-400"
            >
              Book a migration discussion
            </Link>
            <Link
              href="/pricing"
              className="inline-block cursor-pointer rounded-xl border border-purple-400/50 bg-transparent px-8 py-3.5 text-[15px] font-semibold text-purple-200 transition-all hover:bg-purple-500/20"
            >
              View CloudRent pricing
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════════ ENGAGE CTA ═══════════════ */}
      <div className="relative mx-auto max-w-5xl px-5 pb-14">
        <EngageCTA />
      </div>

      {/* ═══════════════ FAQ SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-3xl px-5 pb-14">
        <h2 className="mb-8 text-3xl font-bold text-white">Frequently asked questions</h2>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                'overflow-hidden rounded-xl border transition-colors duration-200',
                openFaq === i
                  ? 'border-purple-500/50 bg-purple-900/40'
                  : 'border-purple-500/20 bg-purple-900/20',
              )}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent p-5 text-left"
              >
                <span className="pr-4 text-[15px] font-semibold text-white">{faq.q}</span>
                <span
                  className={cn(
                    'shrink-0 text-xl font-light text-purple-400 transition-transform duration-200',
                    openFaq === i && 'rotate-45',
                  )}
                >
                  +
                </span>
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openFaq === i ? 'max-h-52' : 'max-h-0',
                )}
              >
                <p className="m-0 px-5 pb-4 text-sm leading-relaxed text-gray-400">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════ SOURCES SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Sources and methodology</h2>
        <div className="rounded-2xl border border-purple-500/20 bg-purple-900/30 p-7">
          <p className="mb-4 text-[15px] leading-relaxed text-gray-400">
            This comparison is based on publicly available vendor pages, product documentation, Capterra
            Australia, G2 and CloudRent product information as at June 2026.
          </p>
          <ul className="flex flex-col gap-2">
            {sources.map((source, i) => (
              <li key={i}>
                <a
                  href={source.url}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="text-[15px] text-purple-400 transition-colors hover:text-purple-300"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ═══════════════ DISCLAIMER FOOTER ═══════════════ */}
      <div className="border-t border-purple-500/10 bg-[#050510] px-5 py-8">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm leading-relaxed text-gray-500">
            <strong className="text-gray-400">Disclaimer:</strong> This comparison is provided for
            informational purposes only. Features, pricing and product details may change. Buyers should
            confirm current information directly with each provider before making a purchasing decision.
          </p>
          <p className="m-0 text-sm leading-relaxed text-gray-500">
            &quot;Booqable&quot; is a trademark of its respective owner. This page is independent and is not
            affiliated with, sponsored by or endorsed by Booqable.
          </p>
        </div>
      </div>
    </div>
  )
}
