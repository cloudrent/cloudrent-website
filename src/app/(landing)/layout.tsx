import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})
import { GoogleTagManager, GoogleTagManagerNoscript } from '@/components/GoogleTagManager'
import { MicrosoftClarity } from '@/components/MicrosoftClarity'
import { OrganizationSchema } from '@/components/StructuredData'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import '../(frontend)/globals.css'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * Landing page layout - isolated pages without site header/footer
 * Used for Google Ads landing pages where we want focused conversion
 */
export default async function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={inter.variable} lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('payload-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)})()`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <OrganizationSchema />
      </head>
      <body className="relative">
        <GoogleTagManager />
        <GoogleTagManagerNoscript />
        <MicrosoftClarity />
        {/* Global Background */}
        <div className="fixed inset-0 -z-10 bg-[#0a0a1a]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-purple/20 via-[#0a0a1a] to-[#0a0a1a]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <Providers>
          {/* No Header, Footer, TrialPopup, or ChatWidget - landing pages are isolated */}
          {children}
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@cloudrental',
    site: '@cloudrental',
  },
}
