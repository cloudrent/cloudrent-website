'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  Check,
  TrendingDown,
  Calendar,
  Mail,
  Sparkles,
} from 'lucide-react'

// ============================================================================
// CLOUDRENT SCORECARD
// Quiz-style assessment for hire & rental businesses
// Flow: Landing → 11 Questions → Result with revenue leak calculation
// ============================================================================

// Types
interface QuestionOption {
  label: string
  value?: string | number
  score?: number
}

interface Question {
  id: string
  kind: 'context' | 'scored' | 'objection'
  pillar?: string
  question: string
  subtext?: string
  options: QuestionOption[]
}

interface Level {
  min: number
  num: number
  name: string
  blurb: string
}

interface ScorecardProps {
  variant: 'modal' | 'standalone'
  onClose?: () => void
}

// Constants
const PILLARS = [
  'Bookings & Quotes',
  'Invoicing & Cash',
  'Dispatch & Logistics',
  'Equipment & Damage',
  'Team & Compliance',
]

const QUESTIONS: Question[] = [
  // Context (unscored)
  {
    id: 'industry',
    kind: 'context',
    question: 'What kind of business do you run?',
    subtext: "We'll tailor your report to your industry.",
    options: [
      { label: 'Construction equipment', value: 'construction' },
      { label: 'Event & party', value: 'event' },
      { label: 'Tools', value: 'tool' },
      { label: 'Scaffolding & fencing', value: 'scaffold' },
      { label: 'AV & film', value: 'av' },
      { label: 'Something else', value: 'other' },
    ],
  },
  {
    id: 'revenue',
    kind: 'context',
    question: "What's your approximate monthly rental revenue?",
    subtext: 'Stays private. Used to estimate your leak in dollars.',
    options: [
      { label: 'Under $25k / month', value: 15000 },
      { label: '$25k – $50k / month', value: 35000 },
      { label: '$50k – $150k / month', value: 100000 },
      { label: '$150k – $500k / month', value: 325000 },
      { label: '$500k+ / month', value: 700000 },
    ],
  },
  // Scored questions
  {
    id: 'bookings',
    kind: 'scored',
    pillar: 'Bookings & Quotes',
    question: 'How do most of your bookings come in?',
    subtext: "Be honest — the average is messier than people admit.",
    options: [
      { label: 'Phone calls into a paper diary or whiteboard', score: 0 },
      { label: 'Phone + email, tracked in a spreadsheet', score: 4 },
      { label: 'Some online, some phone — into one system', score: 7 },
      { label: 'Online booking portal feeding our software directly', score: 10 },
    ],
  },
  {
    id: 'invoicing',
    kind: 'scored',
    pillar: 'Invoicing & Cash',
    question: 'How do you create and send invoices?',
    options: [
      { label: 'Word / Excel template, emailed manually', score: 0 },
      { label: 'Xero or MYOB, typed in from a job sheet', score: 4 },
      { label: 'Software generates them, we send manually', score: 7 },
      { label: 'Auto-generated on off-hire and emailed instantly', score: 10 },
    ],
  },
  {
    id: 'payments',
    kind: 'scored',
    pillar: 'Invoicing & Cash',
    question: 'How do customers pay you?',
    options: [
      { label: 'Bank transfer — we chase them by phone', score: 0 },
      { label: 'Bank transfer + occasional card over the phone', score: 4 },
      { label: 'Pay-now link on invoices (Stripe / similar)', score: 7 },
      { label: 'Card-on-file + auto-charge on agreed schedule', score: 10 },
    ],
  },
  {
    id: 'dispatch',
    kind: 'scored',
    pillar: 'Dispatch & Logistics',
    question: 'How do drivers know what to deliver and where?',
    options: [
      { label: 'Printed run sheet handed out in the morning', score: 0 },
      { label: 'SMS or WhatsApp messages through the day', score: 4 },
      { label: "Driver app with their day's jobs, manually assigned", score: 7 },
      { label: 'Driver app with route optimisation + live status', score: 10 },
    ],
  },
  {
    id: 'signatures',
    kind: 'scored',
    pillar: 'Dispatch & Logistics',
    question: 'How do you capture proof of delivery and rental agreements?',
    options: [
      { label: 'Paper docket signed and (sometimes) returned', score: 0 },
      { label: 'Photo of the signed paper docket, emailed back', score: 4 },
      { label: "Digital signature on driver's phone, no agreement", score: 7 },
      { label: 'Full digital agreement + signature + photos on-site', score: 10 },
    ],
  },
  {
    id: 'damage',
    kind: 'scored',
    pillar: 'Equipment & Damage',
    question: 'How is equipment condition captured on pickup / return?',
    options: [
      { label: 'We rely on memory and chase it after the fact', score: 0 },
      { label: 'Driver notes scribbled on the docket', score: 4 },
      { label: "Photos taken, stored on someone's phone", score: 7 },
      { label: 'Photos + condition checklist tied to the rental record', score: 10 },
    ],
  },
  {
    id: 'team',
    kind: 'scored',
    pillar: 'Team & Compliance',
    question: 'How do you run rosters and timesheets?',
    options: [
      { label: 'Texts, calls and a printed roster on the wall', score: 0 },
      { label: 'Excel roster, paper timesheets keyed in weekly', score: 4 },
      { label: 'Roster software, manual timesheet entry', score: 7 },
      { label: 'Clock in/out app feeding payroll directly', score: 10 },
    ],
  },
  {
    id: 'visibility',
    kind: 'scored',
    pillar: 'Equipment & Damage',
    question: 'Right now, can you tell me which assets are off-hire and available?',
    options: [
      { label: 'Not without ringing the yard or walking out there', score: 0 },
      { label: "Roughly — I'd check a spreadsheet or whiteboard", score: 4 },
      { label: "Yes — in our software, but it's not always current", score: 7 },
      { label: 'Yes — live, accurate, on my phone right now', score: 10 },
    ],
  },
  // Objection (unscored)
  {
    id: 'objection',
    kind: 'objection',
    question:
      'If you knew exactly how much this was costing you, what would still hold you back from switching to better software?',
    subtext: 'No wrong answer. Helps us tailor what we send you next.',
    options: [
      { label: "Too busy — we can't stop to migrate", value: 'busy' },
      { label: "The team won't adopt new software", value: 'adoption' },
      { label: "It'll be too complex for our setup", value: 'complexity' },
      { label: 'The price has to make sense', value: 'cost' },
      { label: "Honestly? Nothing — we're ready to move", value: 'ready' },
    ],
  },
]

