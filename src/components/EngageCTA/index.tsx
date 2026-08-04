'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Rocket, BarChart2, Eye, ArrowRight } from 'lucide-react'

interface CTACard {
  icon: React.ElementType
  label: string
  title: string
  description: string
  buttonLabel: string
  href: string
  isPrimary?: boolean
}

const ctaCards: CTACard[] = [
  {
    icon: Calendar,
    label: 'Guided',
    title: 'Book a demo',
    description: 'See CloudRent Pro in action with a 20-minute personalised walkthrough.',
    buttonLabel: 'Book now',
    href: '/demo/',
    isPrimary: true,
  },
  {
    icon: Rocket,
    label: 'Self-serve',
    title: 'Start $1 first month',
    description: 'Full access for 30 days. No lock-in. Cancel anytime.',
    buttonLabel: 'Start trial',
    href: 'https://app.cloudrent.me/register',
  },
  {
    icon: BarChart2,
    label: 'Free tool',
    title: 'Revenue scorecard',
    description: 'Score your hire business across 5 key growth areas in 2 minutes.',
    buttonLabel: 'Take the scorecard',
    href: '/scorecard/',
  },
  {
    icon: Eye,
    label: 'Free tool',
    title: 'AI visibility check',
    description: 'Find out if AI assistants can find your hire business online.',
    buttonLabel: 'Check visibility',
    href: '/ai-check/',
  },
]

export function EngageCTA() {
  return (
    <div className="rounded-2xl bg-[#0f0a1a] p-8 md:p-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">
          Not sure where to start?
        </h2>
        <p className="text-white/55">
          Four ways to explore CloudRent Pro - pick what suits you.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ctaCards.map((card) => {
          const Icon = card.icon
          const isExternal = card.href.startsWith('http')
          const CardWrapper = isExternal ? 'a' : Link

          return (
            <div
              key={card.title}
              className={`flex flex-col rounded-xl border p-5 ${
                card.isPrimary
                  ? 'border-[#881ba9] bg-[#881ba9]'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {/* Icon */}
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/[0.12]">
                <Icon className="h-5 w-5 text-white" />
              </div>

              {/* Label */}
              <span className="mb-1 text-[11px] font-medium uppercase tracking-wide text-white/45">
                {card.label}
              </span>

              {/* Title */}
              <h3 className="mb-2 text-[15px] font-medium text-white">
                {card.title}
              </h3>

              {/* Description */}
              <p className="mb-4 flex-1 text-[13px] leading-relaxed text-white/50">
                {card.description}
              </p>

              {/* Button */}
              <CardWrapper
                href={card.href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium transition-all ${
                  card.isPrimary
                    ? 'bg-white text-[#881ba9] hover:bg-white/90'
                    : 'border border-white/20 text-white hover:bg-white/10'
                }`}
              >
                {card.buttonLabel}
                <ArrowRight className="h-3.5 w-3.5" />
              </CardWrapper>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <p className="mt-6 text-center text-[13px] text-white/40">
        No credit card required for free tools · $1 to start your first month
      </p>

      {/* Ecosystem Graphic */}
      <div className="mt-10 flex justify-center">
        <Image
          src="/images/CloudRent-Rental-Ecosystem.webp"
          alt="CloudRent ecosystem - Pro, Connect, Crew, Command, and Reach products"
          width={900}
          height={500}
          className="w-full max-w-3xl"
        />
      </div>
    </div>
  )
}
