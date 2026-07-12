'use client'

import {
  CalendarX2,
  PhoneCall,
  Flame,
  Receipt,
  ClipboardList,
  EyeOff,
  type LucideIcon,
} from 'lucide-react'

interface ProblemCard {
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
}

const problemCards: ProblemCard[] = [
  {
    icon: CalendarX2,
    title: 'Double Bookings',
    subtitle: 'Double bookings that cost you revenue and credibility',
    description:
      "The same piece of equipment gets promised twice. Now you're scrambling, calling customers back, refunding jobs, and damaging trust.",
  },
  {
    icon: PhoneCall,
    title: 'Constant Phone Calls',
    subtitle: "Your phone never stops and nothing gets done",
    description:
      "Staff call for updates. Customers chase availability. You're stuck answering questions all day instead of actually running the business.",
  },
  {
    icon: Flame,
    title: 'Dispatch Chaos',
    subtitle: 'Every day starts in chaos and only gets worse',
    description:
      'Whiteboards, last-minute changes, missing details. Drivers leave without the right info and jobs go wrong before they even begin.',
  },
  {
    icon: Receipt,
    title: 'Delayed Invoices',
    subtitle: "You've done the work but you're still not getting paid",
    description:
      'Jobs are complete, but invoices sit in a pile. Days pass. Cash flow slows. Revenue delayed is growth delayed.',
  },
  {
    icon: ClipboardList,
    title: 'Scattered Safety Records',
    subtitle: 'When something goes wrong you have nothing to prove',
    description:
      "Safety docs are everywhere: emails, paper, notebooks. When an incident happens, you're scrambling to piece it together.",
  },
  {
    icon: EyeOff,
    title: 'No Business Visibility',
    subtitle: "You're running your business blind",
    description:
      "You don't know where equipment is, which jobs are late, or who hasn't paid. Problems surface too late.",
  },
]

/**
 * Displays the six problem cards section.
 * Reused on homepage and landing pages.
 */
export function ProblemCardsSection() {
  return (
    <section className="relative w-full overflow-hidden py-20">
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-32"
        style={{
          background: 'linear-gradient(to bottom, rgba(136,27,169,0.05) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
            The Reality
          </p>
          <h2 className="text-4xl font-black leading-tight text-white md:text-5xl">
            Running a hire business
            <br />
            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
              shouldn&apos;t feel like this
            </span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problemCards.map((card, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 0%, rgba(136,27,169,0.15) 0%, transparent 70%)',
                }}
              />
              <div className="relative z-10">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-500/15">
                  <card.icon className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="mb-1 text-lg font-extrabold uppercase text-white">{card.title}</h3>
                <p className="mb-2 text-sm font-bold leading-snug text-white/80">{card.subtitle}</p>
                <p className="text-sm leading-snug text-white/60">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemCardsSection
