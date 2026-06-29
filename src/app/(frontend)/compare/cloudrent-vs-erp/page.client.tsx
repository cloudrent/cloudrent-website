'use client'

import Link from 'next/link'
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  AlertTriangle,
  Clock,
  DollarSign,
  Settings,
  Zap,
  Calendar,
  Truck,
  Camera,
  Headphones,
} from 'lucide-react'

const problems = [
  {
    icon: Settings,
    title: 'Not built for hire workflows',
    description:
      'ERP systems handle sales orders and inventory, but not hire-specific concepts like off-hire, availability by date, asset tracking across jobs, or damage capture.',
  },
  {
    icon: DollarSign,
    title: 'Expensive to customise',
    description:
      'Getting an ERP to work like hire software requires consultants, custom modules, and ongoing maintenance. The cost adds up fast.',
  },
  {
    icon: Clock,
    title: 'Long implementation',
    description:
      "ERP rollouts take months. Hire businesses can't afford to operate in parallel systems for that long.",
  },
  {
    icon: AlertTriangle,
    title: 'Overkill for hire operations',
    description:
      "Most ERP features are irrelevant to hire businesses. You pay for complexity you don't need.",
  },
]

const comparisonRows = [
  { feature: 'Built for hire workflows', erp: false, cloudrent: true },
  { feature: 'Date-based availability', erp: 'Requires customisation', cloudrent: 'Native' },
  { feature: 'Off-hire management', erp: 'Requires customisation', cloudrent: 'Native' },
  { feature: 'Asset tracking per job', erp: 'Requires customisation', cloudrent: 'Native' },
  { feature: 'Damage capture', erp: false, cloudrent: true },
  { feature: 'Driver mobile app', erp: false, cloudrent: true },
  { feature: 'Customer hire portal', erp: false, cloudrent: true },
  { feature: 'Implementation time', erp: 'Months', cloudrent: 'Days' },
  { feature: 'Xero integration', erp: 'Varies', cloudrent: 'Built-in' },
  { feature: 'Australian support', erp: 'Varies', cloudrent: true },
]

const benefits = [
  {
    icon: Calendar,
    title: 'Purpose-built for hire',
    description:
      'Every feature in CloudRent exists because hire businesses need it. No customisation required.',
  },
  {
    icon: Zap,
    title: 'Fast to implement',
    description:
      'Most hire businesses are operational within days, not months. Our team handles onboarding.',
  },
  {
    icon: DollarSign,
    title: 'No consultant costs',
    description:
      "CloudRent works out of the box. You don't need an implementation partner to make it function.",
  },
  {
    icon: Truck,
    title: 'Hire-specific workflows',
    description:
      'Off-hire, availability tracking, dispatch, damage capture, and asset history are native features, not add-ons.',
  },
]

const faqs = [
  {
    question: 'Can CloudRent handle the complexity of a large hire operation?',
    answer:
      'Yes. CloudRent is used by hire businesses managing hundreds of assets across multiple locations.',
  },
  {
    question: 'What if we are already using an ERP for accounting?',
    answer:
      'CloudRent integrates with Xero. Your accounts team can keep using their existing system.',
  },
  {
    question: 'How long does it take to get set up?',
    answer:
      'Most businesses are operational within a few days. Our team handles migration and onboarding.',
  },
  {
    question: 'Is CloudRent suitable if we hire a wide range of equipment types?',
    answer:
      'Yes. CloudRent supports any hire category — plant, tools, event, fencing, toilets, and more.',
  },
]

export default function CloudRentVsErpClient() {
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
            CloudRent vs{' '}
            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
              Generic ERP Systems
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-white/60 md:text-xl">
            ERP systems are built to handle everything for every business. That sounds like an
            advantage until you try to run hire-specific workflows through one. Availability
            tracking, off-hire management, asset tracking, and dispatch are not standard ERP
            features. They require expensive customisation, long implementation timelines, and
            ongoing consultant costs.
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
              Where generic ERP falls short
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
                    Generic ERP
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
                      {typeof row.erp === 'boolean' ? (
                        row.erp ? (
                          <CheckCircle className="mx-auto h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="mx-auto h-5 w-5 text-red-400" />
                        )
                      ) : (
                        <span className="text-sm text-white/50">{row.erp}</span>
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
              Why CloudRent fits hire businesses better
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
            Purpose-built hire software beats a{' '}
            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
              customised ERP every time
            </span>
          </h2>

          <p className="mx-auto mb-8 max-w-xl text-lg text-white/60">
            Book a demo and see how CloudRent handles your specific hire workflows.
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
