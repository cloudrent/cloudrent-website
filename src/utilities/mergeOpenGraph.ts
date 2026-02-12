import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'All-in-one rental management platform for Australian equipment hire businesses. Bookings, invoicing, SWMS, Xero integration. 30-day free trial.',
  images: [
    {
      url: `${getServerSideURL()}/images/cloudrent-pro-og-image.webp`,
      width: 1200,
      height: 630,
      alt: 'CloudRent Pro - Equipment Rental Management Software',
    },
  ],
  siteName: 'CloudRent Pro',
  title: 'CloudRent Pro - Equipment Rental Management Software',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
