'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { LightboxImage } from '@/components/Lightbox'
import {
  Monitor,
  ChevronDown,
  Play,
  ArrowRight,
  Search,
  ShoppingCart,
  Calendar,
  CreditCard,
  FileText,
  Download,
  Clock,
  MapPin,
  Truck,
  User,
  History,
  Eye,
  Filter,
  Grid,
  CheckCircle2,
  Bell,
  Lock,
  Globe,
  Zap,
  BarChart3,
  Receipt,
  FileSignature,
  Mail,
  Building2,
  Bookmark,
  RefreshCw,
  PenTool,
  Shield,
  Tag,
  Layers,
  MousePointer,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react'

// ============================================
// TYPES
// ============================================

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface FeatureSection {
  id: string
  icon: LucideIcon
  title: string
  tagline: string
  description: string
  features: Feature[]
  image?: string
}

interface HeroFeature {
  icon: LucideIcon
  text: string
}

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

// ============================================
// FEATURE DATA
// ============================================

const heroFeatures: HeroFeature[] = [
  { icon: Clock, text: 'Available 24/7' },
  { icon: ShoppingCart, text: 'Self-Service Booking' },
  { icon: CreditCard, text: 'Online Payments' },
  { icon: Truck, text: 'Track Deliveries' },
]

const featureSections: FeatureSection[] = [
  {
    id: 'catalog',
    icon: Grid,
    title: 'Equipment Catalog',
    tagline: 'Browse your entire fleet, beautifully presented',
    description:
      'Your customers see a professional, branded catalog of all your rental equipment. High-quality images, detailed descriptions, and clear pricing - all organized by category.',
    image: '/images/mockups/equipment-rental-catalog-online.webp',
    features: [
      {
        icon: Grid,
        title: 'Visual Equipment Grid',
        description: 'Professional product cards with images, descriptions, and daily rates.',
      },
      {
        icon: Search,
        title: 'Smart Search',
        description: 'Find equipment instantly by name, category, or keyword.',
      },
      {
        icon: Filter,
        title: 'Category Filtering',
        description: 'Filter by excavators, compactors, power tools, and more.',
      },
      {
        icon: Tag,
        title: 'Clear Pricing',
        description: 'Daily, weekly, and monthly rates displayed upfront.',
      },
      {
        icon: Eye,
        title: 'Equipment Details',
        description: 'Full specifications, features, and multiple photos per item.',
      },
      {
        icon: Bookmark,
        title: 'Favorites',
        description: 'Customers can save frequently-hired equipment for quick access.',
      },
    ],
  },
  {
    id: 'availability',
    icon: Calendar,
    title: 'Real-Time Availability',
    tagline: "No more phone calls to check if it's available",
    description:
      "Customers select their hire dates and instantly see what's available. Live stock levels, clear availability indicators, and no double-bookings.",
    image: '/images/mockups/real-time-equipment-availability-calendar.webp',
    features: [
      {
        icon: Calendar,
        title: 'Date Range Selection',
        description: 'Pick start and end dates with an intuitive date picker.',
      },
      {
        icon: CheckCircle2,
        title: 'Instant Availability',
        description: 'See "Available for your dates!" confirmation in real-time.',
      },
      {
        icon: BarChart3,
        title: 'Stock Levels',
        description: 'Shows "1 of 3 available" so customers know what\'s left.',
      },
      {
        icon: RefreshCw,
        title: 'Live Updates',
        description: 'Availability syncs with your operations in real-time.',
      },
      {
        icon: Bell,
        title: 'Waitlist Option',
        description: 'Customers can request notification when items become available.',
      },
    ],
  },
  {
    id: 'booking',
    icon: ShoppingCart,
    title: 'Online Booking',
    tagline: 'From browse to booked in minutes',
    description:
      'A smooth e-commerce experience for equipment hire. Add to cart, select quantities, choose delivery options, and submit booking requests - all without picking up the phone.',
    image: '/images/mockups/online-equipment-booking-system.webp',
    features: [
      {
        icon: ShoppingCart,
        title: 'Shopping Cart',
        description: 'Add multiple items, adjust quantities, review before booking.',
      },
      {
        icon: MousePointer,
        title: 'One-Click Add',
        description: 'Simple "Add to Cart" buttons on every equipment card.',
      },
      {
        icon: Layers,
        title: 'Multi-Item Orders',
        description: 'Hire multiple pieces of equipment in a single booking.',
      },
      {
        icon: Truck,
        title: 'Delivery Options',
        description: 'Choose delivery or customer pickup at checkout.',
      },
      {
        icon: MapPin,
        title: 'Site Address',
        description: 'Enter delivery address with saved address book.',
      },
      {
        icon: FileText,
        title: 'Special Instructions',
        description: 'Add notes, site access details, or contact information.',
      },
    ],
  },
  {
    id: 'tracking',
    icon: Truck,
    title: 'Order & Delivery Tracking',
    tagline: 'Know exactly where your equipment is',
    description:
      'Customers can track their orders from confirmation to delivery. See order status, estimated delivery times, and get notified at every step.',
    image: '/images/mockups/equipment-delivery-tracking-portal.webp',
    features: [
      {
        icon: Eye,
        title: 'Order Status',
        description: 'Track orders: Pending, Confirmed, Dispatched, Delivered, On-Hire.',
      },
      {
        icon: Truck,
        title: 'Delivery Updates',
        description: 'Real-time updates when equipment is on its way.',
      },
      {
        icon: Clock,
        title: 'ETA Display',
        description: 'See estimated arrival time for deliveries.',
      },
      {
        icon: Bell,
        title: 'Status Notifications',
        description: 'Email alerts when order status changes.',
      },
      {
        icon: History,
        title: 'Order History',
        description: 'View all current and past orders in one place.',
      },
      {
        icon: MapPin,
        title: 'Delivery Confirmation',
        description: 'Proof of delivery with timestamps and signatures.',
      },
    ],
  },
  {
    id: 'invoices',
    icon: Receipt,
    title: 'Invoices & Statements',
    tagline: 'All your paperwork, digitally organized',
    description:
      "No more chasing invoices or waiting for statements. Customers access all their financial documents instantly - download PDFs, view payment history, and track what's due.",
    image: '/images/mockups/online-invoice-statements-portal.webp',
    features: [
      {
        icon: Receipt,
        title: 'Invoice Access',
        description: 'View all invoices with full line-item details.',
      },
      {
        icon: Download,
        title: 'PDF Downloads',
        description: 'Download professional PDF invoices and statements.',
      },
      {
        icon: FileText,
        title: 'Statement Generation',
        description: 'Generate account statements for any date range.',
      },
      {
        icon: Eye,
        title: 'Payment Status',
        description: 'See which invoices are paid, pending, or overdue.',
      },
      {
        icon: History,
        title: 'Transaction History',
        description: 'Complete history of all payments and charges.',
      },
      {
        icon: Mail,
        title: 'Email Invoices',
        description: 'Invoices automatically emailed when generated.',
      },
    ],
  },
  {
    id: 'payments',
    icon: CreditCard,
    title: 'Online Payments',
    tagline: 'Pay invoices anytime, from anywhere',
    description:
      'Integrated Stripe payments let customers pay invoices instantly with credit card or bank transfer. Secure, fast, and no more waiting for cheques to clear.',
    image: '/images/mockups/online-payment-portal-hire.webp',
    features: [
      {
        icon: CreditCard,
        title: 'Card Payments',
        description: 'Pay with Visa, Mastercard, or Amex via Stripe.',
      },
      {
        icon: Lock,
        title: 'Secure Processing',
        description: 'Bank-level security with PCI-compliant payments.',
      },
      {
        icon: Zap,
        title: 'Instant Receipts',
        description: 'Payment confirmation and receipt emailed immediately.',
      },
      {
        icon: CheckCircle2,
        title: 'One-Click Pay',
        description: 'Pay outstanding invoices with a single click.',
      },
      {
        icon: RefreshCw,
        title: 'Auto-Reconciliation',
        description: 'Payments automatically reconcile in your system.',
      },
      {
        icon: Building2,
        title: 'Bank Transfer',
        description: 'Option for direct bank transfer with reference tracking.',
      },
    ],
  },
  {
    id: 'dashboard',
    icon: User,
    title: 'Account Dashboard',
    tagline: 'Everything in one place',
    description:
      'A personalized dashboard showing active rentals, upcoming returns, outstanding invoices, and account details. Customers manage their entire relationship with you from one screen.',
    image: '/images/mockups/customer-account-dashboard-rental.webp',
    features: [
      {
        icon: BarChart3,
        title: 'Account Overview',
        description: 'At-a-glance view of active rentals, invoices, and balance.',
      },
      {
        icon: History,
        title: 'Rental History',
        description: 'Complete history of all past and current rentals.',
      },
      {
        icon: Calendar,
        title: 'Upcoming Returns',
        description: "See what's due back and when.",
      },
      {
        icon: User,
        title: 'Profile Management',
        description: 'Update contact details, addresses, and preferences.',
      },
      {
        icon: Building2,
        title: 'Company Details',
        description: 'Manage business info, ABN, and billing addresses.',
      },
      {
        icon: Bell,
        title: 'Notification Preferences',
        description: 'Control email notifications and alerts.',
      },
    ],
  },
  {
    id: 'agreements',
    icon: FileSignature,
    title: 'Digital Agreements',
    tagline: 'Sign contracts without the paperwork',
    description:
      'Rental agreements sent electronically and signed online. Customers review terms, sign digitally, and receive their copy instantly - all legally compliant.',
    image: '/images/mockups/digital-agreements-e-signature.webp',
    features: [
      {
        icon: FileSignature,
        title: 'Electronic Signing',
        description: 'Sign rental agreements online from any device.',
      },
      {
        icon: Eye,
        title: 'Document Review',
        description: 'Review full terms and conditions before signing.',
      },
      {
        icon: PenTool,
        title: 'Digital Signatures',
        description: 'Draw or type signature with legal validity.',
      },
      {
        icon: Download,
        title: 'Instant Copy',
        description: 'Signed agreement PDF available immediately.',
      },
      {
        icon: Shield,
        title: 'Legal Compliance',
        description: 'Compliant with Electronic Transactions Act.',
      },
      {
        icon: History,
        title: 'Agreement Archive',
        description: 'Access all signed agreements in document library.',
      },
    ],
  },
]

const benefits: Benefit[] = [
  {
    icon: Clock,
    title: 'Open 24/7',
    description: 'Customers book and pay anytime - evenings, weekends, holidays.',
  },
  {
    icon: Zap,
    title: 'Reduce Admin',
    description: 'Fewer phone calls, emails, and manual data entry for your team.',
  },
  {
    icon: CreditCard,
    title: 'Faster Payments',
    description: 'Online payments mean money in your account faster.',
  },
  {
    icon: User,
    title: 'Better Experience',
    description: 'Modern self-service that customers actually want to use.',
  },
]

// ============================================
// COMPONENTS
// ============================================

// Accordion Component
const Accordion: React.FC<{
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="overflow-hidden rounded-xl border border-purple-500/20 bg-purple-950/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-purple-900/30"
      >
        <span className="font-semibold text-purple-100">{title}</span>
        <ChevronDown
          className={`h-5 w-5 text-purple-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[800px]' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-4">{children}</div>
      </div>
    </div>
  )
}

// Feature Section Component
const FeatureSectionComponent: React.FC<{
  section: FeatureSection
  index: number
}> = ({ section, index }) => {
  const IconComponent = section.icon
  const isEven = index % 2 === 0

  return (
    <section id={section.id} className="scroll-mt-24 py-16 md:py-24">
      <div
        className={`flex flex-col ${
          isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
        } items-start gap-12 lg:gap-16`}
      >
        {/* Content Side */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-600 p-3 shadow-lg shadow-purple-500/25">
              <IconComponent className="h-7 w-7 text-white" />
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">{section.title}</h2>
            <p className="text-lg font-medium text-purple-300">{section.tagline}</p>
          </div>

          <p className="text-lg leading-relaxed text-gray-300">{section.description}</p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
            {section.features.slice(0, 4).map((feature, i) => {
              const FIcon = feature.icon
              return (
                <div
                  key={i}
                  className="rounded-xl border border-purple-500/20 bg-purple-900/30 p-4"
                >
                  <div className="mb-2 flex items-start gap-3">
                    <FIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-400" />
                    <span className="font-semibold text-white">{feature.title}</span>
                  </div>
                  <p className="ml-8 text-sm text-gray-400">{feature.description}</p>
                </div>
              )
            })}
          </div>

          {/* Show more in accordion if there are more than 4 features */}
          {section.features.length > 4 && (
            <Accordion title={`View all ${section.features.length} features`}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {section.features.slice(4).map((feature, i) => {
                  const FIcon = feature.icon
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <FIcon className="mt-1 h-4 w-4 flex-shrink-0 text-purple-400" />
                      <div>
                        <span className="text-sm font-medium text-white">{feature.title}</span>
                        <p className="text-xs text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Accordion>
          )}
        </div>

        {/* Browser Mockup Side */}
        <div className="flex w-full flex-1 justify-center">
          <div className="relative w-full max-w-xl">
            {/* Browser frame */}
            <div className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-2xl shadow-purple-900/50">
              {/* Browser header */}
              <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-4 flex-1">
                  <div className="flex items-center gap-2 rounded-lg bg-gray-700 px-3 py-1.5 text-xs text-gray-400">
                    <Lock className="h-3 w-3" />
                    <span>portal.yourbusiness.com</span>
                  </div>
                </div>
              </div>

              {/* Screen content */}
              {section.image ? (
                <LightboxImage
                  src={section.image}
                  alt={section.title}
                  className="w-full"
                />
              ) : (
                <div className="flex aspect-[4/3] flex-col items-center justify-center bg-gradient-to-br from-purple-900/40 to-fuchsia-900/40 p-6">
                  <IconComponent className="mb-3 h-12 w-12 text-purple-400/60" />
                  <p className="text-center text-xs text-purple-300/60">
                    {section.title}
                    <br />
                    <span className="text-purple-400/40">screenshot</span>
                  </p>
                </div>
              )}
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-4 -z-10 rounded-full bg-purple-500/20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

// Benefits Grid Component
const BenefitsGrid: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Why offer a customer portal?
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-300">
          Give your customers the self-service experience they expect while reducing your admin
          workload.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, i) => {
          const BIcon = benefit.icon
          return (
            <div
              key={i}
              className="rounded-2xl border border-purple-500/20 bg-purple-900/20 p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-lg shadow-purple-500/25">
                <BIcon className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">{benefit.title}</h3>
              <p className="text-sm text-gray-400">{benefit.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// CTA Section Component
const CTASection: React.FC<{ variant?: 'primary' | 'inline' }> = ({ variant = 'primary' }) => {
  if (variant === 'inline') {
    return (
      <div className="my-16 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-900/60 to-fuchsia-900/60 p-8">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div>
            <h3 className="mb-2 text-2xl font-bold text-white">
              Ready to empower your customers?
            </h3>
            <p className="text-purple-200">
              Start your 30-day free trial. Full portal access included.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="whitespace-nowrap rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:from-purple-400 hover:to-fuchsia-400"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo"
              className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-purple-400/50 px-6 py-3 font-semibold text-purple-100 transition-all hover:bg-purple-500/20"
            >
              <Play className="h-4 w-4" /> See Demo Portal
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/30 to-purple-950/50" />
      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
          Your customers deserve
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            modern self-service.
          </span>
        </h2>
        <p className="mb-8 text-xl text-gray-300">
          Join hundreds of Australian hire businesses giving their customers the 24/7 portal
          experience.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-purple-500/30 transition-all hover:from-purple-400 hover:to-fuchsia-400"
          >
            Start Your Free 30-Day Trial
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/demo"
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-purple-400/50 px-8 py-4 text-lg font-semibold text-purple-100 transition-all hover:bg-purple-500/20"
          >
            <ExternalLink className="h-5 w-5" /> View Demo Portal
          </Link>
        </div>
        <p className="mt-6 text-sm text-purple-300/60">
          No credit card required • Branded to your business • Cancel anytime
        </p>
      </div>
    </section>
  )
}

// Hero Section Component
const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-12">
      <div className="container">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
              <Globe className="h-4 w-4" />
              Customer Self-Service Portal
            </div>

            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Your customers&apos;
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                24/7 hire desk.
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-xl text-gray-300 lg:mx-0">
              Let customers browse equipment, check availability, place orders, track deliveries,
              and pay invoices - all online, all self-service.
            </p>

            {/* Hero feature pills */}
            <div className="mb-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              {heroFeatures.map((feature, i) => {
                const FIcon = feature.icon
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-900/40 px-4 py-2"
                  >
                    <FIcon className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-purple-100">{feature.text}</span>
                  </div>
                )
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/contact"
                className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-purple-500/30 transition-all hover:from-purple-400 hover:to-fuchsia-400"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/demo"
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-purple-400/50 px-8 py-4 text-lg font-semibold text-purple-100 transition-all hover:bg-purple-500/20"
              >
                <ExternalLink className="h-5 w-5" /> View Demo Portal
              </Link>
            </div>
          </div>

          {/* Portal Screenshot */}
          <div className="relative flex-1">
            <div className="relative mx-auto w-full max-w-xl">
              {/* Placeholder for uploaded portal screenshot */}
              <div className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-2xl shadow-purple-900/50">
                {/* Browser header */}
                <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="mx-4 flex-1">
                    <div className="flex items-center gap-2 rounded-lg bg-gray-700 px-3 py-1.5 text-xs text-gray-400">
                      <Lock className="h-3 w-3" />
                      <span>portal.yourbusiness.com</span>
                    </div>
                  </div>
                </div>

                {/* Portal Screenshot */}
                <LightboxImage
                  src="/images/mockups/cloudrent-customer-portal-dashboard.webp"
                  alt="CloudRent Customer Portal - Equipment hire made simple"
                  className="w-full"
                />
              </div>

              {/* Decorative glows */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/30 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Section Navigation Component
const SectionNav: React.FC<{
  activeSection: string
  scrollToSection: (id: string) => void
}> = ({ activeSection, scrollToSection }) => {
  return (
    <nav className="sticky top-[88px] z-40 border-y border-purple-500/20 bg-[#0a0a1a]/80 backdrop-blur-lg">
      <div className="container">
        <div className="scrollbar-hide flex items-center gap-1 overflow-x-auto py-3">
          {featureSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeSection === section.id
                  ? 'bg-purple-500/30 text-white'
                  : 'text-purple-300 hover:bg-purple-500/10 hover:text-white'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function WebPortalPage() {
  const [activeSection, setActiveSection] = useState('catalog')

  useEffect(() => {
    const handleScroll = () => {
      // Update active section based on scroll position
      const headerOffset = 200
      const scrollPosition = window.scrollY + headerOffset

      let currentSection = featureSections[0].id

      for (const section of featureSections) {
        const element = document.getElementById(section.id)
        if (element) {
          const sectionTop = element.offsetTop
          const sectionBottom = sectionTop + element.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.id
            break
          }

          if (scrollPosition >= sectionTop) {
            currentSection = section.id
          }
        }
      }

      setActiveSection(currentSection)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-900/10 blur-[150px]" />
      </div>

      <HeroSection />

      <SectionNav activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Features Content */}
      <main className="container relative">
        {featureSections.map((section, index) => (
          <React.Fragment key={section.id}>
            <FeatureSectionComponent section={section} index={index} />
            {index === 3 && <CTASection variant="inline" />}
          </React.Fragment>
        ))}

        <BenefitsGrid />

        <CTASection />
      </main>
    </div>
  )
}
