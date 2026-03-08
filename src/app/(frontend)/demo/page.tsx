import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import DemoPageClient from './page.client'

export const metadata: Metadata = {
  title: 'Book a Demo | CloudRent Pro Equipment Rental Software',
  description:
    'Schedule a free demo of CloudRent Pro. See how our rental management software can streamline operations for your hire business.',
  alternates: {
    canonical: 'https://www.cloudrent.me/demo/',
  },
  openGraph: mergeOpenGraph({
    title: 'Book a Demo | CloudRent Pro Equipment Rental Software',
    description:
      'Schedule a free demo of CloudRent Pro. See how our rental management software can streamline operations for your hire business.',
    url: '/demo/',
  }),
}

export default function DemoPage() {
  return <DemoPageClient />
}
