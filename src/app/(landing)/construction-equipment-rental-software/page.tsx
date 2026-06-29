import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { JsonLd } from '@/components/StructuredData'
import ConstructionRentalClient from './page.client'

export const metadata: Metadata = {
  title: 'Construction Equipment Rental Software | CloudRent Pro',
  description:
    'Track plant, tools, deliveries, pickups, inspections, and invoicing in one system built for construction hire businesses.',
  keywords: [
    'construction equipment rental software',
    'plant hire software',
    'tool hire software',
    'construction hire management',
    'site equipment rental software',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/construction-equipment-rental-software/',
  },
  openGraph: mergeOpenGraph({
    title: 'Construction Equipment Rental Software | CloudRent Pro',
    description:
      'Track plant, tools, deliveries, pickups, inspections, and invoicing in one system built for construction hire businesses.',
    url: '/construction-equipment-rental-software/',
  }),
}

function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CloudRent Pro - Construction Equipment Rental Software',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Construction Rental Management',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '1.00',
      priceCurrency: 'AUD',
      description: '30-day full access trial',
    },
    featureList: [
      'Asset tracking by jobsite',
      'Delivery and pickup scheduling',
      'Equipment inspection checklists',
      'Off-hire management',
      'Damage capture with photos',
      'Utilisation reporting',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '47',
    },
  }
}

export default function ConstructionRentalPage() {
  return (
    <>
      <JsonLd data={generateSchema()} />
      <ConstructionRentalClient />
    </>
  )
}
