'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

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
  hirepos: string
}

const comparisonData: ComparisonRow[] = [
  {
    category: 'Australian company',
    cloudrent: 'Yes',
    hirepos: 'Yes',
  },
  {
    category: 'Years in market',
    cloudrent: 'Since 2004, originally HireEzy; CloudRent name adopted in 2017',
    hirepos: 'Established in 2005',
  },
  {
    category: 'Pricing visibility',
    cloudrent: 'Public pricing',
    hirepos: 'Public pricing; HirePOS lists a 30-day free trial and modular add-ons',
  },
  {
    category: 'Mobile access',
    cloudrent: 'Mobile-first workflows and dedicated app experience',
    hirepos:
      'Mobile web app with essential mobile features such as availability, delivery/pickup schedule and inspection checklists',
  },
  {
    category: 'Customer portal / online bookings',
    cloudrent: 'CloudRent Connect customer self-service',
    hirepos: 'Online Store module available',
  },
  {
    category: 'Accounting integrations',
    cloudrent: 'Xero, MYOB and QuickBooks',
    hirepos: 'Xero, MYOB, QuickBooks and Reckon',
  },
  {
    category: 'API / automation',
    cloudrent: 'API and integration options',
    hirepos: 'API/Zapier module available',
  },
  {
    category: 'AI-assisted tools',
    cloudrent: 'AI damage detection, support automation and inventory assistance in rollout/development',
    hirepos: 'No dedicated AI product suite clearly promoted on the public HirePOS pages reviewed',
  },
  {
    category: 'Best suited to',
    cloudrent:
      'Australian hire businesses wanting a modern, mobile-first platform with direct product team access',
    hirepos: 'Hire businesses wanting modular rental management with broad accounting integrations',
  },
]

const cloudrentFits = [
  'You want transparent pricing with minimal add-ons.',
  'You operate heavily from mobile devices.',
  'You want customer self-service included in the core experience.',
  'You prefer direct access to the people building the software.',
  'You want AI-assisted rental workflows.',
  'You value rapid feature development based on customer feedback.',
  'You want a platform built on more than 20 years of Australian hire industry experience.',
]

const hireposFits = [
  'You require Reckon integration today.',
  'You prefer modular pricing and optional add-on modules.',
  'You want a platform established in 2005 with ANZ market history.',
  'You are already trained on HirePOS and the migration cost outweighs the benefit of switching.',
  'You want a mobile web app for essential on-the-go workflows.',
]

const faqs = [
  {
    q: 'What is the biggest difference between CloudRent Pro and HirePOS?',
    a: 'CloudRent Pro focuses on modern mobile workflows, integrated customer self-service and AI-assisted tools. HirePOS focuses on broad rental management functionality, modular pricing and accounting integrations.',
  },
  {
    q: 'Is CloudRent Pro new compared with HirePOS?',
    a: "No. CloudRent's origins trace back to HireEzy in 2004. The CloudRent name was adopted in 2017. HirePOS states that it was established in 2005.",
  },
  {
    q: 'Does HirePOS integrate with Xero?',
    a: 'Yes. HirePOS states that it supports exports to Xero, MYOB, QuickBooks and Reckon.',
  },
  {
    q: 'Does HirePOS offer a free trial?',
    a: 'Yes. HirePOS publicly promotes a 30-day free trial.',
  },
  {
    q: 'Does CloudRent Pro have AI features?',
    a: 'CloudRent Pro is developing and rolling out AI-assisted functionality including damage detection, support automation and inventory assistance.',
  },
  {
    q: 'Which platform is better for mobile teams?',
    a: 'CloudRent Pro may be a better fit for businesses wanting mobile-first workflows. HirePOS provides a mobile web app for essential on-the-go features.',
  },
]

