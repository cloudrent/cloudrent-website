import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { JsonLd } from '@/components/StructuredData'
import RentalInventoryClient from './page.client'

export const metadata: Metadata = {
  title: 'Rental Inventory Management Software | CloudRent Pro',
  description:
    'Keep every item visible across locations, prevent double bookings, and track assets with confidence using CloudRent inventory management.',
  keywords: [
    'rental inventory management software',
    'hire inventory software',
    'asset tracking software',
    'rental stock control',
    'inventory control software',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/rental-inventory-management-software/',
  },
  openGraph: mergeOpenGraph({
    title: 'Rental Inventory Management Software | CloudRent Pro',
    description:
      'Keep every item visible across locations, prevent double bookings, and track assets with confidence using CloudRent inventory management.',
    url: '/rental-inventory-management-software/',
  }),
}

function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CloudRent Pro - Rental Inventory Management Software',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Rental Inventory Management',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '1.00',
      priceCurrency: 'AUD',
      description: '30 days full access',
    },
    featureList: [
      'Real-time stock visibility',
      'Multi-location inventory',
      'Date-based availability',
      'Maintenance holds',
      'Asset history tracking',
      'Inventory reporting',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.4',
      ratingCount: '29',
    },
  }
}

export default function RentalInventoryPage() {
  return (
    <>
      <JsonLd data={generateSchema()} />
      <RentalInventoryClient />
    </>
  )
}
