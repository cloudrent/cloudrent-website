import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { BreadcrumbSchema, FAQSchema, JsonLd } from '@/components/StructuredData'
import PageClient from './page.client'

export const metadata: Metadata = {
  title: 'CloudRent Pro vs Point of Rental: 2026 Comparison for Equipment Hire Businesses',
  description:
    'Compare CloudRent Pro and Point of Rental for equipment hire businesses. Pricing, mobile access, deployment options, AI features, customer portals and more.',
  keywords: [
    'cloudrent vs point of rental',
    'point of rental alternative',
    'equipment hire software comparison',
    'rental software australia',
    'point of rental review',
    'hire software comparison',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/cloudrent-pro-vs-point-of-rental/',
  },
  openGraph: mergeOpenGraph({
    title: 'CloudRent Pro vs Point of Rental: 2026 Comparison',
    description:
      'A balanced comparison of CloudRent Pro and Point of Rental for equipment hire businesses.',
    url: '/cloudrent-pro-vs-point-of-rental/',
  }),
}

const faqs = [
  {
    question: 'What is the biggest difference between CloudRent Pro and Point of Rental?',
    answer:
      'CloudRent Pro focuses on transparent pricing, mobile-first workflows, customer self-service and practical AI tools designed for Australian hire businesses. Point of Rental focuses on enterprise-grade configurability, multi-deployment options and a broad global integration ecosystem.',
  },
  {
    question: 'Is CloudRent Pro newer than Point of Rental?',
    answer:
      "Point of Rental was founded in 1982. CloudRent's origins trace back to HireEzy in 2004, with the CloudRent name adopted in 2017.",
  },
  {
    question: 'Does Point of Rental offer a free trial?',
    answer:
      'Point of Rental primarily promotes demonstrations rather than self-service free trials. CloudRent Pro offers a $1 trial.',
  },
  {
    question: 'Does Point of Rental support on-premise deployment?',
    answer:
      'Yes. Point of Rental supports both cloud and on-premise deployment from the same code base.',
  },
  {
    question: 'Does CloudRent Pro have AI features?',
    answer:
      'CloudRent Pro is developing and rolling out AI-assisted functionality including damage detection, support automation and inventory assistance.',
  },
  {
    question: 'Can I migrate from Point of Rental to CloudRent Pro?',
    answer:
      'Yes. CloudRent Pro provides migration assistance for eligible customers. Migration scope depends on data availability and export options from your current platform. Our team will assess what is transferable during your migration discussion.',
  },
]

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'CloudRent Pro vs Point of Rental: 2026 Comparison for Equipment Hire Businesses',
  description:
    'A balanced comparison of CloudRent Pro and Point of Rental for equipment hire businesses.',
  datePublished: '2026-06-22',
  dateModified: '2026-06-22',
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
      name: 'Point of Rental',
      applicationCategory: 'BusinessApplication',
    },
  ],
}

export default function CloudRentVsPointOfRentalPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.cloudrent.me/' },
          { name: 'CloudRent Pro vs Point of Rental', url: 'https://www.cloudrent.me/cloudrent-pro-vs-point-of-rental/' },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <JsonLd data={articleSchema} />
      <PageClient />
    </>
  )
}
