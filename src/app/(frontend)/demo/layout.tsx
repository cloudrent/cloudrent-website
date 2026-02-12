import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Demo | CloudRent Pro Equipment Rental Software',
  description:
    'See CloudRent Pro in action. Book a free personalised demo and discover how we can streamline your equipment hire business. No obligation.',
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children
}
