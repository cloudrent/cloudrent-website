import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
import { Roboto, Roboto_Condensed } from 'next/font/google'
import React from 'react'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-roboto-condensed',
  display: 'swap',
})
import { AdminBar } from '@/components/AdminBar'
import { GoogleTagManager, GoogleTagManagerNoscript } from '@/components/GoogleTagManager'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(roboto.variable, robotoCondensed.variable)} lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <GoogleTagManager />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('payload-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)})()`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="relative">
        <GoogleTagManagerNoscript />
        {/* Global Background */}
        <div className="fixed inset-0 -z-10 bg-[#0a0a1a]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-purple/20 via-[#0a0a1a] to-[#0a0a1a]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <Providers>
          {isEnabled && (
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />
          )}
          <Header />
          {children}
          <Footer />
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
