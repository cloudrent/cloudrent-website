'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

// Checkmark icon
function Check({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={cn('shrink-0', className)}
    >
      <circle cx="9" cy="9" r="9" fill="currentColor" opacity="0.12" />
      <path
        d="M5.5 9.2L7.8 11.5L12.5 6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// X icon for not included
function Cross({ dark }: { dark?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
      <circle cx="9" cy="9" r="9" fill={dark ? '#3b3b4f' : '#e5e7eb'} />
      <path
        d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5"
        stroke={dark ? '#6b6b80' : '#9ca3af'}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
      <path d="M7 0L8.8 4.8L14 5.2L10.1 8.6L11.3 14L7 11.2L2.7 14L3.9 8.6L0 5.2L5.2 4.8L7 0Z" />
    </svg>
  )
}

interface Feature {
  text: string
  included: boolean
  bold?: boolean
}

interface Tier {
  name: string
  price: number
  subtitle: string
  features: Feature[]
  cta: string
  popular: boolean
  highlight?: boolean
}

const tiers: Tier[] = [
  {
    name: 'Starter',
    price: 49,
    subtitle: 'For small operators getting started',
    features: [
      { text: 'Equipment catalog & management', included: true },
      { text: 'Reservations & calendar', included: true },
      { text: 'Customer management', included: true },
      { text: 'Basic invoicing & PDF contracts', included: true },
      { text: 'Digital signatures', included: true },
      { text: 'Staff management (3 roles)', included: true },
      { text: 'Email support', included: true },
      { text: 'Xero accounting sync', included: false },
      { text: 'SWMS & safety documents', included: false },
      { text: 'Stocktakes & asset tracking', included: false },
      { text: 'Marketing & bulk email', included: false },
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: 85,
    subtitle: 'The full toolkit for growing businesses',
    features: [
      { text: 'Everything in Starter, plus:', included: true, bold: true },
      { text: 'Xero accounting integration', included: true },
      { text: 'SWMS & safety documentation', included: true },
      { text: 'Stocktakes & asset management', included: true },
      { text: 'Inspection forms & checklists', included: true },
      { text: 'Tiered pricing engine', included: true },
      { text: 'Email integration (Gmail / Outlook)', included: true },
      { text: 'Advanced reporting', included: true },
      { text: 'All 5 staff roles', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Marketing & bulk email', included: false },
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Business',
    price: 129,
    subtitle: 'For enterprises that demand everything',
    highlight: true,
    features: [
      { text: 'Everything in Professional, plus:', included: true, bold: true },
      { text: 'Marketing system & bulk email', included: true },
      { text: 'Damage detection module', included: true },
      { text: 'GPS & telematics tracking', included: true },
      { text: 'AI-powered support agent', included: true },
      { text: 'Advanced analytics dashboard', included: true },
      { text: 'Roster & time clock', included: true },
      { text: 'Staff chat system', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Phone & live chat support', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

const addons = [
  {
    name: 'Mobile App Access',
    price: '$10',
    unit: '/user/mo',
    description: 'Full mobile app for field staff with offline sync',
  },
  {
    name: 'Driver App',
    price: 'Free',
    unit: '',
    description: 'View assigned jobs, accept/decline, GPS clock-in',
  },
  {
    name: 'Webstore & Customer Portal',
    price: '$49',
    unit: '/mo',
    description: 'Online booking, rental history, invoice downloads. $200 setup fee.',
  },
  {
    name: 'Additional Xero Entities',
    price: '$10',
    unit: '/entity/mo',
    description: 'Multi-entity accounting connections',
  },
  {
    name: 'SMS Notifications',
    price: 'Usage',
    unit: '-based',
    description: 'Automated SMS via Twilio for reminders & alerts',
  },
  {
    name: 'Professional Onboarding',
    price: '$499',
    unit: ' one-off',
    description: 'White-glove setup, data migration & training',
  },
]

const faqs = [
  {
    q: 'What happens after my 30-day trial?',
    a: "You'll be prompted to choose a plan. No credit card required to start, and all your data is preserved when you upgrade.",
  },
  {
    q: 'Can I change plans later?',
    a: 'Absolutely. Upgrade or downgrade anytime. Changes take effect on your next billing cycle with prorated adjustments.',
  },
  {
    q: "What does 'per user' mean?",
    a: 'Each person who logs into the CloudRent Pro web app counts as a user. The mobile app is charged separately at $10/user/mo, and the driver app is always free.',
  },
  {
    q: 'Is GST included in the pricing?',
    a: 'Prices shown are ex-GST. GST (10%) is added at checkout for Australian businesses.',
  },
  {
    q: 'Do Founding Customers keep their pricing forever?',
    a: "Yes — and once the spots are filled, this deal is gone permanently. Founding customers are locked in at $85/user/mo with every feature included for as long as they remain subscribed. Cancel and rejoin? You'll be on standard pricing. We won't be running this offer again.",
  },
]

const comparisonRows: [string, boolean | string, boolean | string, boolean | string][] = [
  ['Equipment management', true, true, true],
  ['Reservations & calendar', true, true, true],
  ['Invoicing & PDF contracts', true, true, true],
  ['Digital signatures', true, true, true],
  ['Customer management', true, true, true],
  ['Staff roles', '3 roles', '5 roles', 'Unlimited'],
  ['Xero accounting sync', false, true, true],
  ['SWMS & safety docs', false, true, true],
  ['Stocktakes & asset tracking', false, true, true],
  ['Inspection forms', false, true, true],
  ['Tiered pricing engine', false, true, true],
  ['Email integration', false, true, true],
  ['Marketing & bulk email', false, false, true],
  ['Damage detection', false, false, true],
  ['GPS tracking', false, false, true],
  ['AI support agent', false, false, true],
  ['Roster & time clock', false, false, true],
  ['Support', 'Email', 'Priority email', 'Phone & live chat'],
]

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const yearlyDiscount = 0.15

  const getDisplayPrice = (monthlyPrice: number) => {
    if (billing === 'yearly') {
      return Math.round(monthlyPrice * 12 * (1 - yearlyDiscount))
    }
    return monthlyPrice
  }

  const getMonthlyEquivalent = (monthlyPrice: number) => {
    return Math.round(monthlyPrice * (1 - yearlyDiscount))
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0a0a1a] font-sans text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
      </div>

      {/* ═══════════════ FOUNDING CUSTOMER BANNER ═══════════════ */}
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-purple-deep via-brand-purple to-fuchsia-500 px-5 py-3 text-center">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative flex flex-wrap items-center justify-center gap-2">
          <span className="flex gap-0.5 text-amber-400">
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </span>
          <span className="text-sm font-medium tracking-wide text-white">
            Founding Customer Program —{' '}
            <strong className="text-amber-400">Spots are almost gone</strong> — Lock in every
            feature for just $85/user
          </span>
          <span className="flex gap-0.5 text-amber-400">
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </span>
        </div>
      </div>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <div className="relative px-5 pb-14 pt-20 text-center">
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-5 inline-block rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-1.5 text-[15px] font-semibold uppercase tracking-wider text-purple-300">
            Simple, transparent pricing
          </div>

          <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            One platform.
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Every hire tool
            </span>{' '}
            you need.
          </h1>

          <p className="mx-auto mb-9 max-w-lg text-lg leading-relaxed text-gray-400">
            From a single excavator to a fleet of thousands. Choose the plan that fits your business
            today, scale when you&apos;re ready.
          </p>
        </div>
      </div>

      {/* ═══════════════ FOUNDING CUSTOMER CALLOUT ═══════════════ */}
      <div className="relative mx-auto -mt-5 mb-10 max-w-4xl px-5">
        <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-900/60 to-fuchsia-900/60 p-9 shadow-[0_8px_32px_rgba(136,27,169,0.3)]">
          {/* Pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 12px)',
            }}
          />

          <div className="relative text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-300">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />
              Closing Soon — Don&apos;t Miss Out
            </div>

            <h3 className="mb-2.5 text-3xl font-black tracking-tight text-white">
              Become a Founding Customer
            </h3>

            <p className="mx-auto mb-6 max-w-xl text-base leading-relaxed text-gray-300">
              We&apos;re only accepting a <strong className="text-amber-400">limited number</strong>{' '}
              of founding customers who&apos;ll get the{' '}
              <strong className="text-white">full Business plan</strong> — every feature, every
              integration, every future update — locked in at just{' '}
              <strong className="text-amber-400">$85/user/mo</strong> for as long as you stay
              subscribed.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-4">
              {[
                "Rate locked while you're subscribed",
                'Every feature included',
                'Priority onboarding',
              ].map((item, i) => (
                <div
                  key={item}
                  className="rounded-xl border border-purple-500/20 bg-purple-900/40 px-4 py-2.5 text-[15px] font-semibold text-white"
                >
                  {['🔒', '⚡', '🚀'][i]} {item}
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-block cursor-pointer rounded-xl border-none bg-gradient-to-r from-amber-400 to-amber-500 px-10 py-4 text-base font-extrabold text-purple-900 shadow-[0_4px_20px_rgba(251,191,36,0.35)] transition-all hover:from-amber-300 hover:to-amber-400"
            >
              Claim Your Founding Spot →
            </Link>

            <p className="mb-0 mt-3.5 text-xs text-gray-500">
              Once spots fill up, this offer is gone. No exceptions.
            </p>
          </div>
        </div>
      </div>
      <div className="relative px-5 pb-14 pt-20 text-center">
        {/* Billing toggle */}
        <div className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-900/30 p-1.5">
          {(['monthly', 'yearly'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setBilling(period)}
              className={cn(
                'cursor-pointer rounded-full border-none px-6 py-2.5 text-sm font-semibold transition-all duration-200',
                billing === period
                  ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-transparent text-gray-400 hover:text-white',
              )}
            >
              {period === 'monthly' ? 'Monthly' : 'Yearly'}
              {period === 'yearly' && (
                <span
                  className={cn(
                    'ml-1.5 rounded-lg px-2 py-0.5 text-[11px] font-bold',
                    billing === 'yearly'
                      ? 'bg-white/20 text-white'
                      : 'bg-green-500/20 text-green-400',
                  )}
                >
                  Save 15%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════ PRICING TIERS ═══════════════ */}
      <div className="relative mx-auto grid max-w-6xl items-start gap-6 px-5 pb-14 md:grid-cols-3">
        {tiers.map((tier) => {
          const displayPrice = getDisplayPrice(tier.price)
          const isHighlight = tier.highlight

          return (
            <div
              key={tier.name}
              className={cn(
                'relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1',
                tier.popular && 'scale-[1.03] hover:scale-105',
                tier.popular
                  ? 'border-2 border-purple-500 shadow-[0_12px_40px_rgba(136,27,169,0.3)]'
                  : isHighlight
                    ? 'border border-fuchsia-500/50 shadow-[0_12px_40px_rgba(192,38,211,0.2)]'
                    : 'border border-purple-500/20 shadow-lg hover:border-purple-500/40',
                isHighlight
                  ? 'bg-gradient-to-br from-purple-900/80 to-fuchsia-900/80'
                  : 'bg-purple-900/30',
              )}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 py-2 text-center text-xs font-bold uppercase tracking-widest text-white">
                  ✦ Most Popular ✦
                </div>
              )}

              <div className="p-7 pt-8">
                {/* Tier header */}
                <div className="mb-6">
                  <h3 className="mb-1 text-[22px] font-bold text-white">{tier.name}</h3>
                  <p className="text-sm text-gray-400">{tier.subtitle}</p>
                </div>

                {/* Price */}
                <div className="mb-7">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-medium text-gray-400">$</span>
                    <span
                      className={cn(
                        'text-5xl font-extrabold leading-none',
                        tier.popular
                          ? 'bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent'
                          : 'text-white',
                      )}
                    >
                      {displayPrice}
                    </span>
                    <div className="ml-1 flex flex-col">
                      <span className="text-sm font-medium text-gray-400">/user</span>
                      <span className="text-xs text-gray-500">
                        {billing === 'yearly' ? '/year' : '/month'}
                      </span>
                    </div>
                  </div>
                  {billing === 'yearly' && (
                    <div className="mt-1.5 text-[15px] font-semibold text-green-400">
                      ${getMonthlyEquivalent(tier.price)}/mo equivalent • Save $
                      {Math.round(tier.price * 12 * yearlyDiscount)}/year
                    </div>
                  )}
                  {tier.name === 'Business' && (
                    <div className="mt-2 text-xs font-medium italic text-gray-500">
                      Custom pricing available for 10+ users
                    </div>
                  )}
                </div>

                {/* CTA button */}
                <Link
                  href={
                    '/contact'
                  }
                  className={cn(
                    'block w-full cursor-pointer rounded-xl border-none py-3.5 text-center text-[15px] font-bold tracking-wide transition-all duration-200',
                    isHighlight
                      ? 'bg-white text-purple-900 hover:bg-gray-100'
                      : tier.popular
                        ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/25 hover:from-purple-400 hover:to-fuchsia-400'
                        : 'bg-purple-500/20 text-purple-200 hover:bg-purple-500/30',
                  )}
                >
                  {tier.cta}
                </Link>

                {/* Divider */}
                <div className="my-6 h-px bg-purple-500/20" />

                {/* Features */}
                <div className="flex flex-col gap-3">
                  {tier.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      {f.included ? <Check className="text-green-400" /> : <Cross dark />}
                      <span
                        className={cn(
                          'text-sm leading-snug',
                          f.included ? 'text-gray-200' : 'text-gray-600 line-through',
                          f.bold && 'font-semibold text-white',
                        )}
                      >
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ═══════════════ MOBILE APP NOTE ═══════════════ */}
      <div className="relative mx-auto mb-14 max-w-2xl px-5 text-center">
        <div className="flex flex-wrap items-center justify-center gap-5 rounded-xl border border-purple-500/20 bg-purple-900/30 px-7 py-5">
          <span className="text-3xl">📱</span>
          <div className="text-left">
            <div className="text-[15px] font-semibold text-white">
              Mobile App: <span className="text-purple-400">$10/user/mo</span> &nbsp;•&nbsp; Driver
              App: <span className="text-green-400">Free</span>
            </div>
            <div className="mt-0.5 text-[15px] text-gray-400">
              Available as add-ons to any plan. Offline sync, barcode scanning, push notifications.
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ ADD-ONS SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-5xl px-5 pb-20">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-block rounded-full border border-green-500/30 bg-green-500/20 px-4 py-1.5 text-[15px] font-semibold uppercase tracking-wider text-green-400">
            Extend your platform
          </div>
          <h2 className="mb-2 text-3xl font-bold text-white">Add-Ons & Services</h2>
          <p className="text-gray-400">Enhance CloudRent Pro with optional extras</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {addons.map((addon) => (
            <div
              key={addon.name}
              className="rounded-xl border border-purple-500/20 bg-purple-900/30 p-5 transition-all duration-200 hover:border-purple-500/40 hover:bg-purple-900/50"
            >
              <div className="mb-2 flex items-start justify-between">
                <h4 className="text-[15px] font-semibold text-white">{addon.name}</h4>
                <div
                  className={cn(
                    'whitespace-nowrap text-sm font-bold',
                    addon.price === 'Free' ? 'text-green-400' : 'text-purple-400',
                  )}
                >
                  {addon.price}
                  <span className="text-xs font-medium text-gray-500">{addon.unit}</span>
                </div>
              </div>
              <p className="m-0 text-[15px] leading-relaxed text-gray-400">{addon.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════ COMPARISON TABLE ═══════════════ */}
      <div className="relative border-t border-purple-500/20 bg-purple-900/30 px-5 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-white">Compare Plans</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <th className="w-2/5 border-b-2 border-purple-500/30 p-3.5 text-left font-semibold text-gray-400">
                    Feature
                  </th>
                  <th className="border-b-2 border-purple-500/30 p-3.5 text-center font-semibold text-gray-400">
                    Starter
                  </th>
                  <th className="border-b-2 border-purple-500 p-3.5 text-center font-bold text-purple-400">
                    Professional
                  </th>
                  <th className="border-b-2 border-fuchsia-500/50 p-3.5 text-center font-semibold text-fuchsia-400">
                    Business
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([feature, s, p, b], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-purple-900/20' : 'bg-transparent'}>
                    <td className="p-3 font-medium text-gray-300">{feature}</td>
                    {[s, p, b].map((val, j) => (
                      <td key={j} className="p-3 text-center">
                        {val === true ? (
                          <span className="inline-flex justify-center text-green-400">
                            <Check />
                          </span>
                        ) : val === false ? (
                          <span className="inline-flex justify-center">
                            <Cross dark />
                          </span>
                        ) : (
                          <span className="text-[15px] font-medium text-gray-400">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ═══════════════ FAQ SECTION ═══════════════ */}
      <div className="relative mx-auto max-w-2xl px-5 py-20">
        <h2 className="mb-10 text-center text-3xl font-bold text-white">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                'overflow-hidden rounded-xl border transition-colors duration-200',
                openFaq === i
                  ? 'border-purple-500/50 bg-purple-900/40'
                  : 'border-purple-500/20 bg-purple-900/20',
              )}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent p-5 text-left"
              >
                <span className="pr-4 text-[15px] font-semibold text-white">{faq.q}</span>
                <span
                  className={cn(
                    'shrink-0 text-xl font-light text-purple-400 transition-transform duration-200',
                    openFaq === i && 'rotate-45',
                  )}
                >
                  +
                </span>
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openFaq === i ? 'max-h-52' : 'max-h-0',
                )}
              >
                <p className="m-0 px-5 pb-4 text-sm leading-relaxed text-gray-400">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <div className="relative overflow-hidden border-t border-purple-500/20 bg-gradient-to-r from-purple-900/60 to-fuchsia-900/60 px-5 py-20 text-center">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 16px)',
          }}
        />
        <div className="relative mx-auto max-w-xl">
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl">
            Ready to run your hire business smarter?
          </h2>
          <p className="mb-8 leading-relaxed text-gray-300">
            Start your 30-day free trial today. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="cursor-pointer rounded-xl border-none bg-gradient-to-r from-purple-500 to-fuchsia-500 px-9 py-4 text-base font-bold text-white shadow-xl shadow-purple-500/25 transition-all hover:from-purple-400 hover:to-fuchsia-400"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo"
              className="cursor-pointer rounded-xl border border-purple-400/50 bg-transparent px-9 py-4 text-base font-semibold text-purple-200 transition-all hover:bg-purple-500/20"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════════ FOOTER NOTE ═══════════════ */}
      <div className="border-t border-purple-500/10 bg-[#050510] py-6 text-center text-[15px] text-gray-500">
        All prices in AUD, ex-GST. 30-day free trial on all plans. Cancel anytime.
      </div>
    </div>
  )
}
