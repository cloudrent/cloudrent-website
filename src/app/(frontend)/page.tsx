import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { CheckCircle, FileSignature, CreditCard, RefreshCw, Clock, Bug, Users, Shield, Star, Phone, Award, ArrowRight, Zap } from 'lucide-react'
import { SoftwareSchema } from '@/components/StructuredData'
import { ImmersiveHero } from '@/heros/ImmersiveHero'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { LightboxImage } from '@/components/Lightbox'

// Enable ISR - regenerate page every hour
export const revalidate = 3600

// SEO metadata
export const metadata: Metadata = {
  title: 'CloudRent Pro – Rental Management Software Australia',
  description: 'Rental management software with real-time availability, invoicing, digital signatures, and Xero integration. Built in Australia for hire businesses.',
  keywords: ['rental software', 'hire business', 'equipment rental', 'rental management', 'Australia', 'Xero integration'],
  alternates: {
    canonical: 'https://www.cloudrent.me/',
  },
  openGraph: mergeOpenGraph({
    title: 'CloudRent Pro – Rental Management Software Australia',
    description: 'Rental management software with real-time availability, invoicing, digital signatures, and Xero integration. Built in Australia for hire businesses.',
    url: '/',
  }),
}

// Features
const features = [
  {
    icon: CheckCircle,
    title: 'Real-Time Availability',
    description: 'See what\'s available instantly. Prevent double-bookings with live stock updates across all locations.',
  },
  {
    icon: CreditCard,
    title: 'One-Click Invoicing',
    description: 'Generate professional invoices in seconds. Accept payments via Stripe, track overdue accounts automatically.',
  },
  {
    icon: FileSignature,
    title: 'Digital Signatures',
    description: 'Rental agreements, delivery dockets, SWMS—all signed electronically. Legally compliant and paperless.',
  },
  {
    icon: RefreshCw,
    title: 'Xero Integration',
    description: 'Two-way sync with Xero. Invoices, payments, and contacts flow automatically. No double entry.',
  },
]

// Speed metrics
const speedMetrics = [
  { icon: Clock, value: '2-4 weeks', label: 'Average feature delivery' },
  { icon: Bug, value: '24hr', label: 'Bug fix turnaround' },
  { icon: Users, value: 'Direct', label: 'Access to developers' },
]

