'use client'

/**
 * CloudRent Pro Landing Page
 * Design system — Industrial Wayfinding
 * A customer-facing CloudRent Pro sales journey: operational outcomes first,
 * clear plan terms second, with CloudRent Purple as the route-and-action signal.
 */
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Boxes,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Cloud,
  FileCheck2,
  MapPinned,
  ShieldCheck,
  Smartphone,
  Wrench,
} from 'lucide-react'
import './styles.css'

const LOGO_URL = 'https://ipjpelt6tqi5wdno.public.blob.vercel-storage.com/media/CloudRent-logo-hex.png'
const HERO_URL = 'https://ipjpelt6tqi5wdno.public.blob.vercel-storage.com/media/Landing-page-hero-rental-software-cloudrent.webp'
const DISPATCH_URL = 'https://ipjpelt6tqi5wdno.public.blob.vercel-storage.com/Landing-page-ipad-iphone-rental-software-cloudrent.webp'
const INSPECTION_URL = 'https://ipjpelt6tqi5wdno.public.blob.vercel-storage.com/cloudrent-pro-inspection.webp'
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

const capabilityCards = [
  {
    icon: Boxes,
    index: '01',
    title: 'Know what is available—instantly.',
    copy: 'Keep equipment, serialized assets, and multi-location availability in one live view so the next booking does not create the next problem.',
  },
  {
    icon: MapPinned,
    index: '02',
    title: 'Send the right job to the right team.',
    copy: 'Coordinate deliveries, collections, and service calls with job details, routing, status updates, and digital proof of delivery in the same workflow.',
  },
  {
    icon: CircleDollarSign,
    index: '03',
    title: 'Turn completed work into invoices faster.',
    copy: 'Generate invoices from completed jobs, support payment links, and keep your books connected with accounting integrations.',
  },
  {
    icon: ShieldCheck,
    index: '04',
    title: 'Keep safety records ready when they matter.',
    copy: 'Bring SWMS, inspections, digital sign-offs, and incident records into the job record—not another disconnected system.',
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

function AccordionItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-trigger" type="button" onClick={onToggle} aria-expanded={isOpen}>
        <span>
          <b>0{index + 1}</b>
          {question}
        </span>
        <ChevronDown size={16} className={`faq-chevron ${isOpen ? 'rotated' : ''}`} />
      </button>
      <div className={`faq-content ${isOpen ? 'expanded' : ''}`}>
        <div>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function CloudRentProPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>('professional')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId) ?? plans[1],
    [selectedPlanId],
  )

  return (
    <>
      {/* Site Header */}
      <header className="site-header">
        <div className="header-inner">
          <Link href="/dollar-offer/" className="header-brand">
            <img src={LOGO_URL} alt="CloudRent Pro" />
            <span className="header-brand-text">
              <b>CloudRent</b>
              <em>PRO</em>
            </span>
            <span className="header-tagline">HIRE OPERATIONS OS</span>
          </Link>
          <nav className="header-nav">
            <button type="button" onClick={() => scrollToSection('platform')}>
              Platform
            </button>
            <button type="button" onClick={() => scrollToSection('workflows')}>
              Workflows
            </button>
            <button type="button" onClick={() => scrollToSection('pricing')}>
              Plans
            </button>
            <button type="button" onClick={() => scrollToSection('faq')}>
              FAQ
            </button>
          </nav>
          <a className="header-cta" href={REGISTER_URL} target="_blank" rel="noreferrer">
            Start for $1 <ArrowRight size={15} strokeWidth={2.4} />
          </a>
        </div>
      </header>

      <main className="sales-page">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <img
            className="hero-background"
            src={HERO_URL}
            alt="Equipment ready for a hire-business workday"
          />
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-route" aria-hidden="true">
            <span />
          </div>
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow inverse reveal">
                <Cloud size={14} strokeWidth={2.4} /> CloudRent Pro / Hire operations, connected
              </p>
              <h1 className="hero-title reveal delay-1" id="hero-title">
                Run every hire job from <em>one place.</em>
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

            <aside className="hero-status reveal delay-2" aria-label="CloudRent Pro summary">
              <div className="status-head">
                <span>Today&apos;s control panel</span>
                <i />
              </div>
              <div className="status-main">
                <span>One connected view</span>
                <strong>
                  Bookings.
                  <br />
                  Field work.
                  <br />
                  Cash flow.
                </strong>
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

      <section className="platform-section" id="platform" aria-labelledby="platform-title">
        <div className="section-kicker">
          <span>01</span> The operating system for hire
        </div>
        <div className="section-heading-row">
          <h2 id="platform-title">
            Less juggling.
            <br />
            <em>More control.</em>
          </h2>
          <p>
            When every piece of work lives in a different tool, the job gets harder before it
            reaches the customer. CloudRent Pro gives your office and field team one shared
            operating picture.
          </p>
        </div>
        <div className="capability-grid">
          {capabilityCards.map((capability) => {
            const Icon = capability.icon
            return (
              <article className="capability-card" key={capability.index}>
                <div className="card-topline">
                  <span>{capability.index}</span>
                  <Icon size={21} strokeWidth={1.8} />
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.copy}</p>
                <a href={FEATURES_URL} target="_blank" rel="noreferrer">
                  Explore capability <ArrowRight size={15} />
                </a>
              </article>
            )
          })}
        </div>
      </section>

      <div className="route-connector route-connector-light route-connector-flip" aria-hidden="true">
        <span>ROUTE / 02 / DISPATCH</span>
        <i />
      </div>

      <section className="dispatch-section" id="workflows" aria-labelledby="workflow-title">
        <div className="dispatch-visual">
          <img src={DISPATCH_URL} alt="Dispatch planning materials for a rental operation" />
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
            <span>02</span> Workflows that keep moving
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
        <span>ROUTE / 03 / CAPTURE</span>
        <i />
      </div>

      <section className="inspection-section" aria-labelledby="inspection-title">
        <div className="inspection-copy">
          <div className="section-kicker">
            <span>03</span> Built for the real world
          </div>
          <h2 id="inspection-title">
            Evidence beats <em>assumption.</em>
          </h2>
          <p>
            From digital signatures and delivery proof to photo inspections and AI-assisted damage
            assessment, CloudRent Pro keeps the detail close to the job—not in someone&apos;s
            inbox.
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
        <span>ROUTE / 04 / CONFIGURE</span>
        <i />
      </div>

      <section className="pricing-section" id="pricing" aria-labelledby="pricing-title">
        <div className="pricing-header">
          <div>
            <div className="section-kicker">
              <span>04</span> Choose your operating level
            </div>
            <h2 id="pricing-title">
              Start with the plan that fits <em>today.</em>
            </h2>
          </div>
          <div className="pricing-offer-note">
            <span>INTRODUCTORY ACCESS</span>
            <strong>$1 for 30 days of full access</strong>
            <p>
              Choose a plan when you are ready to continue. Current prices are AUD and ex-GST.
            </p>
          </div>
        </div>
        <div className="plan-grid" role="radiogroup" aria-label="CloudRent Pro plan selection">
          {plans.map((plan, index) => {
            const active = selectedPlanId === plan.id
            return (
              <article className={`plan-card ${active ? 'selected' : ''}`} key={plan.id}>
                <button
                  className="plan-select"
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSelectedPlanId(plan.id)}
                >
                  <span className="plan-marker" aria-hidden="true" />
                  <span>Select {plan.name}</span>
                </button>
                {plan.badge ? <span className="plan-badge">{plan.badge}</span> : null}
                <span className={`plan-state ${active ? 'active' : ''}`}>
                  {active ? 'Active configuration' : 'Available configuration'}
                </span>
                <span className="plan-bay-label">PLAN BAY / 0{index + 1}</span>
                <p className="plan-name">{plan.name}</p>
                <div className="plan-price">
                  <strong>{plan.price}</strong>
                  <span>{plan.cadence}</span>
                </div>
                <p className="plan-description">{plan.description}</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={15} strokeWidth={2.5} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  className={active ? 'plan-cta active' : 'plan-cta'}
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Start for $1 <ArrowRight size={15} />
                </a>
              </article>
            )
          })}
        </div>
        <div className="selected-plan-strip" aria-live="polite">
          <span>YOUR SELECTED PATH</span>
          <strong>
            {selectedPlan.name} — {selectedPlan.price}
            {selectedPlan.cadence}
          </strong>
          <p>Start with full access for $1. Review the current plan details before you continue.</p>
          <a href={REGISTER_URL} target="_blank" rel="noreferrer">
            Start {selectedPlan.name} for $1 <ArrowRight size={16} />
          </a>
        </div>
        <p className="pricing-footnote">
          Mobile app access, webstore and customer portal, onboarding, and other services are
          available separately.{' '}
          <a href={PRICING_URL} target="_blank" rel="noreferrer">
            View current pricing details
          </a>
          .
        </p>
      </section>

      <div className="route-connector route-connector-light route-connector-flip" aria-hidden="true">
        <span>ROUTE / 05 / CLARIFY</span>
        <i />
      </div>

      <section className="faq-section" id="faq" aria-labelledby="faq-title">
        <div className="faq-intro">
          <div className="section-kicker inverse">
            <span>05</span> The practical questions
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
              question={item.question}
              answer={item.answer}
              index={index}
              isOpen={openFaq === index}
              onToggle={() => setOpenFaq(openFaq === index ? null : index)}
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
          <p>Start CloudRent Pro for $1 and explore the complete platform for 30 days.</p>
          <a className="button-signal" href={REGISTER_URL} target="_blank" rel="noreferrer">
            Start 30 days for $1 <ArrowRight size={17} />
          </a>
          <span>Full platform access · No setup fee</span>
        </div>
      </section>
    </main>

    {/* Site Footer */}
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/dollar-offer/" className="footer-logo">
            <img src={LOGO_URL} alt="CloudRent Pro" />
            <span className="footer-brand-text">
              <b>CloudRent</b>
              <em>PRO</em>
            </span>
          </Link>
          <span className="footer-tagline">HIRE OPERATIONS OS</span>
        </div>
        <p className="footer-disclaimer">
          All prices shown in AUD and ex-GST. See the current registration and pricing pages for
          full details.
        </p>
        <nav className="footer-nav">
          <a href={FEATURES_URL} target="_blank" rel="noreferrer">
            Features
          </a>
          <a href={PRICING_URL} target="_blank" rel="noreferrer">
            Pricing
          </a>
          <a href={REGISTER_URL} target="_blank" rel="noreferrer">
            Start for $1
          </a>
        </nav>
      </div>
    </footer>
  </>
  )
}
