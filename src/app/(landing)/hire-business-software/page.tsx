import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { JsonLd } from '@/components/StructuredData'
import HireBusinessClient from './page.client'

export const metadata: Metadata = {
  title: 'Hire Business Software for Rental Operations | CloudRent Pro',
  description:
    'Run bookings, contracts, dispatch, invoicing, and availability from one platform designed for hire businesses.',
  keywords: [
    'hire business software',
    'hire management software',
    'rental business software',
    'hire software',
    'equipment hire management',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/hire-business-software/',
  },
  openGraph: mergeOpenGraph({
    title: 'Hire Business Software for Rental Operations | CloudRent Pro',
    description:
      'Run bookings, contracts, dispatch, invoicing, and availability from one platform designed for hire businesses.',
    url: '/hire-business-software/',
  }),
}

function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CloudRent Pro - Hire Business Software',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Hire Business Management',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '1.00',
      priceCurrency: 'AUD',
      description: '30 days full access',
    },
    featureList: [
      'Booking management',
      'Dispatch and logistics',
      'Invoicing and payments',
      'Asset management',
      'Customer portal',
      'Business reporting',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.4',
      ratingCount: '29',
    },
  }
}

export default function HireBusinessPage() {
  return (
    <>
      <JsonLd data={generateSchema()} />
      <HireBusinessClient />
    </>
  )
}
