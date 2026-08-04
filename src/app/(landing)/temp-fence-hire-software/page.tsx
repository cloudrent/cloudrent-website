import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { JsonLd } from '@/components/StructuredData'
import TempFenceHireClient from './page.client'

export const metadata: Metadata = {
  title: 'Temporary Fence Hire Software Australia | CloudRent Pro',
  description:
    'Purpose-built rental software for temporary fencing companies. Track panels, feet, clamps & bracing. Manage deliveries, pickups, and billing. Built for Australian temp fence hire businesses.',
  keywords: [
    'temporary fence hire software',
    'temp fence rental software',
    'temporary fencing management system',
    'fence hire software australia',
    'construction fencing hire software',
    'event fencing rental software',
    'temp fence tracking software',
    'fencing hire business software',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/temp-fence-hire-software/',
  },
  openGraph: mergeOpenGraph({
    title: 'Temporary Fence Hire Software | CloudRent Pro',
    description:
      'Purpose-built rental software for temporary fencing companies. Track panels, feet, clamps & bracing.',
    url: '/temp-fence-hire-software/',
  }),
}

function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CloudRent Pro - Temporary Fence Hire Software',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Temporary Fencing Rental Management',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '1.00',
      priceCurrency: 'AUD',
      description: '30 days full access',
    },
    featureList: [
      'Panel and component tracking',
      'Delivery and pickup scheduling',
      'Site-based billing',
      'Mobile driver app',
      'GPS tracking',
      'Customer portal',
      'Xero & QuickBooks integration',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.4',
      ratingCount: '29',
    },
  }
}

export default function TempFenceHirePage() {
  return (
    <>
      <JsonLd data={generateSchema()} />
      <TempFenceHireClient />
    </>
  )
}
