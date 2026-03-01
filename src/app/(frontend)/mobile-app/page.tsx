import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import MobileAppPageClient from './page.client'

export const metadata: Metadata = {
  title: 'Mobile App | CloudRent Pro - Rental Management On The Go',
  description:
    'CloudRent Pro mobile app for iOS and Android. Manage equipment, dispatch jobs, capture signatures, and track deliveries from anywhere.',
  alternates: {
    canonical: 'https://www.cloudrent.me/mobile-app/',
  },
  openGraph: mergeOpenGraph({
    title: 'Mobile App | CloudRent Pro - Rental Management On The Go',
    description:
      'CloudRent Pro mobile app for iOS and Android. Manage equipment, dispatch jobs, capture signatures, and track deliveries from anywhere.',
    url: '/mobile-app/',
  }),
}

export default function MobileAppPage() {
  return <MobileAppPageClient />
}
