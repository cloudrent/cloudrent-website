import { Users, Zap, Shield, Heart, Target, Award, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'About CloudRent Pro | Australian Rental Management Software',
  description:
    'Learn about CloudRent Pro - the Australian-built rental management platform designed specifically for equipment hire businesses.',
}

const values = [
  {
    icon: Zap,
    title: 'Speed Matters',
    description:
      "We ship fast. New features in weeks, not months. Bug fixes in hours, not days. If it's not here yet, we'll build it.",
  },
  {
    icon: Heart,
    title: 'Customer Obsessed',
    description:
      "Every feature we build comes from real customer feedback. You talk, we listen. It's that simple.",
  },
  {
    icon: Shield,
    title: 'Reliability First',
    description:
      'Your business depends on us. We take that seriously with 99.9% uptime, secure data centers, and regular backups.',
  },
  {
    icon: Target,
    title: 'Purpose Built',
    description:
      "We don't try to be everything to everyone. We focus exclusively on equipment hire businesses and do it exceptionally well.",
  },
]

const stats = [
  { value: '1000+', label: 'Equipment items managed daily' },
  { value: '24hr', label: 'Average support response' },
  { value: '99.9%', label: 'Platform uptime' },
  { value: '30 days', label: 'Free trial, no credit card' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
      </div>

      <div className="relative">
        {/* Hero */}
        <section className="px-4 pb-16 pt-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
              <Users className="h-4 w-4" />
              Built in Australia, for Australia
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              The rental software your
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                business deserves
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300">
              CloudRent Pro was born from a simple idea: equipment hire businesses deserve software that actually
              understands their industry. Not a generic tool adapted from something else, but purpose-built from the
              ground up.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="rounded-2xl border border-purple-500/20 bg-purple-900/20 p-8 md:p-12">
            <h2 className="mb-6 text-2xl font-bold">Our Story</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                We started CloudRent after seeing firsthand the frustration of hire businesses struggling with
                outdated software, disconnected spreadsheets, and manual processes that waste hours every day.
              </p>
              <p>
                The existing solutions were either too expensive, too complex, or designed for industries that work
                nothing like equipment rental. So we decided to build something better.
              </p>
              <p>
                Today, CloudRent Pro is a complete platform that handles everything from equipment tracking and
                reservations to invoicing, safety compliance, and mobile operations - all designed specifically for
                how Australian hire businesses actually work.
              </p>
              <p>
                We&apos;re not a massive corporation with layers of bureaucracy. We&apos;re a focused team that moves
                fast, listens to customers, and ships features that matter. When you contact us, you&apos;re talking
                to people who actually build the product.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">What We Stand For</h2>
            <p className="text-gray-400">The principles that guide everything we do</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-purple-500/20 bg-purple-900/20 p-8 transition-colors hover:border-purple-500/40"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-purple-500/20 p-3">
                    <Icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-xl border border-purple-500/20 bg-purple-900/20 p-6 text-center"
              >
                <div className="mb-1 text-3xl font-bold text-purple-400">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Australia */}
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-900/40 to-fuchsia-900/40 p-8 md:p-12">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-purple-500/20 p-3">
                <Award className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-bold">Built for Australian Business</h2>
                <div className="space-y-3 text-gray-300">
                  <p>
                    We&apos;re not a US company that bolted on GST as an afterthought. CloudRent Pro is designed from
                    the ground up for Australian hire businesses:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                      <span>ABN validation and tracking built-in</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                      <span>GST calculations and BAS-ready reporting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                      <span>SWMS and Australian WHS compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                      <span>Data stored in Australian data centers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                      <span>Support during Australian business hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                      <span>Native Xero integration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-900/60 to-fuchsia-900/60 p-8 text-center md:p-12">
            <h2 className="mb-4 text-3xl font-bold text-white">Ready to see it in action?</h2>
            <p className="mx-auto mb-8 max-w-xl text-gray-300">
              Start your 30-day free trial today. No credit card required, no obligation. Just the tools your hire
              business needs to thrive.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="https://app.cloudrent.me/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:from-purple-400 hover:to-fuchsia-400"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </a>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-400/50 px-8 py-4 font-semibold text-purple-100 transition-all hover:bg-purple-500/20"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