// Social proof stats
const socialProofStats = [
  { value: '100%', label: 'Australian Built & Owned' },
  { value: '100,000+', label: 'Rentals Processed' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.5/5', label: 'Google Rating' },
]

// Customer testimonials
const testimonials = [
  {
    quote: "Finally, a rental software system that uses the latest technology so we can access our database from anywhere on mobile and desktop. CloudRent is much more than just an invoicing and logistics tool - it simplifies deliveries and collections for us with its easy-to-navigate interface! I love how Xero accounting integrates with CloudRent.",
    author: 'Cameron Drake-Brockman',
    company: 'HireRite Temporary Fence',
    image: '/images/testimonials/Cam.png',
    initials: 'CD',
  },
  {
    quote: "Consolidated joined CloudRent so that we could consolidate our business needs in all aspects of management in the civil, mining and transportation sectors. CloudRent is understanding our needs and building an onboarding, training and safety management system to manage workflow, maintenance and job details.",
    author: 'Theo Tsorvas',
    company: 'Consolidated Group',
    image: '/images/testimonials/Theo.png',
    initials: 'TT',
  },
  {
    quote: "Sub rentals and inventory management has always been an issue in other software we have used. The guys at CloudRent are always there for you. When my team needs support, they're quick to help with any issue promptly! We have been adding input to the latest version and believe it's the best rental software on the market!",
    author: 'David Duncalfe',
    company: 'Excel Events',
    image: '/images/testimonials/David.png',
    initials: 'DD',
  },
]

// Trust badges
const trustBadges = [
  { icon: Shield, label: '30-Day Money Back', sublabel: 'No questions asked' },
  { icon: Award, label: 'Australian Built', sublabel: 'Local support team' },
  { icon: Zap, label: 'Free Migration', sublabel: "We'll move your data" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SoftwareSchema />

      {/* Immersive Dashboard Hero */}
      <ImmersiveHero />

      {/* Social Proof Stats Bar */}
      <section className="relative z-10 w-full border-y border-white/10 bg-gradient-to-r from-brand-purple/10 via-transparent to-brand-purple/10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {socialProofStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Built for how you{' '}
            <span className="bg-gradient-to-r from-brand-purple via-purple-400 to-blue-400 bg-clip-text text-transparent">
              actually work
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Not another generic tool. CloudRent Pro is designed specifically for Australian equipment hire businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-purple/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* All Devices Screenshot */}
        <div className="mt-16">
          <LightboxImage
            src="https://ipjpelt6tqi5wdno.public.blob.vercel-storage.com/cloudrent-rental-software-all-devices.webp"
            alt="CloudRent Pro rental software running on desktop, laptop, tablet and mobile devices"
            className="w-full rounded-2xl shadow-2xl shadow-purple-900/20"
          />
        </div>
      </section>

      {/* Platform Coverage Section */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            We cover{' '}
            <span className="bg-gradient-to-r from-brand-purple via-purple-400 to-blue-400 bg-clip-text text-transparent">
              every area
            </span>{' '}
            of your world
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From our fully cloud web app for the office, to our mobile app for the field, to your 24/7 customer portal — we&apos;ve got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Web App */}
          <Link
            href="/features"
            className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center mb-6 mx-auto shadow-lg shadow-purple-500/30">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Web App</h3>
              <p className="text-muted-foreground mb-4">
                Full-featured cloud platform for your office. Manage bookings, invoicing, customers, and more from any browser.
              </p>
              <span className="inline-flex items-center gap-2 text-purple-400 font-medium group-hover:text-purple-300">
                Explore Features
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Mobile App */}
          <Link
            href="/mobile-app"
            className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 mx-auto shadow-lg shadow-blue-500/30">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Mobile App</h3>
              <p className="text-muted-foreground mb-4">
                Take CloudRent to the field. Offline sync, barcode scanning, digital signatures, and push notifications.
              </p>
              <span className="inline-flex items-center gap-2 text-blue-400 font-medium group-hover:text-blue-300">
                Learn More
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Customer Portal */}
          <Link
            href="/web-portal"
            className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 mx-auto shadow-lg shadow-emerald-500/30">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Customer Portal</h3>
              <p className="text-muted-foreground mb-4">
                24/7 self-service for your customers. Online bookings, rental history, invoices, and document downloads.
              </p>
              <span className="inline-flex items-center gap-2 text-emerald-400 font-medium group-hover:text-emerald-300">
                Discover Portal
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Speed Section */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            We{' '}
            <span className="bg-gradient-to-r from-brand-purple via-purple-400 to-blue-400 bg-clip-text text-transparent">
              ship fast
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No more waiting months for features. We listen to our customers and deliver quickly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {speedMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-purple/20 flex items-center justify-center mb-4 mx-auto">
                  <Icon className="w-6 h-6 text-brand-purple" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{metric.value}</div>
                <p className="text-muted-foreground">{metric.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-4">
            <Star className="w-4 h-4 text-green-400 fill-green-400" />
            <span className="text-green-400 text-sm font-medium">Trusted by hire businesses across Australia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            What our{' '}
            <span className="bg-gradient-to-r from-brand-purple via-purple-400 to-blue-400 bg-clip-text text-transparent">
              customers say
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic leading-relaxed flex-grow">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10">
                {testimonial.image ? (
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={72}
                    height={72}
                    className="rounded-full object-cover border-2 border-brand-purple/30"
                    loading="lazy"
                  />
                ) : (
                  <div className="rounded-full bg-brand-purple/20 flex items-center justify-center" style={{ width: '72px', height: '72px' }}>
                    <span className="text-brand-purple font-semibold text-xl">{testimonial.initials}</span>
                  </div>
                )}
                <div>
                  <div className="text-foreground font-semibold">{testimonial.author}</div>
                  <div className="text-muted-foreground text-sm">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <div
                key={index}
                className="flex items-center gap-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <div className="text-foreground font-semibold">{badge.label}</div>
                  <div className="text-muted-foreground text-sm">{badge.sublabel}</div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24">
        <div className="backdrop-blur-xl bg-gradient-to-r from-brand-purple/20 to-purple-500/20 border border-brand-purple/30 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          {/* Launch badge */}
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-green-400 text-sm font-medium">Launch Pricing - Limited Time</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stop losing time on spreadsheets
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join Australian hire businesses who&apos;ve already made the switch. Get started in under 10 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://app.cloudrent.me/register"
              className="group relative bg-gradient-to-r from-brand-purple to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-[0_0_40px_rgba(136,27,169,0.5)] flex items-center gap-2"
            >
              Start Free 30-Day Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/demo"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              <Phone className="w-4 h-4" />
              Book a Demo Call
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Free data migration
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Cancel anytime
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
