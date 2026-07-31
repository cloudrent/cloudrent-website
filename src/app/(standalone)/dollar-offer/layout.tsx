import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CloudRent Pro — Run Every Hire Job From One Place',
  description:
    'CloudRent Pro brings bookings, equipment, dispatch, invoicing, and safety together. Start 30 days for $1 with full platform access.',
  openGraph: {
    title: 'CloudRent Pro — Hire Operations OS',
    description:
      'Run every hire job from one place. Bookings, equipment, dispatch, invoicing, and safety — all connected.',
  },
}

export default function CloudRentProLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
