import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { JsonLd } from '@/components/StructuredData'
import PlantToolHireClient from './page.client'

export const metadata: Metadata = {
  title: 'Plant & Tool Hire Software Australia | CloudRent Pro',
  description:
    'Complete rental software for plant and tool hire businesses. Track excavators, generators, power tools and more. Manage bookings, maintenance, and billing. Built for Australian hire companies.',
  keywords: [
    'plant hire software',
    'tool hire software',
    'plant and tool hire software australia',
    'equipment rental software',
    'excavator hire software',
    'generator hire software',
    'power tool rental software',
    'construction equipment software',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/plant-tool-hire-software/',
  },
  openGraph: mergeOpenGraph({
    title: 'Plant & Tool Hire Software | CloudRent Pro',
    description:
      'Complete rental software for plant and tool hire businesses. Track equipment, manage bookings, automate billing.',
    url: '/plant-tool-hire-software/',
  }),
}

function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CloudRent Pro - Plant & Tool Hire Software',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Plant and Tool Rental Management',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '1.00',
      priceCurrency: 'AUD',
      description: '30-day full access trial',
    },
    featureList: [
      'Equipment availability tracking',
      'Maintenance scheduling',
      'Wet hire and dry hire support',
      'Mobile driver app',
      'Damage documentation',
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

export default function PlantToolHirePage() {
  return (
    <>
      <JsonLd data={generateSchema()} />
      <PlantToolHireClient />
    </>
  )
}
