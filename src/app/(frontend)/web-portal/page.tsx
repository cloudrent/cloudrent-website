import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import WebPortalPageClient from './page.client'

export const metadata: Metadata = {
  title: 'Customer Portal | CloudRent Pro - Online Equipment Booking',
  description:
    'Self-service customer portal for equipment hire. Let customers browse availability, make bookings, sign contracts, and pay invoices online.',
  alternates: {
    canonical: 'https://www.cloudrent.me/web-portal/',
  },
  openGraph: mergeOpenGraph({
    title: 'Customer Portal | CloudRent Pro - Online Equipment Booking',
    description:
      'Self-service customer portal for equipment hire. Let customers browse availability, make bookings, sign contracts, and pay invoices online.',
    url: '/web-portal/',
  }),
}

export default function WebPortalPage() {
  return <WebPortalPageClient />
}
