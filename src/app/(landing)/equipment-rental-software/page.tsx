import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { JsonLd } from '@/components/StructuredData'
import EquipmentRentalClient from './page.client'

export const metadata: Metadata = {
  title: 'Equipment Rental Software for Hire Businesses | CloudRent Pro',
  description:
    'Manage bookings, dispatch, invoicing, inventory, and compliance with software built for hire and rental businesses.',
  keywords: [
    'equipment rental software',
    'hire software',
    'rental management software',
    'equipment hire software',
    'rental business software',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/equipment-rental-software/',
  },
  openGraph: mergeOpenGraph({
    title: 'Equipment Rental Software for Hire Businesses | CloudRent Pro',
    description:
      'Manage bookings, dispatch, invoicing, inventory, and compliance with software built for hire and rental businesses.',
    url: '/equipment-rental-software/',
  }),
}

function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CloudRent Pro - Equipment Rental Software',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Equipment Rental Management',
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
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.4',
      ratingCount: '29',
    },
  }
}

export default function EquipmentRentalPage() {
  return (
    <>
      <JsonLd data={generateSchema()} />
      <EquipmentRentalClient />
    </>
  )
}
