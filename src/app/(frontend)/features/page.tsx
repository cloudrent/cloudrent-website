'use client'

import { useState, useEffect, Fragment } from 'react'
import {
  Package,
  Smartphone,
  Users,
  Truck,
  Camera,
  Shield,
  UserCircle,
  FileSignature,
  CreditCard,
  ChevronDown,
  Check,
  Play,
  ArrowRight,
  Zap,
  Globe,
  Clock,
  BarChart3,
  QrCode,
  MapPin,
  Bell,
  Calendar,
  ClipboardCheck,
  AlertTriangle,
  Eye,
  Video,
  Building,
  ShoppingCart,
  PenTool,
  Receipt,
  Banknote,
  LucideIcon,
} from 'lucide-react'
import { cn } from '@/utilities/ui'

// ============================================
// TYPES
// ============================================

interface Highlight {
  icon: LucideIcon
  text: string
}

interface Subsection {
  title: string
  items: string[]
}

interface Feature {
  id: string
  icon: LucideIcon
  title: string
  tagline: string
  badge?: string
  description: string
  highlights: Highlight[]
  details?: string[]
  subsections?: Subsection[]
}

// ============================================
// FEATURE DATA
// ============================================

const features: Feature[] = [
  {
    id: 'equipment',
    icon: Package,
    title: 'Equipment & Inventory Management',
    tagline: 'Complete control over your entire fleet',
    description:
      'Unlimited equipment items with detailed profiles, category organization, and serialized tracking. Manage everything from heavy machinery to consumables.',
    highlights: [
      { icon: QrCode, text: 'Barcode/QR scanning for quick lookup' },
      { icon: MapPin, text: 'Multi-location asset tracking' },
      { icon: Calendar, text: 'Warranty tracking with expiry alerts' },
      { icon: BarChart3, text: 'Real-time availability & utilization' },
    ],
    details: [
      'Multiple images per item with gallery view',
      'Custom fields for industry-specific attributes',
      'Equipment components - Track parts and assemblies',
      'Bulk items - Manage consumables without serial tracking',
      'Purchase information tracking - Date, price, supplier',
      'Asset condition monitoring & history',
    ],
  },
  {
    id: 'staff',
    icon: Users,
    title: 'Staff Management',
    tagline: 'Your team, organized and compliant',
    description:
      'Comprehensive staff profiles with license tracking, employment types, and location assignments. Never miss a license expiry again.',
    highlights: [
      { icon: ClipboardCheck, text: 'License tracking with expiry alerts' },
      { icon: Calendar, text: 'Shift scheduling & timesheets' },
      { icon: MapPin, text: 'GPS-verified clock in/out' },
      { icon: Users, text: 'Crew & team management' },
    ],
    details: [
      'Employment types - Permanent, Casual, Contractor',
      'Driver, Forklift, WhiteCard license tracking',
      'Profile photos and calendar color coding',
      'Break tracking and job time allocation',
      'Weekly/fortnightly timesheet views',
      'Location-based staff assignments',
    ],
  },
  {
    id: 'dispatch',
    icon: Truck,
    title: 'Logistics & Dispatch',
    tagline: 'Streamlined deliveries and collections',
    description:
      'Unified job queue for all deliveries, collections, and service calls. Drag-and-drop assignment with instant push notifications to your team.',
    highlights: [
      { icon: MapPin, text: 'Route optimization & navigation' },
      { icon: Bell, text: 'Push notifications to assigned staff' },
      { icon: Clock, text: 'Real-time job status updates' },
      { icon: ClipboardCheck, text: 'Digital proof of delivery' },
    ],
    details: [
      'Job types - Delivery, Collection, Service Call, Pickup, Return',
      'Drag-and-drop staff, crew, and vehicle assignment',
      'Customer info, site address, equipment list, special instructions',
      'One-tap directions via Google/Apple Maps',
      'Job notes visible to office in real-time',
      'Time tracking with GPS location capture',
    ],
  },
  {
    id: 'damage',
    icon: Camera,
    title: 'AI Damage Detection',
    tagline: 'Instant, intelligent damage assessment',
    description:
      'Upload equipment photos for instant AI-powered damage analysis. Get confidence scores, severity ratings, and repair cost estimates in seconds.',
    highlights: [
      { icon: Zap, text: 'Instant AI photo analysis' },
      { icon: BarChart3, text: 'Confidence scoring (0-100%)' },
      { icon: AlertTriangle, text: 'Automatic severity classification' },
      { icon: Receipt, text: 'AI-assisted repair cost estimates' },
    ],
    details: [
      'Physical damage, wear & tear, operational issues classification',
      'Compare against equipment damage history',
      'Flag damage as chargeable to customer',
      'Create damage reports on-site in seconds',
      'Instant notification to office staff',
      'Full audit trail with timestamps and GPS',
    ],
  },
  {
    id: 'safety',
    icon: Shield,
    title: 'Safety Management',
    tagline: 'Industry-leading safety & compliance',
    description:
      'Complete safety management with SWMS, incident tracking, inspections, and the AlertVisionAI fatigue management camera system.',
    highlights: [
      { icon: Eye, text: 'AlertVisionAI fatigue monitoring' },
      { icon: ClipboardCheck, text: 'Digital SWMS with mobile signing' },
      { icon: AlertTriangle, text: 'Incident tracking & root cause analysis' },
      { icon: Video, text: 'Dual HD camera system' },
    ],
    subsections: [
      {
        title: 'AlertVisionAI Camera System',
        items: [
          'Real-time fatigue detection - Eye movements, yawning, head position',
          'Distraction & drowsiness detection',
          'Face ID recognition & seatbelt monitoring',
          'Forward collision & lane departure warnings',
          'Full HD 1080p recording with night vision',
          '4G LTE connectivity for live streaming',
        ],
      },
      {
        title: 'Safety Compliance',
        items: [
          'Take 5 assessments before starting work',
          'Toolbox talk attendance tracking',
          'Pre-delivery & return inspections',
          'Custom inspection forms and checklists',
          'PPE tracking - issued and returned',
          'Australian WHS compliance built-in',
        ],
      },
    ],
  },
  {
    id: 'crm',
    icon: UserCircle,
    title: 'Customer Management & CRM',
    tagline: 'Know your customers, grow your business',
    description:
      'Complete customer database with rental history, credit management, and a self-service portal where customers can book equipment and pay invoices.',
    highlights: [
      { icon: BarChart3, text: 'Lifetime value & analytics' },
      { icon: Building, text: 'Credit limits & payment terms' },
      { icon: Globe, text: 'Self-service customer portal' },
      { icon: ShoppingCart, text: 'Online booking & payments' },
    ],
    details: [
      'ABN validation and tracking',
      'Customer categorization by industry, VIP status, custom tags',
      'Account manager assignment',
      'Email history, SMS notifications, automated reminders',
      'Top customers, acquisition analysis, churn tracking',
      'Shopping cart with availability checking',
    ],
  },
  {
    id: 'signatures',
    icon: FileSignature,
    title: 'Digital Signatures & Agreements',
    tagline: 'Paperless, legally compliant contracts',
    description:
      'Electronic signatures with a simple 3-step process. Mobile-optimized signing on any device with automatic PDF generation and email delivery.',
    highlights: [
      { icon: PenTool, text: 'Draw, type, or upload signatures' },
      { icon: Smartphone, text: 'Sign on any device' },
      { icon: Check, text: 'Electronic Transactions Act compliant' },
      { icon: Zap, text: 'Instant PDF delivery' },
    ],
    details: [
      '3-step signing: Review → Details → Sign',
      'Professional branded rental agreements',
      'Delivery dockets with signature confirmation',
      'Collection receipts with digital sign-off',
      'Photo ID capture for verification',
      'Full audit trail with timestamps',
    ],
  },
  {
    id: 'payments',
    icon: CreditCard,
    title: 'Invoicing & Payments',
    tagline: 'Get paid faster with less effort',
    description:
      'One-click invoice generation with automatic GST calculations. Stripe integration for card payments, payment links via email, and Xero sync.',
    highlights: [
      { icon: Zap, text: 'One-click invoice creation' },
      { icon: CreditCard, text: 'Stripe card payments' },
      { icon: Banknote, text: 'Multiple payment methods' },
      { icon: Receipt, text: 'Xero integration' },
    ],
    details: [
      'Professional PDF invoices with your branding',
      'Automatic subtotal, GST, and total calculations',
      'Payment terms - Net 7, Net 14, Net 30, Due on Receipt',
      'Payment links sent via email',
      'Portal payments - customers pay online',
      'Card, bank transfer, cash, cheque support',
    ],
  },
]

