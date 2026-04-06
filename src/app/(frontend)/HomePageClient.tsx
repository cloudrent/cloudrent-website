'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Phone,
  Play,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  X,
  CalendarX2,
  PhoneCall,
  Flame,
  Receipt,
  ClipboardList,
  EyeOff,
  AlertTriangle,
  Monitor,
  Smartphone,
  Truck,
  Globe,
  Shield,
  Star,
  BarChart3,
  Users,
  FileText,
  Calendar,
  Camera,
  Mic,
  Bell,
  Route,
  Timer,
  MapPin,
  PenTool,
  ShoppingCart,
  CreditCard,
  Download,
  MessageSquare,
  Clock,
  Wifi,
  Zap,
  Eye,
  FileSignature,
  RefreshCw,
  ScanLine,
  Layout,
  HardHat,
  type LucideIcon,
} from 'lucide-react'

// ─── COUNTDOWN HOOK ───────────────────────────────────────────────────────────
const DEADLINE = new Date('2026-05-01T13:59:59Z')

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

function useCountdown(): TimeLeft {
  const calc = (): TimeLeft => {
    const diff = DEADLINE.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      expired: false,
    }
  }
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calc)
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(calc()), 1000)
    return () => clearInterval(t)
  }, [])
  return timeLeft
}

// ─── VIDEO MODAL ──────────────────────────────────────────────────────────────

function VideoModal({
  isOpen,
  onClose,
  videoSrc,
}: {
  isOpen: boolean
  onClose: () => void
  videoSrc: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen && videoRef.current) videoRef.current.pause()
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        onClick={onClose}
      >
        <X className="h-6 w-6 text-white" />
      </button>
      <div className="relative aspect-video w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <video ref={videoRef} className="h-full w-full rounded-xl" controls autoPlay>
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
      <p className="absolute bottom-4 text-sm text-white/70">Click anywhere or press Esc to close</p>
    </div>
  )
}

// ─── FLOATING FLYOUT CARDS ────────────────────────────────────────────────────