const sources = [
  { name: 'HirePOS official website', url: 'https://www.hirepos.com.au/' },
  { name: 'HirePOS pricing page', url: 'https://www.hirepos.com.au/pricing.html' },
  { name: 'HirePOS accounting features', url: 'https://www.hirepos.com.au/features/accounting.html' },
  { name: 'HirePOS mobile app documentation', url: 'https://docs.hirepos.com/en/articles/5642049' },
  { name: 'HirePOS Online Store documentation', url: 'https://docs.hirepos.com/en/articles/2325313' },
  { name: 'HirePOS Zapier documentation', url: 'https://docs.hirepos.com/en/articles/2315137' },
  { name: 'Capterra Australia HirePOS listing', url: 'https://www.capterra.com.au/software/156799/hirepos' },
  {
    name: 'ACCC guidance on false or misleading claims',
    url: 'https://www.accc.gov.au/consumers/advertising-and-promotions/false-or-misleading-claims',
  },
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
              HirePOS
            </span>
          </h1>

          <p className="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-gray-400">
            A 2026 comparison for Australian equipment hire businesses evaluating rental software,
            mobile workflows, accounting integrations, customer self-service and AI-assisted tools.
          </p>

          <p className="text-sm text-gray-500">Last updated: 11 June 2026 · Author: Ron Neville</p>
        </div>
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
                CloudRent Pro and HirePOS are both long-established Australian rental software platforms.
              </strong>{' '}
              CloudRent&apos;s origins trace back to HireEzy in 2004 before the CloudRent name change in
              2017. HirePOS states that it was established in 2005 and serves hire businesses across
              Australia, New Zealand and beyond.
            </p>

            <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
              CloudRent Pro is generally a strong fit for hire businesses seeking modern mobile workflows,
              transparent pricing, customer self-service and emerging AI-assisted tools. HirePOS may suit
              businesses seeking modular pricing, broad accounting integrations and a long-established rental
              management platform.
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
                  HirePOS
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-purple-900/20' : 'bg-transparent'}>
                  <td className="p-4 font-semibold text-purple-300">{row.category}</td>
                  <td className="p-4 text-gray-200">{row.cloudrent}</td>
                  <td className="p-4 text-gray-400">{row.hirepos}</td>
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

        {/* HirePOS Fit */}
        <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-purple-900/30 p-7">
          <div className="mb-4 inline-block rounded-full border border-purple-500/20 bg-purple-900/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-400">
            HirePOS fit
          </div>
          <h3 className="mb-5 text-xl font-bold text-white">When HirePOS may be the better fit</h3>
          <ul className="flex flex-col gap-2.5">
            {hireposFits.map((item, i) => (
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
            HireEzy, launched in 2004, before the platform evolved into CloudRent in 2017.
          </p>
          <p className="m-0 text-[15px] leading-relaxed text-gray-300">
            That history matters. Businesses evaluating CloudRent Pro are choosing software shaped by more
            than 20 years of hire industry experience, while still benefiting from modern cloud architecture,
            mobile-first workflows and AI-assisted product development.
          </p>
        </div>
      </div>

      {/* ═══════════════ PRICING SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Pricing and value</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          Both platforms publish pricing information publicly, but the models are different.
        </p>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          HirePOS states that plans include support and updates, accounting exporter and address search. Its
          pricing page lists a monthly starting price and optional modules including API/Zapier, Branches,
          Maintenance and Online Store.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro uses a per-user pricing structure designed to simplify budgeting and forecasting.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> Businesses seeking modularity may prefer
            HirePOS. Businesses seeking predictable pricing and fewer separate modules may prefer CloudRent
            Pro.
          </p>
        </div>
      </div>

      {/* ═══════════════ MOBILE SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Mobile experience</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          HirePOS documentation describes its mobile app as a cut-down version of the main HirePOS app for
          essential features while on the move, including availability, items/prices, customers/hire/sales,
          delivery/pickup schedule and inspection checklists.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro is designed around mobile-first workflows for managers, dispatchers and field teams.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> Businesses wanting a dedicated mobile-first
            operating model may prefer CloudRent Pro. Businesses comfortable with essential mobile access may
            find HirePOS suitable.
          </p>
        </div>
      </div>

      {/* ═══════════════ CUSTOMER PORTAL SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Customer self-service and online bookings</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro includes CloudRent Connect as part of its customer self-service experience.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          HirePOS offers an Online Store module that enables quote requests or bookings, with optional
          deposit/payment requirements and availability checking.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> Both platforms support customer-facing
            digital workflows. The key difference is how each platform packages and implements those
            workflows.
          </p>
        </div>
      </div>

      {/* ═══════════════ ACCOUNTING SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Accounting integrations</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          HirePOS publicly promotes exports to Xero, MYOB, QuickBooks and Reckon.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro focuses on accounting integrations commonly used by Australian hire businesses,
          including Xero, MYOB and QuickBooks.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> Businesses requiring Reckon integration
            today may prefer HirePOS.
          </p>
        </div>
      </div>

      {/* ═══════════════ AI SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">AI-assisted rental workflows</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro is developing and rolling out AI-assisted features designed to support practical
          rental workflows, including:
        </p>
        <ul className="mb-4 flex flex-col gap-2 pl-5">
          <li className="text-[15px] text-gray-300">
            AI damage detection for comparing equipment condition photos.
          </li>
          <li className="text-[15px] text-gray-300">
            AI support automation for common customer and staff questions.
          </li>
          <li className="text-[15px] text-gray-300">
            Inventory assistance for equipment information and specifications.
          </li>
          <li className="text-[15px] text-gray-300">
            Marketing content assistance for equipment descriptions and brochures.
          </li>
        </ul>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          HirePOS publicly promotes automation, integrations and workflow tools, but the reviewed public pages
          do not appear to promote a dedicated AI product suite.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> CloudRent Pro currently has the stronger
            publicly promoted AI direction. Claims about AI performance should be supported by internal data
            before publishing specific percentages or savings figures.
          </p>
        </div>
      </div>

      {/* ═══════════════ MIGRATION SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Switching from HirePOS to CloudRent Pro</h2>
        <div className="rounded-2xl border border-purple-500/20 bg-purple-900/30 p-7">
          <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
            CloudRent Pro supports migration for eligible customers moving from another rental platform.
          </p>
          <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
            Typical migration areas may include equipment records, customer records, rental history, pricing
            structures, contracts and asset information. Migration timelines vary depending on data quality,
            business complexity and the scope of historical records.
          </p>

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
            Australia and CloudRent product information as at 11 June 2026.
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
                  {source.name}
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
            &quot;HirePOS&quot; is a trademark of its respective owner. This page is independent and is not
            affiliated with, sponsored by or endorsed by HirePOS.
          </p>
        </div>
      </div>
    </div>
  )
}
