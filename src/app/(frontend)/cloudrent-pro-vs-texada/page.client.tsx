'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  competitor: string
}

const comparisonData: ComparisonRow[] = [
  {
    category: 'Australian company',
    cloudrent: 'Yes',
    competitor: 'No (Canadian-headquartered)',
  },
  {
    category: 'Years in market',
    cloudrent: 'Since 2004, originally HireEzy; CloudRent name adopted in 2017',
    competitor: 'Founded in 1984; merged with InTempo in 2023',
  },
  {
    category: 'Pricing visibility',
    cloudrent: 'Public pricing',
    competitor: 'Quote-based; no public pricing',
  },
  {
    category: 'Free trial',
    cloudrent: 'Yes — $1 trial available',
    competitor: 'Demo required; no self-service free trial',
  },
  {
    category: 'Deployment',
    cloudrent: 'Cloud',
    competitor: 'Cloud-native',
  },
  {
    category: 'Industry focus',
    cloudrent: 'Broad: tool hire, event hire, scaffolding, AV, plant hire and more',
    competitor: 'Heavy equipment, construction, plant hire, aerial and lift, equipment dealerships',
  },
  {
    category: 'OEM integrations',
    cloudrent: 'Not applicable',
    competitor: 'Deep integrations with Caterpillar, John Deere, Bobcat and other OEMs',
  },
  {
    category: 'Mobile apps',
    cloudrent: 'Native mobile workflows for managers and field crews',
    competitor: 'Texada Mobile with offline access, voice-to-text and digital signatures',
  },
  {
    category: 'Customer portal',
    cloudrent: 'CloudRent Connect customer self-service',
    competitor: 'Online rental store; customers can browse, reserve and manage contracts',
  },
  {
    category: 'Accounting integrations',
    cloudrent: 'Xero, MYOB and QuickBooks',
    competitor: 'Xero, QuickBooks, Oracle, Power BI and Avalara',
  },
  {
    category: 'AI features',
    cloudrent: 'AI damage detection, support automation and inventory assistance in rollout',
    competitor: 'AI damage detection; voice-to-text for field technicians',
  },
  {
    category: 'Best suited to',
    cloudrent: 'Australian hire businesses across a broad range of hire sectors',
    competitor: 'Heavy equipment and plant hire businesses requiring OEM integrations and dealer management',
  },
]

const cloudrentFits = [
  'You operate in tool hire, event hire, scaffolding, AV equipment, or a broad hire category rather than solely heavy plant.',
  'You want transparent, published pricing rather than quote-based procurement.',
  'You operate primarily in Australia and want local support.',
  'You want modern mobile-first workflows for managers, dispatchers and field crews.',
  'You prefer direct access to the people building the software.',
  'You want customer self-service included in the core platform.',
  'You want rapid implementation without a long enterprise sales and onboarding process.',
  'You want software shaped by more than 20 years of Australian hire industry experience.',
]

const competitorFits = [
  'You operate primarily in heavy equipment, plant hire, construction equipment or equipment dealerships.',
  'You require deep OEM integrations with Caterpillar, John Deere, Bobcat or other major manufacturers.',
  'You need integrated dealer management alongside your rental operation.',
  'You manage large fleets across multiple locations and require enterprise-scale fleet tracking.',
  'You need integrated accounting at an ERP level with Oracle or similar platforms.',
  'You are already operating within the Texada or InTempo ecosystem.',
]

const faqs = [
  {
    q: 'What is the biggest difference between CloudRent Pro and Texada?',
    a: 'The most significant difference is industry focus. Texada is purpose-built for heavy equipment, plant hire and equipment dealerships with deep OEM integrations. CloudRent Pro serves a broader range of hire industries including tool hire, event hire, scaffolding and AV equipment, and is designed specifically for the Australian market.',
  },
  {
    q: 'Is CloudRent Pro or Texada better for tool hire businesses?',
    a: "CloudRent Pro is generally the stronger fit for tool hire, event hire and general hire businesses. Texada's feature set and OEM integrations are primarily designed for heavy equipment and plant hire operations.",
  },
  {
    q: 'Does Texada have a free trial?',
    a: 'Texada promotes demonstrations rather than self-service free trials. CloudRent Pro offers a $1 trial.',
  },
  {
    q: 'Is Texada available in Australia?',
    a: 'Yes. Texada is available in Australia and serves customers globally. It is headquartered in Canada.',
  },
  {
    q: 'Does CloudRent Pro have AI features?',
    a: 'CloudRent Pro is developing and rolling out AI-assisted functionality including damage detection, support automation and inventory assistance.',
  },
  {
    q: 'Can I migrate from Texada to CloudRent Pro?',
    a: 'Yes. CloudRent Pro provides migration assistance for eligible customers. Migration scope depends on data availability and export options from your current platform. Our team will assess what is transferable during your migration discussion.',
  },
]

