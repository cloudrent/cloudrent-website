import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getBuilderContent } from '@/lib/builder'
import { RenderBuilderContent } from '@/components/builder/RenderBuilderContent'
import { SoftwareSchema, HomepageFaqSchema } from '@/components/StructuredData'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import HomePageClient from './HomePageClient'

// Enable ISR - regenerate page every hour
export const revalidate = 3600

// SEO metadata - optimized for quick-win keywords: "cloud rental software", "cloud rental management software"
export const metadata: Metadata = {
  title: 'Cloud Rental Software Australia | Equipment Hire Management – CloudRent Pro',
  description:
    'Cloud rental software trusted by Australian hire businesses. Real-time availability, AI damage detection, Xero integration & mobile apps. Start your $1 first month today.',
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
      'Cloud rental software trusted by Australian hire businesses. Real-time availability, AI damage detection, Xero integration & mobile apps. Start your $1 first month today.',
    url: '/',
  }),
}

export default async function HomePage() {
  const { isEnabled: isDraft } = await draftMode()

  // Try to fetch Builder.io content for homepage
  const builderContent = await getBuilderContent('page', '/', {
    options: { includeUnpublished: isDraft },
  })

  // If Builder.io has content, render it
  if (builderContent) {
    return (
      <>
        <SoftwareSchema />
        <HomepageFaqSchema />
        <RenderBuilderContent content={builderContent} />
      </>
    )
  }

  // Fallback to existing hard-coded homepage
  return (
    <>
      <SoftwareSchema />
      <HomepageFaqSchema />
      <HomePageClient />
    </>
  )
}
