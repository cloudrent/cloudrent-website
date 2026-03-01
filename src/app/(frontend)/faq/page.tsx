import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import FAQPageClient from './page.client'

export const metadata: Metadata = {
  title: 'FAQ | CloudRent Pro - Frequently Asked Questions',
  description:
    'Find answers to common questions about CloudRent Pro equipment rental software. Pricing, features, integrations, and getting started.',
  alternates: {
    canonical: 'https://www.cloudrent.me/faq/',
  },
  openGraph: mergeOpenGraph({
    title: 'FAQ | CloudRent Pro - Frequently Asked Questions',
    description:
      'Find answers to common questions about CloudRent Pro equipment rental software. Pricing, features, integrations, and getting started.',
    url: '/faq/',
  }),
}

export default function FAQPage() {
  return <FAQPageClient />
}
