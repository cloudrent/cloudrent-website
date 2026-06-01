import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { BreadcrumbSchema } from '@/components/StructuredData'
import ScorecardPageClient from './page.client'

// Enable ISR - regenerate page every hour
export const revalidate = 3600

// SEO metadata - optimized for assessment/diagnostic queries
export const metadata: Metadata = {
  title: 'Revenue Leak Scorecard | Free Assessment for Hire Businesses – CloudRent',
  description:
    'Take the free 2-minute scorecard to discover how much revenue your hire business is losing to manual processes. Get instant results and personalized recommendations.',
  keywords: [
    'hire business assessment',
    'rental software readiness',
    'equipment hire efficiency',
    'revenue leak calculator',
    'hire business scorecard',
    'rental business diagnostic',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/scorecard/',
  },
  openGraph: mergeOpenGraph({
    title: 'Revenue Leak Scorecard | Free Assessment for Hire Businesses',
    description:
      'Take the free 2-minute scorecard to discover how much revenue your hire business is losing to manual processes.',
    url: '/scorecard/',
  }),
  robots: {
    index: true,
    follow: true,
  },
}

export default function ScorecardPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.cloudrent.me/' },
          { name: 'Revenue Leak Scorecard', url: 'https://www.cloudrent.me/scorecard/' },
        ]}
      />
      <ScorecardPageClient />
    </>
  )
}
