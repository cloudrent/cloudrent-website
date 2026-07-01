import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { BreadcrumbSchema } from '@/components/StructuredData'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import RoadmapPageClient from './page.client'

// Revalidate every 60 seconds to pick up CMS changes
export const revalidate = 60

export const metadata: Metadata = {
  title: 'CloudRent Product Roadmap | Hire Software Features',
  description:
    'See what has been shipped, what is in progress, and what is coming next in CloudRent Pro — purpose-built hire and rental software.',
  keywords: [
    'cloudrent roadmap',
    'hire software features',
    'rental software updates',
    'equipment rental software roadmap',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/roadmap/',
  },
  openGraph: mergeOpenGraph({
    title: 'CloudRent Product Roadmap',
    description:
      'See what has shipped, what is in progress, and what is planned for CloudRent Pro.',
    url: '/roadmap/',
  }),
}

export default async function RoadmapPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: items } = await payload.find({
    collection: 'roadmap-items',
    limit: 100,
    sort: 'order',
  })

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.cloudrent.me/' },
          { name: 'Roadmap', url: 'https://www.cloudrent.me/roadmap/' },
        ]}
      />
      <RoadmapPageClient items={items} />
    </>
  )
}
