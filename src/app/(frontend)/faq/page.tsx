'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle, Search } from 'lucide-react'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqs: FAQItem[] = [
  // Getting Started
  {
    category: 'Getting Started',
    question: 'What is CloudRent Pro?',
    answer:
      'CloudRent Pro is a complete rental management platform built specifically for Australian equipment hire businesses. It includes equipment tracking, reservations, invoicing, digital signatures, safety compliance (SWMS), staff management, and mobile apps - all in one integrated system.',
  },
  {
    category: 'Getting Started',
    question: 'How do I start my free trial?',
    answer:
      'Simply click "Start Free Trial" on our website and create an account. No credit card is required. You\'ll get full access to all features for 30 days. Your data is preserved when you upgrade to a paid plan.',
  },
  {
    category: 'Getting Started',
    question: 'Can I import my existing data?',
    answer:
      'Yes! CloudRent Pro supports importing customers, equipment, and inventory from spreadsheets (CSV/Excel). We also offer professional onboarding where our team handles the data migration for you.',
  },
  {
    category: 'Getting Started',
    question: 'Is training included?',
    answer:
      'All plans include access to our help center with video tutorials and documentation. Professional and Business plans include priority support, and we offer paid onboarding packages that include personalized training sessions.',
  },

  // Pricing & Billing
  {
    category: 'Pricing & Billing',
    question: 'What happens after my 30-day trial?',
    answer:
      'At the end of your trial, you\'ll be prompted to choose a plan. All your data is preserved - nothing is deleted. If you don\'t subscribe, your account becomes read-only until you upgrade.',
  },
  {
    category: 'Pricing & Billing',
    question: 'Can I change plans later?',
    answer:
      'Absolutely. You can upgrade or downgrade at any time. Changes take effect on your next billing cycle with prorated adjustments. Downgrading may limit access to certain features.',
  },
  {
    category: 'Pricing & Billing',
    question: 'What does "per user" mean?',
    answer:
      'Each person who logs into the CloudRent Pro web app counts as a user. The mobile app is an optional add-on at $10/user/month, and the driver app (for viewing jobs only) is always free.',
  },
  {
    category: 'Pricing & Billing',
    question: 'Is GST included in the pricing?',
    answer:
      'Prices shown on our website are ex-GST. GST (10%) is added at checkout for Australian businesses. You\'ll receive a tax invoice for your records.',
  },
  {
    category: 'Pricing & Billing',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, Amex) via Stripe. Annual plans can also be paid by bank transfer upon request.',
  },

  // Features & Functionality
  {
    category: 'Features',
    question: 'Does CloudRent Pro work offline?',
    answer:
      'Yes! Our mobile apps have full offline capability. You can view equipment, complete inspections, capture signatures, and record jobs without internet. Everything syncs automatically when you\'re back online.',
  },
  {
    category: 'Features',
    question: 'Can I customize invoices with my branding?',
    answer:
      'Yes. You can upload your logo, set your business colors, and customize the invoice template. Your invoices, quotes, and contracts will all feature your professional branding.',
  },
  {
    category: 'Features',
    question: 'How does the Xero integration work?',
    answer:
      'CloudRent Pro connects directly to your Xero account via OAuth. Invoices sync automatically to Xero, customer contacts are kept in sync, and payments recorded in either system appear in both. Available on Professional and Business plans.',
  },
  {
    category: 'Features',
    question: 'What is SWMS and do I need it?',
    answer:
      'SWMS (Safe Work Method Statement) is a safety document required in Australia for high-risk construction work. CloudRent Pro includes a digital SWMS system with templates, risk assessments, and mobile signing. Essential for construction and civil hire businesses.',
  },
  {
    category: 'Features',
    question: 'Can customers book equipment online?',
    answer:
      'Yes! With the Customer Portal add-on ($49/month), your customers can browse available equipment, check pricing, make bookings, view their rental history, and pay invoices online.',
  },

  // Technical & Security
  {
    category: 'Technical',
    question: 'Where is my data stored?',
    answer:
      'Your data is stored securely in Australian data centers. We use industry-standard encryption for data at rest and in transit. Regular backups ensure your data is always protected.',
  },
  {
    category: 'Technical',
    question: 'What devices are supported?',
    answer:
      'CloudRent Pro works on any modern web browser (Chrome, Safari, Firefox, Edge). Our mobile apps are available for iOS (iPhone/iPad) and Android devices.',
  },
  {
    category: 'Technical',
    question: 'Can multiple staff use it at the same time?',
    answer:
      'Yes. CloudRent Pro is designed for teams. Changes sync in real-time across all devices. Staff can have different permission levels to control what they can access.',
  },
  {
    category: 'Technical',
    question: 'How secure is the digital signature?',
    answer:
      'Our digital signatures are compliant with the Australian Electronic Transactions Act. Each signature captures a timestamp, IP address, and optional GPS location for a complete audit trail.',
  },

  // Support
  {
    category: 'Support',
    question: 'What support is included?',
    answer:
      'All plans include email support and access to our help center. Professional plans get priority email support. Business plans include phone and live chat support plus a dedicated account manager.',
  },
  {
    category: 'Support',
    question: 'What are your support hours?',
    answer:
      'Our support team is available Monday to Friday, 8am to 6pm AEST. Business plan customers have access to extended support hours.',
  },
  {
    category: 'Support',
    question: 'Can you help migrate from another system?',
    answer:
      'Yes! We offer professional onboarding packages that include data migration from your existing system, whether that\'s spreadsheets, another rental software, or a custom solution.',
  },
]

