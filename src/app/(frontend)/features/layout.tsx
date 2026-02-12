import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Features | CloudRent Pro Equipment Rental Software',
  description:
    'Discover CloudRent Pro features: equipment tracking, digital signatures, SWMS compliance, Xero sync, mobile apps, GPS tracking, AI damage detection & more.',
}

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children
}
