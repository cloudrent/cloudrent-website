import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import ContactPageClient from './page.client'

export const metadata: Metadata = {
  title: 'Contact Us | CloudRent Pro Support & Sales',
  description:
    'Get in touch with the CloudRent Pro team. Questions about equipment rental software? Contact our sales or support team today.',
  alternates: {
    canonical: 'https://www.cloudrent.me/contact/',
  },
  openGraph: mergeOpenGraph({
    title: 'Contact Us | CloudRent Pro Support & Sales',
    description:
      'Get in touch with the CloudRent Pro team. Questions about equipment rental software? Contact our sales or support team today.',
    url: '/contact/',
  }),
}

export default function ContactPage() {
  return <ContactPageClient />
}
