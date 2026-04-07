'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { Camera, PenTool, RefreshCw, FileText, CheckCircle2 } from 'lucide-react'
import { useUTMParams } from '@/hooks/useUTMParams'
import { trackLandingPageEvent, trackLandingPageView } from '@/utilities/trackLandingPageEvent'

// ============================================
// DATA
// ============================================

const scenarios = [
  {
    tag: 'Common',
    tagColor: 'red',
    title: '"It Was Already Like That"',
    description:
      'Your excavator comes back with a cracked bucket pin. The customer swears it was pre-existing. You have no photos. Your word against theirs — and without proof, most operators just absorb it.',
    quote:
      '"We ended up replacing a $600 part because we couldn\'t prove it happened on their site. Lesson learned — but too late."',
  },
  {
    tag: 'Costly',
    tagColor: 'red',
    title: 'The Insurance Claim With No Evidence',
    description:
      "You lodge a damage claim with your insurer. They want dated photos showing condition before and after. You've got nothing. Claim rejected. You cover the repair out of pocket.",
    quote:
      '"Insurer wanted timestamped photos taken at dispatch. We had nothing. $2,800 repair, zero reimbursement."',
  },
  {
    tag: 'Frustrating',
    tagColor: 'amber',
    title: 'Good Customers Gone Bad',
    description:
      "You've rented to someone twenty times without issue. A new employee on their site damages your kit. Now there's an awkward dispute that risks your whole relationship — all because there's no objective record.",
    quote:
      '"It wasn\'t even about the money. We just needed something neutral to show them. A photo would have solved everything."',
  },
  {
    tag: 'Ongoing',
    tagColor: 'amber',
    title: 'High-Rotation Kit Deteriorates Fast',
    description:
      'When the same gear goes out ten times a month, tracking wear vs. actual damage is nearly impossible without a condition record at every single dispatch and return.',
    quote:
      '"By the time we noticed the damage pattern, we couldn\'t pin it to any one customer. Just wrote it off."',
  },
]

const steps = [
  {
    icon: '📸',
    title: 'Photo at Dispatch',
    description:
      'Your driver or team member photographs equipment condition before it leaves the yard. Timestamped, stored against the booking.',
  },
  {
    icon: '✍️',
    title: 'Customer Sign-Off',
    description:
      'Customer digitally acknowledges the condition at pickup. No ambiguity, no "I never saw that" — they signed on the record.',
  },
  {
    icon: '🔄',
    title: 'Photo at Return',
    description:
      'Return photos captured on the spot. Same booking, side-by-side with dispatch photos. Condition delta is immediately visible.',
  },
  {
    icon: '📋',
    title: 'PDF Condition Report',
    description:
      'Generate a full before-and-after condition report in one click. Share with customer, insurer, or legal — professionally formatted.',
  },
]

const features = [
  {
    icon: '📷',
    title: 'Photo Documentation',
    description:
      'Attach multiple photos to any booking, item, or service record. Stored securely, accessible anytime, tied to the right job.',
    status: 'Live Now',
  },
  {
    icon: '✍️',
    title: 'Digital Signature',
    description:
      'Customers sign for condition at dispatch on any device. Legally sound, timestamped, and stored against the booking automatically.',
    status: 'Live Now',
  },
  {
    icon: '📋',
    title: 'Equipment Condition Tracking',
    description:
      'Log condition per serialised unit. Track changes across hires. Know at a glance which items have open damage flags.',
    status: 'Live Now',
  },
  {
    icon: '📄',
    title: 'Invoice With Damage Line Items',
    description:
      "Add damage charges directly to the customer's invoice — with description, photos attached, and a professional paper trail from quote to payment.",
    status: 'Live Now',
  },
  {
    icon: '🤖',
    title: 'AI Photo Comparison',
    description:
      'Automatically compares dispatch and return photos, flags visual damage differences, and scores damage likelihood. No manual eyeballing. No missed claims.',
    status: 'Live Now',
  },
  {
    icon: '📊',
    title: 'Damage Reporting',
    description:
      'See which customers, equipment types, or job sites generate the most damage incidents over time. Data to protect your margins.',
    status: 'Live Now',
  },
]