const LEVELS: Level[] = [
  {
    min: 85,
    num: 5,
    name: 'Optimised Operator',
    blurb:
      "You're running a tight ship. The leaks left are small and worth fixing for the compounding effect.",
  },
  {
    min: 70,
    num: 4,
    name: 'Running Well',
    blurb:
      "Strong fundamentals. A few targeted upgrades and you'll be in the top tier of hire & rental operators globally.",
  },
  {
    min: 55,
    num: 3,
    name: 'Growing but Leaking',
    blurb:
      "You're growing the top line faster than the back office can keep up. That gap is where the money slips out.",
  },
  {
    min: 35,
    num: 2,
    name: 'Operational Drag',
    blurb:
      'Manual processes are quietly capping how big this business can get. Fix the foundations and the rest gets easier.',
  },
  {
    min: 0,
    num: 1,
    name: 'Running on Willpower',
    blurb:
      "You're holding the business together with grit and good memory. That works — until it doesn't.",
  },
]

const PILLAR_INSIGHTS: Record<string, string> = {
  'Bookings & Quotes':
    'Most leaks here come from double-bookings, lost enquiries, and quotes that never get followed up.',
  'Invoicing & Cash':
    "Late invoices and chased payments quietly add 10–20 days to your debtor days. That's working capital that should be yours.",
  'Dispatch & Logistics':
    'When drivers freelance the day, you lose trips, fuel, and the ability to slot in late jobs profitably.',
  'Equipment & Damage':
    "Uncharged damage and 'lost' assets compound. Operators with poor visibility typically write off 2–4% of fleet value yearly.",
  'Team & Compliance':
    'Manual rostering and paper timesheets create payroll leakage and SWMS gaps that bite when an audit lands.',
}

