import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | CloudRent Pro - Equipment Rental Industry Insights',
  description:
    'Tips, guides & industry news for equipment hire businesses. Learn how to grow your rental business, improve operations & stay ahead of the competition.',
}

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return children
}
