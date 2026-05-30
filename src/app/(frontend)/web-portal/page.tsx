import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { BreadcrumbSchema } from '@/components/StructuredData'
import WebPortalPageClient from './page.client'

// SEO metadata - optimized for online booking keywords
export const metadata: Metadata = {
  title: 'Online Equipment Rental Booking Portal | 24/7 Self-Service – CloudRent Pro',
  description:
    'Give customers 24/7 self-service equipment booking. Browse availability, reserve equipment, sign contracts & pay invoices online. Reduce admin calls by 50%.',
  keywords: [
    'equipment rental booking portal',
    'online equipment booking',
    'rental self-service portal',
    'customer booking system',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/web-portal/',
  },
  openGraph: mergeOpenGraph({
    title: 'Online Equipment Rental Booking Portal | 24/7 Self-Service – CloudRent Pro',
    description:
      'Give customers 24/7 self-service equipment booking. Browse availability, reserve equipment, sign contracts & pay invoices online. Reduce admin calls by 50%.',
    url: '/web-portal/',
  }),
}

export default function WebPortalPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.cloudrent.me/' },
          { name: 'Customer Portal', url: 'https://www.cloudrent.me/web-portal/' },
        ]}
      />
      <WebPortalPageClient />
    </>
  )
}