// Analytics helper
function trackEvent(eventName: string, data: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    ;(window as any).dataLayer.push({
      event: eventName,
      ...data,
    })
  }
}

// Scoring logic
function computeResult(answers: Record<string, QuestionOption>) {
  const scored = QUESTIONS.filter((q) => q.kind === 'scored')
  const scoredTotal = scored.reduce((s, q) => s + (answers[q.id]?.score ?? 0), 0)
  const maxScored = scored.length * 10
  const score = Math.round((scoredTotal / maxScored) * 100) || 0

  const pillarScores: Record<string, number> = {}
  PILLARS.forEach((p) => {
    const qs = scored.filter((q) => q.pillar === p)
    if (!qs.length) return
    const avg = qs.reduce((s, q) => s + (answers[q.id]?.score ?? 0), 0) / qs.length
    pillarScores[p] = Math.round(avg * 10) / 10
  })

  const entries = Object.entries(pillarScores)
  const weakest = entries.length ? entries.reduce((a, b) => (a[1] < b[1] ? a : b))[0] : null
  const strongest = entries.length ? entries.reduce((a, b) => (a[1] > b[1] ? a : b))[0] : null

  const revenue = (answers.revenue?.value as number) ?? 0
  const inefficiency = (100 - score) / 100
  const leakCeiling = 0.08
  const leakMonthly = Math.round(revenue * leakCeiling * inefficiency)
  const leakAnnual = leakMonthly * 12

  const level = LEVELS.find((l) => score >= l.min) ?? LEVELS[LEVELS.length - 1]

  return {
    score,
    level,
    leakMonthly,
    leakAnnual,
    pillarScores,
    weakest,
    strongest,
    industry: (answers.industry?.value as string) ?? 'other',
  }
}

function formatMoney(n: number): string {
  if (!n || isNaN(n)) return '$0'
  return '$' + Math.round(n).toLocaleString('en-AU')
}

function industryLabel(key: string): string {
  const map: Record<string, string> = {
    construction: 'construction & plant',
    event: 'event & party',
    tool: 'tool hire & rental',
    scaffold: 'scaffold & fencing',
    av: 'AV & film',
    other: 'hire & rental',
  }
  return map[key] || 'hire & rental'
}

