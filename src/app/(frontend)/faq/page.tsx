import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { FAQSchema } from '@/components/StructuredData'
import FAQPageClient from './page.client'

export const metadata: Metadata = {
  title: 'FAQ | CloudRent Pro - Frequently Asked Questions',
  description:
    'Find answers to common questions about CloudRent Pro equipment rental software. Pricing, features, integrations, and getting started.',
  alternates: {
    canonical: 'https://www.cloudrent.me/faq/',
  },
  openGraph: mergeOpenGraph({
    title: 'FAQ | CloudRent Pro - Frequently Asked Questions',
    description:
      'Find answers to common questions about CloudRent Pro equipment rental software. Pricing, features, integrations, and getting started.',
    url: '/faq/',
  }),
}

// FAQ data for structured data (matches page.client.tsx)
const faqData = [
  {
    question: 'What is CloudRent Pro?',
    answer:
      'CloudRent Pro is a complete rental management platform built specifically for Australian equipment hire businesses. It includes equipment tracking, reservations, invoicing, digital signatures, safety compliance (SWMS), staff management, and mobile apps - all in one integrated system.',
  },
  {
    question: 'How do I start my $1 trial?',
    answer:
      "Simply click 'Start $1 Trial' on our website and create an account. For just $1, you'll get full access to all features for 30 days. Your data is preserved when you upgrade to a paid plan.",
  },
  {
    question: 'Can I import my existing data?',
    answer:
      'Yes! CloudRent Pro supports importing customers, equipment, and inventory from spreadsheets (CSV/Excel). We also offer professional onboarding where our team handles the data migration for you.',
  },
  {
    question: 'What happens after my 30-day trial?',
    answer:
      "At the end of your trial, you'll be prompted to choose a plan. All your data is preserved - nothing is deleted. If you don't subscribe, your account becomes read-only until you upgrade.",
  },
  {
    question: 'Can I change plans later?',
    answer:
      'Absolutely. You can upgrade or downgrade at any time. Changes take effect on your next billing cycle with prorated adjustments.',
  },
  {
    question: 'Does CloudRent Pro work offline?',
    answer:
      "Yes! Our mobile apps have full offline capability. You can view equipment, complete inspections, capture signatures, and record jobs without internet. Everything syncs automatically when you're back online.",
  },
  {
    question: 'How does the Xero integration work?',
    answer:
      'CloudRent Pro connects directly to your Xero account via OAuth. Invoices sync automatically to Xero, customer contacts are kept in sync, and payments recorded in either system appear in both. Available on Professional and Business plans.',
  },
  {
    question: 'What is SWMS and do I need it?',
    answer:
      'SWMS (Safe Work Method Statement) is a safety document required in Australia for high-risk construction work. CloudRent Pro includes a digital SWMS system with templates, risk assessments, and mobile signing.',
  },
  {
    question: 'Where is my data stored?',
    answer:
      'Your data is stored securely in Australian data centers. We use industry-standard encryption for data at rest and in transit. Regular backups ensure your data is always protected.',
  },
  {
    question: 'What support is included?',
    answer:
      'All plans include email support and access to our help center. Professional plans get priority email support. Business plans include phone and live chat support plus a dedicated account manager.',
  },
]

export default function FAQPage() {
  return (
    <>
      <FAQSchema faqs={faqData} />
      <FAQPageClient />
    </>
  )
}
