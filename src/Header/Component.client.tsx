'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X, Search, Phone } from 'lucide-react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

// Mobile nav links
const mobileNavLinks: { label: string; href: string; external?: boolean }[] = [
  { label: 'Features', href: '/features' },
  { label: 'Web Portal', href: '/web-portal' },
  { label: 'Mobile App', href: '/mobile-app' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Videos', href: '/videos' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/posts' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Book Demo', href: '/demo' },
  { label: 'Login', href: 'https://app.cloudrent.me', external: true },
]

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    setMobileMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <>
      {/* Top Utility Bar */}
      <div className="hidden lg:block border-b border-white/10 bg-black/20">
        <div className="container flex items-center justify-between py-2">
          {/* Left - Phone & tagline */}
          <div className="flex items-center gap-6 text-sm">
            <a href="tel:+61731712948" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Phone className="h-3.5 w-3.5" />
              <span>+61 7 3171 2948</span>
            </a>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400"><span className="text-lg">🇦🇺</span> 100% Australian Built & Owned</span>
          </div>

          {/* Right - Search, Login, CTA */}
          <div className="flex items-center gap-4">
            <Link
              href="/search"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Link>
            <a
              href="https://app.cloudrent.me"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Login
            </a>
            <a
              href="https://app.cloudrent.me/register"
              className="rounded-lg px-4 py-1.5 text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: '#881ba9' }}
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="container relative z-[60]" {...(theme ? { 'data-theme': theme } : {})}>
        <div className="flex items-center justify-between py-4">
          <Link href="/">
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <HeaderNav data={data} />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-lg p-3 text-white transition-colors hover:bg-white/10 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-purple-500/20 pb-6 lg:hidden">
          <nav className="flex flex-col gap-1 pt-4">
            {mobileNavLinks.map((link) => (
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-4 py-3 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-4 py-3 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
            <div className="mt-4 flex flex-col gap-3 px-4">
              <a
                href="https://app.cloudrent.me/register"
                className="rounded-xl px-6 py-3 text-center font-semibold text-white"
                style={{ backgroundColor: '#881ba9' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Start Free Trial
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
    </>
  )
}