// Main component
export function Scorecard({ variant, onClose: _onClose }: ScorecardProps) {
  const [stage, setStage] = useState<'landing' | 'quiz' | 'result'>('landing')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, QuestionOption>>({})
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  // Track open
  useEffect(() => {
    trackEvent('scorecard_open', { source: variant === 'modal' ? 'homepage_modal' : 'direct_url' })
  }, [variant])

  const result = useMemo(() => {
    if (stage !== 'result') return null
    return computeResult(answers)
  }, [stage, answers])

  const q = QUESTIONS[step]
  const total = QUESTIONS.length
  const progress = ((step + 1) / total) * 100

  function answer(option: QuestionOption) {
    setAnswers((a) => ({ ...a, [q.id]: option }))

    trackEvent('scorecard_question_answered', {
      question_id: q.id,
      question_index: step,
      source: variant === 'modal' ? 'homepage_modal' : 'direct_url',
    })

    if (step + 1 >= total) {
      setTimeout(() => {
        setStage('result')
        const resultData = computeResult({ ...answers, [q.id]: option })
        trackEvent('scorecard_completed', {
          score: resultData.score,
          level: resultData.level.num,
          leak_monthly: resultData.leakMonthly,
          weakest_pillar: resultData.weakest,
          source: variant === 'modal' ? 'homepage_modal' : 'direct_url',
        })
      }, 350)
    } else {
      setTimeout(() => setStep(step + 1), 200)
    }
  }

  function back() {
    if (step === 0) {
      setStage('landing')
    } else {
      setStep(step - 1)
    }
  }

  function startQuiz() {
    setStage('quiz')
    trackEvent('scorecard_start', { source: variant === 'modal' ? 'homepage_modal' : 'direct_url' })
  }

  function submitEmail() {
    if (email.includes('@')) {
      setEmailSubmitted(true)
      trackEvent('scorecard_email_submitted', {
        email,
        score: result?.score,
        leak_monthly: result?.leakMonthly,
        source: variant === 'modal' ? 'homepage_modal' : 'direct_url',
      })
    }
  }

  // Landing stage
  if (stage === 'landing') {
    return (
      <div className="mx-auto max-w-2xl px-6 py-12 text-center md:py-20">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 px-3 py-1 text-xs uppercase tracking-wider text-purple-400">
          <Sparkles className="h-3 w-3" />
          The Hire Business Scorecard
        </div>

        <h1 className="mb-6 text-4xl font-black leading-[1.05] text-white md:text-5xl lg:text-6xl">
          You&apos;re probably leaking{' '}
          <span className="text-orange-500">$1,800–$12,000 a month</span>. Find out how much.
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-lg text-white/70">
          A 2-minute scorecard for hire & rental operators. Honest questions, an honest score, and a
          dollar figure on what manual processes are costing you.
        </p>

        <button
          onClick={startQuiz}
          className="inline-flex items-center gap-2 rounded-full bg-brand-purple px-7 py-4 font-semibold text-white transition-all hover:bg-purple-600 hover:shadow-[0_0_40px_-10px_rgba(136,27,169,0.6)]"
        >
          Take the scorecard
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="mt-12 flex items-center justify-center gap-8 text-xs uppercase tracking-widest text-white/40">
          <span>10 questions</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>2 minutes</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>No login</span>
        </div>

        <p className="mt-16 text-sm text-white/40">
          — Ron Neville, Founder & CEO, CloudRent.
          <br />
          18 years in rental software. This is the scorecard I&apos;d give my own customers.
        </p>
      </div>
    )
  }

  // Quiz stage
  if (stage === 'quiz') {
    return (
      <div className="mx-auto max-w-2xl px-6 py-10">
        {/* Progress */}
        <div className="mb-10">
          <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-widest text-white/40">
            <span>
              {String(step + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <span>
              {q.kind === 'scored' ? q.pillar : q.kind === 'context' ? 'Context' : 'Last one'}
            </span>
          </div>
          <div className="relative h-px bg-white/10">
            <div
              className="absolute inset-y-0 left-0 bg-brand-purple transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h2 className="mb-3 text-2xl font-medium leading-tight text-white md:text-3xl lg:text-4xl">
          {q.question}
        </h2>
        {q.subtext && <p className="mb-8 text-white/50">{q.subtext}</p>}

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const selected = answers[q.id]?.label === opt.label
            return (
              <button
                key={i}
                onClick={() => answer(opt)}
                className={`w-full rounded-xl border px-5 py-4 text-left transition-all ${
                  selected
                    ? 'border-brand-purple bg-brand-purple/10 text-white'
                    : 'border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span>{opt.label}</span>
                  {selected ? (
                    <Check className="h-4 w-4 shrink-0 text-purple-400" />
                  ) : (
                    <span className="h-4 w-4 shrink-0 rounded-full border border-white/30" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-10">
          <button
            onClick={back}
            className="inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </div>
    )
  }

  // Result stage
  if (stage === 'result' && result) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Score block */}
        <div className="mb-12 text-center">
          <div className="mb-4 text-xs uppercase tracking-widest text-white/40">
            Your CloudRent Scorecard
          </div>
          <div className="mb-3 flex items-baseline justify-center gap-2">
            <span className="text-7xl font-semibold tabular-nums text-white md:text-8xl">
              {result.score}
            </span>
            <span className="text-2xl text-white/40">/ 100</span>
          </div>
          <h2 className="mb-3 text-2xl font-medium text-white md:text-3xl">
            Level {result.level.num}: {result.level.name}
          </h2>
          <p className="mx-auto max-w-xl text-white/50">{result.level.blurb}</p>
        </div>

        {/* Leak block */}
        <div className="mb-10 rounded-2xl border border-orange-500/25 bg-gradient-to-br from-orange-500/10 to-transparent p-8">
          <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-orange-500">
            <TrendingDown className="h-3 w-3" />
            Estimated revenue leak
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:items-end">
            <div className="flex-1">
              <div className="mb-1 text-4xl font-semibold tabular-nums text-orange-500 md:text-5xl">
                {formatMoney(result.leakMonthly)}
              </div>
              <div className="text-sm text-white/50">per month</div>
            </div>
            <div className="hidden h-12 w-px bg-white/10 md:block" />
            <div className="flex-1">
              <div className="mb-1 text-2xl font-semibold tabular-nums text-white/70 md:text-3xl">
                {formatMoney(result.leakAnnual)}
              </div>
              <div className="text-sm text-white/50">per year</div>
            </div>
          </div>
          <p className="mt-5 max-w-xl text-xs text-white/40">
            Based on industry studies of admin hours lost, unrecovered damage and late-fee charges,
            and debtor-day cash-flow cost across {industryLabel(result.industry)} operators.
          </p>
        </div>

        {/* Pillar breakdown */}
        <div className="mb-10">
          <h3 className="mb-5 text-xl font-medium text-white">
            Where you&apos;re strong, where you&apos;re leaking
          </h3>
          <div className="space-y-3">
            {PILLARS.map((p) => {
              const s = result.pillarScores[p]
              if (s === undefined) return null
              const pct = s * 10
              const isWeakest = p === result.weakest
              const isStrongest = p === result.strongest
              const barColor = isWeakest
                ? 'bg-orange-500'
                : isStrongest
                  ? 'bg-brand-green'
                  : 'bg-purple-400'
              const tagColor = isWeakest ? 'text-orange-500' : 'text-brand-green'
              return (
                <div key={p}>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/70">{p}</span>
                      {isWeakest && (
                        <span className={`text-[10px] uppercase tracking-widest ${tagColor}`}>
                          weakest
                        </span>
                      )}
                      {isStrongest && (
                        <span className={`text-[10px] uppercase tracking-widest ${tagColor}`}>
                          strongest
                        </span>
                      )}
                    </div>
                    <span className="text-sm tabular-nums text-white/40">{s.toFixed(1)} / 10</span>
                  </div>
                  <div className="relative h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`absolute inset-y-0 left-0 ${barColor}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          {result.weakest && (
            <p className="mt-5 text-sm leading-relaxed text-white/50">
              <span className="text-white/70">Your weakest pillar is {result.weakest}.</span>{' '}
              {PILLAR_INSIGHTS[result.weakest]}
            </p>
          )}
        </div>

        {/* CTAs */}
        <div className="space-y-4">
          {/* Email gate */}
          {!emailSubmitted ? (
            <div className="rounded-2xl border border-brand-purple/30 bg-brand-purple/10 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-400" />
                <h4 className="font-semibold text-white">Get the detailed pillar report</h4>
              </div>
              <p className="mb-4 text-sm text-white/70">
                Industry benchmark, top 3 fixes for your weakest pillar, and a one-pager you can
                share with your team.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourbusiness.com.au"
                  className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-brand-purple focus:outline-none"
                />
                <button
                  onClick={submitEmail}
                  className="whitespace-nowrap rounded-lg bg-brand-purple px-5 py-3 font-semibold text-white transition-colors hover:bg-purple-600"
                >
                  Email me the report
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-2xl border border-brand-green/40 bg-brand-green/10 p-5">
              <Check className="h-5 w-5 text-brand-green" />
              <p className="text-sm text-white/80">
                Sent. Check your inbox in the next minute or two.
              </p>
            </div>
          )}

          <Link
            href="/demo"
            className="block rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/20 hover:bg-white/10"
          >
            <div className="mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-white/70" />
              <h4 className="font-semibold text-white">Book a 30-min walkthrough with Ron</h4>
            </div>
            <p className="text-sm text-white/50">
              Bring your score. We&apos;ll go through your weakest pillar live and map a fix.
            </p>
          </Link>

          <a
            href="https://app.cloudrent.me/register"
            onClick={() =>
              trackEvent('scorecard_cta_clicked', {
                cta_type: 'trial',
                score: result.score,
                source: variant === 'modal' ? 'homepage_modal' : 'direct_url',
              })
            }
            className="block pt-2 text-center text-sm text-white/40 underline underline-offset-4 transition-colors hover:text-white/60"
          >
            Or start a $1 trial of CloudRent Pro
          </a>
        </div>
      </div>
    )
  }

  return null
}

export default Scorecard
