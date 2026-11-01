'use client'

/**
 * Design system — Industrial Wayfinding
 * A customer-facing CloudRent Pro sales journey: operational outcomes first,
 * clear plan terms second, with CloudRent Purple as the route-and-action signal
 * and Inter reserved for customer-facing headings.
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardCheck,
  Cloud,
  CloudOff,
  FileCheck2,
  MapPinned,
  MessageSquare,
  Smartphone,
  Wrench,
  X,
  Zap,
} from 'lucide-react'
import './styles.css'
import CloudRentEcosystem from './CloudRentEcosystem'

const LOGO_URL = 'https://ipjpelt6tqi5wdno.public.blob.vercel-storage.com/media/CloudRent-logo-hex.png'
const HERO_URL = 'https://ipjpelt6tqi5wdno.public.blob.vercel-storage.com/media/Landing-page-hero-rental-software-cloudrent.webp'
const HERO_VIDEO_URL = '/images/hero-animation.mp4'
const DISPATCH_URL = 'https://ipjpelt6tqi5wdno.public.blob.vercel-storage.com/Landing-page-ipad-iphone-rental-software-cloudrent.webp'
const INSPECTION_URL = '/images/cloudrent-pro-inspection_b4a7b1cc.webp'
const REGISTER_URL = 'https://app.cloudrent.me/register'
const PRICING_URL = 'https://www.cloudrent.me/pricing/'
const FEATURES_URL = 'https://www.cloudrent.me/features/'

type PlanId = 'starter' | 'professional' | 'business'

const plans: Array<{
  id: PlanId
  name: string
  price: string
  cadence: string
  description: string
  badge?: string
  features: string[]
}> = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$49',
    cadence: '/user/month',
    description: 'For hire operators ready to replace spreadsheets and manual follow-up.',
    features: [
      'Equipment catalog and reservations',
      'Customer management and basic invoicing',
      'Digital signatures and PDF contracts',
      'Xero sync and safety documents',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$85',
    cadence: '/user/month',
    description:
      'The full toolkit for growing hire teams that need better control across every job.',
    badge: 'Most popular',
    features: [
      'Everything in Starter',
      'Stocktakes, inspections, and checklists',
      'Advanced reporting and tiered pricing',
      'Priority email support',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    price: '$129',
    cadence: '/user/month',
    description: 'For larger operations that need deeper automation, visibility, and support.',
    features: [
      'Everything in Professional',
      'AI damage detection and GPS tracking',
      'Advanced analytics and staff tools',
      'Dedicated account manager',
    ],
  },
]

// Quote Builder Data
const QUOTE_PLANS = [
  {
    id: 'starter' as const,
    name: 'Starter',
    price: 49,
    desc: 'The essentials for small operators, up to 3 seats',
    feats: [
      'Equipment catalogue and management',
      'Reservations and calendar',
      'Customer management',
      'Invoicing, contracts and digital signatures',
      'Staff management, 3 roles',
      'Crew app, 2 users per seat',
      'Email support',
    ],
  },
  {
    id: 'professional' as const,
    name: 'Professional',
    price: 85,
    desc: 'The full toolkit for growing businesses',
    lead: 'Everything in Starter, plus',
    feats: [
      'Accounting integration',
      'SWMS and safety documentation',
      'Stocktakes and asset management',
      'Inspection forms and checklists',
      'Tiered pricing engine',
      'Email integration and advanced reporting',
      'All 5 staff roles, priority support',
    ],
  },
  {
    id: 'business' as const,
    name: 'Business',
    price: 129,
    desc: 'Everything, for operators that want it all',
    lead: 'Everything in Professional, plus',
    feats: [
      'Connect customer portal included',
      'Marketing system and bulk email',
      'Damage detection module',
      'GPS and telematics tracking',
      'AI-powered support agent',
      'Roster, time clock and staff chat',
      'Dedicated account manager, phone support',
    ],
  },
]

const ONBOARD_OPTIONS = [
  { id: 'self', name: 'Self-serve', sub: 'Product tour, help articles and email support', price: 0 },
  {
    id: 'guided',
    name: 'Guided onboarding',
    sub: 'Account setup, branding, tax and invoicing, one training session',
    price: 495,
  },
  {
    id: 'full',
    name: 'Full-service onboarding',
    sub: 'Guided onboarding plus Migrate Standard and two training sessions',
    price: 1790,
  },
]

const MIGRATE_OPTIONS = [
  { id: 'none', name: 'No migration needed', sub: 'Starting fresh or entering data yourself', price: 0 },
  {
    id: 'standard',
    name: 'Migrate Standard',
    sub: 'Up to 500 rentals imported, plus equipment, customers and pricing',
    price: 1490,
  },
  {
    id: 'plus',
    name: 'Migrate Plus',
    sub: 'Up to 2,000 rentals imported, plus equipment, customers and pricing',
    price: 2990,
  },
  {
    id: 'enterprise',
    name: 'Migrate Enterprise',
    sub: 'Over 2,000 rentals, multi-branch or complex legacy data',
    price: null,
  },
]

const WIZ_TOTAL = 6
const WIZ_TITLES: Record<number, string> = {
  1: 'Choose your plan',
  2: 'Your team',
  3: 'Customer portal',
  4: 'Getting started',
  5: 'Website',
  6: 'Review',
}

type QuoteState = {
  plan: 'starter' | 'professional' | 'business'
  billing: 'monthly' | 'yearly'
  seats: number
  command: number
  crew: number
  onboard: string
  migrate: string
  training: number
  onsite: number
  connect: boolean
  webBuild: boolean
  webHost: boolean
}

const operationsCapabilities = [
  {
    id: 'dispatch',
    label: 'Dispatch',
    icon: MapPinned,
    eyebrow: 'One operational calendar',
    title: 'Plan the work around the asset—not the other way around.',
    copy: 'See crews, vehicles, equipment, service holds, deliveries, and collections in one place. CloudRent Pro helps the team spot conflicts before they become customer calls.',
    bullets: [
      'Availability-aware allocation',
      'Delivery, service, and collection routes',
      'Clear team handovers',
    ],
  },
  {
    id: 'assets',
    label: 'Assets',
    icon: Boxes,
    eyebrow: 'Complete asset history',
    title: 'Every booking, inspection, repair, and dollar stays connected.',
    copy: 'Turn each rentable asset into a living operational record with its condition, location, certificates, meter readings, costs, and next commitment close at hand.',
    bullets: [
      'Maintenance-aware availability',
      'Asset notes and inspection history',
      'Lifecycle cost and revenue visibility',
    ],
  },
  {
    id: 'field',
    label: 'Field app',
    icon: Smartphone,
    eyebrow: 'One field workflow',
    title: 'Give every crew the complete job—online or offline.',
    copy: 'Capture checklists, evidence, updates, signatures, and variations while the work is happening, then keep the office in step without another status chase.',
    bullets: ['Practical job packs', 'Photos, forms, and signatures', 'Field-ready updates'],
  },
  {
    id: 'portal',
    label: 'Customer portal',
    icon: MessageSquare,
    eyebrow: 'Fewer status calls',
    title: 'Put every customer promise in one clear timeline.',
    copy: 'Give customers a clear way to review bookings, documents, invoices, and progress—without tying up the office with repeat requests.',
    bullets: ['Quotes and approvals', 'Documents and invoices', 'Clear job updates'],
  },
  {
    id: 'automations',
    label: 'Automations',
    icon: Zap,
    eyebrow: 'Control the routine',
    title: 'Automate the repeatable work. Keep control of the exceptions.',
    copy: 'Set practical prompts for reminders, follow-ups, service actions, and job administration so the team can focus on the decisions that need people.',
    bullets: ['Configurable workflow rules', 'Useful reminders', 'Human-approved actions'],
  },
  {
    id: 'insights',
    label: 'Insights',
    icon: BarChart3,
    eyebrow: 'Margin beyond the job',
    title: 'Understand performance across the whole asset lifecycle.',
    copy: 'Bring revenue, downtime, labour, transport, parts, and damage recovery into one operating view—so the next decision is based on the full picture.',
    bullets: ['Job and asset profitability', 'Downtime and utilisation', 'Practical operating reports'],
  },
]

const workflowSteps = [
  {
    number: '01',
    label: 'Book',
    title: 'See availability before you promise it.',
    copy: 'Reservations, customer details, and equipment status stay connected so the office can quote and book with confidence.',
  },
  {
    number: '02',
    label: 'Dispatch',
    title: 'Keep the field team on the same page.',
    copy: 'Drivers receive assigned jobs, practical details, and live updates without an endless chain of calls and messages.',
  },
  {
    number: '03',
    label: 'Complete',
    title: 'Finish with the records you need.',
    copy: 'Capture signatures, inspections, delivery evidence, and invoice-ready job data while the work is still current.',
  },
]

const faqItems = [
  {
    question: 'What does the $1 first month include?',
    answer:
      "CloudRent Pro's public offer is a $1 start with full platform access for 30 days. Use the time to set up your hire workflow, explore the tools, and see what changes when bookings, dispatch, invoicing, and safety work from one system.",
  },
  {
    question: 'Is a credit card required to start?',
    answer:
      'The published pricing page states that no credit card is required to start the 30-day $1 access period. Check the registration flow for the current account requirements before proceeding.',
  },
  {
    question: 'What happens when the 30 days are over?',
    answer:
      "CloudRent Pro's published pricing information states that you will be prompted to choose a plan after the access period, and your data is preserved when you upgrade. Current plans begin at $49 per user per month, AUD and ex-GST.",
  },
  {
    question: 'Can I change plans as the business grows?',
    answer:
      'The published pricing information says that customers can upgrade or downgrade later, with changes taking effect on the next billing cycle and prorated adjustments. Confirm the current details with the CloudRent Pro team for your account.',
  },
  {
    question: 'Who is CloudRent Pro built for?',
    answer:
      'CloudRent Pro is built for hire and rental businesses that need an integrated way to manage equipment, customer bookings, field operations, invoicing, and safety processes.',
  },
]

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Custom Accordion components for Next.js (no radix dependency)
function AccordionItem({
  value,
  question,
  answer,
  index,
  openItem,
  setOpenItem,
}: {
  value: string
  question: string
  answer: string
  index: number
  openItem: string | null
  setOpenItem: (value: string | null) => void
}) {
  const isOpen = openItem === value

  return (
    <div className="faq-item">
      <button
        type="button"
        className="faq-trigger"
        onClick={() => setOpenItem(isOpen ? null : value)}
        aria-expanded={isOpen}
      >
        <span>
          <b>0{index + 1}</b>
          {question}
        </span>
        <ChevronRight
          size={16}
          style={{
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 200ms ease',
          }}
        />
      </button>
      <div
        className="faq-content"
        style={{
          display: isOpen ? 'block' : 'none',
        }}
      >
        <div>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function CloudRentProPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>('professional')
  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId) ?? plans[1],
    [selectedPlanId]
  )
  const [activeCapabilityId, setActiveCapabilityId] = useState('insights')
  const activeCapability =
    operationsCapabilities.find((capability) => capability.id === activeCapabilityId) ??
    operationsCapabilities[0]
  const [openFaqItem, setOpenFaqItem] = useState<string | null>(null)

  // Signup Form State
  const [signupBiz, setSignupBiz] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupRegion, setSignupRegion] = useState('Australia')

  // Quote Builder Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [wizStep, setWizStep] = useState(1)
  const [quoteState, setQuoteState] = useState<QuoteState>({
    plan: 'professional',
    billing: 'monthly',
    seats: 3,
    command: 0,
    crew: 5,
    onboard: 'self',
    migrate: 'none',
    training: 0,
    onsite: 0,
    connect: false,
    webBuild: false,
    webHost: false,
  })

  const openDrawer = useCallback(() => {
    setDrawerOpen(true)
    setWizStep(1)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
    document.body.style.overflow = ''
  }, [])

  const updateQuote = useCallback((updates: Partial<QuoteState>) => {
    setQuoteState((prev) => ({ ...prev, ...updates }))
  }, [])

  // Calculate quote totals
  const quotePlan = QUOTE_PLANS.find((p) => p.id === quoteState.plan) ?? QUOTE_PLANS[1]
  const yearlyDiscount = quoteState.billing === 'yearly' ? 0.85 : 1
  const perUserPrice = quotePlan.price * yearlyDiscount
  const includedCrew = quoteState.seats * 2
  const extraCrew = Math.max(0, quoteState.crew - includedCrew)
  const connectIncluded = quoteState.plan === 'business'
  const connectAddon = !connectIncluded && quoteState.connect ? 49 : 0

  const monthlyTotal =
    perUserPrice * quoteState.seats +
    quoteState.command * 10 +
    extraCrew * 5 +
    connectAddon +
    (quoteState.webHost ? 49 : 0)

  const onboardOption = ONBOARD_OPTIONS.find((o) => o.id === quoteState.onboard)
  const migrateOption = MIGRATE_OPTIONS.find((m) => m.id === quoteState.migrate)
  const oneOffTotal =
    (onboardOption?.price ?? 0) +
    (migrateOption?.price ?? 0) +
    quoteState.training * 195 +
    quoteState.onsite * 1500 +
    (quoteState.webBuild ? 2490 : 0)

  const formatMoney = (n: number) => '$' + n.toLocaleString('en-AU')


  // Close drawer on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawerOpen) {
        closeDrawer()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [drawerOpen, closeDrawer])

  return (
    <main className="sales-page">
      <header className="site-header" aria-label="CloudRent Pro navigation">
        <a className="brand-lockup" href="#top" aria-label="CloudRent Pro home">
          <img
            className="brand-mark"
            src="https://ipjpelt6tqi5wdno.public.blob.vercel-storage.com/media/CloudRent-logo-hex.png"
            alt=""
            style={{ height: '51px', width: '51px' }}
          />
          <span className="brand-text">
            <strong>CloudRent</strong>
            <span>Pro</span>
          </span>
          <span className="brand-spec" style={{ color: '#881aa8' }}>
            Hire operations OS
          </span>
        </a>

        <nav className="nav-links" aria-label="On-page sections">
          <a className="nav-link" href="#platform">
            Platform
          </a>
          <a className="nav-link" href="#workflows">
            Workflows
          </a>
          <a className="nav-link" href="#platform">
            Ecosystem
          </a>
          <a className="nav-link" href="#pricing">
            Plans
          </a>
          <a className="nav-link" href="#faq">
            FAQ
          </a>
        </nav>

        <a className="nav-cta" href={REGISTER_URL} target="_blank" rel="noreferrer">
          Start for $1 <ArrowRight size={15} strokeWidth={2.2} />
        </a>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <video
          className="hero-background"
          src={HERO_VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          poster={HERO_URL}
        />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-route" aria-hidden="true">
          <span />
        </div>
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow inverse reveal delay-1">
              <Cloud size={14} strokeWidth={2.4} /> CloudRent Pro / Hire operations, connected
            </p>
            <div className="hero-yard-tag reveal delay-2">
              <span>YARD / 01</span>
              <b>Asset ready</b>
              <i>Availability checked · dispatch prepared</i>
            </div>
            <h1 className="hero-title reveal delay-1" id="hero-title">
              Run every job from <em>one place.</em>
            </h1>
            <p className="hero-dek reveal delay-2">
              CloudRent Pro brings bookings, equipment, dispatch, invoicing, and safety
              together—so your team can spend less time chasing updates and more time moving work
              forward.
            </p>
            <div className="hero-actions reveal delay-3">
              <a className="button-signal" href={REGISTER_URL} target="_blank" rel="noreferrer">
                Start 30 days for $1 <ArrowRight size={17} strokeWidth={2.2} />
              </a>
              <button
                className="button-ghost"
                type="button"
                onClick={() => scrollToSection('pricing')}
              >
                See plans <ChevronRight size={17} strokeWidth={2.2} />
              </button>
            </div>
            <div className="hero-proof reveal delay-3" aria-label="Offer details">
              <span>
                <Check size={14} strokeWidth={2.8} /> Full platform access
              </span>
              <span>
                <Check size={14} strokeWidth={2.8} /> No setup fee
              </span>
              <span>
                <Check size={14} strokeWidth={2.8} /> No credit card required to start
              </span>
            </div>
            <p className="hero-workflow-label reveal delay-3">
              <b>ROUTE 01</b> Booking <span>→</span> Dispatch <span>→</span> Proof <span>→</span>{' '}
              Invoice
            </p>
          </div>

          <aside className="hero-status reveal delay-2" aria-label="CloudRent Pro operational summary">
            <div className="status-head">
              <span>Today&apos;s control panel</span>
              <span className="status-beacon">
                <span className="beacon-ring beacon-ring-1" />
                <span className="beacon-ring beacon-ring-2" />
                <span className="beacon-ring beacon-ring-3" />
                <span className="beacon-core-dot" />
              </span>
            </div>
            <div className="status-main">
              <span>One connected view</span>
              <strong className="status-words">
                <span className="status-word status-word-1">Bookings.</span>
                <span className="status-word status-word-2">Field work.</span>
                <span className="status-word status-word-3">Cash flow.</span>
              </strong>
            </div>
            <div className="status-chart" aria-label="Weekly rental activity">
              <div className="chart-label">This week</div>
              <div className="chart-bars">
                <div className="chart-bar" style={{ '--bar-height': '45%', '--bar-delay': '0.1s' } as React.CSSProperties} />
                <div className="chart-bar" style={{ '--bar-height': '72%', '--bar-delay': '0.2s' } as React.CSSProperties} />
                <div className="chart-bar" style={{ '--bar-height': '58%', '--bar-delay': '0.3s' } as React.CSSProperties} />
                <div className="chart-bar" style={{ '--bar-height': '89%', '--bar-delay': '0.4s' } as React.CSSProperties} />
                <div className="chart-bar" style={{ '--bar-height': '65%', '--bar-delay': '0.5s' } as React.CSSProperties} />
                <div className="chart-bar chart-bar-current" style={{ '--bar-height': '78%', '--bar-delay': '0.6s' } as React.CSSProperties} />
                <div className="chart-bar chart-bar-projected" style={{ '--bar-height': '92%', '--bar-delay': '0.7s' } as React.CSSProperties} />
              </div>
              <div className="chart-legend">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
              </div>
            </div>
            <div className="status-grid">
              <div>
                <span>Start</span>
                <b>$1 / 30 days</b>
              </div>
              <div>
                <span>Built for</span>
                <b>Hire businesses</b>
              </div>
              <div>
                <span>Works across</span>
                <b>Office + field</b>
              </div>
              <div>
                <span>Plans from</span>
                <b>$49 / user</b>
              </div>
            </div>
          </aside>
        </div>
        <div className="hero-bottom-note">
          SCROLL TO SEE HOW THE PLATFORM MOVES A HIRE JOB FORWARD <ArrowRight size={14} />
        </div>
      </section>

      <section className="outcome-strip" aria-label="CloudRent Pro overview">
        <p>One platform for the moments that make or break a hire day.</p>
        <div className="outcome-strip-items">
          <span>
            <CalendarDays size={17} /> Book with confidence
          </span>
          <span>
            <MapPinned size={17} /> Dispatch with clarity
          </span>
          <span>
            <FileCheck2 size={17} /> Complete with proof
          </span>
        </div>
      </section>

      <div className="route-connector route-connector-light" aria-hidden="true">
        <span>ROUTE / 01 / OPERATE</span>
        <i />
      </div>

      <section className="platform-intro" id="platform" aria-labelledby="platform-title">
        <div className="section-kicker">
          <span>01</span> One connected ecosystem
        </div>
        <h2 id="platform-title">
          From the yard to the portal, <em>every handover stays connected.</em>
        </h2>
        <p>
          CloudRent Pro brings the mobile field workflow, web operations hub, and always-on
          customer portal into one operating system—so the next person has the context to move
          work forward.
        </p>
      </section>

      <CloudRentEcosystem className="ecosystem-diagram" />

      <section className="operations-navigator" aria-labelledby="navigator-title">
        <div className="navigator-heading">
          <div className="section-kicker">
            <span>02</span> One operating system
          </div>
          <h2 id="navigator-title">
            Everything the office and field need to <em>keep work moving.</em>
          </h2>
          <p>
            Start with the daily workflow. Open deeper operational control when the team needs
            it—not before.
          </p>
        </div>
        <div className="navigator-tabs" role="tablist" aria-label="CloudRent Pro capabilities">
          {operationsCapabilities.map((capability) => {
            const Icon = capability.icon
            const isActive = activeCapability.id === capability.id
            return (
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="capability-stage"
                className={isActive ? 'is-active' : ''}
                key={capability.id}
                onClick={() => setActiveCapabilityId(capability.id)}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{capability.label}</span>
              </button>
            )
          })}
        </div>
        <div className="navigator-stage" id="capability-stage" role="tabpanel">
          <div className="navigator-copy">
            <p className="navigator-eyebrow">{activeCapability.eyebrow}</p>
            <h3>{activeCapability.title}</h3>
            <p>{activeCapability.copy}</p>
            <ul>
              {activeCapability.bullets.map((bullet) => (
                <li key={bullet}>
                  <Check size={16} /> {bullet}
                </li>
              ))}
            </ul>
            <a href={FEATURES_URL} target="_blank" rel="noreferrer">
              Explore this capability <ArrowRight size={16} />
            </a>
          </div>
          <div
            className="navigator-console"
            aria-label={`${activeCapability.label} capability preview`}
          >
            <div className="console-topline">
              <span>OPERATING VIEW / {activeCapability.label.toUpperCase()}</span>
              <b>
                <i /> Live
              </b>
            </div>
            {activeCapability.id === 'insights' ? (
              <div className="insight-console">
                <div className="insight-metric">
                  <span>Operational margin</span>
                  <strong>$184,420</strong>
                  <small>↑ Healthy this period</small>
                </div>
                <div className="insight-ring">
                  <span>74%</span>
                </div>
                <div className="insight-bars" aria-label="Operating performance chart">
                  {[42, 58, 49, 71, 62, 78, 69, 86].map((height, index) => (
                    <i key={`${height}-${index}`} style={{ height: `${height}%` }} />
                  ))}
                </div>
                <div className="insight-axis">
                  <span>Rental</span>
                  <span>Service</span>
                  <span>Transport</span>
                  <span>Recovery</span>
                </div>
              </div>
            ) : (
              <div className="workflow-console">
                <div className="console-title">
                  <p>Active queue</p>
                  <strong>{activeCapability.label}</strong>
                </div>
                <div className="console-rows">
                  {activeCapability.bullets.map((bullet, index) => (
                    <div key={bullet}>
                      <span>0{index + 1}</span>
                      <p>{bullet}</p>
                      <Check size={15} />
                    </div>
                  ))}
                </div>
                <div className="console-route">
                  <span>CloudRent Pro</span>
                  <b>
                    Ready for the next job <ArrowRight size={14} />
                  </b>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="route-connector route-connector-light route-connector-flip" aria-hidden="true">
        <span>ROUTE / 03 / DISPATCH</span>
        <i />
      </div>

      <section className="dispatch-section" id="workflows" aria-labelledby="workflow-title">
        <div className="dispatch-visual">
          <img src={DISPATCH_URL} alt="CloudRent Pro operations dashboard on iPad and field app on iPhone" />
          <div className="image-flag">
            <span>LIVE WORKFLOW</span>
            <b>
              Plan it once.
              <br />
              Everyone sees it.
            </b>
          </div>
        </div>
        <div className="dispatch-copy">
          <div className="section-kicker inverse">
            <span>03</span> Workflows that keep moving
          </div>
          <h2 id="workflow-title">
            The office, the yard, and the field. <em>Finally in step.</em>
          </h2>
          <p className="section-lead">
            CloudRent Pro keeps practical job information connected from the first reservation
            through dispatch, signatures, inspection, and invoicing.
          </p>
          <div className="workflow-list">
            {workflowSteps.map((step) => (
              <article className="workflow-step" key={step.number}>
                <span className="workflow-number">{step.number}</span>
                <div>
                  <p className="workflow-label">{step.label}</p>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="route-connector route-connector-dark" aria-hidden="true">
        <span>ROUTE / 04 / CAPTURE</span>
        <i />
      </div>

      <section className="inspection-section" aria-labelledby="inspection-title">
        <div className="inspection-copy">
          <div className="section-kicker">
            <span>04</span> Built for the real world
          </div>
          <h2 id="inspection-title">
            Evidence beats <em>assumption.</em>
          </h2>
          <p>
            From digital signatures and delivery proof to photo inspections and AI-assisted damage
            assessment, CloudRent Pro keeps the detail close to the job—not in someone&apos;s inbox.
          </p>
          <div className="inspection-points">
            <span>
              <ClipboardCheck size={18} /> Digital checks and sign-offs
            </span>
            <span>
              <Wrench size={18} /> Equipment history and service visibility
            </span>
            <span>
              <Smartphone size={18} /> Field-ready tools for teams on the move
            </span>
          </div>
        </div>
        <div className="inspection-visual">
          <img src={INSPECTION_URL} alt="Mobile equipment inspection with damage analysis" />
          <div className="inspection-stamp">
            <span>FIELD READY</span>
            <b>
              Proof,
              <br />
              captured.
            </b>
          </div>
        </div>
      </section>

      <div className="route-connector route-connector-light" aria-hidden="true">
        <span>ROUTE / 05 / FIELD</span>
        <i />
      </div>

      <section className="field-parity" aria-labelledby="field-title">
        <div className="field-device-stage" aria-label="CloudRent Pro field workflow previews">
          <div className="phone-card phone-card-android">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="phone-status">
                <span>10:30</span>
                <b>JOB / 04</b>
              </div>
              <div className="phone-job">
                <span>DELIVERY + CHECKLIST</span>
                <strong>
                  Williams Plant
                  <br />
                  Mulgrave depot
                </strong>
                <p>Complete the handover while the equipment is in front of you.</p>
              </div>
              <div className="phone-task">
                <Check size={15} /> Asset photographed
              </div>
              <div className="phone-task">
                <Check size={15} /> Meter reading captured
              </div>
              <div className="phone-task is-pending">
                <span /> Customer signature
              </div>
              <div className="phone-action">
                Finish job <ArrowRight size={15} />
              </div>
            </div>
          </div>
          <div className="phone-card phone-card-ios">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="phone-status">
                <span>10:30</span>
                <b>OFFLINE READY</b>
              </div>
              <div className="phone-job">
                <span>ASSET INSPECTION</span>
                <strong>
                  Mini excavator
                  <br />
                  MX-204
                </strong>
                <p>Notes, photos, and proof stay connected to the job.</p>
              </div>
              <div className="phone-task">
                <Check size={15} /> Inspection recorded
              </div>
              <div className="phone-task">
                <Check size={15} /> Damage notes saved
              </div>
              <div className="phone-task">
                <Check size={15} /> Office updated
              </div>
              <div className="phone-action">
                Sync complete <Check size={15} />
              </div>
            </div>
          </div>
          <div className="device-label device-label-left">
            <Check size={14} /> Field-ready workflow
          </div>
          <div className="device-label device-label-right">
            <Check size={14} /> One connected record
          </div>
        </div>
        <div className="field-parity-copy">
          <div className="section-kicker">
            <span>05</span> A crew-ready field experience
          </div>
          <h2 id="field-title">
            Keep every crew <em>in step.</em>
          </h2>
          <p>
            Give drivers, technicians, and yard teams the same practical job flow wherever the work
            happens: task details, forms, evidence, signatures, and updates that arrive back with
            the office.
          </p>
          <div className="field-pills">
            <span>
              <CloudOff size={17} /> Offline-ready work
            </span>
            <span>
              <BadgeCheck size={17} /> Evidence captured
            </span>
            <span>
              <Smartphone size={17} /> Field-first tools
            </span>
          </div>
          <button
            className="button-signal field-button"
            type="button"
            onClick={() => scrollToSection('pricing')}
          >
            See the plan for your team <ArrowRight size={17} />
          </button>
        </div>
      </section>

      <div className="route-connector route-connector-light" aria-hidden="true">
        <span>ROUTE / 05 / CONFIGURE</span>
        <i />
      </div>

      <section className="pricing-section" id="pricing">
        {/* CTA Hero */}
        <div className="cta-hero">
          <div className="cta-hero-content">
            <p className="cta-eyebrow">Rental &amp; hire management</p>
            <h2>
              Run every hire job <span>from one place</span>
            </h2>
            <p className="cta-lede">
              Bookings, equipment, dispatch, invoicing and safety — one platform for your whole
              operation. Try it all for 30 days for $1.
            </p>
            <div className="cta-pills">
              <span className="cta-pill">Set up in minutes</span>
              <span className="cta-pill">Cancel anytime</span>
              <span className="cta-pill">Crew app included</span>
            </div>
          </div>

          <aside className="signup-card" aria-label="Start your trial">
            <div className="signup-offer">
              <span className="signup-price">$1</span>
              <span className="signup-term">for 30 days, full access</span>
            </div>
            <p className="signup-sub">Then your plan price. Cancel anytime before renewal.</p>

            <form
              className="signup-form"
              onSubmit={(e) => {
                e.preventDefault()
                window.open(REGISTER_URL, '_blank')
              }}
            >
              <div className="signup-field">
                <label htmlFor="cta-biz">Business name</label>
                <input
                  id="cta-biz"
                  type="text"
                  placeholder="e.g. Coastline Hire Co"
                  value={signupBiz}
                  onChange={(e) => setSignupBiz(e.target.value)}
                  autoComplete="organization"
                />
              </div>
              <div className="signup-field">
                <label htmlFor="cta-email">Work email</label>
                <input
                  id="cta-email"
                  type="email"
                  placeholder="you@yourbusiness.com.au"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div className="signup-field">
                <label htmlFor="cta-region">Region</label>
                <select
                  id="cta-region"
                  value={signupRegion}
                  onChange={(e) => setSignupRegion(e.target.value)}
                >
                  <option>Australia</option>
                  <option>New Zealand</option>
                  <option>United Kingdom</option>
                  <option>Other</option>
                </select>
              </div>
              <button type="submit" className="signup-submit">
                Start my first month for $1 →
              </button>
            </form>

            <p className="signup-fine">No commitment. We&apos;ll only charge $1 today.</p>
            <p className="signup-alt">
              Want to see your ongoing price first?{' '}
              <button type="button" onClick={openDrawer}>
                Build a full quote →
              </button>
            </p>
          </aside>
        </div>

        {/* Feature Bar */}
        <div className="feature-bar">
          <div className="feature-item">
            <span className="feature-dot" />
            <span><strong>Bookings</strong> &amp; calendar</span>
          </div>
          <div className="feature-item">
            <span className="feature-dot" />
            <span><strong>Equipment</strong> management</span>
          </div>
          <div className="feature-item">
            <span className="feature-dot" />
            <span><strong>Dispatch</strong> &amp; Crew app</span>
          </div>
          <div className="feature-item">
            <span className="feature-dot" />
            <span><strong>Invoicing</strong> &amp; contracts</span>
          </div>
          <div className="feature-item">
            <span className="feature-dot" />
            <span><strong>SWMS</strong> &amp; safety</span>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="benefits-section">
          <h3>Everything your hire business needs</h3>
          <p>
            Stop stitching together spreadsheets, calendars and paperwork. CloudRent brings your
            whole operation into one system your office, drivers and customers can all use.
          </p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon" />
              <h4>Book &amp; dispatch</h4>
              <p>
                Live availability, one calendar, and run sheets that reach your drivers on the Crew
                app — no double bookings, no lost jobs.
              </p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon" />
              <h4>Invoice &amp; get paid</h4>
              <p>
                Contracts, digital signatures and invoicing built in. Add the Connect portal and
                customers book and pay themselves, 24/7.
              </p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon" />
              <h4>Stay compliant</h4>
              <p>
                SWMS, inspection forms and asset checks kept together, so safety documentation is
                done as you work, not after.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-cards-section">
          <h3>
            Try the whole platform for <span>$1</span>
          </h3>
          <p>
            Your first 30 days are $1 with full access — every feature, no demo limits, no locked
            tools. After that you&apos;re on the plan that fits your business, billed monthly. Cancel
            anytime before it renews.
          </p>
          <div className="pricing-cards">
            <div className="price-card">
              <h4>Starter</h4>
              <div className="price-amount">
                <span className="price-value">$49</span>
                <span className="price-unit">/user/mo</span>
              </div>
              <p className="price-billing">billed monthly · save 15% yearly</p>
              <p className="price-desc">The essentials for small operators, up to 3 seats.</p>
              <ul className="price-features">
                <li><Check size={14} /> Equipment catalogue &amp; bookings</li>
                <li><Check size={14} /> Customers, invoicing &amp; contracts</li>
                <li><Check size={14} /> Digital signatures</li>
                <li><Check size={14} /> Crew app — 2 users per seat</li>
                <li><Check size={14} /> Email support</li>
              </ul>
              <a className="price-cta" href={REGISTER_URL} target="_blank" rel="noreferrer">
                Start for $1
              </a>
            </div>
            <div className="price-card price-card-popular">
              <span className="popular-badge">Most popular</span>
              <h4>Professional</h4>
              <div className="price-amount">
                <span className="price-value">$85</span>
                <span className="price-unit">/user/mo</span>
              </div>
              <p className="price-billing">billed monthly · save 15% yearly</p>
              <p className="price-desc">The full toolkit for growing hire businesses.</p>
              <p className="price-includes">Everything in Starter, plus</p>
              <ul className="price-features">
                <li><Check size={14} /> Accounting integration</li>
                <li><Check size={14} /> SWMS &amp; safety documentation</li>
                <li><Check size={14} /> Stocktakes &amp; asset management</li>
                <li><Check size={14} /> Tiered pricing &amp; advanced reporting</li>
              </ul>
              <a className="price-cta price-cta-primary" href={REGISTER_URL} target="_blank" rel="noreferrer">
                Start for $1
              </a>
            </div>
            <div className="price-card">
              <h4>Business</h4>
              <div className="price-amount">
                <span className="price-value">$129</span>
                <span className="price-unit">/user/mo</span>
              </div>
              <p className="price-billing">billed monthly · save 15% yearly</p>
              <p className="price-desc">Everything, for operators that want it all.</p>
              <p className="price-includes">Everything in Professional, plus</p>
              <ul className="price-features">
                <li><Check size={14} /> Connect customer portal included</li>
                <li><Check size={14} /> Marketing &amp; bulk email</li>
                <li><Check size={14} /> GPS tracking &amp; damage detection</li>
                <li><Check size={14} /> AI support agent &amp; account manager</li>
              </ul>
              <a className="price-cta" href={REGISTER_URL} target="_blank" rel="noreferrer">
                Start for $1
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="route-connector route-connector-light route-connector-flip" aria-hidden="true">
        <span>ROUTE / 06 / CLARIFY</span>
        <i />
      </div>

      <section className="faq-section" id="faq" aria-labelledby="faq-title">
        <div className="faq-intro">
          <div className="section-kicker inverse">
            <span>06</span> The practical questions
          </div>
          <h2 id="faq-title">
            Clear before you <em>commit.</em>
          </h2>
          <p>Good hire operations run on clear information. So does a good software decision.</p>
          <a className="faq-support-link" href={REGISTER_URL} target="_blank" rel="noreferrer">
            Start your 30-day access <ArrowRight size={16} />
          </a>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`faq-${index + 1}`}
              question={item.question}
              answer={item.answer}
              index={index}
              openItem={openFaqItem}
              setOpenItem={setOpenFaqItem}
            />
          ))}
        </div>
      </section>

      <section className="final-cta" aria-labelledby="final-title">
        <div className="final-route" aria-hidden="true">
          <span />
        </div>
        <div>
          <p className="eyebrow inverse">Your next hire day can run differently</p>
          <h2 id="final-title">
            Give your team one clear way to <em>move work forward.</em>
          </h2>
        </div>
        <div className="final-cta-side">
          <div
            className="handover-beacon"
            aria-label="A hire handover moving from booking to proof and ready for work"
          >
            <div className="beacon-topline">
              <span>LIVE HANDOVER</span>
              <b>
                <i /> ALL SYSTEMS READY
              </b>
            </div>
            <div className="beacon-track" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="beacon-core">
              <span>M204</span>
              <Check size={28} strokeWidth={3} />
            </div>
            <div className="beacon-states" aria-hidden="true">
              <span>Booked</span>
              <span>Proof</span>
              <span>Ready</span>
            </div>
          </div>
          <p>Start CloudRent Pro for $1 and explore the complete platform for 30 days.</p>
          <a className="button-signal" href={REGISTER_URL} target="_blank" rel="noreferrer">
            Start 30 days for $1 <ArrowRight size={17} />
          </a>
          <span>Full platform access · No setup fee</span>
        </div>
      </section>

      <footer className="footer" aria-label="CloudRent Pro site footer">
        <a className="brand-lockup footer-brand" href="#top" aria-label="Back to CloudRent Pro home">
          <img
            className="brand-mark"
            src="https://ipjpelt6tqi5wdno.public.blob.vercel-storage.com/media/CloudRent-logo-hex.png"
            alt=""
          />
          <span className="brand-text">
            <strong>CloudRent</strong>
            <span>Pro</span>
          </span>
          <span className="brand-spec">Hire operations OS</span>
        </a>
        <p>
          All prices shown in AUD and ex-GST. See the current registration and pricing pages for
          full details.
        </p>
        <nav className="footer-links" aria-label="Footer links">
          <a href={FEATURES_URL} target="_blank" rel="noreferrer">
            Features
          </a>
          <a href={PRICING_URL} target="_blank" rel="noreferrer">
            Pricing
          </a>
          <a href={REGISTER_URL} target="_blank" rel="noreferrer">
            Start for $1 <ArrowRight size={13} />
          </a>
        </nav>
      </footer>

      {/* Quote Builder Drawer */}
      <div
        className={`quote-scrim ${drawerOpen ? 'open' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside
        className={`quote-drawer ${drawerOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Build your quote"
      >
        <div className="drawer-head">
          <div>
            <div className="drawer-title">Build your quote</div>
            <div className="drawer-subtitle">See your ongoing price, then start for $1</div>
          </div>
          <button className="drawer-close" onClick={closeDrawer} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          <div className="wiz-top">
            <div className="wiz-prog">
              {Array.from({ length: WIZ_TOTAL }, (_, i) => (
                <span
                  key={i}
                  className={`wiz-seg ${i + 1 < wizStep ? 'done' : ''} ${i + 1 === wizStep ? 'cur' : ''}`}
                >
                  <i />
                </span>
              ))}
            </div>
            <span className="wiz-count">
              Step {wizStep} of {WIZ_TOTAL} · {WIZ_TITLES[wizStep]}
            </span>
          </div>

          {/* Step 1: Plan */}
          {wizStep === 1 && (
            <div className="wstep">
              <h2>Choose your plan</h2>
              <div className="explain">
                <p>
                  Every plan runs your <b>core hire operation</b> — equipment, bookings, customers
                  and invoicing. The difference is how much of the back office comes with it.
                </p>
                <p>
                  Yearly billing takes <b>15% off</b>, and your first month is <b>$1</b> whichever
                  you choose.
                </p>
              </div>
              <div className="quote-plans">
                {QUOTE_PLANS.map((p) => (
                  <div
                    key={p.id}
                    className={`quote-plan ${quoteState.plan === p.id ? 'active' : ''}`}
                    onClick={() => updateQuote({ plan: p.id })}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="plan-tick" />
                    <div className="plan-name">{p.name}</div>
                    <div className="plan-price mono">
                      ${quoteState.billing === 'yearly' ? (p.price * 0.85).toFixed(0) : p.price}
                    </div>
                    <div className="plan-unit">per user / month</div>
                    <div className="plan-desc">{p.desc}</div>
                    <ul className="plan-feats">
                      {p.lead && <li className="head">{p.lead}</li>}
                      {p.feats.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="toggle-row">
                <div className="billing-seg">
                  <button
                    className={quoteState.billing === 'monthly' ? 'on' : ''}
                    onClick={() => updateQuote({ billing: 'monthly' })}
                  >
                    Monthly
                  </button>
                  <button
                    className={quoteState.billing === 'yearly' ? 'on' : ''}
                    onClick={() => updateQuote({ billing: 'yearly' })}
                  >
                    Yearly
                  </button>
                </div>
                <span className="save-tag">Save 15% on yearly</span>
              </div>
            </div>
          )}

          {/* Step 2: Team */}
          {wizStep === 2 && (
            <div className="wstep">
              <h2>Your team</h2>
              <div className="explain">
                <p>
                  <b>Licensed seats</b> are for people who work in CloudRent Pro — owners, admin and
                  office staff.
                </p>
                <p>
                  <b>Command</b> is the mobile app for managers ($10/user/month). <b>Crew</b> is for
                  drivers and warehouse (2 free per seat, then $5 each).
                </p>
              </div>
              <div className="team-rows">
                <div className="team-row">
                  <div className="team-label">
                    Licensed seats
                    <small>Owners, admin and office staff</small>
                  </div>
                  <div className="stepper big">
                    <button
                      onClick={() => updateQuote({ seats: Math.max(1, quoteState.seats - 1) })}
                    >
                      −
                    </button>
                    <input
                      className="mono"
                      type="number"
                      value={quoteState.seats}
                      onChange={(e) =>
                        updateQuote({ seats: Math.max(1, parseInt(e.target.value) || 1) })
                      }
                    />
                    <button onClick={() => updateQuote({ seats: quoteState.seats + 1 })}>+</button>
                  </div>
                </div>
                <div className="team-row">
                  <div className="team-label">
                    Command app users
                    <small>Managers on mobile, $10 per user per month</small>
                  </div>
                  <div className="stepper big">
                    <button
                      onClick={() => updateQuote({ command: Math.max(0, quoteState.command - 1) })}
                    >
                      −
                    </button>
                    <input
                      className="mono"
                      type="number"
                      value={quoteState.command}
                      onChange={(e) =>
                        updateQuote({ command: Math.max(0, parseInt(e.target.value) || 0) })
                      }
                    />
                    <button onClick={() => updateQuote({ command: quoteState.command + 1 })}>
                      +
                    </button>
                  </div>
                </div>
                <div className="team-row">
                  <div className="team-label">
                    Crew app users
                    <small>
                      Drivers and warehouse. {includedCrew} included with your seats
                      {extraCrew > 0 ? ', then $5 each' : ''}
                    </small>
                  </div>
                  <div className="stepper big">
                    <button
                      onClick={() => updateQuote({ crew: Math.max(0, quoteState.crew - 1) })}
                    >
                      −
                    </button>
                    <input
                      className="mono"
                      type="number"
                      value={quoteState.crew}
                      onChange={(e) =>
                        updateQuote({ crew: Math.max(0, parseInt(e.target.value) || 0) })
                      }
                    />
                    <button onClick={() => updateQuote({ crew: quoteState.crew + 1 })}>+</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Customer portal */}
          {wizStep === 3 && (
            <div className="wstep">
              <h2>Customer portal</h2>
              <div className="explain">
                <p>
                  <b>CloudRent Connect</b> is a branded portal where your customers help themselves
                  24/7 — check availability, book equipment, sign documents, download invoices and
                  pay.
                </p>
                <p>
                  It&apos;s <b>included with Business</b>. On Starter and Professional you can add
                  it for $49 per month.
                </p>
              </div>
              <div className="connect-row">
                <div className="team-label">
                  CloudRent Connect
                  <small>
                    {connectIncluded ? 'Included with Business' : 'Add to your plan for $49/month'}
                  </small>
                </div>
                {connectIncluded ? (
                  <span className="badge-included">Included</span>
                ) : (
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={quoteState.connect}
                      onChange={(e) => updateQuote({ connect: e.target.checked })}
                    />
                    <span className="track" />
                  </label>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Getting started */}
          {wizStep === 4 && (
            <div className="wstep">
              <h2>Getting started</h2>
              <div className="explain">
                <p>
                  These are <b>one-off services</b> to get you live — all optional.
                </p>
              </div>
              <div className="qsec">Onboarding</div>
              <div className="opts">
                {ONBOARD_OPTIONS.map((o) => (
                  <div
                    key={o.id}
                    className={`opt ${quoteState.onboard === o.id ? 'active' : ''}`}
                    onClick={() => updateQuote({ onboard: o.id })}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="opt-dot" />
                    <div className="opt-label">
                      {o.name}
                      <small>{o.sub}</small>
                    </div>
                    <span className="opt-price">
                      {o.price === 0 ? (o.id === 'self' ? '' : 'Included') : formatMoney(o.price)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="qsec">Data migration</div>
              <div className="opts">
                {MIGRATE_OPTIONS.map((m) => {
                  const disabled = quoteState.onboard === 'full' && m.id === 'standard'
                  return (
                    <div
                      key={m.id}
                      className={`opt ${quoteState.migrate === m.id ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
                      onClick={() => !disabled && updateQuote({ migrate: m.id })}
                      role="button"
                      tabIndex={disabled ? -1 : 0}
                    >
                      <span className="opt-dot" />
                      <div className="opt-label">
                        {m.name}
                        <small>{m.sub}</small>
                      </div>
                      <span className={`opt-price ${m.price === null ? 'poa' : ''}`}>
                        {m.price === null
                          ? 'Quoted'
                          : m.price === 0
                            ? ''
                            : formatMoney(m.price)}
                      </span>
                    </div>
                  )
                })}
              </div>
              <div className="qsec">Training</div>
              <div className="team-rows">
                <div className="team-row small">
                  <div className="team-label">
                    Remote sessions
                    <small>90 minutes, screen share, recorded. $195 each</small>
                  </div>
                  <div className="stepper">
                    <button
                      onClick={() =>
                        updateQuote({ training: Math.max(0, quoteState.training - 1) })
                      }
                    >
                      −
                    </button>
                    <input
                      className="mono"
                      type="number"
                      value={quoteState.training}
                      onChange={(e) =>
                        updateQuote({ training: Math.max(0, parseInt(e.target.value) || 0) })
                      }
                    />
                    <button onClick={() => updateQuote({ training: quoteState.training + 1 })}>
                      +
                    </button>
                  </div>
                </div>
                <div className="team-row small">
                  <div className="team-label">
                    On-site training days
                    <small>$1,500 per day plus travel at cost</small>
                  </div>
                  <div className="stepper">
                    <button
                      onClick={() => updateQuote({ onsite: Math.max(0, quoteState.onsite - 1) })}
                    >
                      −
                    </button>
                    <input
                      className="mono"
                      type="number"
                      value={quoteState.onsite}
                      onChange={(e) =>
                        updateQuote({ onsite: Math.max(0, parseInt(e.target.value) || 0) })
                      }
                    />
                    <button onClick={() => updateQuote({ onsite: quoteState.onsite + 1 })}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Website */}
          {wizStep === 5 && (
            <div className="wstep">
              <h2>Website</h2>
              <div className="explain">
                <p>
                  We build hire-business websites with your <b>live availability</b> and Connect
                  booking portal built in — so your site takes bookings, not just enquiries.
                </p>
              </div>
              <div className="team-rows">
                <div className="team-row small">
                  <div className="team-label">
                    Website build
                    <small>Template based, up to 10 pages. $2,490 one-off</small>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={quoteState.webBuild}
                      onChange={(e) => {
                        updateQuote({ webBuild: e.target.checked })
                        if (e.target.checked) updateQuote({ webHost: true })
                      }}
                    />
                    <span className="track" />
                  </label>
                </div>
                <div className="team-row small">
                  <div className="team-label">
                    Hosting and maintenance
                    <small>$49 per month, required with a website build</small>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={quoteState.webHost}
                      onChange={(e) => updateQuote({ webHost: e.target.checked })}
                    />
                    <span className="track" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Review */}
          {wizStep === 6 && (
            <div className="wstep">
              <h2>Your quote</h2>
              <div className="explain">
                <p>
                  Here&apos;s your full configuration. Start your first month for <b>$1</b> with
                  everything set up.
                </p>
              </div>
              <div className="qsummary">
                <div className="qsec" style={{ marginTop: 0 }}>
                  Every month
                </div>
                <div className="qline">
                  <span className="qn">
                    {quotePlan.name} · {quoteState.seats} seat{quoteState.seats > 1 ? 's' : ''} ×{' '}
                    {formatMoney(Math.round(perUserPrice))}
                    {quoteState.billing === 'yearly' && (
                      <span style={{ color: 'var(--green)' }}> (yearly rate)</span>
                    )}
                  </span>
                  <span className="qv mono">
                    {formatMoney(Math.round(perUserPrice * quoteState.seats))}
                  </span>
                </div>
                {quoteState.command > 0 && (
                  <div className="qline">
                    <span className="qn">Command app · {quoteState.command} × $10</span>
                    <span className="qv mono">{formatMoney(quoteState.command * 10)}</span>
                  </div>
                )}
                <div className="qline">
                  <span className="qn">
                    Crew app · {Math.min(quoteState.crew, includedCrew)} user
                    {quoteState.crew === 1 ? '' : 's'} included
                  </span>
                  <span className="qv free">Included</span>
                </div>
                {extraCrew > 0 && (
                  <div className="qline">
                    <span className="qn">Crew app extras · {extraCrew} × $5</span>
                    <span className="qv mono">{formatMoney(extraCrew * 5)}</span>
                  </div>
                )}
                {connectIncluded && (
                  <div className="qline">
                    <span className="qn">Connect customer portal</span>
                    <span className="qv free">Included</span>
                  </div>
                )}
                {!connectIncluded && quoteState.connect && (
                  <div className="qline">
                    <span className="qn">Connect customer portal</span>
                    <span className="qv mono">$49</span>
                  </div>
                )}
                {quoteState.webHost && (
                  <div className="qline">
                    <span className="qn">Website hosting and maintenance</span>
                    <span className="qv mono">$49</span>
                  </div>
                )}

                {oneOffTotal > 0 && (
                  <>
                    <div className="qsec">One-off</div>
                    {onboardOption && onboardOption.price > 0 && (
                      <div className="qline">
                        <span className="qn">{onboardOption.name}</span>
                        <span className="qv mono">{formatMoney(onboardOption.price)}</span>
                      </div>
                    )}
                    {migrateOption && migrateOption.price !== null && migrateOption.price > 0 && (
                      <div className="qline">
                        <span className="qn">{migrateOption.name}</span>
                        <span className="qv mono">{formatMoney(migrateOption.price)}</span>
                      </div>
                    )}
                    {quoteState.training > 0 && (
                      <div className="qline">
                        <span className="qn">Remote training · {quoteState.training} × $195</span>
                        <span className="qv mono">{formatMoney(quoteState.training * 195)}</span>
                      </div>
                    )}
                    {quoteState.onsite > 0 && (
                      <div className="qline">
                        <span className="qn">
                          On-site training · {quoteState.onsite} day{quoteState.onsite > 1 ? 's' : ''}{' '}
                          × $1,500
                        </span>
                        <span className="qv mono">{formatMoney(quoteState.onsite * 1500)}</span>
                      </div>
                    )}
                    {quoteState.webBuild && (
                      <div className="qline">
                        <span className="qn">Website build</span>
                        <span className="qv mono">$2,490</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="drawer-foot">
          <div className="foot-left">
            <div className="foot-label">
              {quoteState.billing === 'yearly' ? 'Per month, billed yearly' : 'Per month'}
            </div>
            <div className="foot-total mono">{formatMoney(Math.round(monthlyTotal))}</div>
            <div className="foot-week">about {formatMoney(Math.round((monthlyTotal * 12) / 52))}/week</div>
          </div>
          <div className="foot-actions">
            {wizStep > 1 && (
              <button className="foot-back" onClick={() => setWizStep(wizStep - 1)}>
                Back
              </button>
            )}
            {wizStep < WIZ_TOTAL ? (
              <button className="foot-cta" onClick={() => setWizStep(wizStep + 1)}>
                Next →
              </button>
            ) : (
              <a className="foot-cta" href={REGISTER_URL} target="_blank" rel="noreferrer">
                Start this for $1 →
              </a>
            )}
          </div>
        </div>
      </aside>
    </main>
  )
}
