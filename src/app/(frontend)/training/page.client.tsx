'use client'

import Link from 'next/link'
import { GraduationCap, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { BookingWidget } from '@/components/Booking/BookingWidget'

export default function TrainingPageClient() {
  const benefits = [
    'Hands-on walkthrough tailored to your business',
    'Get answers to your specific feature questions',
    'Learn advanced workflows and shortcuts',
    'Bring your team — train multiple users at once',
    'Included with your subscription — no charge',
  ]

  return (
    <div className="min-h-screen text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
      </div>

      <div className="relative">
        {/* Hero */}
        <section className="px-4 pb-12 pt-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
              <GraduationCap className="h-4 w-4" />
              Personalised 1-on-1 training
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              Book a{' '}
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Training Session
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Get hands-on help with CloudRent Pro. Whether you&apos;re onboarding new team members or mastering advanced features, we&apos;re here to help.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left - Benefits */}
            <div className="space-y-8">
              <div className="rounded-2xl border border-purple-500/20 bg-purple-900/20 p-8">
                <h2 className="mb-6 text-2xl font-bold">What to expect</h2>
                <ul className="space-y-4">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-purple-500/20 bg-purple-900/20 p-6 text-center">
                  <Clock className="mx-auto mb-3 h-8 w-8 text-purple-400" />
                  <p className="font-semibold text-white">30 Minutes</p>
                  <p className="text-sm text-purple-300">Focused session</p>
                </div>
                <div className="rounded-xl border border-purple-500/20 bg-purple-900/20 p-6 text-center">
                  <Users className="mx-auto mb-3 h-8 w-8 text-purple-400" />
                  <p className="font-semibold text-white">1-on-1 Session</p>
                  <p className="text-sm text-purple-300">With a product expert</p>
                </div>
              </div>

              {/* Alternative CTA */}
              {/* TODO: confirm CTA with Ron — placeholder for now */}
              <div className="rounded-2xl border border-purple-500/20 bg-purple-950/50 p-6">
                <h3 className="mb-2 font-semibold text-white">Prefer to explore on your own?</h3>
                <p className="mb-4 text-sm text-gray-400">
                  Browse our documentation and video tutorials in the Help Center.
                </p>
                <Link
                  href="/help"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
                >
                  Browse Help Center <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right - Booking Widget */}
            <div>
              <BookingWidget eventTypeSlug="training" theme="dark" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
