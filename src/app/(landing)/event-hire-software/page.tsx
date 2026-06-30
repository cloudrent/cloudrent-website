import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { JsonLd } from '@/components/StructuredData'
import EventHireClient from './page.client'

export const metadata: Metadata = {
  title: 'Event Hire Software Australia | CloudRent Pro',
  description:
    'Purpose-built rental software for event and party hire businesses. Track marquees, furniture, staging, and AV equipment. Manage bookings, quotes, and logistics. Built for Australian event hire companies.',
  keywords: [
    'event hire software',
    'party hire software',
    'marquee hire software australia',
    'event rental software',
    'furniture hire software',
    'staging hire software',
    'av equipment rental software',
    'wedding hire software',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/event-hire-software/',
  },
  openGraph: mergeOpenGraph({
    title: 'Event Hire Software | CloudRent Pro',
    description:
      'Purpose-built rental software for event and party hire businesses. Track equipment, manage bookings, streamline logistics.',
    url: '/event-hire-software/',
  }),
}

function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CloudRent Pro - Event Hire Software',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Event Rental Management',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '1.00',
      priceCurrency: 'AUD',
      description: '30-day full access trial',
    },
    featureList: [
      'Kit and package management',
      'Quote builder',
      'Delivery scheduling',
      'Event timeline tracking',
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

export default function EventHirePage() {
  return (
    <>
      <JsonLd data={generateSchema()} />
      <EventHireClient />
    </>
  )
}