const sources = [
  { label: 'Texada website', url: 'https://texadasoftware.com/' },
  { label: 'Texada rental management', url: 'https://texadasoftware.com/equipment-rental-software-rental-management/' },
  { label: 'Capterra Australia — Texada listing', url: 'https://www.capterra.com.au/software/152403/texada-software' },
  { label: 'GetApp Australia — Texada listing', url: 'https://www.getapp.com.au/software/105783/srm-systematic-rental-management' },
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
              Texada
            </span>
          </h1>

          <p className="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-gray-400">
            A 2026 comparison for equipment hire businesses evaluating rental software,
            mobile workflows, customer self-service and AI-assisted tools.
          </p>

          <p className="text-sm text-gray-500">Last updated: June 2026 · Author: Ron Neville</p>
        </div>
      </div>

      {/* ═══════════════ HERO IMAGE ═══════════════ */}
      <div className="relative mx-auto max-w-5xl px-5 pb-10">
        <Image
          src="/images/comparison-cloudrent-vs-texada-hero.webp"
          alt="CloudRent Pro vs Texada software comparison"
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
                CloudRent Pro and Texada are both cloud-native rental software platforms, but they serve meaningfully different markets.
              </strong>{' '}
              Texada was founded in 1984 and serves more than 400 customers globally, with a strong focus on heavy equipment, construction, plant hire, aerial and lift, and equipment dealerships. CloudRent&apos;s origins trace back to HireEzy in 2004, with more than 20 years of rental software experience behind the platform.
            </p>

            <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
              CloudRent Pro is generally a strong fit for Australian hire businesses across a wide range of sectors seeking transparent pricing, mobile-first workflows and direct support. Texada may be a better fit for heavy equipment and plant hire businesses that require deep OEM integrations, dealer management functionality and enterprise-scale fleet operations.
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
                  Texada
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

        {/* Texada Fit */}
        <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-purple-900/30 p-7">
          <div className="mb-4 inline-block rounded-full border border-purple-500/20 bg-purple-900/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-400">
            Texada fit
          </div>
          <h3 className="mb-5 text-xl font-bold text-white">When Texada may be the better fit</h3>
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

      {/* ═══════════════ INDUSTRY FIT SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">
          Industry fit matters more than feature lists
        </h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          One of the most important questions when evaluating rental software is not what the platform can do, but which industries it was built for.
        </p>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          Texada is purpose-built for heavy equipment, construction, plant hire, aerial and lift, and equipment dealerships. Its OEM integrations with Caterpillar, John Deere and Bobcat are purpose-designed for businesses managing large capital assets and complex dealer relationships.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro is built for a broader range of hire industries, including tool hire, event hire, scaffolding, AV equipment, portable services and plant hire. If your business operates across multiple hire categories — or outside the heavy equipment sector — CloudRent Pro is likely the more natural fit.
        </p>

        {/* Industry Image */}
        <Image
          src="/images/comparison-cloudrent-vs-texada-industry.webp"
          alt="CloudRent Pro broad industry fit vs Texada heavy equipment focus"
          width={1200}
          height={500}
          className="my-6 w-full rounded-xl"
        />

        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> Businesses in heavy equipment and plant hire with OEM integration requirements should evaluate Texada carefully. Businesses across broader hire categories will find CloudRent Pro a more natural fit.
          </p>
        </div>
      </div>

      {/* ═══════════════ HISTORY SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">
          Two platforms with long histories, different paths
        </h2>
        <div className="rounded-2xl border border-purple-500/20 bg-purple-900/30 p-7">
          <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
            CloudRent Pro is not a new entrant to the rental software market. Its origins trace back to
            HireEzy, launched in 2004, before the platform evolved into CloudRent in 2017.
          </p>
          <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
            Texada was founded in 1984 and merged with InTempo in 2023 to form a combined platform targeting mid-market and enterprise equipment rental and dealership businesses.
          </p>
          <p className="m-0 text-[15px] leading-relaxed text-gray-300">
            Businesses evaluating CloudRent Pro benefit from more than 20 years of Australian hire industry experience, delivered through a modern cloud-native platform built for a broad range of hire sectors.
          </p>
        </div>
      </div>

      {/* ═══════════════ PRICING SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Pricing and transparency</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro publishes pricing publicly, making it straightforward to evaluate costs without entering a lengthy sales process.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          Texada uses quote-based pricing tailored to business size, industry and features required. Pricing is not publicly listed and requires a direct conversation with their sales team.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> Businesses prioritising budget certainty and transparent procurement will find CloudRent Pro easier to evaluate. Businesses with complex, multi-location requirements may find tailored pricing appropriate for their needs.
          </p>
        </div>
      </div>

      {/* ═══════════════ MOBILE SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Mobile experience</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          Texada offers a capable mobile app that allows field technicians to access work orders, update job details, capture digital signatures and document equipment conditions. The app supports offline access with automatic sync when reconnected, and includes voice-to-text for capturing technician notes in the field.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro is designed around mobile-first workflows for managers, dispatchers and field crews, with dedicated apps for different roles across the business.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> Both platforms deliver strong mobile capability. Texada&apos;s offline-first mobile experience and voice-to-text are strong features for heavy equipment field teams. CloudRent Pro&apos;s mobile workflows are designed to cover the full range of roles across a hire business.
          </p>
        </div>
      </div>

      {/* ═══════════════ CUSTOMER PORTAL SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Customer self-service</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro includes CloudRent Connect as part of its customer self-service experience, enabling customers to access bookings, contracts and account information online.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          Texada offers an online rental store that allows customers to browse equipment, check availability, make reservations and manage their account without coming into a branch.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> Both platforms support customer-facing digital workflows. The difference is primarily in how these capabilities are packaged and what hire sectors they are optimised for.
          </p>
        </div>
      </div>

      {/* ═══════════════ AI SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">AI-assisted rental workflows</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          Texada has launched AI damage detection as well as voice-to-text capabilities that allow field technicians to capture notes using their voice, with AI refining them into clear records.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          CloudRent Pro is developing and rolling out AI-assisted features including AI damage detection, support automation, inventory assistance and marketing content assistance — designed for practical, day-to-day hire operations across a broad range of sectors.
        </p>
        <div className="rounded-xl border border-purple-500/30 bg-purple-900/40 p-5">
          <p className="m-0 text-[15px] text-gray-200">
            <strong className="text-purple-300">Verdict:</strong> Both platforms are investing in AI. Texada&apos;s voice-to-text is a practical feature for heavy equipment field teams. CloudRent Pro&apos;s AI roadmap is focused on the full range of hire workflows rather than a single sector.
          </p>
        </div>
      </div>

      {/* ═══════════════ MIGRATION SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-4xl px-5 pb-14">
        <h2 className="mb-4 text-3xl font-bold text-white">Switching from Texada to CloudRent Pro</h2>
        <div className="rounded-2xl border border-purple-500/20 bg-purple-900/30 p-7">
          <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
            CloudRent Pro supports migration for eligible customers moving from another rental platform.
          </p>
          <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
            Migration scope depends on data availability and export options from your current platform. Typical transferable areas may include equipment records, customer records and pricing structures. Our team will assess what is available during your migration discussion.
          </p>

          {/* Migration Image */}
          <Image
            src="/images/comparison-cloudrent-vs-texada-migration.webp"
            alt="Migrating from Texada to CloudRent Pro"
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
            &quot;Texada&quot; is a trademark of its respective owner. This page is independent and is not
            affiliated with, sponsored by or endorsed by Texada Software.
          </p>
        </div>
      </div>
    </div>
  )
}