const categories = ['All', 'Getting Started', 'Pricing & Billing', 'Features', 'Technical', 'Support']

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
      </div>

      <div className="relative">
        {/* Hero */}
        <section className="px-4 pb-12 pt-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
              <HelpCircle className="h-4 w-4" />
              Got questions? We&apos;ve got answers
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Everything you need to know about CloudRent Pro. Can&apos;t find the answer you&apos;re looking for?{' '}
              <Link href="/contact" className="text-purple-400 hover:text-purple-300">
                Contact our team
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="mx-auto max-w-4xl px-4 pb-8">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-purple-500/30 bg-purple-950/50 py-4 pl-12 pr-4 text-white placeholder-purple-300/50 transition-colors focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all',
                  activeCategory === category
                    ? 'bg-purple-500 text-white'
                    : 'border border-purple-500/30 text-purple-300 hover:bg-purple-500/20',
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* FAQ List */}
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-400">No questions match your search. Try a different term.</p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className={cn(
                    'overflow-hidden rounded-xl border transition-colors',
                    openIndex === index
                      ? 'border-purple-500/40 bg-purple-900/30'
                      : 'border-purple-500/20 bg-purple-900/20',
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <div>
                      <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-purple-400">
                        {faq.category}
                      </span>
                      <span className="font-semibold text-white">{faq.question}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        'ml-4 h-5 w-5 shrink-0 text-purple-400 transition-transform duration-300',
                        openIndex === index && 'rotate-180',
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300',
                      openIndex === index ? 'max-h-96' : 'max-h-0',
                    )}
                  >
                    <p className="px-6 pb-5 leading-relaxed text-gray-300">{faq.answer}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-900/60 to-fuchsia-900/60 p-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-white">Still have questions?</h2>
            <p className="mb-6 text-purple-200">Our team is here to help. Get in touch and we&apos;ll respond within 24 hours.</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:from-purple-400 hover:to-fuchsia-400"
              >
                Contact Support
              </Link>
              <a
                href="https://help.cloudrent.me"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-purple-400/50 px-8 py-3 font-semibold text-purple-100 transition-all hover:bg-purple-500/20"
              >
                Browse Help Center
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
