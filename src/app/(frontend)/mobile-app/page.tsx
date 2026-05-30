import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { BreadcrumbSchema } from '@/components/StructuredData'
import MobileAppPageClient from './page.client'

// SEO metadata - ranking #10.5, optimize for CTR
export const metadata: Metadata = {
  title: 'Rental Equipment Mobile App | iOS & Android – CloudRent Pro',
  description:
    'Free mobile app for equipment rental management. Dispatch jobs, capture signatures, track GPS locations & manage rentals offline. Download for iOS & Android.',
  keywords: [
    'rental equipment mobile app',
    'equipment rental app',
    'rental management app',
    'dispatch app',
    'field service app',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/mobile-app/',
  },
  openGraph: mergeOpenGraph({
    title: 'Rental Equipment Mobile App | iOS & Android – CloudRent Pro',
    description:
      'Free mobile app for equipment rental management. Dispatch jobs, capture signatures, track GPS locations & manage rentals offline. Download for iOS & Android.',
    url: '/mobile-app/',
  }),
}

export default function MobileAppPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.cloudrent.me/' },
          { name: 'Mobile App', url: 'https://www.cloudrent.me/mobile-app/' },
        ]}
      />
      <MobileAppPageClient />
    </>
  )
}
