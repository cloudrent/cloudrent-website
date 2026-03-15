import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing | CloudRent Pro - Plans from $49/user/month',
  description:
    'Simple, transparent pricing for equipment hire businesses. Starter $49, Professional $85, Business $129/user/mo. $1 trial available.',
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
