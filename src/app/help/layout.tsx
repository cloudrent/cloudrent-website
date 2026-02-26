import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
import { Roboto } from 'next/font/google'
import React from 'react'
import Link from 'next/link'
import { Search, BookOpen, Home } from 'lucide-react'
import './help.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'CloudRent Pro Help Center',
    template: '%s | CloudRent Pro Help',
  },
  description: 'Find answers to your questions about CloudRent Pro rental management software.',
}

function HelpHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-purple-500/20 bg-[#0a0a1a]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/help" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white">CloudRent Pro</span>
              <span className="ml-2 text-sm text-purple-300">Help Center</span>
            </div>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="https://www.cloudrent.me"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              <Home className="inline-block h-4 w-4 mr-1" />
              Main Site
            </Link>
            <Link
              href="https://app.cloudrent.me"
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500"
            >
              Open App
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

function HelpFooter() {
  return (
    <footer className="border-t border-purple-500/20 bg-[#0a0a1a] py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} CloudRent Pro. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="https://www.cloudrent.me/contact" className="text-gray-400 hover:text-white">
              Contact Support
            </Link>
            <Link href="https://www.cloudrent.me/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="https://www.cloudrent.me/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={roboto.variable} lang="en" data-theme="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </head>
      <body className="min-h-screen bg-[#0a0a1a] text-white">
        {/* Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0a1a] to-[#0a0a1a]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <HelpHeader />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <HelpFooter />
      </body>
    </html>
  )
}
