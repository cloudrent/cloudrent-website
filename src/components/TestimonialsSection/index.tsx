'use client'

import Image from 'next/image'
import { Star, Shield, Zap, CheckCircle } from 'lucide-react'
import { GoogleReviews } from '@/components/GoogleReviews'

// ─── DATA ──────────────────────────────────────────────────────────────────────

const testimonials = [
  {
    headline: 'We can now run our entire rental business from anywhere.',
    quote:
      "Managing inventory across multiple locations used to be a nightmare. Now I can see exactly what's available, what's out, and what needs servicing — from my phone.",
    closing: 'Finally, one platform that does it all.',
    author: 'Cameron Drake-Brockman',
    company: 'HireRite Temporary Fence',
    image: '/images/testimonials/Cam.png',
    initials: 'CD',
  },
  {
    headline: 'The speed of quoting has completely changed our conversion rate.',
    quote:
      'Our quotes used to take hours to put together. Now we send them in minutes while still on site. Customers are impressed, and we close more deals.',
    closing: 'Game-changer for our sales process.',
    author: 'Theo Tsorvas',
    company: 'Consolidated Group',
    image: '/images/testimonials/Theo.png',
    initials: 'TT',
  },
  {
    headline: 'Safety compliance is no longer a scramble.',
    quote:
      "Before CloudRent, finding SWMS docs or pre-starts was a nightmare. Now everything's attached to the job. Auditors are impressed, and I sleep better at night.",
    closing: 'Finally have peace of mind on compliance.',
    author: 'David Duncalfe',
    company: 'Excel Events',
    image: '/images/testimonials/David.png',
    initials: 'DD',
  },
]

// Trust badges for homepage
const trustBadgesHomepage = [
  { icon: Shield, label: '30-Day Money Back', sublabel: 'No questions asked', isAustralian: false },
  {
    icon: null,
    label: 'Australian Built',
    sublabel: 'Gold Coast-based team',
    isAustralian: true,
  },
  { icon: Zap, label: 'Free Migration', sublabel: "We'll move your data", isAustralian: false },
]

// Trust badges for trial (no "30-Day Money Back", reworded migration)
const trustBadgesTrial = [
  {
    icon: null,
    label: 'Australian Built',
    sublabel: 'Gold Coast-based team',
    isAustralian: true,
  },
  {
    icon: Zap,
    label: 'Migration included',
    sublabel: "We'll move your data",
    isAustralian: false,
  },
]

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export interface TestimonialsSectionProps {
  /**
   * 'homepage' - Shows all three trust badges including "30-Day Money Back" and "Free Migration"
   * 'trial' - Removes "30-Day Money Back", rewords "Free Migration" to "Migration included"
   */
  variant?: 'homepage' | 'trial'
}

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

export function TestimonialsSection({ variant = 'homepage' }: TestimonialsSectionProps) {
  const isTrialVariant = variant === 'trial'
  const trustBadges = isTrialVariant ? trustBadgesTrial : trustBadgesHomepage

  return (
    <section className="relative w-full py-20">
      <div className="mx-auto max-w-6xl px-5">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-green-400">
              Real Results From Real Operators
            </span>
          </div>
          <h2 className="mb-4 text-4xl font-black leading-tight text-white md:text-5xl">
            Trusted by Hire Businesses{' '}
            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
              That Run Smarter
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            See how companies like yours are simplifying operations, reducing errors, and gaining
            full control with CloudRent Pro.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="mb-16 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.06]"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Headline */}
              <h3 className="mb-3 text-lg font-bold text-white">&ldquo;{t.headline}&rdquo;</h3>

              {/* Quote */}
              <p className="mb-3 text-sm leading-snug text-white/60">{t.quote}</p>

              {/* Closing */}
              <p className="mb-4 flex-grow text-sm font-medium text-purple-500">
                👉 {t.closing}
              </p>

              {/* Author */}
              <div className="mt-auto flex items-center gap-4 border-t border-white/[0.08] pt-4">
                {t.image ? (
                  <Image
                    src={t.image}
                    alt={t.author}
                    width={56}
                    height={56}
                    loading="lazy"
                    className="h-14 w-14 rounded-full border-2 border-purple-500/30 object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/20">
                    <span className="text-lg font-semibold text-purple-500">{t.initials}</span>
                  </div>
                )}
                <div>
                  <div className="text-sm font-semibold text-white">{t.author}</div>
                  <div className="text-xs text-white/40">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Carousel */}
        <GoogleReviews />

        {/* Trust Badges */}
        <div
          className={`mx-auto grid max-w-4xl gap-4 ${isTrialVariant ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}
        >
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 rounded-xl border bg-white/[0.03] p-4 ${
                badge.isAustralian
                  ? 'border-green-500/30 bg-green-500/[0.03]'
                  : 'border-white/[0.08]'
              }`}
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-500/15">
                {badge.isAustralian ? (
                  <span className="text-2xl">🇦🇺</span>
                ) : badge.icon ? (
                  <badge.icon className="h-6 w-6 text-green-400" />
                ) : null}
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  {badge.label}
                  {badge.isAustralian && <CheckCircle className="h-4 w-4 text-green-400" />}
                </div>
                <div className="text-xs text-white/40">{badge.sublabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