const stripItems = [
  'Photo Evidence at Dispatch',
  'Return Condition Comparison',
  'Timestamped & Geotagged',
  'Stored Against Every Booking',
  'AI Damage Detection — Built In',
  'Customer Sign-Off on Condition',
  'PDF Condition Report',
]

// ============================================
// COMPONENT
// ============================================

export default function EquipmentDamageProtectionClient() {
  const utmString = useUTMParams()

  useEffect(() => {
    trackLandingPageView('damage')
  }, [])

  const handleTrialClick = () => {
    trackLandingPageEvent('begin_trial', 'damage')
  }

  const handleDemoClick = () => {
    trackLandingPageEvent('book_demo', 'damage')
  }

  const handleNavCtaClick = () => {
    trackLandingPageEvent('nav_cta_click', 'damage')
  }

  const trialUrl = `https://app.cloudrent.me/register${utmString}`
  const demoUrl = `/demo${utmString}`

  return (
    <div className="damage-landing">
      {/* Custom Styles */}
      <style jsx global>{`
        .damage-landing {
          --cream: #f7f4ef;
          --white: #ffffff;
          --ink: #0f0d0a;
          --ink2: #2a2620;
          --mid: #6b6560;
          --rule: #ddd8d0;
          --brand: #881ba9;
          --brand2: #4d2068;
          --brand-pale: #f5eefa;
          --green: #1a7a4a;
          --green-pale: #edf7f2;
          --amber: #d4860a;
          --amber-pale: #fdf6e8;
        }

        .damage-landing {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--cream);
          color: var(--ink);
        }

        @keyframes damage-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes damage-fadeIn {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-5 bg-[var(--cream)]/95 backdrop-blur-md border-b border-[var(--rule)]">
        <Link href="/" className="font-semibold text-lg tracking-wide text-[var(--ink)]">
          CloudRent <span className="text-[var(--brand)]">Pro</span>
        </Link>
        <Link
          href={demoUrl}
          onClick={handleNavCtaClick}
          className="bg-[var(--ink)] text-white font-medium text-sm tracking-wide px-7 py-2.5 hover:bg-[var(--brand)] transition-colors"
        >
          Book a Demo
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-20 lg:pt-0">
        {/* Hero Left */}
        <div className="px-6 py-16 lg:px-16 lg:py-20 flex flex-col justify-center">
          <div
            className="flex items-center gap-2.5 mb-6 text-[var(--brand)] text-xs font-medium tracking-[0.2em] uppercase"
            style={{ animation: 'damage-fadeIn 0.6s ease forwards', animationDelay: '0.1s', opacity: 0 }}
          >
            <span className="w-6 h-px bg-[var(--brand)]" />
            AI-Powered Equipment Damage Detection
          </div>

          <h1
            className="font-['Playfair_Display',Georgia,serif] font-black text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-7"
            style={{ animation: 'damage-fadeIn 0.6s ease forwards', animationDelay: '0.25s', opacity: 0 }}
          >
            Stop Eating the Cost of <em className="italic text-[var(--brand)]">Disputed Damage.</em>
          </h1>

          <p
            className="text-[var(--mid)] text-lg leading-relaxed max-w-md mb-12 border-l-[3px] border-[var(--rule)] pl-5"
            style={{ animation: 'damage-fadeIn 0.6s ease forwards', animationDelay: '0.4s', opacity: 0 }}
          >
            Equipment comes back damaged and the customer says{' '}
            <strong className="text-[var(--ink2)] font-medium">"it was like that when we got it."</strong>{' '}
            CloudRent Pro captures photos at dispatch and return — then AI automatically compares them and
            flags the damage. Proof in seconds. Disputes resolved.
          </p>

          <div
            className="flex items-center gap-7 flex-wrap"
            style={{ animation: 'damage-fadeIn 0.6s ease forwards', animationDelay: '0.5s', opacity: 0 }}
          >
            <Link
              href={trialUrl}
              onClick={handleTrialClick}
              className="bg-[var(--ink)] text-white font-medium text-[15px] tracking-wide px-9 py-4 hover:bg-[var(--brand)] transition-colors"
            >
              Start $1 Trial — 30 Days Full Access
            </Link>
            <Link
              href={demoUrl}
              onClick={handleDemoClick}
              className="text-[var(--ink)] font-medium text-sm border-b border-[var(--rule)] pb-0.5 hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
            >
              Book a Demo →
            </Link>
          </div>

          <p
            className="mt-4 text-xs text-[var(--mid)] tracking-wide"
            style={{ animation: 'damage-fadeIn 0.6s ease forwards', animationDelay: '0.6s', opacity: 0 }}
          >
            Credit card required for $1 charge. Cancel anytime.
          </p>
        </div>

        {/* Hero Right - Stats */}
        <div
          className="bg-[var(--ink)] px-6 py-16 lg:px-12 lg:py-20 flex flex-col justify-center relative overflow-hidden"
          style={{ animation: 'damage-fadeIn 0.8s ease both', animationDelay: '0.3s' }}
        >
          <span className="absolute -right-10 -bottom-20 font-['Playfair_Display',Georgia,serif] text-[280px] lg:text-[400px] font-black text-white/[0.04] leading-none pointer-events-none select-none">
            $
          </span>

          <div className="flex flex-col gap-4 relative z-10">
            <div className="bg-[var(--brand)] border border-white/10 p-7">
              <span className="font-['Playfair_Display',Georgia,serif] text-5xl font-black text-white block">
                1 in 3
              </span>
              <span className="text-xs text-white/75 tracking-wide uppercase mt-1.5 block">
                Damage disputes end in no recovery
              </span>
              <p className="text-sm text-white/40 mt-2 leading-relaxed">
                Without a photographic record at dispatch and return, hire businesses have no leverage.
              </p>
            </div>

            <div className="bg-white/[0.04] border border-white/10 p-7">
              <span className="font-['Playfair_Display',Georgia,serif] text-5xl font-black text-white block">
                $4,200
              </span>
              <span className="text-xs text-white/50 tracking-wide uppercase mt-1.5 block">
                Avg. unrecovered damage per year
              </span>
              <p className="text-sm text-white/40 mt-2 leading-relaxed">
                Across typical hire operators with 50+ active items on rotation.
              </p>
            </div>

            <div className="bg-white/[0.04] border border-white/10 p-7">
              <span className="font-['Playfair_Display',Georgia,serif] text-5xl font-black text-white block">
                0
              </span>
              <span className="text-xs text-white/50 tracking-wide uppercase mt-1.5 block">
                Competitors with AI damage detection
              </span>
              <p className="text-sm text-white/40 mt-2 leading-relaxed">
                CloudRent Pro is the only hire platform with AI-powered photo comparison built in — live
                today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Strip */}
      <div className="bg-[var(--brand)] text-white py-4 px-6 overflow-hidden">
        <div
          className="flex gap-14 whitespace-nowrap"
          style={{ animation: 'damage-scroll 30s linear infinite' }}
        >
          {[...stripItems, ...stripItems].map((item, i) => (
            <span key={i} className="flex items-center gap-2.5 text-[15px] font-medium tracking-wide">
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Problem Section */}
      <section className="py-20 lg:py-28 px-6 max-w-6xl mx-auto">
        <p className="text-[var(--mid)] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
          Situations Every Hire Business Knows
        </p>
        <h2 className="font-['Playfair_Display',Georgia,serif] font-black text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-16 max-w-2xl">
          You've Heard Every Excuse.{' '}
          <em className="italic text-[var(--brand)]">Without Proof, You're Stuck.</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--rule)]">
          {scenarios.map((scenario, i) => (
            <div key={i} className="bg-[var(--cream)] p-8 lg:p-10">
              <span
                className={`inline-block text-[11px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5 mb-5 ${
                  scenario.tagColor === 'red'
                    ? 'bg-[var(--brand-pale)] text-[var(--brand)]'
                    : 'bg-[var(--amber-pale)] text-[var(--amber)]'
                }`}
              >
                {scenario.tag}
              </span>
              <h3 className="font-['Playfair_Display',Georgia,serif] font-bold text-xl lg:text-[22px] mb-3 text-[var(--ink)]">
                {scenario.title}
              </h3>
              <p className="text-[15px] text-[var(--mid)] leading-relaxed">{scenario.description}</p>
              <blockquote className="mt-5 p-4 bg-white border-l-[3px] border-[var(--brand)] italic text-sm text-[var(--ink2)] leading-relaxed">
                {scenario.quote}
              </blockquote>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white border-y border-[var(--rule)] py-20 lg:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[var(--mid)] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            How CloudRent Pro Protects You
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20 items-end">
            <h2 className="font-['Playfair_Display',Georgia,serif] font-black text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
              A Timestamped Paper Trail for{' '}
              <em className="italic text-[var(--brand)]">Every Hire.</em>
            </h2>
            <p className="text-[var(--mid)] text-lg leading-relaxed pt-5 border-t border-[var(--rule)]">
              CloudRent Pro creates an unambiguous, photo-backed condition record at dispatch and return —
              tied to the booking, the customer, and the time. Disputes become conversations. Conversations
              become resolved.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--rule)] mb-20">
            {steps.map((step, i) => (
              <div key={i} className="bg-white p-8 lg:p-10 relative">
                <span className="absolute top-4 right-6 font-['Playfair_Display',Georgia,serif] text-6xl font-black text-[var(--brand)]/[0.08]">
                  {i + 1}
                </span>
                <span className="text-3xl block mb-5">{step.icon}</span>
                <h3 className="font-['Playfair_Display',Georgia,serif] font-bold text-xl mb-2.5 text-[var(--ink)]">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--mid)] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* AI Callout */}
          <div className="bg-[var(--ink)] text-white p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <h3 className="font-['Playfair_Display',Georgia,serif] font-bold text-2xl lg:text-3xl mb-3">
                AI Damage Detection — <em className="italic text-[var(--brand)]">Live & Built In</em>
              </h3>
              <p className="text-base text-white/55 leading-relaxed max-w-xl">
                CloudRent Pro's AI automatically compares dispatch and return photos — flagging visual
                differences, scoring damage likelihood, and surfacing only the issues that need your
                attention. No manual side-by-side. No missed damage. No other hire software does this.
              </p>
            </div>
            <div className="bg-[var(--brand)] px-8 py-5 text-center flex-shrink-0">
              <span className="font-['Playfair_Display',Georgia,serif] text-3xl font-black block">AI</span>
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/70 mt-1 block">
                Powered & live
                <br />
                in CloudRent Pro
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 px-6 max-w-6xl mx-auto">
        <p className="text-[var(--mid)] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
          Every Feature. Live Today.
        </p>
        <h2 className="font-['Playfair_Display',Georgia,serif] font-black text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-16 max-w-2xl">
          Everything You Need to{' '}
          <em className="italic text-[var(--brand)]">Win the Dispute.</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--rule)]">
          {features.map((feat, i) => (
            <div
              key={i}
              className="bg-[var(--cream)] p-8 lg:p-10 hover:bg-white transition-colors"
            >
              <span className="text-3xl block mb-4">{feat.icon}</span>
              <h3 className="font-['Playfair_Display',Georgia,serif] font-bold text-xl mb-2.5 text-[var(--ink)]">
                {feat.title}
              </h3>
              <p className="text-sm text-[var(--mid)] leading-relaxed">{feat.description}</p>
              <span className="inline-block mt-4 text-[11px] font-semibold tracking-[0.12em] uppercase px-2.5 py-1 bg-[var(--green-pale)] text-[var(--green)]">
                {feat.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Money Section */}
      <section className="bg-[var(--brand)] py-20 lg:py-24 px-6 relative overflow-hidden">
        <span className="absolute -right-20 -bottom-16 font-['Playfair_Display',Georgia,serif] text-[200px] lg:text-[280px] font-black text-white/[0.04] leading-none pointer-events-none tracking-tighter">
          $$$$
        </span>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <h2 className="font-['Playfair_Display',Georgia,serif] font-black text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-white mb-6">
              Every Disputed Claim You Lose Is Money Out of Your Pocket.
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-9">
              CloudRent Pro pays for itself the first time you win a damage dispute you would have
              previously had to write off. At $85/user/month — that's a single recovered repair job, once.
              Everything after that is pure margin recovered.
            </p>
            <Link
              href={trialUrl}
              onClick={handleTrialClick}
              className="inline-block bg-white text-[var(--brand)] font-semibold text-[15px] tracking-wide px-9 py-4 hover:bg-[var(--ink)] hover:text-white transition-colors"
            >
              Start $1 Trial — Full Access for 30 Days
            </Link>
          </div>

          <div className="flex flex-col gap-px">
            {[
              { num: '$85', desc: 'Per user / month. All features included. No hidden fees.' },
              { num: '$1', desc: 'Starts your 30-day full access trial today.' },
              { num: '1×', desc: 'Won dispute pays for your subscription for the year.' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/[0.07] p-7 flex items-center gap-7 border-l-4 border-white/15"
              >
                <span className="font-['Playfair_Display',Georgia,serif] text-5xl font-black text-white flex-shrink-0">
                  {stat.num}
                </span>
                <span className="text-sm text-white/60 leading-relaxed">{stat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-[var(--ink)] py-20 lg:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-8">
            From a CloudRent Pro Customer
          </p>
          <blockquote className="font-['Playfair_Display',Georgia,serif] font-bold text-xl md:text-2xl lg:text-3xl text-white leading-snug mb-9">
            "Before CloudRent Pro, we had no way to prove condition at pickup. We absorbed damage costs
            constantly and it was just accepted as part of the business. Now every hire goes out with photos
            and a digital sign-off — the disputes have basically stopped."
          </blockquote>
          <p className="text-xs text-white/35 tracking-[0.08em] uppercase pt-7 border-t border-white/10">
            — CloudRent Pro Customer | Construction Plant Hire, QLD
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--cream)] border-t border-[var(--rule)] py-24 lg:py-32 px-6 text-center">
        <h2 className="font-['Playfair_Display',Georgia,serif] font-black text-4xl md:text-6xl lg:text-7xl leading-none tracking-tight mb-6">
          Protect Your
          <br />
          <em className="italic text-[var(--brand)]">Equipment. Your Money.</em>
        </h2>
        <p className="text-lg text-[var(--mid)] max-w-md mx-auto mb-12 leading-relaxed">
          Try CloudRent Pro for 30 days with full access to every feature — including damage documentation,
          digital sign-off, and dispatch workflows.
        </p>

        <div className="flex justify-center items-baseline gap-2.5 mb-10">
          <span className="font-['Playfair_Display',Georgia,serif] text-7xl lg:text-8xl font-black text-[var(--ink)]">
            $1
          </span>
          <span className="text-[15px] text-[var(--mid)] text-left leading-snug max-w-[120px]">
            30-day
            <br />
            full access
            <br />
            trial
          </span>
        </div>

        <Link
          href={trialUrl}
          onClick={handleTrialClick}
          className="inline-block bg-[var(--ink)] text-white font-medium text-lg tracking-wide px-14 py-5 hover:bg-[var(--brand)] transition-colors mb-10"
        >
          Start Your $1 Trial Now
        </Link>

        <div className="flex justify-center gap-10 flex-wrap mb-10">
          {[
            'Credit card required for $1',
            'Every feature from day one',
            'Cancel anytime',
            'Australian-made & supported',
          ].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-[var(--mid)]"
            >
              <span className="text-[var(--green)] font-bold">✓</span>
              {item}
            </span>
          ))}
        </div>

        <Link
          href={demoUrl}
          onClick={handleDemoClick}
          className="text-[var(--ink)] font-medium text-sm border-b border-[var(--rule)] pb-0.5 hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
        >
          Prefer a walkthrough? Book a demo with Ron →
        </Link>
      </section>

      {/* Landing Page Footer */}
      <footer className="bg-[var(--ink)] border-t-[3px] border-[var(--brand)] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5 text-center md:text-left">
          <span className="font-semibold text-lg text-white tracking-wide">
            CloudRent <span className="text-[var(--brand)]">Pro</span>
          </span>
          <p className="text-xs text-white/30">
            Built for Australian hire businesses. GST compliant. © 2026 CloudRent Pro.
          </p>
          <p className="text-xs text-white/30">
            Questions?{' '}
            <a href="mailto:hello@cloudrent.me" className="text-[var(--brand)]/85 font-medium">
              hello@cloudrent.me
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
