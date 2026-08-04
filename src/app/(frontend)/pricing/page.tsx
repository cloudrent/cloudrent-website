import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { SoftwareSchema, BreadcrumbSchema } from '@/components/StructuredData'
import PricingPageClient from './page.client'

// SEO metadata - optimized for pricing queries
export const metadata: Metadata = {
  title: 'Equipment Rental Software Pricing | From $49/user – CloudRent Pro',
  description:
    'Transparent rental software pricing. Starter $49, Professional $85, Business $99/user/month. No setup fees. $1 first month for 14 days. Cancel anytime.',
  keywords: [
    'rental software pricing',
    'equipment rental software cost',
    'hire software pricing',
    'rental management software price',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/pricing/',
  },
  openGraph: mergeOpenGraph({
    title: 'Equipment Rental Software Pricing | From $49/user – CloudRent Pro',
    description:
      'Transparent rental software pricing. Starter $49, Professional $85, Business $99/user/month. No setup fees. $1 first month for 14 days. Cancel anytime.',
    url: '/pricing/',
  }),
}

export default function PricingPage() {
  return (
    <>
      <SoftwareSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.cloudrent.me/' },
          { name: 'Pricing', url: 'https://www.cloudrent.me/pricing/' },
        ]}
      />
      <PricingPageClient />
    </>
  )
}
