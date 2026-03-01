import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import FeaturesPageClient from './page.client'

export const metadata: Metadata = {
  title: 'Features | CloudRent Pro Equipment Rental Software',
  description:
    'Explore CloudRent Pro features: equipment management, dispatch, AI damage detection, safety compliance, digital signatures, invoicing, and more.',
  alternates: {
    canonical: 'https://www.cloudrent.me/features/',
  },
  openGraph: mergeOpenGraph({
    title: 'Features | CloudRent Pro Equipment Rental Software',
    description:
      'Explore CloudRent Pro features: equipment management, dispatch, AI damage detection, safety compliance, digital signatures, invoicing, and more.',
    url: '/features/',
  }),
}

export default function FeaturesPage() {
  return <FeaturesPageClient />
}
