'use client'

import Link from 'next/link'
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  AlertTriangle,
  Calendar,
  FileText,
  History,
  Zap,
  Shield,
  BarChart3,
  RefreshCw,
} from 'lucide-react'

const problems = [
  {
    icon: AlertTriangle,
    title: 'Double bookings',
    description:
      'Two staff members book the same item for the same date with no system to prevent it. The customer finds out on delivery day.',
  },
  {
    icon: Calendar,
    title: 'No live availability',
    description:
      "Someone has to manually check a spreadsheet and hope it is up to date. It usually isn't.",
  },
  {
    icon: FileText,
    title: 'Invoices get missed',
    description:
      'Jobs close and billing doesn\'t happen because there is no automatic link between the booking and the invoice.',
  },
  {
    icon: History,
    title: 'No audit trail',
    description:
      'When something goes wrong, you have no reliable record of what was booked, by whom, and when.',
  },
]

const comparisonRows = [
  { feature: 'Real-time availability', spreadsheets: false, cloudrent: true },
  { feature: 'Double booking prevention', spreadsheets: false, cloudrent: true },
  { feature: 'Automated invoicing', spreadsheets: false, cloudrent: true },
  { feature: 'Digital contracts', spreadsheets: false, cloudrent: true },
  { feature: 'Dispatch management', spreadsheets: false, cloudrent: true },
  { feature: 'Customer portal', spreadsheets: false, cloudrent: true },
  { feature: 'Xero integration', spreadsheets: false, cloudrent: true },
  { feature: 'Mobile app for drivers', spreadsheets: false, cloudrent: true },
  { feature: 'Inventory tracking', spreadsheets: 'Manual', cloudrent: 'Automatic' },
  { feature: 'Reporting', spreadsheets: 'Manual', cloudrent: 'Automatic' },
]

const benefits = [
  {
    icon: RefreshCw,
    title: 'Live availability',
    description:
      'Every booking updates stock in real time. No spreadsheet to maintain, no guessing.',
  },
  {
    icon: Shield,
    title: 'Zero double bookings',
    description:
      'The system prevents conflicts at the point of booking. No manual checking required.',
  },
  {
    icon: Zap,
    title: 'Automatic invoicing',
    description:
      'When a hire ends, the invoice is generated. Sync with Xero keeps your accounts current.',
  },
  {
    icon: BarChart3,
    title: 'Full audit trail',
    description:
      'Every booking, change, and communication is recorded. You always know what happened.',
  },
]

const faqs = [
  {
    question: 'Is CloudRent hard to switch to from spreadsheets?',
    answer:
      'Our team handles data migration and onboarding. Most businesses are fully operational within a week.',
  },
  {
    question: 'Will my staff need a lot of training?',
    answer:
      'CloudRent is designed to be intuitive. Most staff are confident after one guided session.',
  },
  {
    question: 'What if my hire business is small?',
    answer:
      "CloudRent is built for growing hire businesses. You don't need to be large to benefit from proper software.",
  },
  {
    question: 'Does CloudRent replace my accounting software?',
    answer:
      'No. CloudRent integrates with Xero so your invoicing and accounts stay in sync automatically.',
  },
]

export default function CloudRentVsSpreadsheetsClient() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(136,27,169,0.15) 0%, transparent 60%)',
          }}
        />

        <div className="container relative z-10 mx-auto max-w-4xl px-5 text-center">
          <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
            CloudRent vs Spreadsheets:{' '}
            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
              Why Hire Businesses Switch
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-white/60 md:text-xl">
            Spreadsheets work until they don&apos;t. For small hire operations they seem fine, but
            as you add staff, stock, and customers the cracks appear fast. Double bookings, missed
            invoices, and zero visibility are not software problems — they are spreadsheet problems.
          </p>
        </div>
      </section>

      {/* PROBLEMS SECTION */}
      <section className="border-y border-white/[0.08] bg-white/[0.02] py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-red-400">
              The Problem
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl">
              What breaks with spreadsheets
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {problems.map((problem, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/15">
                  <problem.icon className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{problem.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              Feature Comparison
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl">
              Side-by-side comparison
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.04]">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white/60">
                    Spreadsheets
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-purple-400">
                    CloudRent
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-white/[0.04] ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                  >
                    <td className="px-6 py-4 text-sm text-white">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.spreadsheets === 'boolean' ? (
                        row.spreadsheets ? (
                          <CheckCircle className="mx-auto h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="mx-auto h-5 w-5 text-red-400" />
                        )
                      ) : (
                        <span className="text-sm text-white/50">{row.spreadsheets}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.cloudrent === 'boolean' ? (
                        row.cloudrent ? (
                          <CheckCircle className="mx-auto h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="mx-auto h-5 w-5 text-red-400" />
                        )
                      ) : (
                        <span className="text-sm text-purple-400">{row.cloudrent}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="border-y border-white/[0.08] bg-white/[0.02] py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              The Solution
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl">
              What you get with CloudRent
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.08] bg-[#08080c] p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15">
                  <benefit.icon className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              FAQ
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl">
              Common questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <h3 className="mb-2 text-lg font-semibold text-white">{faq.question}</h3>
                <p className="text-white/60">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-white/[0.08] py-20 md:py-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(136,27,169,0.1) 0%, transparent 60%)',
          }}
        />

        <div className="container relative z-10 mx-auto max-w-3xl px-5 text-center">
          <h2 className="mb-4 text-3xl font-black text-white md:text-4xl lg:text-5xl">
            Ready to leave the{' '}
            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
              spreadsheet behind?
            </span>
          </h2>

          <p className="mx-auto mb-8 max-w-xl text-lg text-white/60">
            30-day free trial. No credit card required. Local onboarding support included.
          </p>

          <Link
            href="/demo/"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-purple-500 hover:shadow-[0_8px_32px_rgba(136,27,169,0.4)]"
          >
            Book a demo
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  )
}
