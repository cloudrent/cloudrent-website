import type { Metadata } from 'next'
import { SoftwareSchema, HomepageFaqSchema } from '@/components/StructuredData'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import HomePageClient from './HomePageClient'

// Enable ISR - regenerate page every hour
export const revalidate = 3600

// SEO metadata - optimized for quick-win keywords: "cloud rental software", "cloud rental management software"
export const metadata: Metadata = {
  title: 'Cloud Rental Software Australia | Equipment Hire Management – CloudRent Pro',
  description:
    'Cloud rental software trusted by Australian hire businesses. Real-time availability, AI damage detection, Xero integration & mobile apps. Start your $1 trial today.',
  keywords: [
    'cloud rental software',
    'cloud rental management software',
    'equipment rental software',
    'asset rental software',
    'rental management software Australia',
    'hire business software',
    'equipment hire software',
    'Xero integration',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/',
  },
  openGraph: mergeOpenGraph({
    title: 'Cloud Rental Software Australia | Equipment Hire Management – CloudRent Pro',
    description:
      'Cloud rental software trusted by Australian hire businesses. Real-time availability, AI damage detection, Xero integration & mobile apps. Start your $1 trial today.',
    url: '/',
  }),
}

export default function HomePage() {
  return (
    <>
      <SoftwareSchema />
      <HomepageFaqSchema />
      <HomePageClient />
    </>
  )
}
