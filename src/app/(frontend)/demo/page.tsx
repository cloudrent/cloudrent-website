import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import DemoPageClient from './page.client'

// SEO metadata - optimized for demo/trial conversion
export const metadata: Metadata = {
  title: 'Free Demo | See CloudRent Pro Rental Software in Action',
  description:
    'Book a free 30-min demo with a rental industry expert. See AI damage detection, real-time availability & Xero integration. No obligation, no sales pressure.',
  keywords: [
    'rental software demo',
    'equipment rental software demo',
    'hire software demonstration',
    'CloudRent demo',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/demo/',
  },
  openGraph: mergeOpenGraph({
    title: 'Free Demo | See CloudRent Pro Rental Software in Action',
    description:
      'Book a free 30-min demo with a rental industry expert. See AI damage detection, real-time availability & Xero integration. No obligation, no sales pressure.',
    url: '/demo/',
  }),
}

export default function DemoPage() {
  return <DemoPageClient />
}
