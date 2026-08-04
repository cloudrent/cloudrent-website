import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { BreadcrumbSchema, FAQSchema, JsonLd } from '@/components/StructuredData'
import PageClient from './page.client'

export const metadata: Metadata = {
  title: 'CloudRent Pro vs Booqable: 2026 Comparison for Equipment Hire Businesses',
  description:
    'Compare CloudRent Pro and Booqable for equipment hire businesses. Pricing, mobile workflows, contracts, customer self-service, AI features and more.',
  keywords: [
    'cloudrent vs booqable',
    'booqable alternative',
    'equipment hire software comparison',
    'rental software australia',
    'booqable review',
    'hire software comparison',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/cloudrent-pro-vs-booqable/',
  },
  openGraph: mergeOpenGraph({
    title: 'CloudRent Pro vs Booqable: 2026 Comparison',
    description:
      'A balanced comparison of CloudRent Pro and Booqable for equipment hire businesses.',
    url: '/cloudrent-pro-vs-booqable/',
  }),
}

const faqs = [
  {
    question: 'What is the biggest difference between CloudRent Pro and Booqable?',
    answer:
      'CloudRent Pro is built for growing hire businesses that need professional contract management, mobile field crew workflows, AI-assisted tools and enterprise-grade operations. Booqable is better suited to early-stage or very small rental businesses that primarily need an online booking page and basic inventory management.',
  },
  {
    question: 'Is Booqable suitable for commercial hire businesses in Australia?',
    answer:
      'Booqable can work for very small or early-stage hire businesses. However, reviewers consistently note limitations around contract management, e-signatures and mobile functionality that may not meet the requirements of commercial hire operations.',
  },
  {
    question: 'Does Booqable have a free trial?',
    answer:
      'Yes. Booqable offers a 14-day free trial with no credit card required. CloudRent Pro offers a $1 first month.',
  },
  {
    question: 'Is Booqable available in Australia?',
    answer:
      'Yes. Booqable is available globally and is used by some Australian rental businesses. It is headquartered in Amsterdam.',
  },
  {
    question: 'Does CloudRent Pro have AI features?',
    answer:
      'CloudRent Pro is developing and rolling out AI-assisted functionality including damage detection, support automation and inventory assistance.',
  },
  {
    question: 'Can I migrate from Booqable to CloudRent Pro?',
    answer:
      'Yes. CloudRent Pro provides migration assistance for eligible customers. Migration scope depends on data availability and export options from your current platform. Our team will assess what is transferable during your migration discussion.',
  },
]

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'CloudRent Pro vs Booqable: 2026 Comparison for Equipment Hire Businesses',
  description:
    'A balanced comparison of CloudRent Pro and Booqable for equipment hire businesses.',
  datePublished: '2026-06-23',
  dateModified: '2026-06-23',
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
      name: 'Booqable',
      applicationCategory: 'BusinessApplication',
    },
  ],
}

export default function CloudRentVsBooqablePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.cloudrent.me/' },
          { name: 'CloudRent Pro vs Booqable', url: 'https://www.cloudrent.me/cloudrent-pro-vs-booqable/' },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <JsonLd data={articleSchema} />
      <PageClient />
    </>
  )
}
