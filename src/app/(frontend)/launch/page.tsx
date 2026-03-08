import type { Metadata } from 'next'
import LaunchPageClient from './LaunchPageClient'

export const metadata: Metadata = {
  title: 'Launch Offer: $85/user/mo Forever | CloudRent Pro',
  description:
    'Be one of our first 100 Launch Customers and lock in the complete CloudRent Pro Business plan at $85/user/mo forever. Save $44/user/mo compared to standard pricing.',
  alternates: {
    canonical: 'https://www.cloudrent.me/launch/',
  },
  openGraph: {
    title: 'Launch Offer: $85/user/mo Forever | CloudRent Pro',
    description:
      'Join our first 100 customers and get every feature of CloudRent Pro at $85/user/mo — locked in forever. Limited spots available.',
    url: 'https://www.cloudrent.me/launch/',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function LaunchPage() {
  return <LaunchPageClient />
}
