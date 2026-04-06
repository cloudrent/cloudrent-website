'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import {
  Play,
  CheckCircle,
  ChevronRight,
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
} from 'lucide-react'

// Dynamically import the carousel to reduce initial bundle size
const FeatureCarousel = dynamic(() => import('@/components/FeatureCarousel'), {
  loading: () => (
    <section className="relative w-full overflow-hidden bg-[#0a0a12] py-20">
      <div className="mx-auto max-w-6xl px-5">
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
        </div>
        <div className="h-[380px] w-full animate-pulse rounded-2xl bg-white/[0.05]" />
      </div>
    </section>
  ),
  ssr: false,
})

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
    headline: 'We can now run our entire rental business from anywhere.',
    quote: 'CloudRent replaced multiple systems with one platform for bookings, logistics, and invoicing.',
    closing: 'Finally — a system that fits how we operate.',
    author: 'Cameron Drake-Brockman',
    company: 'HireRite Temporary Fence',
    image: '/images/testimonials/Cam.png',
    initials: 'CD',
  },
  {
    headline: 'We finally consolidated everything into one system.',
    quote: 'Before CloudRent, we were juggling tools across operations, safety, and maintenance.',
    closing: 'Now we have full visibility and control.',
    author: 'Theo Tsorvas',
    company: 'Consolidated Group',
    image: '/images/testimonials/Theo.png',
    initials: 'TT',
  },
  {
    headline: "The best rental software we've used — by far.",
    quote: 'Sub-rentals and inventory used to be a constant headache. CloudRent solved it.',
    closing: 'The platform keeps improving — and the support is outstanding.',
    author: 'David Duncalfe',
    company: 'Excel Events',
    image: '/images/testimonials/David.png',
    initials: 'DD',
  },
]

// ─── LAUNCH PARTNER BENEFITS DATA ────────────────────────────────────────────

