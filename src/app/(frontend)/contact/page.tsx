import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import ContactPageClient from './page.client'

// SEO metadata - ranking #1 for contact queries
export const metadata: Metadata = {
  title: 'Contact CloudRent | Australian Rental Software Support & Sales',
  description:
    'Contact the CloudRent team on the Gold Coast. Call +61 7 3171 2948, email support@cloudrent.me, or fill out our form. Response within 24 hours.',
  keywords: [
    'contact CloudRent',
    'rental software support',
    'CloudRent phone number',
    'equipment rental software help',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/contact/',
  },
  openGraph: mergeOpenGraph({
    title: 'Contact CloudRent | Australian Rental Software Support & Sales',
    description:
      'Contact the CloudRent team on the Gold Coast. Call +61 7 3171 2948, email support@cloudrent.me, or fill out our form. Response within 24 hours.',
    url: '/contact/',
  }),
}

export default function ContactPage() {
  return <ContactPageClient />
}
