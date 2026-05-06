import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { BreadcrumbSchema } from '@/components/StructuredData'
import MobileAppPageClient from './page.client'

export const metadata: Metadata = {
  title: 'Mobile App | CloudRent Pro Rental Software',
  description:
    'CloudRent Pro mobile app for iOS and Android. Manage equipment, dispatch jobs, capture signatures, and track deliveries from anywhere.',
  alternates: {
    canonical: 'https://www.cloudrent.me/mobile-app/',
  },
  openGraph: mergeOpenGraph({
    title: 'Mobile App | CloudRent Pro Rental Software',
    description:
      'CloudRent Pro mobile app for iOS and Android. Manage equipment, dispatch jobs, capture signatures, and track deliveries from anywhere.',
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
