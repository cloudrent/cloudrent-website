'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { LightboxImage } from '@/components/Lightbox'
import type { Metadata } from 'next'
import {
  Smartphone,
  ChevronDown,
  Play,
  ArrowRight,
  Zap,
  Clock,
  BarChart3,
  QrCode,
  MapPin,
  Bell,
  WifiOff,
  Battery,
  Calendar,
  ClipboardCheck,
  AlertTriangle,
  Eye,
  Camera,
  Shield,
  FileSignature,
  MessageSquare,
  Navigation,
  Fingerprint,
  Moon,
  RefreshCw,
  Image,
  Mic,
  Phone,
  Mail,
  HardDrive,
  Gauge,
  Signal,
  CheckCircle2,
  Timer,
  Coffee,
  MapPinned,
  FileText,
  PenTool,
  CreditCard,
  Send,
  Download,
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

// ============================================
// MOBILE FEATURE DATA
// ============================================

const heroFeatures: HeroFeature[] = [
  { icon: WifiOff, text: 'Works Offline' },
  { icon: Fingerprint, text: 'Biometric Login' },
  { icon: RefreshCw, text: 'Real-time Sync' },
  { icon: Bell, text: 'Push Notifications' },
]

const featureSections: FeatureSection[] = [
  {
    id: 'core',
    icon: Smartphone,
    title: 'Built for the Field',
    tagline: 'Native apps that work as hard as you do',
    description:
      'Purpose-built iOS and Android apps designed for hire businesses. Fast, reliable, and built to work in the real world - even when connectivity is patchy.',
    image: '/images/mockups/equipment-rental-mobile-app-dashboard.webp',
    features: [
      {
        icon: Smartphone,
        title: 'Native iOS & Android',
        description: 'Dedicated apps for iPhone, iPad, and Android devices - not a web wrapper.',
      },
      {
        icon: WifiOff,
        title: 'Full Offline Mode',
        description: 'Complete jobs, inspections, and signatures without internet. Syncs when connected.',
      },
      {
        icon: RefreshCw,
        title: 'Real-time Sync',
        description: 'Instant updates across all devices. Office and field always on the same page.',
      },
      {
        icon: Fingerprint,
        title: 'Biometric Login',
        description: 'Face ID and fingerprint authentication for fast, secure access.',
      },
      {
        icon: Moon,
        title: 'Dark Mode',
        description: 'Comfortable viewing in all lighting conditions, day or night.',
      },
      {
        icon: Battery,
        title: 'Battery Optimized',
        description: 'Minimal battery drain so your phone lasts through long days.',
      },
    ],
  },
  {
    id: 'jobs',
    icon: ClipboardCheck,
    title: 'Job Management',
    tagline: 'Every delivery, collection, and service call in your pocket',
    description:
      'See your entire workday at a glance. Get job details, navigate to sites, update status, and keep the office informed - all from your phone.',
    image: '/images/mockups/rental-booking-calendar-mobile-app.webp',
    features: [
      {
        icon: ClipboardCheck,
        title: 'Job Queue',
        description: 'See all assigned deliveries, collections, and service calls in one unified view.',
      },
      {
        icon: FileText,
        title: 'Full Job Details',
        description: 'Customer info, site address, equipment list, and special instructions at your fingertips.',
      },
      {
        icon: Navigation,
        title: 'One-Tap Navigation',
        description: 'Instant directions to job sites via Google Maps or Apple Maps.',
      },
      {
        icon: RefreshCw,
        title: 'Status Updates',
        description: 'Mark jobs as En Route, Arrived, In Progress, or Complete with one tap.',
      },
      {
        icon: MessageSquare,
        title: 'Job Notes',
        description: 'Add notes and updates visible to office staff in real-time.',
      },
      {
        icon: Timer,
        title: 'Time Tracking',
        description: 'Clock in/out for each job with automatic GPS location capture.',
      },
    ],
  },
  {
    id: 'equipment',
    icon: QrCode,
    title: 'Equipment & Assets',
    tagline: 'Scan, search, and manage equipment on-site',
    description:
      'Instantly look up any piece of equipment by scanning its barcode or QR code. Check availability, view history, transfer assets, and document condition.',
    image: '/images/mockups/equipment-availability-management-mobile-app.webp',
    features: [
      {
        icon: QrCode,
        title: 'QR/Barcode Scanning',
        description: 'Scan equipment for instant lookup, status updates, and history.',
      },
      {
        icon: BarChart3,
        title: 'Availability Checking',
        description: 'Check real-time equipment availability right from the job site.',
      },
      {
        icon: RefreshCw,
        title: 'Asset Transfers',
        description: 'Transfer equipment between locations or assign to rentals instantly.',
      },
      {
        icon: Camera,
        title: 'Equipment Photos',
        description: 'Capture and attach photos to document equipment condition.',
      },
    ],
  },
  {
    id: 'inspections',
    icon: ClipboardCheck,
    title: 'Digital Inspections',
    tagline: 'Paperless inspections with photo evidence',
    description:
      'Complete pre-delivery and return inspections on your phone. Custom checklists, photo documentation, digital signatures, and GPS timestamps - all stored securely in the cloud.',
    image: '/images/mockups/digital-inspection-checklist-mobile-app.webp',
    features: [
      {
        icon: ClipboardCheck,
        title: 'Pre-delivery Inspections',
        description: 'Complete mandatory checklists before equipment goes out.',
      },
      {
        icon: CheckCircle2,
        title: 'Return Inspections',
        description: 'Document equipment condition when it comes back from hire.',
      },
      {
        icon: FileText,
        title: 'Custom Forms',
        description: 'Company-specific checklists and inspection forms.',
      },
      {
        icon: Camera,
        title: 'Photo Documentation',
        description: 'Attach multiple photos per inspection item as evidence.',
      },
      {
        icon: CheckCircle2,
        title: 'Pass/Fail/N/A',
        description: 'Clear status indicators for each inspection item.',
      },
      {
        icon: PenTool,
        title: 'Digital Signatures',
        description: 'Customer and driver sign-off captured on device.',
      },
      {
        icon: MapPin,
        title: 'GPS Timestamps',
        description: 'Automatic location and time recording for compliance.',
      },
      {
        icon: WifiOff,
        title: 'Works Offline',
        description: 'Complete inspections without internet, sync later.',
      },
    ],
  },
  {
    id: 'damage',
    icon: Camera,
    title: 'AI Damage Detection',
    tagline: 'Instant damage assessment powered by AI',
    description:
      'Snap a photo of damage and let AI do the analysis. Get instant severity ratings, repair cost estimates, and automatically notify the office - all in seconds.',
    image: '/images/mockups/ai-damage-detection-assessment-mobile-app.webp',
    features: [
      {
        icon: Camera,
        title: 'Photo-based Reporting',
        description: 'Take photos of damage for instant AI-powered analysis.',
      },
      {
        icon: Zap,
        title: 'AI Assessment',
        description: 'AI identifies damage type, location, and likely cause.',
      },
      {
        icon: BarChart3,
        title: 'Confidence Scoring',
        description: 'See AI confidence level (0-100%) for each assessment.',
      },
      {
        icon: AlertTriangle,
        title: 'Severity Rating',
        description: 'Automatic classification from Minor to Critical.',
      },
      {
        icon: CreditCard,
        title: 'Cost Estimates',
        description: 'AI-assisted repair cost estimates for damage billing.',
      },
      {
        icon: Send,
        title: 'Instant Alerts',
        description: 'Office staff notified immediately when damage is reported.',
      },
    ],
  },
  {
    id: 'safety',
    icon: Shield,
    title: 'Safety & Compliance',
    tagline: 'Keep your team safe and compliant',
    description:
      'Access SWMS, complete Take 5 assessments, report incidents, and manage PPE - all from the field. Built for Australian WHS requirements.',
    image: '/images/mockups/swms-safety-compliance-mobile-app.webp',
    features: [
      {
        icon: FileText,
        title: 'SWMS Access',
        description: 'View and digitally sign Safe Work Method Statements on-site.',
      },
      {
        icon: CheckCircle2,
        title: 'Take 5 Assessments',
        description: 'Complete quick safety checks before starting any work.',
      },
      {
        icon: ClipboardCheck,
        title: 'Toolbox Talks',
        description: 'Sign attendance for safety meetings and briefings.',
      },
      {
        icon: AlertTriangle,
        title: 'Incident Reporting',
        description: 'Report incidents immediately with photos and GPS location.',
      },
      {
        icon: Eye,
        title: 'Fatigue Declarations',
        description: 'Submit pre-work fatigue assessments for compliance.',
      },
      {
        icon: Shield,
        title: 'PPE Tracking',
        description: 'Record PPE issued and returned to staff.',
      },
    ],
  },
  {
    id: 'signatures',
    icon: FileSignature,
    title: 'Digital Signatures',
    tagline: 'Paperless contracts and proof of delivery',
    description:
      'Get rental agreements signed on the spot. Capture delivery confirmations, collection receipts, and customer ID - all legally compliant and instantly available.',
    image: '/images/mockups/digital-signature-capture-rental-agreement.webp',
    features: [
      {
        icon: FileSignature,
        title: 'Rental Agreements',
        description: 'Customers sign rental contracts right on your device.',
      },
      {
        icon: ClipboardCheck,
        title: 'Delivery Dockets',
        description: 'Digital proof of delivery with signature capture.',
      },
      {
        icon: CheckCircle2,
        title: 'Collection Receipts',
        description: 'Signature confirmation when equipment is collected.',
      },
      {
        icon: PenTool,
        title: 'Draw Signatures',
        description: 'Natural signature capture with finger or stylus.',
      },
      {
        icon: CreditCard,
        title: 'Photo ID Capture',
        description: 'Take photo of customer ID for verification.',
      },
      {
        icon: Download,
        title: 'Instant PDFs',
        description: 'Access and share signed documents immediately.',
      },
    ],
  },
  {
    id: 'timeclock',
    icon: Clock,
    title: 'Time Clock & Timesheets',
    tagline: 'GPS-verified time tracking',
    description:
      'Clock in and out with automatic GPS verification. Track time per job, record breaks, and view your timesheet - all synced to the office for payroll.',
    image: '/images/mockups/gps-timesheet-time-tracking-mobile-app.webp',
    features: [
      {
        icon: Timer,
        title: 'Clock In/Out',
        description: 'Start and end work shifts with GPS location capture.',
      },
      {
        icon: Coffee,
        title: 'Break Tracking',
        description: 'Record break start and end times accurately.',
      },
      {
        icon: ClipboardCheck,
        title: 'Job Time Tracking',
        description: 'Track time spent on each individual job.',
      },
      {
        icon: Calendar,
        title: 'Timesheet View',
        description: 'View your weekly and fortnightly hours summary.',
      },
      {
        icon: MapPinned,
        title: 'GPS Verification',
        description: 'Location captured with all clock events for compliance.',
      },
    ],
  },
  {
    id: 'comms',
    icon: MessageSquare,
    title: 'Communication',
    tagline: 'Stay connected with your team',
    description:
      'In-app messaging, photo sharing, and voice notes keep everyone in sync. One-tap contact with customers when you need to call or text.',
    image: '/images/mockups/customer-contact-communication-mobile-app.webp',
    features: [
      {
        icon: MessageSquare,
        title: 'In-app Messaging',
        description: 'Chat with office staff and other drivers instantly.',
      },
      {
        icon: Image,
        title: 'Photo Sharing',
        description: 'Send photos directly to the office from the field.',
      },
      {
        icon: Mic,
        title: 'Voice Notes',
        description: 'Record and send audio messages when typing is hard.',
      },
      {
        icon: Bell,
        title: 'Push Notifications',
        description: 'Instant alerts for job assignments and updates.',
      },
      {
        icon: Phone,
        title: 'One-tap Calling',
        description: 'Call customers directly from job details.',
      },
      {
        icon: Mail,
        title: 'Quick SMS',
        description: 'Text customers with one tap when needed.',
      },
    ],
  },
  {
    id: 'offline',
    icon: WifiOff,
    title: 'Offline Mode',
    tagline: 'Work anywhere, even without signal',
    description:
      "Built for the Australian outback and underground car parks alike. Complete your work offline and let the app sync everything when you're back online.",
    image: '/images/mockups/offline-gps-navigation-directions-mobile-app.webp',
    features: [
      {
        icon: ClipboardCheck,
        title: 'Offline Jobs',
        description: 'View full job details without internet connection.',
      },
      {
        icon: CheckCircle2,
        title: 'Offline Inspections',
        description: 'Complete all inspections without connectivity.',
      },
      {
        icon: Camera,
        title: 'Offline Damage Reports',
        description: 'Create and save damage reports, sync later.',
      },
      {
        icon: PenTool,
        title: 'Offline Signatures',
        description: 'Collect signatures, upload when connected.',
      },
      {
        icon: Image,
        title: 'Offline Photos',
        description: 'Take photos that auto-upload when back online.',
      },
      {
        icon: RefreshCw,
        title: 'Smart Sync',
        description: 'Automatic sync when connection is restored.',
      },
    ],
  },
  {
    id: 'performance',
    icon: Gauge,
    title: 'Performance & Reliability',
    tagline: 'Fast, stable, and built to last',
    description:
      'Optimized for real-world conditions. Fast loading, minimal battery drain, works in remote areas, and never loses your data - even if the app crashes.',
    image: '/images/mockups/rental-revenue-analytics-reporting-mobile-app.webp',
    features: [
      {
        icon: Zap,
        title: 'Fast Loading',
        description: 'Optimized for quick access when you need it.',
      },
      {
        icon: Battery,
        title: 'Low Battery Mode',
        description: 'Minimal battery drain for all-day use.',
      },
      {
        icon: Signal,
        title: 'Remote Area Support',
        description: 'Designed for poor connectivity and remote sites.',
      },
      {
        icon: HardDrive,
        title: 'Large File Handling',
        description: 'Upload high-resolution photos efficiently.',
      },
      {
        icon: Shield,
        title: 'Crash Recovery',
        description: 'Never lose data, even if the app crashes.',
      },
    ],
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

        {/* Phone Mockup Side */}
        <div className="flex w-full flex-1 justify-center">
          <div className="relative w-64 md:w-72">
            {section.image ? (
              <>
                <LightboxImage
                  src={section.image}
                  alt={`${section.title} - CloudRent mobile app screenshot`}
                  className="relative z-10 rounded-[2rem] shadow-2xl shadow-purple-900/50"
                />
                {/* Decorative glow */}
                <div className="absolute -inset-4 -z-10 rounded-full bg-purple-500/20 blur-2xl" />
              </>
            ) : (
              <>
                {/* Phone frame placeholder */}
                <div className="relative rounded-[3rem] border border-gray-700 bg-gray-900 p-2 shadow-2xl shadow-purple-900/50">
                  {/* Screen */}
                  <div className="aspect-[9/19] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-purple-900/80 to-fuchsia-900/80">
                    {/* Notch */}
                    <div className="flex justify-center pt-2">
                      <div className="h-6 w-24 rounded-full bg-black" />
                    </div>

                    {/* Screen content placeholder */}
                    <div className="-mt-6 flex h-full flex-col items-center justify-center p-6">
                      <IconComponent className="mb-3 h-12 w-12 text-purple-400/60" />
                      <p className="text-center text-xs text-purple-300/60">
                        {section.title}
                        <br />
                        <span className="text-purple-400/40">screenshot</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative glow */}
                <div className="absolute -inset-4 -z-10 rounded-full bg-purple-500/20 blur-2xl" />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// App Store Buttons Component
const AppStoreButtons: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row ${className}`}>
      {/* App Store Button */}
      <a
        href="#"
        className="flex items-center gap-3 rounded-xl border border-gray-700 bg-black px-6 py-3 transition-colors hover:border-gray-500"
      >
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="white">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <div className="text-left">
          <div className="text-[10px] text-gray-400">Download on the</div>
          <div className="-mt-1 text-lg font-semibold text-white">App Store</div>
        </div>
      </a>

      {/* Google Play Button */}
      <a
        href="#"
        className="flex items-center gap-3 rounded-xl border border-gray-700 bg-black px-6 py-3 transition-colors hover:border-gray-500"
      >
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
          <path
            d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z"
            fill="#00F076"
          />
          <path
            d="M17.556 8.235l-3.764 3.764 3.764 3.765 4.253-2.432a1 1 0 000-1.732l-4.253-2.365z"
            fill="#FFC900"
          />
          <path
            d="M3.61 1.814l10.182 10.185 3.765-3.764L6.014.39a1.14 1.14 0 00-1.09.075 1.14 1.14 0 00-.476.335l-.002.002-.837 1.012z"
            fill="#00D4FF"
          />
          <path
            d="M13.792 12L3.61 22.186l.837 1.011a1.14 1.14 0 001.566.41l11.544-6.607-3.765-3.764V12z"
            fill="#F43249"
          />
        </svg>
        <div className="text-left">
          <div className="text-[10px] text-gray-400">Get it on</div>
          <div className="-mt-1 text-lg font-semibold text-white">Google Play</div>
        </div>
      </a>
    </div>
  )
}

// CTA Section Component
const CTASection: React.FC<{ variant?: 'primary' | 'inline' }> = ({ variant = 'primary' }) => {
  if (variant === 'inline') {
    return (
      <div className="my-16 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-900/60 to-fuchsia-900/60 p-8">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div>
            <h3 className="mb-2 text-2xl font-bold text-white">Ready to mobilize your team?</h3>
            <p className="text-purple-200">Start your 30-day free trial. No credit card required.</p>
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
              <Play className="h-4 w-4" /> Book Demo
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
          Your hire business,
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            in your pocket.
          </span>
        </h2>
        <p className="mb-8 text-xl text-gray-300">
          Join hundreds of Australian hire businesses running their operations from CloudRent
          Pro&apos;s mobile app.
        </p>

        <AppStoreButtons className="mb-8 justify-center" />

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
            <Play className="h-5 w-5" /> Book a Demo
          </Link>
        </div>
        <p className="mt-6 text-sm text-purple-300/60">
          No credit card required • Free migration from spreadsheets • Cancel anytime
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
              <Smartphone className="h-4 w-4" />
              Native iOS & Android Apps
            </div>

            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Run your hire business
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                from anywhere.
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-xl text-gray-300 lg:mx-0">
              Complete jobs, inspections, and signatures on the go. Works offline, syncs in
              real-time, and keeps your whole team connected.
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

            {/* App Store Buttons */}
            <AppStoreButtons className="mb-8 justify-center lg:justify-start" />

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
                <Play className="h-5 w-5" /> Watch Demo
              </Link>
            </div>
          </div>

          {/* Phone Mockups */}
          <div className="relative flex-1">
            <div className="relative mx-auto w-full max-w-lg">
              <LightboxImage
                src="/images/mockups/cloudrent-mobile-app-rental-software-screenshots.webp"
                alt="CloudRent mobile app showing GPS directions, rental calendar, and analytics features"
                className="relative z-10 h-auto w-full"
              />

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

export default function MobileAppPage() {
  const [activeSection, setActiveSection] = useState('core')

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
            {index === 4 && <CTASection variant="inline" />}
          </React.Fragment>
        ))}
        <CTASection />
      </main>
    </div>
  )
}
