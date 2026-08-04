import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { BreadcrumbSchema, FAQSchema, JsonLd } from '@/components/StructuredData'
import PageClient from './page.client'

export const metadata: Metadata = {
  title: 'CloudRent Pro vs Texada: 2026 Comparison for Equipment Hire Businesses',
  description:
    'Compare CloudRent Pro and Texada for equipment hire businesses. Pricing, industry fit, mobile workflows, OEM integrations, AI features and more.',
  keywords: [
    'cloudrent vs texada',
    'texada alternative',
    'equipment hire software comparison',
    'rental software australia',
    'texada software review',
    'hire software comparison',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/cloudrent-pro-vs-texada/',
  },
  openGraph: mergeOpenGraph({
    title: 'CloudRent Pro vs Texada: 2026 Comparison',
    description:
      'A balanced comparison of CloudRent Pro and Texada for equipment hire businesses.',
    url: '/cloudrent-pro-vs-texada/',
  }),
}

const faqs = [
  {
    question: 'What is the biggest difference between CloudRent Pro and Texada?',
    answer:
      'The most significant difference is industry focus. Texada is purpose-built for heavy equipment, plant hire and equipment dealerships with deep OEM integrations. CloudRent Pro serves a broader range of hire industries including tool hire, event hire, scaffolding and AV equipment, and is designed specifically for the Australian market.',
  },
  {
    question: 'Is CloudRent Pro or Texada better for tool hire businesses?',
    answer:
      "CloudRent Pro is generally the stronger fit for tool hire, event hire and general hire businesses. Texada's feature set and OEM integrations are primarily designed for heavy equipment and plant hire operations.",
  },
  {
    question: 'Does Texada have a free trial?',
    answer:
      'Texada promotes demonstrations rather than self-service free trials. CloudRent Pro offers a $1 first month.',
  },
  {
    question: 'Is Texada available in Australia?',
    answer:
      'Yes. Texada is available in Australia and serves customers globally. It is headquartered in Canada.',
  },
  {
    question: 'Does CloudRent Pro have AI features?',
    answer:
      'CloudRent Pro is developing and rolling out AI-assisted functionality including damage detection, support automation and inventory assistance.',
  },
  {
    question: 'Can I migrate from Texada to CloudRent Pro?',
    answer:
      'Yes. CloudRent Pro provides migration assistance for eligible customers. Migration scope depends on data availability and export options from your current platform. Our team will assess what is transferable during your migration discussion.',
  },
]

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'CloudRent Pro vs Texada: 2026 Comparison for Equipment Hire Businesses',
  description:
    'A balanced comparison of CloudRent Pro and Texada for equipment hire businesses.',
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
      name: 'Texada',
      applicationCategory: 'BusinessApplication',
    },
  ],
}

export default function CloudRentVsTexadaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.cloudrent.me/' },
          { name: 'CloudRent Pro vs Texada', url: 'https://www.cloudrent.me/cloudrent-pro-vs-texada/' },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <JsonLd data={articleSchema} />
      <PageClient />
    </>
  )
}
