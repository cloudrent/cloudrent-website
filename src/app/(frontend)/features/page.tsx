import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { BreadcrumbSchema } from '@/components/StructuredData'
import FeaturesPageClient from './page.client'

// SEO metadata - targeting "asset rental software", "rental equipment management software with tracking"
export const metadata: Metadata = {
  title: 'Asset Rental Software Features | Equipment Tracking & Management – CloudRent Pro',
  description:
    'Best rental equipment management software with tracking. AI damage detection, real-time availability, dispatch, safety compliance, digital signatures & Xero integration.',
  keywords: [
    'asset rental software',
    'rental equipment management software',
    'equipment tracking software',
    'rental inventory management',
    'equipment rental features',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/features/',
  },
  openGraph: mergeOpenGraph({
    title: 'Asset Rental Software Features | Equipment Tracking & Management – CloudRent Pro',
    description:
      'Best rental equipment management software with tracking. AI damage detection, real-time availability, dispatch, safety compliance, digital signatures & Xero integration.',
    url: '/features/',
  }),
}

export default function FeaturesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.cloudrent.me/' },
          { name: 'Features', url: 'https://www.cloudrent.me/features/' },
        ]}
      />
      <FeaturesPageClient />
    </>
  )
}
