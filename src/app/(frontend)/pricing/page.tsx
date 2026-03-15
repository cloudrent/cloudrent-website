import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import PricingPageClient from './page.client'

export const metadata: Metadata = {
  title: 'Pricing | CloudRent Pro - Plans from $49/user/month',
  description:
    'Simple, transparent pricing for CloudRent Pro. Choose from Starter, Professional, or Business plans. $1 trial available.',
  alternates: {
    canonical: 'https://www.cloudrent.me/pricing/',
  },
  openGraph: mergeOpenGraph({
    title: 'Pricing | CloudRent Pro - Plans from $49/user/month',
    description:
      'Simple, transparent pricing for CloudRent Pro. Choose from Starter, Professional, or Business plans. $1 trial available.',
    url: '/pricing/',
  }),
}

export default function PricingPage() {
  return <PricingPageClient />
}
