import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Customer Portal | CloudRent Pro - Online Equipment Booking',
  description:
    'Give customers 24/7 online booking, rental history & invoice access. Branded web portal for your equipment hire business. Increase bookings, reduce admin.',
}

export default function WebPortalLayout({ children }: { children: React.ReactNode }) {
  return children
}
