'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, ChevronRight } from 'lucide-react'
import { appendUTMParams } from '@/utilities/appendUTMParams'

// ─── DATA ──────────────────────────────────────────────────────────────────────

const outcomesBenefits = [
  {
    title: 'No more double bookings',
    subtitle: 'Every job is accurate — every time',
    description:
      'Real-time availability checks mean gear is never promised twice. Conflicts are caught before they happen.',
  },
  {
    title: 'Invoices go out the same day',
    subtitle: 'Get paid faster, without the admin pile-up',
    description:
      'Generate invoices directly from completed jobs with one click. No more end-of-month catch-up.',
  },
  {
    title: 'Safety docs always accessible',
    subtitle: 'Ready for any audit, any time',
    description:
      'SWMS, pre-starts, and sign-offs stored against each job. Pull records in seconds when you need them.',
  },
  {
    title: 'Dispatch runs itself',
    subtitle: 'Drivers know where to go — automatically',
    description:
      'Jobs sync straight to the driver app with all the details they need. No more phone calls, no more confusion.',
  },
]

// Stats for homepage variant
const outcomesStatsWithNumbers = [
  { value: '87%', label: 'Fewer admin errors' },
  { value: '3.2×', label: 'Faster job processing' },
  { value: '100%', label: 'Audit-ready compliance tracking' },
]

// Unquantified outcomes for trial variant
const outcomesStatsUnquantified = [
  { value: '✓', label: 'Fewer admin errors' },
  { value: '✓', label: 'Faster job processing' },
  { value: '✓', label: 'Audit-ready compliance tracking' },
]

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export interface WhatChangesSectionProps {
  /**
   * 'homepage' - Shows quantified stats (87%, 3.2×, 100%)
   * 'trial' - Shows unquantified outcomes (checkmarks)
   */
  variant?: 'homepage' | 'trial'
}

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

export function WhatChangesSection({ variant = 'homepage' }: WhatChangesSectionProps) {
  const [signupUrl, setSignupUrl] = useState('https://app.cloudrent.me/register')

  useEffect(() => {
    setSignupUrl(appendUTMParams('https://app.cloudrent.me/register'))
  }, [])

  const isTrialVariant = variant === 'trial'
  const outcomesStats = isTrialVariant ? outcomesStatsUnquantified : outcomesStatsWithNumbers

  return (
    <section className="relative w-full overflow-hidden py-20">
      {/* Subtle gradient */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-32"
        style={{
          background: 'linear-gradient(to bottom, rgba(136,27,169,0.05) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        {/* Section Header */}
        <div className="mb-12">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
            What Changes
          </p>
          <h2 className="text-4xl font-black leading-tight text-white md:text-5xl">
            What Changes When
            <br />
            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
              You Make The Switch
            </span>
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid items-start gap-10 lg:grid-cols-2">
          {/* Left - Benefits List */}
          <div className="space-y-3">
            {outcomesBenefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-4 border-b border-white/[0.06] pb-3 last:border-0"
              >
                <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
                  <p className="mb-1 text-base font-semibold text-purple-500">{benefit.subtitle}</p>
                  <p className="text-sm leading-snug text-white/60">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Stats Card */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0e0f14] p-8">
            <div className="space-y-8">
              {outcomesStats.map((stat, i) => (
                <div key={i} className="text-center">
                  {isTrialVariant ? (
                    /* Trial variant: Checkmark with label */
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                        <CheckCircle className="h-10 w-10 text-green-400" />
                      </div>
                      <p className="text-xl font-bold text-white">{stat.label}</p>
                    </div>
                  ) : (
                    /* Homepage variant: Big numbers */
                    <>
                      <div className="mb-3 bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-7xl font-black text-transparent md:text-8xl">
                        {stat.value}
                      </div>
                      <p className="text-lg font-bold text-white/70">{stat.label}</p>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href={signupUrl}
              className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold text-white transition-all ${
                isTrialVariant
                  ? 'bg-brand-green hover:bg-brand-green/90 hover:shadow-[0_8px_32px_rgba(65,171,1,0.3)]'
                  : 'bg-purple-600 hover:bg-purple-500 hover:shadow-[0_8px_32px_rgba(136,27,169,0.4)]'
              }`}
            >
              Start {isTrialVariant ? 'your' : 'Your'} $1 First Month
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatChangesSection
