import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import React from 'react'

import { getServerSideURL } from '@/utilities/getURL'

import '@/app/(frontend)/globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CloudRent quick links',
  description: 'Quick links to CloudRent Pro resources, help centre, training and reviews',
  metadataBase: new URL(getServerSideURL()),
  openGraph: {
    title: 'CloudRent quick links',
    description: 'Quick links to CloudRent Pro resources, help centre, training and reviews',
    siteName: 'CloudRent',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'CloudRent',
  },
}

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
      lang="en-AU"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/links/manifest.webmanifest" rel="manifest" />
        <meta name="theme-color" content="#881ba9" />
      </head>
      <body className="min-h-screen bg-[#0a0a1a] text-[#f5f5f7] font-[family-name:var(--font-plus-jakarta)] antialiased">
        {children}
      </body>
    </html>
  )
}
