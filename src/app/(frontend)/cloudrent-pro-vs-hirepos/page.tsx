import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { BreadcrumbSchema, FAQSchema, JsonLd } from '@/components/StructuredData'
import PageClient from './page.client'

export const metadata: Metadata = {
  title: 'CloudRent Pro vs HirePOS: 2026 Comparison for Equipment Hire Businesses',
  description:
    'Compare CloudRent Pro and HirePOS for Australian equipment hire businesses. Pricing, mobile access, accounting integrations, customer portals, AI features and more.',
  keywords: [
    'cloudrent vs hirepos',
    'hirepos alternative',
    'equipment hire software comparison',
    'rental software australia',
    'hirepos review',
    'hire software comparison',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/cloudrent-pro-vs-hirepos/',
  },
  openGraph: mergeOpenGraph({
    title: 'CloudRent Pro vs HirePOS: 2026 Comparison',
    description:
      'A balanced comparison of CloudRent Pro and HirePOS for Australian equipment hire businesses.',
    url: '/cloudrent-pro-vs-hirepos/',
  }),
}

const faqs = [
  {
    question: 'What is the biggest difference between CloudRent Pro and HirePOS?',
    answer:
      'CloudRent Pro focuses on modern mobile workflows, integrated customer self-service and AI-assisted rental workflows. HirePOS focuses on broad rental management functionality, modular pricing and accounting integrations.',
  },
  {
    question: 'Is HirePOS Australian?',
    answer:
      'Yes. HirePOS states that it has served rental businesses throughout Australia, New Zealand and beyond since 2005.',
  },
  {
    question: 'Does HirePOS integrate with Xero?',
    answer: 'Yes. HirePOS states that it exports transactions to Xero, MYOB, QuickBooks and Reckon.',
  },
  {
    question: 'Does CloudRent Pro have AI features?',
    answer:
      'CloudRent Pro is developing and rolling out AI-assisted functionality, including damage detection, support automation and inventory assistance.',
  },
]

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'CloudRent Pro vs HirePOS: 2026 Comparison for Equipment Hire Businesses',
  description:
    'A balanced comparison of CloudRent Pro and HirePOS for Australian equipment hire businesses.',
  datePublished: '2026-06-11',
  dateModified: '2026-06-11',
  author: {
    '@type': 'Person',
    name: 'Ron Neville',
    url: 'https://www.cloudrent.me/about/',
  },
  publisher: {
    '@type': 'Organization',
    name: 'CloudRent',
    url: 'https://www.cloudrent.me/',
  },
  about: [
    {
      '@type': 'SoftwareApplication',
      name: 'CloudRent Pro',
      applicationCategory: 'BusinessApplication',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'HirePOS',
      applicationCategory: 'BusinessApplication',
    },
  ],
}

export default function CloudRentVsHireposPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.cloudrent.me/' },
          { name: 'CloudRent Pro vs HirePOS', url: 'https://www.cloudrent.me/cloudrent-pro-vs-hirepos/' },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <JsonLd data={articleSchema} />
      <PageClient />
    </>
  )
}