// ============================================
// COMPONENTS
// ============================================

// Accordion for expandable feature details
const Accordion = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="overflow-hidden rounded-xl border border-purple-500/20 bg-purple-950/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-purple-900/30"
      >
        <span className="font-semibold text-purple-100">{title}</span>
        <ChevronDown
          className={cn('h-5 w-5 text-purple-400 transition-transform duration-300', isOpen && 'rotate-180')}
        />
      </button>
      <div className={cn('overflow-hidden transition-all duration-300', isOpen ? 'max-h-96' : 'max-h-0')}>
        <div className="px-6 pb-4">{children}</div>
      </div>
    </div>
  )
}

// Feature Card Component
const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const IconComponent = feature.icon
  const isEven = index % 2 === 0

  return (
    <section id={feature.id} className="scroll-mt-24 py-20 md:py-28">
      <div
        className={cn(
          'flex flex-col items-center gap-12 lg:gap-16',
          isEven ? 'lg:flex-row' : 'lg:flex-row-reverse',
        )}
      >
        {/* Content Side */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-600 p-3 shadow-lg shadow-purple-500/25">
              <IconComponent className="h-7 w-7 text-white" />
            </div>
            {feature.badge && (
              <span className="rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {feature.badge}
              </span>
            )}
          </div>

          <div>
            <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">{feature.title}</h2>
            <p className="text-lg font-medium text-purple-300">{feature.tagline}</p>
          </div>

          <p className="text-lg leading-relaxed text-gray-300">{feature.description}</p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
            {feature.highlights.map((highlight, i) => {
              const HIcon = highlight.icon
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-purple-500/20 bg-purple-900/30 p-4"
                >
                  <HIcon className="mt-0.5 h-5 w-5 shrink-0 text-purple-400" />
                  <span className="text-sm text-gray-200">{highlight.text}</span>
                </div>
              )
            })}
          </div>

          {/* Details Accordion */}
          {feature.details && (
            <Accordion title="View all features">
              <ul className="space-y-2">
                {feature.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </Accordion>
          )}

          {/* Subsections Accordion */}
          {feature.subsections && (
            <div className="space-y-3">
              {feature.subsections.map((sub, i) => (
                <Accordion key={i} title={sub.title} defaultOpen={i === 0}>
                  <ul className="space-y-2">
                    {sub.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-300">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Accordion>
              ))}
            </div>
          )}
        </div>

        {/* Image Placeholder Side */}
        <div className="w-full flex-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 shadow-2xl shadow-purple-900/50">
            {/* Decorative glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),transparent_70%)]" />

            {/* Browser-style header */}
            <div className="absolute left-4 right-4 top-4 flex h-8 items-center gap-2 rounded-lg bg-purple-950/60 px-3">
              <div className="h-3 w-3 rounded-full bg-red-400/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <div className="h-3 w-3 rounded-full bg-green-400/80" />
            </div>

            {/* Placeholder content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <IconComponent className="mb-4 h-16 w-16 text-purple-400/50" />
              <p className="text-center text-sm text-purple-300/60">
                Screenshot placeholder for
                <br />
                <span className="font-semibold text-purple-200/70">{feature.title}</span>
              </p>
              <p className="mt-2 text-xs text-purple-400/40">Replace with actual product image</p>
            </div>

            {/* Glass reflection */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

// CTA Section Component
const CTASection = ({ variant = 'primary' }: { variant?: 'primary' | 'inline' }) => {
  if (variant === 'inline') {
    return (
      <div className="my-16 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-900/60 to-fuchsia-900/60 p-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h3 className="mb-2 text-2xl font-bold text-white">Ready to streamline your operations?</h3>
            <p className="text-purple-200">Start your 30-day free trial. No credit card required.</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="https://app.cloudrent.me/register"
              className="whitespace-nowrap rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:from-purple-400 hover:to-fuchsia-400"
            >
              Start Free Trial
            </a>
            <button className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-purple-400/50 px-6 py-3 font-semibold text-purple-100 transition-all hover:bg-purple-500/20">
              <Play className="h-4 w-4" /> Watch Demo
            </button>
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
          Everything you need.
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            One integrated platform.
          </span>
        </h2>
        <p className="mb-10 text-xl text-gray-300">
          Stop juggling multiple systems. CloudRent Pro brings equipment management, safety, dispatch, invoicing, and
          more into one powerful platform.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="https://app.cloudrent.me/register"
            className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-purple-500/30 transition-all hover:from-purple-400 hover:to-fuchsia-400"
          >
            Start Your Free 30-Day Trial
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-purple-400/50 px-8 py-4 text-lg font-semibold text-purple-100 transition-all hover:bg-purple-500/20">
            <Play className="h-5 w-5" /> Book a Demo
          </button>
        </div>
        <p className="mt-6 text-sm text-purple-300/60">
          No credit card required • Free migration from spreadsheets • Cancel anytime
        </p>
      </div>
    </section>
  )
}

// Feature Navigation Component
const FeatureNav = ({
  activeSection,
  scrollToSection,
}: {
  activeSection: string
  scrollToSection: (id: string) => void
}) => {
  return (
    <nav className="sticky top-20 z-40 border-y border-purple-500/20 bg-[#0a0a1a]/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4">
        <div className="scrollbar-hide flex items-center gap-1 overflow-x-auto py-3">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => scrollToSection(feature.id)}
              className={cn(
                'whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all',
                activeSection === feature.id
                  ? 'bg-purple-500/30 text-white'
                  : 'text-purple-300 hover:bg-purple-500/10 hover:text-white',
              )}
            >
              {feature.title.split(' ').slice(0, 2).join(' ')}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative px-4 pb-20 pt-12">
      <div className="mx-auto max-w-7xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Built in Australia for Australian hire businesses
        </div>

        <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
          Powerful features,{' '}
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
            built for hire.
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-300">
          Ditch the spreadsheets, sticky notes, and workarounds. Real tools solving real problems for Australian
          equipment rental businesses.
        </p>

        <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="https://app.cloudrent.me/register"
            className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-purple-500/30 transition-all hover:from-purple-400 hover:to-fuchsia-400"
          >
            Start Your Free 30-Day Trial
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-purple-400/50 px-8 py-4 text-lg font-semibold text-purple-100 transition-all hover:bg-purple-500/20">
            <Play className="h-5 w-5" /> Watch Demo
          </button>
        </div>

        <p className="text-sm text-purple-300/60">
          No credit card required • Free migration from spreadsheets • Cancel anytime
        </p>
      </div>
    </section>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function FeaturesPage() {
  const [activeSection, setActiveSection] = useState('equipment')

  useEffect(() => {
    const handleScroll = () => {
      // Get the sticky nav height (approx 60px) plus header offset (80px from top-20)
      const headerOffset = 150
      const scrollPosition = window.scrollY + headerOffset

      // Find which section is currently in view
      let currentSection = features[0].id

      for (const feature of features) {
        const section = document.getElementById(feature.id)
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          // If we're within this section's bounds
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = feature.id
            break
          }
          // If we've scrolled past this section, keep it as current until we find a better match
          if (scrollPosition >= sectionTop) {
            currentSection = feature.id
          }
        }
      }

      setActiveSection(currentSection)
    }

    // Run on mount to set initial state
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

      <div className="relative">
        <HeroSection />

        <FeatureNav activeSection={activeSection} scrollToSection={scrollToSection} />

        {/* Features Content */}
        <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {features.map((feature, index) => (
            <Fragment key={feature.id}>
              <FeatureCard feature={feature} index={index} />
              {index === 3 && <CTASection variant="inline" />}
            </Fragment>
          ))}
          <CTASection />
        </main>
      </div>
    </div>
  )
}
