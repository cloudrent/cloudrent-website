import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { JsonLd } from '@/components/StructuredData'
import EquipmentRentalAustraliaClient from './page.client'

export const metadata: Metadata = {
  title: 'Equipment Rental Software Australia | CloudRent Pro',
  description:
    'Australian-built rental software for equipment hire businesses. Local support, AU workflows, Xero integration, and a 30-day free trial.',
  keywords: [
    'equipment rental software australia',
    'australian rental software',
    'hire software australia',
    'equipment hire software australia',
    'rental management software australia',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/equipment-rental-software-australia/',
  },
  openGraph: mergeOpenGraph({
    title: 'Equipment Rental Software Australia | CloudRent Pro',
    description:
      'Australian-built rental software for equipment hire businesses. Local support, AU workflows, Xero integration, and a 30-day free trial.',
    url: '/equipment-rental-software-australia/',
  }),
}

function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CloudRent Pro - Equipment Rental Software Australia',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Australian Equipment Rental Management',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '1.00',
      priceCurrency: 'AUD',
      description: '30-day full access trial',
    },
    featureList: [
      'Real-time availability tracking',
      'Booking and reservation management',
      'Dispatch and return workflows',
      'Asset and inventory management',
      'Invoicing and customer records',
      'Reporting and operational visibility',
      'Australian tax and invoicing',
      'Xero integration',
      'Local AU support',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.4',
      ratingCount: '29',
    },
  }
}

export default function EquipmentRentalAustraliaPage() {
  return (
    <>
      <JsonLd data={generateSchema()} />
      <EquipmentRentalAustraliaClient />
    </>
  )
}
