import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mobile App | CloudRent Pro - Rental Management On The Go',
  description:
    'Manage your hire business from anywhere. iOS & Android apps with offline sync, barcode scanning, GPS tracking, digital signatures & real-time updates.',
}

export default function MobileAppLayout({ children }: { children: React.ReactNode }) {
  return children
}
