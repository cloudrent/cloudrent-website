import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { JsonLd } from '@/components/StructuredData'
import ToiletHireClient from './page.client'

export const metadata: Metadata = {
  title: 'Portable Toilet Hire Software Australia | CloudRent Pro',
  description:
    'Purpose-built rental software for portable toilet and sanitation hire companies. Track units, schedule servicing, manage deliveries and billing. Built for Australian portaloo hire businesses.',
  keywords: [
    'portable toilet hire software',
    'portaloo hire software',
    'toilet rental software australia',
    'sanitation hire software',
    'portable restroom software',
    'toilet servicing software',
    'porta potty rental software',
    'event toilet hire software',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/toilet-hire-software/',
  },
  openGraph: mergeOpenGraph({
    title: 'Portable Toilet Hire Software | CloudRent Pro',
    description:
      'Purpose-built rental software for portable toilet and sanitation hire companies.',
    url: '/toilet-hire-software/',
  }),
}

function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CloudRent Pro - Portable Toilet Hire Software',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Sanitation Rental Management',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '1.00',
      priceCurrency: 'AUD',
      description: '30-day full access trial',
    },
    featureList: [
      'Unit tracking and availability',
      'Service scheduling',
      'Delivery and pickup logistics',
      'Recurring billing',
      'Mobile driver app',
      'Customer portal',
      'Xero & QuickBooks integration',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.4',
      ratingCount: '29',
    },
  }
}

export default function ToiletHirePage() {
  return (
    <>
      <JsonLd data={generateSchema()} />
      <ToiletHireClient />
    </>
  )
}