function FlyoutCard({
  className,
  children,
  animationDelay = 0,
  visible = true,
  fadeInDelay = 0,
}: {
  className?: string
  children: React.ReactNode
  animationDelay?: number
  visible?: boolean
  fadeInDelay?: number
}) {
  return (
    <div
      className={`
        absolute z-50 min-w-[200px] max-w-[220px] rounded-2xl
        border border-purple-500/40 bg-[#0e0f14]/95
        p-4 backdrop-blur-xl
        shadow-[0_0_30px_rgba(136,27,169,0.2),0_20px_50px_rgba(0,0,0,0.5)]
        transition-opacity duration-1000 ease-out
        ${visible ? 'opacity-100' : 'pointer-events-none opacity-0'}
        ${className}
      `}
      style={{
        animation: visible ? `float 4s ease-in-out infinite` : 'none',
        animationDelay: `${animationDelay}s`,
        transitionDelay: `${fadeInDelay}s`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-50"
        style={{
          background: 'linear-gradient(135deg, rgba(136,27,169,0.1) 0%, transparent 50%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// ─── PROBLEM CARDS DATA ───────────────────────────────────────────────────────

const problemCards = [
  {
    icon: CalendarX2,
    title: 'Double Bookings',
    subtitle: 'Double bookings that cost you revenue — and credibility',
    description:
      "The same piece of equipment gets promised twice. Now you're scrambling, calling customers back, refunding jobs, and damaging trust.",
  },
  {
    icon: PhoneCall,
    title: 'Constant Phone Calls',
    subtitle: "Your phone never stops — and nothing gets done",
    description:
      "Staff call for updates. Customers chase availability. You're stuck answering questions all day instead of actually running the business.",
  },
  {
    icon: Flame,
    title: 'Dispatch Chaos',
    subtitle: 'Every day starts in chaos — and only gets worse',
    description:
      'Whiteboards, last-minute changes, missing details. Drivers leave without the right info — and jobs go wrong before they even begin.',
  },
  {
    icon: Receipt,
    title: 'Delayed Invoices',
    subtitle: "You've done the work — but you're still not getting paid",
    description:
      'Jobs are complete, but invoices sit in a pile. Days pass. Cash flow slows. Revenue delayed is growth delayed.',
  },
  {
    icon: ClipboardList,
    title: 'Scattered Safety Records',
    subtitle: 'When something goes wrong — you have nothing to prove',
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

// ─── PLATFORM FEATURES DATA ───────────────────────────────────────────────────

const platformFeatures = {
  dashboard: [
    { icon: BarChart3, text: 'Real-time analytics & reports' },
    { icon: FileText, text: 'Bulk invoice generation' },
    { icon: Users, text: 'Customer CRM & history' },
    { icon: Calendar, text: 'Equipment timeline view' },
    { icon: Shield, text: 'Role-based access control' },
  ],
  mobile: [
    { icon: Wifi, text: 'Works offline — syncs on reconnect' },
    { icon: Bell, text: 'Push notifications for jobs' },
    { icon: Camera, text: 'Photo uploads with GPS tags' },
    { icon: Mic, text: 'Voice notes for quick updates' },
    { icon: Clock, text: 'Staff clock in/out tracking' },
  ],
  driver: [
    { icon: Route, text: 'Optimized delivery routes' },
    { icon: PenTool, text: 'Digital proof of delivery' },
    { icon: CheckCircle, text: 'Checklist workflows' },
    { icon: Timer, text: 'Job time tracking' },
    { icon: MapPin, text: 'Live GPS location' },
  ],
  portal: [
    { icon: ShoppingCart, text: 'Online equipment booking' },
    { icon: CreditCard, text: 'Self-service payments' },
    { icon: Download, text: 'Invoice & document access' },
    { icon: MessageSquare, text: 'Quote requests' },
    { icon: Clock, text: 'Available 24/7' },
  ],
}

// ─── TESTIMONIALS DATA ────────────────────────────────────────────────────────

const testimonials = [
  {
    quote:
      'Finally, a rental software system that uses the latest technology so we can access our database from anywhere. CloudRent is much more than just an invoicing tool — it simplifies deliveries and collections with its easy-to-navigate interface!',
    author: 'Cameron Drake-Brockman',
    company: 'HireRite Temporary Fence',
    image: '/images/testimonials/Cam.png',
    initials: 'CD',
  },
  {
    quote:
      'CloudRent is understanding our needs and building an onboarding, training and safety management system to manage workflow, maintenance and job details across civil, mining and transportation.',
    author: 'Theo Tsorvas',
    company: 'Consolidated Group',
    image: '/images/testimonials/Theo.png',
    initials: 'TT',
  },
  {
    quote:
      "Sub rentals and inventory management has always been an issue in other software. The guys at CloudRent are always there for you — they're quick to help with any issue promptly!",
    author: 'David Duncalfe',
    company: 'Excel Events',
    image: '/images/testimonials/David.png',
    initials: 'DD',
  },
]

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────

const faqItems = [
  {
    question: 'Is this suitable for small and multi-location rental businesses?',
    answer:
      'Absolutely. CloudRent Pro scales from single-operator businesses to multi-depot enterprises. Our pricing is per-user, so you only pay for what you need.',
  },
  {
    question: 'Can we manage safety and compliance in the same system?',
    answer:
      'Yes — safety is built in. You get digital SWMS, incident reporting, license tracking with expiry alerts, pre-start checklists, and a full audit trail.',
  },
  {
    question: 'Does it work on mobile?',
    answer:
      'CloudRent Pro includes native mobile apps for iOS and Android. Your team can manage jobs, capture signatures, and access everything — even offline.',
  },
  {
    question: 'Can customers book and pay online?',
    answer:
      'Yes. Your branded customer portal lets customers browse equipment, check availability, make bookings, and pay online — 24/7.',
  },
  {
    question: 'Is this built for Australian businesses?',
    answer:
      '100%. CloudRent Pro is built and hosted in Australia. We handle GST correctly, integrate with Xero, and our support team is Gold Coast-based.',
  },
  {
    question: 'How quickly can we get started?',
    answer:
      'Most businesses are up and running within a day. We offer free data migration and our onboarding team will help you configure everything.',
  },
]

// ─── AGITATION SECTION DATA ──────────────────────────────────────────────────

const agitationBullets = [
  { text: 'Mistakes slip through the cracks and ', bold: 'cost you customers' },
  { text: 'WHS compliance becomes ', bold: 'impossible to prove', suffix: ' after an incident' },
  { text: 'Payments get delayed, ', bold: 'cash flow suffers', suffix: ', growth slows down' },
  { text: 'Good staff leave because their tools ', bold: 'make the job harder' },
  { text: "You can't scale ", bold: "what you can't control" },
]

// ─── INTEGRATED FEATURES DATA ────────────────────────────────────────────────

const integratedFeatures = [
  { icon: Eye, title: 'AI Damage', description: 'Catch Damage Before It Costs You' },
  { icon: FileSignature, title: 'Digital Signatures', description: 'No Paperwork. No Delays.' },
  {
    icon: Calendar,
    title: 'Real-Time Availability',
    description: "Know What's Available — Instantly",
  },
  {
    icon: RefreshCw,
    title: 'Accounting Integration',
    description: 'Your Books Stay Accurate — Automatically',
  },
  { icon: MessageSquare, title: 'Comms Hub', description: 'Stop Chasing Calls & Messages' },
  { icon: Wifi, title: 'Offline Mode', description: 'Work Anywhere — No Downtime' },
  { icon: MapPin, title: 'GPS Tracking', description: 'Know Where Your Equipment & Team Are' },
  { icon: Clock, title: 'Time Clock', description: 'Accurate Hours — Without the Hassle' },
  { icon: Camera, title: 'Photo Inspections', description: 'Proof, Every Time' },
  { icon: BarChart3, title: 'Analytics', description: "See What's Actually Happening" },
]

// ─── OUTCOMES SECTION DATA ───────────────────────────────────────────────────

const outcomesBenefits = [
  {
    title: 'No more double bookings',
    subtitle: 'Every job is accurate — every time',
    description:
      'Live availability across all locations means you never promise the same equipment twice or scramble to fix mistakes.',
  },
  {
    title: 'Fewer phone calls',
    subtitle: 'Your team stops chasing — and starts executing',
    description:
      'Staff, drivers, and customers get what they need instantly in the app — no constant calls, no interruptions.',
  },
  {
    title: 'Invoices go out the same day',
    subtitle: 'Get paid faster — without the backlog',
    description:
      'Completed jobs turn into invoices instantly, so cash flow stays consistent and predictable.',
  },
  {
    title: 'Always audit-ready',
    subtitle: 'Compliance handled — without the stress',
    description:
      'Every signature, inspection, and incident is tracked, timestamped, and ready when you need it.',
  },
  {
    title: 'Full business visibility',
    subtitle: "Know exactly what's happening — at all times",
    description:
      "See where your equipment is, what's overdue, and what needs attention — without chasing information.",
  },
]

const outcomesStats = [
  { value: '87%', label: 'Fewer admin errors' },
  { value: '3.2×', label: 'Faster job processing' },
  { value: '100%', label: 'Audit-ready compliance tracking' },
]

// ─── SOCIAL PROOF SECTION DATA ───────────────────────────────────────────────

const speedMetrics = [
  {
    icon: Clock,
    value: '2-4 weeks',
    label: 'New Features — In Weeks, Not Months',
    description:
      "You don't wait forever for improvements. We ship updates fast so your business keeps evolving.",
  },
  {
    icon: Zap,
    value: '24hr',
    label: 'Issues Fixed Before They Slow You Down',
    description:
      "Bugs don't sit in a queue for weeks. We resolve problems quickly so your operations keep running smoothly.",
  },
  {
    icon: Users,
    value: 'Direct',
    label: 'Talk Directly to the People Building It',
    description:
      'No layers. No ticket black holes. Get direct access to our team — and actually be heard.',
  },
]

const trustBadges = [
  { icon: Shield, label: '30-Day Money Back', sublabel: 'No questions asked', isAustralian: false },
  {
    icon: CheckCircle,
    label: 'Australian Built',
    sublabel: 'Gold Coast-based team',
    isAustralian: true,
  },
  { icon: Zap, label: 'Free Migration', sublabel: "We'll move your data", isAustralian: false },
]

// ─── FEATURE SHOWCASE CAROUSEL DATA ──────────────────────────────────────────

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

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function HomePageClient() {
  const { days, hours, minutes, seconds, expired } = useCountdown()
  const [showFlyouts, setShowFlyouts] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Feature Spotlight carousel state
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const activeFeature = showcaseFeatures[carouselIndex]

  useEffect(() => {
    const timer = setTimeout(() => setShowFlyouts(true), 3000)
    return () => clearTimeout(timer)
  }, [])

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
    <div className="min-h-screen">
      {/* CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>


      {/* ═══════════════════════════════════════════════════════════════════════
          COUNTDOWN BANNER
      ═══════════════════════════════════════════════════════════════════════ */}
      {!expired && (
        <div className="relative z-40 border-b border-green-500/20 bg-green-500/5 py-3">
          <div className="mx-auto flex max-w-7xl items-center justify-center px-5">
            <div className="inline-flex items-center gap-3 rounded-full border border-green-500/25 bg-green-500/10 px-5 py-2 backdrop-blur-sm">
              <span className="relative flex h-4 w-4 flex-shrink-0">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
                  style={{ animationDuration: '2s' }}
                />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500 shadow-[0_0_15px_rgba(74,222,128,1)]" />
              </span>
              <span className="text-sm text-green-100">
                <strong className="text-white">$85/user/month locked for life</strong>
                <span className="text-green-300/80"> · All Modules</span>
                <span className="text-green-300/60"> · Closes in </span>
                <span className="font-bold tabular-nums text-white">
                  {days}d {String(hours).padStart(2, '0')}h {String(minutes).padStart(2, '0')}m{' '}
                  {String(seconds).padStart(2, '0')}s
                </span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden pb-8 pt-12">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[700px] w-[1200px] -translate-x-1/2"
          style={{
            background: 'radial-gradient(ellipse at 50% 20%, rgba(136,27,169,0.15) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Column - Headlines */}
            <div className="text-left">
              <h1 className="mb-6 text-4xl font-black leading-[0.95] tracking-tight text-white md:text-5xl lg:text-6xl">
                Still Juggling Multiple Systems?{' '}
                <span className="block bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                  Run Your Entire Hire Business in One Platform — Not Five.
                </span>
              </h1>

              <p className="mb-4 text-xl font-medium text-white/70 md:text-2xl">
                No more missed jobs. No more double handling. No more chaos.
              </p>

              <p className="mb-8 max-w-lg text-lg leading-snug text-white/55">
                Manage bookings, dispatch, invoicing, and safety — all in one system built for hire
                businesses.
              </p>

              {/* CTAs */}
              <div className="mb-8 flex flex-wrap gap-3">
                <a
                  href="https://app.cloudrent.me/register"
                  className="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-purple-600 px-7 py-4 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(136,27,169,0.45)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <div className="relative z-10 flex flex-col items-start">
                    <span className="text-[15px] font-bold">Start Your $1 Trial</span>
                    <span className="text-[11px] font-normal text-white/55">
                      Full access · No setup · Cancel anytime
                    </span>
                  </div>
                  <ChevronRight className="relative z-10 h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                </a>

                <Link
                  href="/videos"
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-5 py-4 text-sm font-medium text-white/80 transition-all hover:border-white/40 hover:bg-white/[0.10] hover:text-white"
                >
                  <Play className="h-4 w-4" />
                  Watch 2-min demo
                </Link>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/35">
                {['Full access', 'No setup', 'Cancel anytime'].map((chip, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle className="h-3 w-3 text-green-500/70" />
                    {chip}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Dashboard + Flyouts */}
            <div className="relative overflow-visible lg:pl-4">
              <div className="relative lg:my-10 lg:origin-center lg:scale-[1.15]">
                {/* Dashboard glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-60"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(136,27,169,0.2) 0%, transparent 70%)',
                    transform: 'scale(1.1)',
                    filter: 'blur(40px)',
                  }}
                />

                {/* Dashboard Image */}
                <Image
                  src="/images/cloudrent-pro-dashboard-imacs-dark.webp"
                  alt="CloudRent Pro Dashboard"
                  width={2503}
                  height={1906}
                  priority
                  className="relative z-10 w-full rounded-xl shadow-2xl shadow-black/50"
                />

                {/* Flyout: Today's Revenue */}
                <FlyoutCard
                  className="left-[0%] -top-[5%] hidden lg:-left-[8%] lg:block"
                  animationDelay={0}
                  visible={showFlyouts}
                  fadeInDelay={0}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20">
                      <span className="text-sm">💰</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                      Today&apos;s Revenue
                    </span>
                  </div>
                  <div className="text-3xl font-black text-white">$1,550</div>
                  <div className="mb-2 text-xs text-white/40">Across 7 active rentals</div>
                  <div className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2 py-1 text-[10px] font-bold text-green-400">
                    ↑ 18% vs last week
                  </div>
                </FlyoutCard>

                {/* Flyout: Maintenance Alert */}
                <FlyoutCard
                  className="-bottom-[6%] left-[6%] hidden lg:left-[0%] lg:block"
                  animationDelay={0.8}
                  visible={showFlyouts}
                  fadeInDelay={0.3}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20">
                      <span className="text-sm">🔧</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                      Maintenance Alert
                    </span>
                  </div>
                  <div className="mb-0.5 text-sm font-bold text-white">Service Due in 3 Days</div>
                  <div className="mb-2 text-xs text-white/40">20T Excavator · 250 hrs</div>
                  <div className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-1 text-[10px] font-bold text-amber-400">
                    ⚠ Schedule now
                  </div>
                </FlyoutCard>

                {/* Flyout: AI Damage Detection */}
                <FlyoutCard
                  className="-right-[5%] -top-[16%] hidden lg:-right-[12%] lg:block"
                  animationDelay={0.4}
                  visible={showFlyouts}
                  fadeInDelay={0.6}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20">
                      <span className="text-sm">🔍</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                      AI Damage Detection
                    </span>
                  </div>
                  <div className="mb-1 text-sm font-bold text-white">Scratch · Right Side Panel</div>
                  <div className="mb-1 text-xs text-white/40">
                    Est. repair: <span className="text-white/70">$50</span>
                  </div>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-white/40">AI Confidence</span>
                    <span className="font-bold text-purple-400">92%</span>
                  </div>
                  <div className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-1 text-[10px] font-bold text-amber-400">
                    MODERATE severity
                  </div>
                </FlyoutCard>

                {/* Flyout: Safety Compliance */}
                <FlyoutCard
                  className="-bottom-[2%] -right-[3%] hidden lg:-right-[10%] lg:block"
                  animationDelay={1.2}
                  visible={showFlyouts}
                  fadeInDelay={0.9}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/20">
                      <span className="text-sm">🛡️</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                      Safety Compliance
                    </span>
                  </div>
                  <div className="text-3xl font-black text-white">100%</div>
                  <div className="mb-2 text-xs text-white/40">SWMS signed · 5 active jobs</div>
                  <div className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2 py-1 text-[10px] font-bold text-green-400">
                    ✓ Audit ready
                  </div>
                </FlyoutCard>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Strip */}
        <div className="relative z-10 mt-12 border-t border-white/[0.05] bg-black/20 py-8">
          <div className="mx-auto max-w-7xl px-5">
            <p className="mb-6 text-center text-sm text-white/40">
              Trusted by hire & rental businesses across Australia
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
              {[
                { src: '/images/logos/Sydney-metro-scafs.png', alt: 'Sydney Metro Scaffolds' },
                { src: '/images/logos/Safe-hire.png', alt: 'Safe Hire' },
                { src: '/images/logos/Excel-events.png', alt: 'Excel Event Equipment Hire' },
                { src: '/images/logos/Red-star-fence.png', alt: 'Red Star Fence' },
                { src: '/images/logos/Micro-rentals.png', alt: 'Micro Rentals' },
              ].map((logo, i) => (
                <Image
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={78}
                  className="h-[60px] w-auto object-contain opacity-60 brightness-0 invert transition-opacity hover:opacity-100"
                />
              ))}
            </div>

            {/* Integrations */}
            <div className="mt-8 border-t border-white/[0.05] pt-6">
              <p className="mb-4 text-center text-sm text-white/40">Integrates with</p>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/logos/xero-quickbooks-MYOB.png"
                  alt="Xero, QuickBooks, MYOB integrations"
                  width={740}
                  height={179}
                  className="h-12 w-auto object-contain opacity-70 transition-opacity hover:opacity-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PROBLEM SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════════════════════════════════
          AGITATION SECTION - WARNING BOX
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden py-16">
        <div className="mx-auto max-w-6xl px-5">
          {/* Contained warning box with hazard stripes */}
          <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0a]">
            {/* Hazard stripes - top */}
            <div
              className="h-4"
              style={{
                background:
                  'repeating-linear-gradient(45deg, #000 0px, #000 12px, #f59e0b 12px, #f59e0b 24px)',
              }}
            />

            {/* Amber ambient glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 20% 50%, rgba(245,158,11,0.08) 0%, transparent 50%)',
              }}
            />

            <div className="relative z-10 px-8 py-10">
              <div className="grid items-center gap-10 md:grid-cols-2">
                {/* Left - Warning beacon + Headline */}
                <div>
                  {/* Pulsing warning light */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative">
                      <div
                        className="absolute inset-0 animate-ping rounded-full bg-amber-500 opacity-75"
                        style={{ animationDuration: '1.5s' }}
                      />
                      <div
                        className="absolute inset-0 scale-150 rounded-full bg-amber-500/50 blur-xl"
                        style={{ animation: 'pulse 1.5s ease-in-out infinite' }}
                      />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 shadow-[0_0_60px_rgba(245,158,11,0.9),0_0_100px_rgba(245,158,11,0.5)]">
                        <AlertTriangle className="h-8 w-8 text-black" />
                      </div>
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-amber-500">
                      Warning
                    </span>
                  </div>

                  <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">
                    It&apos;s not just
                    <br />
                    inefficient —
                    <br />
                    <span className="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">
                      it&apos;s risky.
                    </span>
                  </h2>
                  <p className="mt-4 text-xl font-medium text-white/60 md:text-2xl">
                    Every workaround you&apos;ve built is a{' '}
                    <span className="font-bold text-white">liability</span> waiting to surface.
                  </p>
                </div>

                {/* Right - Bullet Points */}
                <div className="space-y-4">
                  {agitationBullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-4 text-lg text-white/80">
                      <AlertTriangle className="mt-0.5 h-8 w-8 flex-shrink-0 text-amber-500" />
                      <span>
                        {bullet.text}
                        <strong className="font-semibold text-white">{bullet.bold}</strong>
                        {bullet.suffix || ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hazard stripes - bottom */}
            <div
              className="h-4"
              style={{
                background:
                  'repeating-linear-gradient(45deg, #000 0px, #000 12px, #f59e0b 12px, #f59e0b 24px)',
              }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SOLUTION SECTION - MEET CLOUDRENT PRO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden py-20">
        {/* Background ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(136,27,169,0.08) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              The Solution
            </p>
            <h2 className="mb-4 text-4xl font-black leading-tight text-white md:text-5xl">
              Meet CloudRent Pro —
              <br />
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                the system that runs your entire hire business
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Stop stitching tools together. Get complete control, real-time visibility, and a
              system your team actually uses.
            </p>
          </div>

          {/* Multi-device mockup */}
          <div className="mb-12">
            <Image
              src="/images/cloudrent-pro-devices-dark.webp"
              alt="CloudRent Pro running on desktop, laptop, and tablet"
              width={1920}
              height={1080}
              className="mx-auto w-full max-w-5xl"
            />
          </div>

          {/* Subheading */}
          <p className="mb-8 text-center text-sm text-white/60">Hover to explore each platform</p>

          {/* Platform Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Monitor,
                title: 'Web Dashboard',
                desc: 'Office command centre for bookings, invoicing & reports',
                color: 'from-purple-500 to-fuchsia-500',
                border: 'border-purple-500/20',
                features: platformFeatures.dashboard,
              },
              {
                icon: Smartphone,
                title: 'Mobile Admin',
                desc: 'Full control on the go, works offline',
                color: 'from-blue-500 to-cyan-500',
                border: 'border-blue-500/20',
                features: platformFeatures.mobile,
              },
              {
                icon: Truck,
                title: 'Driver App',
                desc: 'Field crew deliveries, pickups & digital signatures',
                color: 'from-orange-500 to-amber-500',
                border: 'border-orange-500/20',
                features: platformFeatures.driver,
              },
              {
                icon: Globe,
                title: 'Customer Portal',
                desc: '24/7 self-service bookings for your customers',
                color: 'from-emerald-500 to-teal-500',
                border: 'border-emerald-500/20',
                features: platformFeatures.portal,
              },
            ].map((platform, i) => (
              <div
                key={i}
                className={`group rounded-2xl border bg-white/[0.02] p-6 transition-all hover:-translate-y-1 hover:bg-white/[0.05] ${platform.border}`}
              >
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${platform.color}`}
                >
                  <platform.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-1 text-lg font-bold text-white">{platform.title}</h3>
                <p className="mb-4 text-sm text-white/50">{platform.desc}</p>
                <div className="space-y-2">
                  {platform.features.slice(0, 3).map((feature, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-white/60">
                      <feature.icon className="h-3.5 w-3.5 text-purple-400" />
                      {feature.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom connector line */}
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/60" />
              <span>All synced in real-time</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/60" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          INTEGRATED FEATURES SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden py-20">
        <div className="relative z-10 mx-auto max-w-6xl px-5">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              Integrated Features
            </p>
            <h2 className="mb-4 text-4xl font-black leading-tight text-white md:text-5xl">
              Everything Works Together —
              <br />
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                Automatically
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-white/70">
              Stop switching between systems, chasing updates, and fixing mistakes. CloudRent Pro
              connects everything — so your business runs smoothly without constant input.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {integratedFeatures.map((feature, i) => (
              <div
                key={i}
                className="group rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 text-center transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.06]"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-500/15 transition-colors group-hover:bg-purple-500/25">
                  <feature.icon className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="mb-2 text-sm font-bold uppercase leading-snug tracking-wide text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-snug text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURE SPOTLIGHT CAROUSEL
      ═══════════════════════════════════════════════════════════════════════ */}
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
                {showcaseFeatures.map((feature) => (
                  <div key={feature.id} className="w-full flex-shrink-0">
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

      {/* ═══════════════════════════════════════════════════════════════════════
          OUTCOMES SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#0a0a12] py-20">
        {/* Subtle gradient */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 h-32"
          style={{
            background: 'linear-gradient(to bottom, rgba(136,27,169,0.05) 0%, transparent 100%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5">
          {/* Section Header */}
          <div className="mb-12">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              What Changes
            </p>
            <h2 className="text-4xl font-black leading-tight text-white md:text-5xl">
              What Changes When
              <br />
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                You Make The Switch
              </span>
            </h2>
          </div>

          {/* Two Column Layout */}
          <div className="grid items-start gap-10 lg:grid-cols-2">
            {/* Left - Benefits List */}
            <div className="space-y-3">
              {outcomesBenefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 border-b border-white/[0.06] pb-3 last:border-0"
                >
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
                    <p className="mb-1 text-base font-semibold text-purple-500">{benefit.subtitle}</p>
                    <p className="text-sm leading-snug text-white/60">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right - Stats Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0e0f14] p-8">
              <div className="space-y-8">
                {outcomesStats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="mb-3 bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-7xl font-black text-transparent md:text-8xl">
                      {stat.value}
                    </div>
                    <p className="text-lg font-bold text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href="https://app.cloudrent.me/register"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-4 font-semibold text-white transition-all hover:bg-purple-500 hover:shadow-[0_8px_32px_rgba(136,27,169,0.4)]"
              >
                Start Your $1 Trial →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WE SHIP FAST SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden py-20">
        {/* Background ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(136,27,169,0.06) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
              Built Different
            </p>
            <h2 className="mb-4 text-4xl font-black leading-tight text-white md:text-5xl">
              We Ship Fast —{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                So You Don&apos;t Stay Stuck
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Stop waiting months for features while your business struggles. We listen, build, and
              deliver quickly — so you can keep moving forward.
            </p>
          </div>

          {/* Speed Metrics */}
          <div className="mb-16 grid gap-5 md:grid-cols-3">
            {speedMetrics.map((metric, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.06]"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/15 transition-colors group-hover:bg-purple-500/25">
                  <metric.icon className="h-7 w-7 text-purple-500" />
                </div>
                <div className="mb-2 text-3xl font-black text-white md:text-4xl">{metric.value}</div>
                <p className="mb-2 font-medium text-white">{metric.label}</p>
                <p className="text-sm leading-snug text-white/70">{metric.description}</p>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
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
                  ) : (
                    <badge.icon className="h-6 w-6 text-green-400" />
                  )}
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

      {/* ═══════════════════════════════════════════════════════════════════════
          TESTIMONIALS SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">
              <Star className="h-4 w-4 fill-green-400 text-green-400" />
              <span className="text-sm font-medium text-green-400">
                Trusted by hire businesses across Australia
              </span>
            </div>
            <h2 className="text-4xl font-black text-white md:text-5xl">
              What our{' '}
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                customers say
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.05]"
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 flex-grow text-sm italic leading-relaxed text-white/70">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-auto flex items-center gap-4 border-t border-white/10 pt-4">
                  {testimonial.image ? (
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-purple-500/30 object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20">
                      <span className="font-semibold text-purple-400">{testimonial.initials}</span>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-white/50">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          LAUNCH PARTNER CTA SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-20">
        <div className="mx-auto max-w-4xl px-5">
          <div className="overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-900/40 to-purple-900/20 p-8 text-center md:p-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-green-300">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Limited to first 100 launch partners
            </div>

            <h2 className="mb-2 text-4xl font-black text-white md:text-5xl">
              Lock in{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                $85
              </span>
              <span className="text-xl text-white/70">/user/month</span>
            </h2>
            <p className="mb-8 text-white/40">— locked in for life —</p>

            <div className="mb-8 inline-flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
              {['Every module included', 'Priority onboarding', 'Direct developer access'].map(
                (item, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    {item}
                  </span>
                ),
              )}
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://app.cloudrent.me/launch"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition-all hover:bg-green-500 hover:shadow-[0_8px_32px_rgba(34,197,94,0.3)] sm:w-auto"
              >
                Lock in Launch Partner Pricing
                <ChevronRight className="h-5 w-5" />
              </a>
              <Link
                href="/demo"
                className="flex items-center gap-2 text-white/60 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" />
                Book a demo first
              </Link>
            </div>

            {/* Countdown */}
            {!expired && (
              <div className="mt-8 border-t border-white/[0.08] pt-8">
                <p className="mb-4 text-xs uppercase tracking-wider text-white/40">Offer closes in</p>
                <div className="flex items-center justify-center gap-2">
                  {[
                    { value: days, label: 'Days' },
                    { value: hours, label: 'Hrs' },
                    { value: minutes, label: 'Min' },
                    { value: seconds, label: 'Sec' },
                  ].map((unit, i) => (
                    <div key={i} className="min-w-[60px] rounded-lg bg-white/[0.05] px-3 py-2">
                      <div className="text-2xl font-bold tabular-nums text-white">
                        {String(unit.value).padStart(2, '0')}
                      </div>
                      <div className="text-[9px] uppercase text-white/30">{unit.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-white/70">Got questions? We&apos;ve got answers.</p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <span className="pr-4 font-medium text-white">{item.question}</span>
                  <ChevronRight
                    className={`h-5 w-5 flex-shrink-0 text-white/40 transition-transform ${
                      openFaq === i ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm leading-snug text-white/60">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-white/40">
            Still have questions?{' '}
            <Link href="/demo" className="text-purple-400 hover:text-purple-300">
              Book a 20-minute demo with our team →
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
