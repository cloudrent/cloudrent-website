import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CheckCircle, FileSignature, CreditCard, RefreshCw, Clock, Bug, Users } from 'lucide-react'
import { LightboxImage } from '@/components/Lightbox'
import { VideoModal } from '@/components/VideoModal'

// Enable ISR - regenerate page every hour
export const revalidate = 3600

// SEO metadata
export const metadata: Metadata = {
  title: 'CloudRent Pro | Rental Management Software for Australian Hire Businesses',
  description: 'Complete rental management software with real-time availability, invoicing, digital signatures, Xero integration, and AI-powered support. Built in Australia for hire businesses.',
  keywords: ['rental software', 'hire business', 'equipment rental', 'rental management', 'Australia', 'Xero integration'],
  openGraph: {
    title: 'CloudRent Pro | Rental Management Software',
    description: 'Everything you need to manage your hire business. Complete rental management with invoicing, digital signatures, and Xero integration.',
    type: 'website',
  },
}

// Hero content
const heroContent = {
  badge: 'Built in Australia for Australian hire businesses',
  headline: 'Everything you need to manage your hire business.',
  subheadline: "If it's not here yet, we'll build it in weeks—not months.",
  description: 'Complete rental management software with invoicing, digital signatures, Xero integration, and AI-powered support. All in one place.',
  primaryButtonLabel: 'Start Your Free 30-Day Trial',
  primaryButtonUrl: 'https://app.cloudrent.me/register',
  secondaryButtonLabel: 'Watch Demo',
  trustSignals: 'No credit card required • Free migration from spreadsheets • Cancel anytime',
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

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-[100px]">
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center -mt-[50px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-muted-foreground text-sm">{heroContent.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            Everything you need to manage your{' '}
            <span className="bg-gradient-to-r from-brand-purple via-purple-400 to-blue-400 bg-clip-text text-transparent">
              hire business
            </span>
            .
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto font-light">
            If it&apos;s not here yet, we&apos;ll build it in{' '}
            <span className="text-foreground font-medium">weeks</span>
            —not months.
          </p>

          {/* Description */}
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            {heroContent.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href={heroContent.primaryButtonUrl}
              className="group relative bg-gradient-to-r from-brand-purple to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all hover:shadow-[0_0_40px_rgba(136,27,169,0.5)] w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {heroContent.primaryButtonLabel}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>

            <VideoModal
              buttonLabel={heroContent.secondaryButtonLabel}
              videoSrc="/images/CloudRent-launch-Feb-2026.mp4"
            />
          </div>

          {/* Trust Signals */}
          <p className="text-muted-foreground text-sm mb-16">{heroContent.trustSignals}</p>

          {/* Device Mockup */}
          <div className="relative mt-8">
            <LightboxImage
              src="/images/cloudrent-rental-software-all-devices-mockup.webp"
              alt="CloudRent Pro rental management software on desktop, laptop, tablet and mobile devices"
              className="w-full max-w-5xl mx-auto"
              priority
            />
            {/* Decorative glow */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 blur-3xl" />
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

      {/* Testimonial Section */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 text-center">
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 italic leading-relaxed">
            &ldquo;The Xero integration alone saves us hours every week. But what really sets CloudRent apart is how quickly they respond to feature requests. We asked for a specific report format and had it within days.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full bg-brand-purple/20 flex items-center justify-center">
              <span className="text-brand-purple font-semibold text-lg">MH</span>
            </div>
            <div className="text-left">
              <div className="text-foreground font-semibold">Michael Harrison</div>
              <div className="text-muted-foreground text-sm">Operations Manager, Hunter Valley Equipment Hire</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24">
        <div className="backdrop-blur-xl bg-gradient-to-r from-brand-purple/20 to-purple-500/20 border border-brand-purple/30 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to streamline your hire business?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join Australian hire businesses already saving time with CloudRent Pro.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://app.cloudrent.me/register"
              className="group relative bg-gradient-to-r from-brand-purple to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all hover:shadow-[0_0_40px_rgba(136,27,169,0.5)]"
            >
              Start Your Free 30-Day Trial
            </a>
            <Link
              href="/demo"
              className="text-muted-foreground hover:text-foreground px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              Book a Demo
            </Link>
          </div>
          <p className="text-muted-foreground text-sm mt-6">
            No credit card required • Free data migration • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  )
}
