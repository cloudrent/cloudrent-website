import type { Metadata } from 'next'
import { SoftwareSchema } from '@/components/StructuredData'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import HomePageClient from './HomePageClient'

// Enable ISR - regenerate page every hour
export const revalidate = 3600

// SEO metadata
export const metadata: Metadata = {
  title: 'CloudRent Pro – Rental Management Software Australia',
  description:
    'Rental management software with real-time availability, invoicing, digital signatures, and Xero integration. Built in Australia for hire businesses.',
  keywords: [
    'rental software',
    'hire business',
    'equipment rental',
    'rental management',
    'Australia',
    'Xero integration',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/',
  },
  openGraph: mergeOpenGraph({
    title: 'CloudRent Pro – Rental Management Software Australia',
    description:
      'Rental management software with real-time availability, invoicing, digital signatures, and Xero integration. Built in Australia for hire businesses.',
    url: '/',
  }),
}

export default function HomePage() {
  return (
    <>
      <SoftwareSchema />
      <HomePageClient />
    </>
  )
}