const launchPartnerBenefits = [
  { icon: Shield, title: 'Never Pay More', description: 'Your price is locked permanently — no future increases' },
  { icon: Zap, title: 'Everything Included', description: 'All modules, integrations, and future updates' },
  { icon: Star, title: 'Priority Onboarding', description: 'Get set up faster with direct support from our team' },
  { icon: Users, title: 'Direct Access', description: 'Work directly with the people building the product' },
  { icon: MessageSquare, title: 'Influence the Platform', description: 'Your feedback helps shape what gets built next' },
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

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function HomePageClient() {
  const { days, hours, minutes, seconds, expired } = useCountdown()
  const [showFlyouts, setShowFlyouts] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowFlyouts(true), 3000)
    return () => clearTimeout(timer)
  }, [])

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
                  loading="lazy"
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
                  loading="lazy"
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

              {/* Safety Module Screenshot */}
              <div className="mt-10">
                <Image
                  src="/images/cloudrent-safety-module.webp"
                  alt="CloudRent Pro Safety & Compliance Module"
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="w-full rounded-xl shadow-2xl shadow-black/50"
                />
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
              loading="lazy"
              className="mx-auto w-full max-w-5xl"
            />
          </div>

          {/* Subheading */}
          <p className="mb-8 text-center text-sm text-white/60">Hover to explore each platform</p>

          {/* Platform Cards with Mini Mockups - Desktop */}
          <div className="relative hidden lg:block">
            {/* Curved connector SVG */}
            <svg
              className="pointer-events-none absolute inset-x-0 bottom-0 w-full"
              style={{ height: 80, bottom: -40 }}
              viewBox="0 0 1000 80"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="connectorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9731CB" />
                  <stop offset="50%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#9731CB" />
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Curved path connecting all 4 cards */}
              <path
                d="M 125 0 Q 125 60, 250 60 Q 375 60, 375 0 M 375 0 Q 375 70, 500 70 Q 625 70, 625 0 M 625 0 Q 625 60, 750 60 Q 875 60, 875 0"
                fill="none"
                stroke="url(#connectorGradient)"
                strokeWidth="2"
                filter="url(#glow)"
                opacity="0.8"
              />
              {/* Pulsing dots at connection points */}
              {[125, 375, 625, 875].map((x, i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={0}
                  r="4"
                  fill="#9731CB"
                  filter="url(#glow)"
                  className="animate-pulse"
                />
              ))}
            </svg>

            <div className="grid grid-cols-4 gap-3">
              {/* Web Dashboard Card */}
              <div className="group flex flex-col items-center gap-4 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[#110a1a] to-[#0a0a14] px-4 py-5 transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/30 hover:shadow-[0_0_50px_rgba(136,27,169,0.2)]">
                <div className="flex w-full items-center gap-2">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-purple-500/25 bg-[#2d0a42]">
                    <Monitor className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold leading-tight text-white">Web dashboard</div>
                    <div className="text-[12px] text-white/60">Office command centre</div>
                  </div>
                </div>
                {/* Mini mockup */}
                <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#111827] text-[9px]">
                  <div className="flex justify-between bg-purple-600 px-2.5 py-1.5">
                    <span className="text-white/60">app.cloudrent.me</span>
                    <span className="text-white/70">9:41 AM</span>
                  </div>
                  <div className="grid grid-cols-4 gap-px bg-white/[0.04] p-px">
                    {[
                      { val: '47', lbl: 'Active', c: 'text-purple-400' },
                      { val: '$124K', lbl: 'Revenue', c: 'text-green-400' },
                      { val: '234', lbl: 'Equip', c: 'text-blue-400' },
                      { val: '189', lbl: 'Custs', c: 'text-orange-400' },
                    ].map((s, i) => (
                      <div key={i} className="bg-[#0f172a] p-1.5 text-center">
                        <div className={`text-[11px] font-bold tabular-nums ${s.c}`}>{s.val}</div>
                        <div className="text-white/25">{s.lbl}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2">
                    <div className="mb-1.5 text-white/25">Revenue (7 days)</div>
                    <div className="flex h-8 items-end gap-0.5">
                      {[55, 40, 75, 50, 90, 65, 85].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-purple-600 to-purple-400"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Admin Card */}
              <div className="group flex flex-col items-center gap-4 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[#080e1a] to-[#0a0a14] px-4 py-5 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-[0_0_50px_rgba(96,165,250,0.15)]">
                <div className="flex w-full items-center gap-2">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-blue-500/25 bg-[#0c1e42]">
                    <Smartphone className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold leading-tight text-white">Mobile admin</div>
                    <div className="text-[12px] text-white/60">On the go, online or off</div>
                  </div>
                </div>
                {/* Mini phone mockup */}
                <div className="w-[108px] overflow-hidden rounded-[20px] border-2 border-white/10 bg-[#1a1a2e]">
                  <div className="flex justify-between bg-[#0f0f1a] px-2.5 py-1.5 text-[7px] text-white/30">
                    <span>9:41</span>
                    <span>⚡87%</span>
                  </div>
                  <div className="bg-purple-600 px-2.5 py-1.5">
                    <div className="text-[9px] font-medium text-white">Hi Sarah 👋</div>
                    <div className="text-[7px] text-white/55">8 jobs today</div>
                  </div>
                  <div className="grid grid-cols-2 gap-px bg-[#111827] p-0.5">
                    {[
                      { v: '3', l: 'Overdue', c: 'bg-red-600' },
                      { v: '7', l: 'Services', c: 'bg-blue-600' },
                      { v: '5', l: 'Pickups', c: 'bg-green-600' },
                      { v: '8', l: 'Deliveries', c: 'bg-orange-500' },
                    ].map((s, i) => (
                      <div key={i} className={`${s.c} rounded-lg p-1.5 text-center text-white`}>
                        <div className="text-sm font-bold">{s.v}</div>
                        <div className="text-[6px] opacity-70">{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mx-1.5 mb-1.5 mt-1 rounded-lg bg-[#0f172a] p-1.5">
                    <div className="mb-0.5 text-[6px] text-white/25">Today&apos;s revenue</div>
                    <div className="text-[11px] font-bold tabular-nums text-purple-400">$4,650</div>
                  </div>
                </div>
              </div>

              {/* Driver App Card */}
              <div className="group flex flex-col items-center gap-4 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[#110c07] to-[#0a0a14] px-4 py-5 transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/30 hover:shadow-[0_0_50px_rgba(251,146,60,0.15)]">
                <div className="flex w-full items-center gap-2">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-orange-500/25 bg-[#2d1408]">
                    <Truck className="h-4 w-4 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold leading-tight text-white">Driver app</div>
                    <div className="text-[12px] text-white/60">Field team connected</div>
                  </div>
                </div>
                {/* Mini driver app mockup */}
                <div className="w-[108px] overflow-hidden rounded-[20px] border-2 border-white/10 bg-[#1a1208]">
                  <div className="flex justify-between bg-[#0a0906] px-2.5 py-1.5 text-[7px] text-white/30">
                    <span>9:41</span>
                    <span>📶</span>
                  </div>
                  <div className="bg-orange-500 px-2 py-1.5">
                    <div className="mb-0.5 flex items-center gap-1">
                      <Truck className="h-2 w-2 text-white" />
                      <span className="text-[7px] font-semibold uppercase tracking-wide text-white">
                        In progress
                      </span>
                    </div>
                    <div className="truncate text-[10px] font-bold text-white">ABC Construction</div>
                    <div className="mt-0.5 flex items-center gap-0.5 text-[6px] text-white/70">
                      <MapPin className="h-1.5 w-1.5" />
                      123 Builder St
                    </div>
                  </div>
                  <div className="bg-[#111] px-1.5 py-2 text-center">
                    <div className="mb-0.5 text-[6px] uppercase text-white/25">Time on job</div>
                    <div className="font-mono text-base font-bold tabular-nums text-white">
                      00:152:34
                    </div>
                    <div className="mt-1.5 flex justify-center gap-1">
                      <div className="flex items-center gap-0.5 rounded-full bg-orange-500 px-1.5 py-0.5 text-[6px] text-white">
                        Pause
                      </div>
                      <div className="flex items-center gap-0.5 rounded-full bg-green-600 px-1.5 py-0.5 text-[6px] text-white">
                        ✓ Done
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#0d0d0d] px-2 py-1.5">
                    <div className="mb-1 text-[6px] uppercase text-white/25">Items to deliver</div>
                    {['Excavator 5T', 'Safety Kit', 'Fuel Can'].map((item, i) => (
                      <div key={i} className="flex items-center gap-1 py-0.5 text-[8px] text-white/45">
                        <CheckCircle className="h-2 w-2 flex-shrink-0 text-green-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Customer Portal Card */}
              <div className="group flex flex-col items-center gap-4 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[#07110d] to-[#0a0a14] px-4 py-5 transition-all duration-500 hover:-translate-y-2 hover:border-green-500/30 hover:shadow-[0_0_50px_rgba(52,211,153,0.15)]">
                <div className="flex w-full items-center gap-2">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-green-500/25 bg-[#04241a]">
                    <Globe className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold leading-tight text-white">
                      24/7 customer portal
                    </div>
                    <div className="text-[12px] text-white/60">Your customers, always served</div>
                  </div>
                </div>
                {/* Mini portal mockup */}
                <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#0d1f17] text-[8px]">
                  <div className="flex items-center gap-1.5 bg-[#111827] px-2 py-1">
                    <div className="flex gap-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    </div>
                    <div className="flex flex-1 items-center gap-1 truncate rounded bg-[#0f172a] px-1.5 py-0.5 text-[6px] text-white/25">
                      <Globe className="h-1.5 w-1.5 flex-shrink-0" />
                      hire.abcconstruction.com.au
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-700 to-emerald-600 px-2 py-1.5">
                    <div className="mb-0.5 text-[8px] font-bold text-white">Equipment Catalogue</div>
                    <div className="flex items-center gap-1 rounded bg-white/20 px-1.5 py-0.5 text-[6px] text-white/55">
                      Search equipment...
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1 p-1.5">
                    {[
                      { name: 'Mini Excavator 1.7T', price: '$185', avail: true },
                      { name: 'Excavator 5T', price: '$320', avail: true },
                      { name: 'Skid Steer', price: '$275', avail: false },
                      { name: 'Plate Compactor', price: '$85', avail: true },
                    ].map((item, i) => (
                      <div key={i} className="rounded-lg border border-white/[0.04] bg-[#111f17] p-1">
                        <div className="mb-0.5 truncate text-[6px] text-white/70">{item.name}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-[7px] font-bold text-green-400">
                            {item.price}
                            <span className="text-[5px] text-white/20">/d</span>
                          </span>
                          <span
                            className={`rounded px-1 py-0.5 text-[5px] ${item.avail ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}
                          >
                            {item.avail ? '✓ Avail' : 'Booked'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile stacked version */}
          <div className="space-y-3 lg:hidden">
            {[
              {
                icon: Monitor,
                title: 'Web Dashboard',
                desc: 'Office command centre for bookings, invoicing & reports',
                color: 'from-purple-500 to-fuchsia-500',
                border: 'border-purple-500/20',
              },
              {
                icon: Smartphone,
                title: 'Mobile Admin',
                desc: 'Full control on the go, works offline',
                color: 'from-blue-500 to-cyan-500',
                border: 'border-blue-500/20',
              },
              {
                icon: Truck,
                title: 'Driver App',
                desc: 'Field crew deliveries, pickups & digital signatures',
                color: 'from-orange-500 to-amber-500',
                border: 'border-orange-500/20',
              },
              {
                icon: Globe,
                title: 'Customer Portal',
                desc: '24/7 self-service bookings for your customers',
                color: 'from-emerald-500 to-teal-500',
                border: 'border-emerald-500/20',
              },
            ].map((platform, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 rounded-2xl border bg-white/[0.03] p-4 ${platform.border}`}
              >
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${platform.color}`}
                >
                  <platform.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{platform.title}</h3>
                  <p className="text-xs text-white/40">{platform.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom connector line */}
          <div className="mt-12 flex items-center justify-center">
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

      {/* ════════════════════════════════════���══════════════════════════════════
          FEATURE SPOTLIGHT CAROUSEL (Dynamically Loaded)
      ═══════════════════════════════════════════════════════════════════════ */}
      <FeatureCarousel />

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
          <div className="grid gap-5 md:grid-cols-3">
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TESTIMONIALS SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
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
                <h3 className="mb-3 text-lg font-bold text-white">
                  &ldquo;{t.headline}&rdquo;
                </h3>

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
          LAUNCH PARTNER SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#0f0a1a] py-16">
        <div className="relative z-10 mx-auto max-w-6xl px-5">
          {/* Prominent Header Badge */}
          <div className="mb-8 text-center">
            <div className="mb-5 flex items-center justify-center gap-4">
              {/* Green pulsing beacon */}
              <div className="relative">
                <div
                  className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-75"
                  style={{ animationDuration: '1.5s' }}
                />
                <div
                  className="absolute inset-0 scale-150 rounded-full bg-green-500/50 blur-xl"
                  style={{ animation: 'pulse 1.5s ease-in-out infinite' }}
                />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-[0_0_60px_rgba(34,197,94,0.9),0_0_100px_rgba(34,197,94,0.5)]">
                  <Zap className="h-7 w-7 text-black" />
                </div>
              </div>
              <span className="text-lg font-bold uppercase tracking-widest text-green-500">
                Limited Launch Offer
              </span>
            </div>
            <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">
              Join the First 100 Launch Partners
              <br />
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                on CloudRent Pro
              </span>
            </h2>
          </div>

          {/* Main Card Container */}
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              background:
                'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 40%, #3d1a2a 70%, #2d1515 100%)',
              border: '1px solid rgba(136,27,169,0.3)',
              boxShadow:
                '0 25px 80px rgba(136,27,169,0.2), 0 0 0 1px rgba(255,255,255,0.05) inset',
            }}
          >
            {/* Ambient glow inside card */}
            <div
              className="pointer-events-none absolute left-1/4 top-0 h-64 w-64 opacity-40"
              style={{ background: 'radial-gradient(circle, #9731CB 0%, transparent 70%)' }}
            />
            <div
              className="pointer-events-none absolute bottom-0 right-1/4 h-48 w-48 opacity-25"
              style={{ background: 'radial-gradient(circle, #dc2626 0%, transparent 70%)' }}
            />

            <div className="relative z-10 p-8 md:p-12">
              {/* Main Content Grid - Card + Story */}
              <div className="mb-10 grid items-center gap-12 lg:grid-cols-2">
                {/* Left - Member Card Image */}
                <div className="flex justify-center lg:justify-center">
                  <Image
                    src="/images/cloudrent-founders-club.webp"
                    alt="CloudRent Pro Launch Partner Member Card"
                    width={400}
                    height={250}
                    loading="lazy"
                    className="w-full max-w-[400px] drop-shadow-2xl"
                    style={{ filter: 'drop-shadow(0 25px 50px rgba(136,27,169,0.4))' }}
                  />
                </div>

                {/* Right - Story & Value Statement */}
                <div className="text-center lg:text-left">
                  <p className="mb-6 text-lg leading-snug text-white/60">
                    We&apos;ve been helping hire businesses since 2017.
                    <br />
                    CloudRent Pro is our next evolution — rebuilt from the ground up based on
                    real-world operations.
                    <br />
                    <span className="font-medium text-white">
                      Now we&apos;re opening it to a small group of launch partners.
                    </span>
                  </p>
                  <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                    Run your entire hire business on one system — without the chaos.
                  </h3>
                  <p className="text-xl text-white/70">
                    Lock in full access for{' '}
                    <span className="font-bold text-yellow-400">$85/user/month</span>
                    <span className="text-white/70"> — forever</span>
                  </p>
                </div>
              </div>

              {/* Price Comparison Cards */}
              <div className="mb-8 grid gap-6 md:grid-cols-2">
                {/* Standard Plan */}
                <div className="rounded-2xl border border-white/[0.1] bg-white/[0.05] p-6 text-center">
                  <p className="mb-3 text-xs uppercase tracking-wider text-white/40">
                    Standard Price
                  </p>
                  <div className="mb-1">
                    <span className="text-4xl font-black text-white/40 line-through">$129</span>
                    <span className="text-sm text-white/30">/user/mo</span>
                  </div>
                  <p className="text-xs text-white/30">Regular pricing after launch</p>
                </div>

                {/* Launch Partner Price */}
                <div className="relative">
                  <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
                    SAVE $44/USER/MO — FOREVER
                  </div>
                  <div
                    className="h-full rounded-2xl p-6 text-center"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(234,179,8,0.15) 0%, rgba(239,68,68,0.15) 100%)',
                      border: '2px solid rgba(234,179,8,0.4)',
                    }}
                  >
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-yellow-400">
                      Launch Partner Price
                    </p>
                    <div className="mb-1">
                      <span className="text-5xl font-black text-white">$85</span>
                      <span className="text-sm text-white/70">/user/mo</span>
                    </div>
                    <p className="text-sm font-medium text-green-400">Locked in for life</p>
                  </div>
                </div>
              </div>

              {/* Value Reinforcement */}
              <div className="mb-10 rounded-xl border border-white/[0.1] bg-black/30 p-5 text-center">
                <p className="mb-4 font-medium text-white">
                  Everything included — no add-ons, no surprises
                </p>
                <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                  <span className="rounded-full border border-purple-500/30 bg-purple-500/20 px-3 py-1.5 text-xs font-medium text-purple-300">
                    Customer Portal
                  </span>
                  <span className="rounded-full border border-white/[0.15] bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/70">
                    Xero/QuickBooks Integration
                  </span>
                  <span className="rounded-full border border-white/[0.15] bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/70">
                    Marketing Tools
                  </span>
                  <span className="rounded-full border border-white/[0.15] bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/70">
                    AI Features
                  </span>
                </div>
                <p className="text-sm text-white/70">
                  → Total value:{' '}
                  <span className="font-semibold text-yellow-400">$178+/mo</span> — you pay just{' '}
                  <span className="font-bold text-green-400">$85</span>
                </p>
              </div>

              {/* Launch Partner Benefits */}
              <div className="mb-10">
                <p className="mb-6 text-center text-sm uppercase tracking-wider text-white/60">
                  As a Launch Partner, You Get:
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {launchPartnerBenefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/[0.1] bg-white/[0.05] p-5 text-center"
                    >
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/30">
                        <benefit.icon className="h-6 w-6 text-purple-400" />
                      </div>
                      <h4 className="mb-1 text-sm font-semibold text-white">{benefit.title}</h4>
                      <p className="text-xs text-white/70">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scarcity + Progress */}
              <div className="mb-8 text-center">
                <p className="mb-3 font-medium text-amber-400">
                  ⏳ 42 of 100 launch partner spots claimed
                </p>
                <div className="mx-auto h-3 max-w-md overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                    style={{ width: '42%' }}
                  />
                </div>
                <p className="mt-3 text-sm text-white/40">
                  This offer won&apos;t be available once all 100 spots are filled.
                </p>
              </div>

              {/* Countdown Timer */}
              {!expired && (
                <div className="mb-10 text-center">
                  <p className="mb-4 text-sm uppercase tracking-wider text-white/40">
                    Offer closes in
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    {[
                      { value: days, label: 'DAYS' },
                      { value: hours, label: 'HOURS' },
                      { value: minutes, label: 'MINS' },
                      { value: seconds, label: 'SECS' },
                    ].map((unit, i) => (
                      <div
                        key={i}
                        className="min-w-[80px] rounded-xl border border-white/[0.1] bg-black/40 px-4 py-3"
                      >
                        <div className="text-3xl font-bold tabular-nums text-white">
                          {String(unit.value).padStart(2, '0')}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-white/30">
                          {unit.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Final Close */}
              <div className="text-center">
                <h3 className="mb-4 text-3xl font-black text-white md:text-4xl">
                  This Is Your Chance to Run Your Business Properly
                </h3>
                <p className="mx-auto mb-8 max-w-xl text-white/60">
                  Stop juggling systems. Stop fixing mistakes.
                  <br />
                  Start running your operations with full control, visibility, and confidence.
                  <br />
                  <span className="font-medium text-white">
                    Once the first 100 launch partners are in, this offer disappears — permanently.
                  </span>
                </p>

                {/* CTA Button */}
                <a
                  href="https://app.cloudrent.me/launch"
                  className="mb-6 inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-10 py-4 text-lg font-bold text-black transition-all hover:-translate-y-0.5 hover:bg-yellow-400 hover:shadow-[0_8px_32px_rgba(234,179,8,0.4)]"
                >
                  Lock in Launch Partner Pricing →
                </a>

                {/* Risk Reversal */}
                <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm">
                  <span className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-4 w-4" /> 30-day money-back guarantee
                  </span>
                  <span className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-4 w-4" /> Cancel anytime
                  </span>
                  <span className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-4 w-4" /> Free data migration
                  </span>
                </div>

                {/* Support Line */}
                <p className="text-sm text-white/40">
                  Questions?{' '}
                  <Link href="/demo" className="text-purple-400 hover:text-purple-300">
                    Talk to our team →
                  </Link>
                </p>
              </div>
            </div>
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
