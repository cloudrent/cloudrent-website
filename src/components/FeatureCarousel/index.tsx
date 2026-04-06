'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  ChevronRight,
  ChevronLeft,
  X,
  CheckCircle,
  Calendar,
  CreditCard,
  Eye,
  FileSignature,
  Globe,
  HardHat,
  Layout,
  RefreshCw,
  ScanLine,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'

interface ShowcaseFeature {
  id: string
  title: string
  subtitle: string
  description: string
  highlights: string[]
  icon: LucideIcon
  gradient: string
  shadowColor: string
  image: string
}

const showcaseFeatures: ShowcaseFeature[] = [
  {
    id: 'dispatch-board',
    title: 'Dispatch Board',
    subtitle: 'Effortless Job Management',
    description:
      'Your command center for deliveries, collections, and service calls. Drag-and-drop scheduling with real-time updates to your field team.',
    highlights: [
      'Unified job queue',
      'Drag-and-drop assignment',
      'Push notifications to drivers',
      'Real-time job status',
      'Digital proof of delivery',
      'Route optimization',
    ],
    icon: Layout,
    gradient: 'from-indigo-500 to-violet-500',
    shadowColor: 'shadow-indigo-500/30',
    image: '/images/carousel/Dispatch Board.webp',
  },
  {
    id: 'barcode-scanning',
    title: 'Barcode & QR Scanning',
    subtitle: 'Speed & Accuracy',
    description:
      'Scan equipment in and out in seconds. Track assets, speed up stocktakes, and eliminate manual entry errors with built-in barcode and QR scanning.',
    highlights: [
      'Instant equipment lookup',
      'Fast check-in/check-out',
      'Asset tracking',
      'Stocktake mode',
      'Works with any barcode',
      'Print your own labels',
    ],
    icon: ScanLine,
    gradient: 'from-gray-600 to-gray-800',
    shadowColor: 'shadow-gray-600/30',
    image: '/images/carousel/Barcode & QR Scanning.webp',
  },
  {
    id: 'mobile-app',
    title: 'Mobile App',
    subtitle: 'Your Business in Your Pocket',
    description:
      "Take CloudRent Pro anywhere. Our powerful mobile app keeps your team connected whether they're in the warehouse, on the road, or at a customer site.",
    highlights: [
      'Works offline — sync when back online',
      'GPS-verified clock in/out for staff',
      'Push notifications for job updates',
      'Barcode & QR code scanning',
      'Real-time job status updates',
      'Photo capture with timestamps',
    ],
    icon: Smartphone,
    gradient: 'from-blue-500 to-cyan-500',
    shadowColor: 'shadow-blue-500/30',
    image: '/images/carousel/Mobile App.webp',
  },
  {
    id: 'digital-forms',
    title: 'Digital Forms & Signatures',
    subtitle: 'Paperless & Legally Compliant',
    description:
      'Say goodbye to paper. Digital signatures, rental agreements, delivery dockets, and inspection checklists — all captured electronically and stored securely.',
    highlights: [
      'One-tap digital signatures',
      'Rental agreement templates',
      'Delivery & collection dockets',
      'Pre-delivery inspection forms',
      'Instant PDF generation & email',
      'Electronic Transactions Act compliant',
    ],
    icon: FileSignature,
    gradient: 'from-purple-500 to-fuchsia-500',
    shadowColor: 'shadow-purple-500/30',
    image: '/images/carousel/Digital Forms & Signatures.webp',
  },
  {
    id: 'safety',
    title: 'Safety & Compliance',
    subtitle: 'Stay Compliant, Stay Safe',
    description:
      'Industry-leading safety management built in. Track licenses, manage SWMS, record incidents, and ensure your team meets all compliance requirements.',
    highlights: [
      'Digital SWMS sign-off',
      'License & certification tracking',
      'Automatic expiry alerts',
      'Incident & near-miss reporting',
      'Pre-start checklists',
      'Full audit trail',
    ],
    icon: HardHat,
    gradient: 'from-amber-500 to-orange-500',
    shadowColor: 'shadow-amber-500/30',
    image: '/images/carousel/Safety & Compliance.webp',
  },
  {
    id: 'ai-damage-detection',
    title: 'AI Damage Detection',
    subtitle: 'Intelligent Photo Analysis',
    description:
      'Our AI instantly analyzes equipment photos to detect damage, assess severity, and estimate repair costs — all before you even leave the site.',
    highlights: [
      'Instant damage assessment',
      'Confidence scoring (0-100%)',
      'Severity classification',
      'AI-assisted repair cost estimates',
      'Before & after comparison',
      'Automatic damage reports',
    ],
    icon: Eye,
    gradient: 'from-rose-500 to-pink-500',
    shadowColor: 'shadow-rose-500/30',
    image: '/images/carousel/AI Damage Detection.webp',
  },
  {
    id: 'real-time-availability',
    title: 'Real-Time Availability',
    subtitle: 'Never Double-Book Again',
    description:
      "See exactly what's available, what's on hire, and what's coming back — updated instantly across all your locations.",
    highlights: [
      'Live stock updates',
      'Multi-location tracking',
      'Conflict detection & alerts',
      'Visual availability calendar',
      'Equipment status at a glance',
      'Reservation management',
    ],
    icon: Calendar,
    gradient: 'from-emerald-500 to-teal-500',
    shadowColor: 'shadow-emerald-500/30',
    image: '/images/carousel/Real-Time Availability.webp',
  },
  {
    id: 'customer-portal',
    title: '24/7 Customer Portal',
    subtitle: 'Self-Service For Your Customers',
    description:
      'Give your customers their own branded portal for online bookings, rental history, invoices, and document downloads — available around the clock.',
    highlights: [
      'Online equipment booking',
      '24/7 self-service access',
      'Rental history & documents',
      'Invoice viewing & payment',
      'Your branding, your domain',
      'Real-time availability',
    ],
    icon: Globe,
    gradient: 'from-green-500 to-emerald-500',
    shadowColor: 'shadow-green-500/30',
    image: '/images/carousel/24_7 Customer Portal.webp',
  },
  {
    id: 'one-click-invoicing',
    title: 'One-Click Invoicing',
    subtitle: 'Get Paid Faster',
    description:
      "Generate professional invoices in seconds. Send via email with payment links. Track what's paid, what's overdue, and chase payments automatically.",
    highlights: [
      'Generate invoices in seconds',
      'Automatic GST calculations',
      'Email with payment links',
      'Stripe & bank payments',
      'Overdue reminders',
      'Payment tracking dashboard',
    ],
    icon: CreditCard,
    gradient: 'from-lime-500 to-green-500',
    shadowColor: 'shadow-lime-500/30',
    image: '/images/carousel/One-Click Invoicing.webp',
  },
  {
    id: 'accounting-sync',
    title: 'Xero & QuickBooks Sync',
    subtitle: 'Two-Way Accounting Integration',
    description:
      'Invoices, payments, and contacts flow automatically between CloudRent Pro and your accounting software. No double entry. No reconciliation headaches.',
    highlights: [
      'Two-way sync',
      'Automatic invoice push',
      'Payment reconciliation',
      'Contact syncing',
      'Account mapping',
      'Real-time updates',
    ],
    icon: RefreshCw,
    gradient: 'from-sky-500 to-blue-500',
    shadowColor: 'shadow-sky-500/30',
    image: '/images/carousel/QuickBooks_Xero Integration.webp',
  },
]

