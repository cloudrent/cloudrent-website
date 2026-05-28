import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

import '../(frontend)/globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

/**
 * Minimal layout for iframe embedding.
 *
 * Excludes:
 * - Header, Footer, Nav
 * - GTM, Microsoft Clarity
 * - TrialPopup, PublicChatWidget
 * - Dark background overlay
 * - payload-theme localStorage script
 *
 * Keeps:
 * - Fonts and Tailwind base styles
 * - Minimal HTML structure
 */
export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={inter.variable} lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-transparent">
        {children}
      </body>
    </html>
  )
}
