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
    competitor: 'No (US-headquartered; Australian office in Collingwood VIC)',
  },
  {
    category: 'Years in market',
    cloudrent: 'Since 2004, originally HireEzy; CloudRent name adopted in 2017',
    competitor: 'Founded in 1982; operating in Australia for many years',
  },
  {
    category: 'Pricing visibility',
    cloudrent: 'Public pricing',
    competitor: 'Quote-based; tailored per industry, location count and deployment type',
  },
  {
    category: 'Free trial',
    cloudrent: 'Yes — $1 first month available',
    competitor: 'Demo required; no self-service free trial promoted publicly',
  },
  {
    category: 'Deployment',
    cloudrent: 'Cloud',
    competitor: 'Cloud and on-premise; same code base across deployments',
  },
  {
    category: 'Mobile apps',
    cloudrent: 'Native mobile workflows; dedicated apps for managers and field crews',
    competitor: 'POR One app for drivers and yard staff; Record360 for inspections',
  },
  {
    category: 'Customer portal / online bookings',
    cloudrent: 'CloudRent Connect customer self-service',
    competitor: 'eCommerce module available; supports online bookings and storefronts',
  },
  {
    category: 'Accounting integrations',
    cloudrent: 'Xero, MYOB and QuickBooks',
    competitor: 'QuickBooks, Xero, Sage, AccountsIQ and others',
  },
  {
    category: 'AI-assisted tools',
    cloudrent: 'AI damage detection, support automation and inventory assistance in rollout and development',
    competitor: 'Rental Intelligence Suite; Intelligent Phone Agent launched March 2026',
  },
  {
    category: 'Best suited to',
    cloudrent:
      'Australian hire businesses wanting a modern, mobile-first platform with direct product team access',
    competitor: 'Mid-market to enterprise hire businesses requiring deep configurability and multiple deployment options',
  },
]

const cloudrentFits = [
  'You want transparent, published pricing rather than quote-based procurement.',
  'You operate primarily in Australia and want local support.',
  'You want modern mobile-first workflows for managers, dispatchers and field crews.',
  'You prefer direct access to the people building the software.',
  'You want customer self-service included in the core platform.',
  'You are looking for AI-assisted rental workflows without enterprise complexity.',
  'You want rapid implementation and onboarding without a long procurement process.',
  'You want software shaped by more than 20 years of Australian hire industry experience.',
]

const competitorFits = [
  'You operate across multiple countries or require a global vendor relationship.',
  'You need on-premise deployment alongside cloud options.',
  'You have highly specialised or complex operational requirements across multiple branches.',
  'You have dedicated internal IT resources and prefer enterprise-grade configurability.',
  'You require integrations with Sage, AccountsIQ or other enterprise accounting platforms.',
  'You are already invested in the Point of Rental product ecosystem.',
  'You need extensive workflow automation at an ERP level.',
]

const faqs = [
  {
    q: 'What is the biggest difference between CloudRent Pro and Point of Rental?',
    a: 'CloudRent Pro focuses on transparent pricing, mobile-first workflows, customer self-service and practical AI tools designed for Australian hire businesses. Point of Rental focuses on enterprise-grade configurability, multi-deployment options and a broad global integration ecosystem.',
  },
  {
    q: 'Is CloudRent Pro newer than Point of Rental?',
    a: "Point of Rental was founded in 1982. CloudRent's origins trace back to HireEzy in 2004, with the CloudRent name adopted in 2017.",
  },
  {
    q: 'Does Point of Rental offer a free trial?',
    a: 'Point of Rental primarily promotes demonstrations rather than self-service free trials. CloudRent Pro offers a $1 first month.',
  },
  {
    q: 'Does Point of Rental support on-premise deployment?',
    a: 'Yes. Point of Rental supports both cloud and on-premise deployment from the same code base.',
  },
  {
    q: 'Does CloudRent Pro have AI features?',
    a: 'CloudRent Pro is developing and rolling out AI-assisted functionality including damage detection, support automation and inventory assistance.',
  },
  {
    q: 'Can I migrate from Point of Rental to CloudRent Pro?',
    a: 'Yes. CloudRent Pro provides migration assistance for eligible customers. Migration scope depends on data availability and export options from your current platform. Our team will assess what is transferable during your migration discussion.',
  },
]