export default function FeatureCarousel() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const activeFeature = showcaseFeatures[carouselIndex]

  // Carousel autoplay
  useEffect(() => {
    if (isAutoPlaying && !lightboxOpen) {
      autoPlayRef.current = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % showcaseFeatures.length)
      }, 6000)
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isAutoPlaying, lightboxOpen])

  // Carousel keyboard navigation in lightbox
  useEffect(() => {
    if (!lightboxOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') goNextSlide()
      if (e.key === 'ArrowLeft') goPrevSlide()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, carouselIndex])

  const goToSlide = (index: number) => {
    setCarouselIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }
  const goNextSlide = () => goToSlide((carouselIndex + 1) % showcaseFeatures.length)
  const goPrevSlide = () =>
    goToSlide((carouselIndex - 1 + showcaseFeatures.length) % showcaseFeatures.length)

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a12] py-20">
      {/* Subtle gradient backgrounds */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-64"
        style={{
          background: 'linear-gradient(to bottom, rgba(136,27,169,0.05) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
            Feature Spotlight
          </p>
          <h2 className="mb-4 text-4xl font-black leading-tight text-white md:text-5xl">
            Powerful features,{' '}
            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
              beautifully designed
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Click to explore the features that set CloudRent Pro apart.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={goPrevSlide}
            className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20 md:-translate-x-4 md:h-12 md:w-12"
          >
            <ChevronLeft className="h-5 w-5 text-white md:h-6 md:w-6" />
          </button>
          <button
            onClick={goNextSlide}
            className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 translate-x-2 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20 md:h-12 md:w-12 md:translate-x-4"
          >
            <ChevronRight className="h-5 w-5 text-white md:h-6 md:w-6" />
          </button>

          {/* Carousel Content */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              {showcaseFeatures.map((feature, index) => (
                <div key={feature.id} className="w-full flex-shrink-0">
                  {/* Only render full content for active slide and adjacent slides */}
                  {Math.abs(index - carouselIndex) <= 1 ||
                  (carouselIndex === 0 && index === showcaseFeatures.length - 1) ||
                  (carouselIndex === showcaseFeatures.length - 1 && index === 0) ? (
                    <div
                      onClick={() => setLightboxOpen(true)}
                      className={`group cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-purple-500/40 hover:bg-white/[0.06] ${feature.shadowColor}`}
                    >
                      <div className="grid gap-0 md:grid-cols-2">
                        {/* Left - Gradient Icon Area */}
                        <div
                          className={`relative flex min-h-[280px] items-center justify-center bg-gradient-to-br p-8 md:min-h-[380px] ${feature.gradient}`}
                        >
                          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
                          <div className="relative transform text-center transition-transform duration-300 group-hover:scale-110">
                            <feature.icon className="mx-auto mb-4 h-20 w-20 text-white drop-shadow-lg md:h-24 md:w-24" />
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                              <span className="text-sm font-medium text-white">Click to explore</span>
                              <ChevronRight className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        </div>

                        {/* Right - Feature Details */}
                        <div className="p-6 md:p-8">
                          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-purple-500">
                            {feature.subtitle}
                          </div>
                          <h3 className="mb-4 text-xl font-bold text-white transition-colors group-hover:text-purple-300 md:text-2xl">
                            {feature.title}
                          </h3>
                          <p className="mb-6 text-sm leading-snug text-white/70 md:text-base">
                            {feature.description}
                          </p>
                          <div className="space-y-2.5">
                            {feature.highlights.map((highlight, i) => (
                              <div key={i} className="flex items-center gap-2.5">
                                <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-400" />
                                <span className="text-sm text-white/60">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[280px] w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] md:h-[380px]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {showcaseFeatures.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === carouselIndex ? 'w-8 bg-purple-500' : 'w-2.5 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm md:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Previous button */}
          <button
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation()
              goPrevSlide()
            }}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          {/* Next button */}
          <button
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation()
              goNextSlide()
            }}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Image Container */}
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={activeFeature.image}
              alt={activeFeature.title}
              width={1920}
              height={1080}
              priority
              className="w-full rounded-xl shadow-2xl"
            />
            {/* Feature info overlay */}
            <div className="absolute bottom-0 left-0 right-0 rounded-b-xl bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
              <div className="mb-2 flex items-center gap-3">
                <activeFeature.icon className="h-8 w-8 text-white" />
                <h3 className="text-2xl font-bold text-white">{activeFeature.title}</h3>
              </div>
              <p className="text-gray-300">{activeFeature.subtitle}</p>
            </div>
          </div>

          {/* Instructions */}
          <p className="absolute bottom-4 text-sm text-white/70">
            Use arrow keys to navigate · Press Esc to close
          </p>
        </div>
      )}
    </section>
  )
}