const sources = [
  { label: 'Point of Rental AU website', url: 'https://www.point-of-rental.com/au/' },
  { label: 'Point of Rental AU pricing page', url: 'https://www.point-of-rental.com/au/pricing/' },
  { label: 'Point of Rental AU products — Syrinx365', url: 'https://www.point-of-rental.com/au/products/syrinx365/' },
  { label: 'Point of Rental Intelligent Phone Agent press release', url: 'https://www.point-of-rental.com/au/press-release/point-of-rental-intelligent-phone-agent/' },
  { label: 'Point of Rental Rental Intelligence Suite press release', url: 'https://www.point-of-rental.com/au/press-release/rental-intelligence-suite/' },
  { label: 'Capterra Australia Point of Rental listing', url: 'https://www.capterra.com.au/software/29074/point-of-rental-software' },
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
              Point of Rental
            </span>
          </h1>

          <p className="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-gray-400">
            A 2026 comparison for equipment hire businesses evaluating rental software,
            mobile workflows, deployment options, customer self-service and AI-assisted tools.
          </p>

          <p className="text-sm text-gray-500">Last updated: June 2026 · Author: Ron Neville</p>
        </div>
      </div>

      {/* ═══════════════ HERO IMAGE ═══════════════ */}
      <div className="relative mx-auto max-w-5xl px-5 pb-10">
        <Image
          src="/images/comparison-cloudrent-vs-point-of-rental-hero.webp"
          alt="CloudRent Pro vs Point of Rental software comparison"
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
                CloudRent Pro and Point of Rental are both established rental software platforms with long histories in the hire industry.
              </strong>{' '}
              CloudRent&apos;s origins trace back to HireEzy in 2004 before evolving into CloudRent in
              2017. Point of Rental was founded in 1982 and serves more than 5,000 hire businesses
              worldwide across construction, plant hire, tool hire, event hire, portable sanitation
              and specialty rental sectors.
            </p>

            <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
              CloudRent Pro is generally a strong fit for Australian hire businesses seeking transparent
              pricing, mobile-first workflows, direct support and AI-assisted rental operations. Point of
              Rental may be a better fit for larger organisations that require extensive configurability,
              multiple deployment options and enterprise-grade functionality.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/pricing"
                className="inline-block cursor-pointer rounded-xl border-none bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:from-purple-400 hover:to-fuchsia-400"
              >
                Start $1 first month
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
                  Point of Rental
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

        {/* Point of Rental Fit */}
        <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-purple-900/30 p-7">
          <div className="mb-4 inline-block rounded-full border border-purple-500/20 bg-purple-900/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-400">
            Point of Rental fit
          </div>
          <h3 className="mb-5 text-xl font-bold text-white">When Point of Rental may be the better fit</h3>
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

      {/* ═══════════════ HISTORY SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">
          Built on two decades of rental software experience
        </h2>
        <div className="rounded-2xl border border-purple-500/20 bg-purple-900/30 p-7">
          <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
            CloudRent Pro is not a new entrant to the rental software market. Its origins trace back to
            HireEzy, launched in 2004 to serve Australian hire businesses, before the platform evolved
            into CloudRent in 2017.
          </p>
          <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
            Point of Rental was founded in 1982 and has built an extensive global presence over more
            than four decades, serving businesses across plant hire, event hire, tool hire, portable
            sanitation and specialty rental.
          </p>
          <p className="m-0 text-[15px] leading-relaxed text-gray-300">
            Businesses evaluating CloudRent Pro are choosing software shaped by more than 20 years of
            Australian hire industry experience, while still benefiting from modern cloud architecture,
            mobile-first workflows and AI-assisted product development.
          </p>
        </div>
      </div>

      {/* ═══════════════ PRICING SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Pricing and transparency</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro publishes pricing publicly, making it easier to evaluate costs upfront without
          entering a sales process.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          Point of Rental uses tailored pricing based on industry, number of locations, deployment type
          and features required. According to their pricing page, every plan includes at least two users,
          with volume discounts available and no hidden fees.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> Businesses prioritising budget certainty
            and transparent procurement may prefer CloudRent Pro. Businesses with complex, multi-site
            requirements may find tailored pricing appropriate for their needs.
          </p>
        </div>
      </div>

      {/* ═══════════════ DEPLOYMENT SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Deployment options</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          Point of Rental supports both cloud and on-premise deployment, with the same code base across
          both environments. This gives businesses with specific IT governance or data residency
          requirements greater flexibility.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro is a cloud-native platform. All data, updates and access are managed through
          the cloud, removing the overhead of local infrastructure management.
        </p>

        {/* Deployment Image */}
        <Image
          src="/images/comparison-cloudrent-vs-point-of-rental-deployment.webp"
          alt="Cloud native vs cloud and on-premise deployment options"
          width={1200}
          height={500}
          className="my-6 w-full rounded-xl"
        />

        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> Businesses requiring on-premise deployment
            should consider Point of Rental. Businesses comfortable with a modern cloud-native approach will
            find CloudRent Pro straightforward to adopt and maintain.
          </p>
        </div>
      </div>

      {/* ═══════════════ MOBILE SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Mobile experience</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          Point of Rental offers mobile capabilities through POR One, which enables drivers and yard
          staff to conduct inspections, capture condition photos and update delivery routes. Record360
          provides a dedicated inspection and damage documentation tool.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro is designed around mobile-first workflows for managers, dispatchers and field
          crews, with dedicated apps for different roles across the business.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> Both platforms support mobile operations.
            CloudRent Pro places greater emphasis on mobile-first simplicity across all roles. Point of
            Rental provides specialised mobile tools designed to support larger, more complex operational
            environments.
          </p>
        </div>
      </div>

      {/* ═══════════════ CUSTOMER PORTAL SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Customer self-service</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro includes CloudRent Connect as part of its customer self-service experience,
          enabling customers to access bookings, contracts and account information online.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          Point of Rental offers an eCommerce module that enables businesses to create branded online
          storefronts where customers can browse inventory and make bookings.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> Both platforms support customer-facing
            digital workflows. The key difference is how each platform packages and prices those capabilities.
          </p>
        </div>
      </div>

      {/* ═══════════════ ACCOUNTING SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Accounting integrations</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          Point of Rental integrates with QuickBooks, Xero, Sage, AccountsIQ and other accounting
          platforms, as stated on their public pricing page.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro integrates with Xero, MYOB and QuickBooks, covering the accounting platforms
          most commonly used by Australian hire businesses.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> Businesses requiring Sage or AccountsIQ
            integration today should consider Point of Rental. Businesses using Xero, MYOB or QuickBooks
            will find CloudRent Pro well suited.
          </p>
        </div>
      </div>

      {/* ═══════════════ AI SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">AI-assisted rental workflows</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          Point of Rental has invested significantly in AI through its Rental Intelligence Suite and the
          Intelligent Phone Agent, launched in March 2026. The Intelligent Phone Agent is described as
          an AI-powered solution designed to ensure rental businesses never miss a customer call.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro is developing and rolling out AI-assisted features designed to support practical,
          day-to-day rental workflows, including AI damage detection, support automation, inventory
          assistance and marketing content assistance.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> Both companies are actively investing in AI.
            Point of Rental currently offers a broader publicly announced AI portfolio. CloudRent Pro is
            focused on practical AI tools designed for day-to-day hire operations.
          </p>
        </div>
      </div>

      {/* ═══════════════ MIGRATION SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Switching from Point of Rental to CloudRent Pro</h2>
        <div className="rounded-2xl border border-purple-500/20 bg-purple-900/30 p-7">
          <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
            CloudRent Pro supports migration for eligible customers moving from another rental platform.
          </p>
          <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
            Migration scope depends on data availability and export options from your current platform.
            Typical transferable areas may include equipment records, customer records, and pricing
            structures. Our team will assess what is available during your migration discussion.
          </p>

          {/* Migration Image */}
          <Image
            src="/images/comparison-cloudrent-vs-point-of-rental-migration.webp"
            alt="Migrating from Point of Rental to CloudRent Pro"
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
            Australia and CloudRent product information as at June 2026.
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
            &quot;Point of Rental&quot; is a trademark of its respective owner. This page is independent and is not
            affiliated with, sponsored by or endorsed by Point of Rental.
          </p>
        </div>
      </div>
    </div>
  )
}
