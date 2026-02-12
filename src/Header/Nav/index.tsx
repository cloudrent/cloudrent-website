'use client'
import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

// Main navigation links
const navLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Web Portal', href: '/web-portal' },
  { label: 'Mobile App', href: '/mobile-app' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/posts' },
  { label: 'Contact', href: '/contact' },
]

export const HeaderNav: React.FC<{ data: HeaderType }> = () => {
  return (
    <nav className="flex items-center gap-1">
      {navLinks.map((link, i) => (
        <Link
          key={i}
          href={link.href}
          className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="/search"
        className="rounded-lg px-3 py-2 text-gray-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5" />
      </Link>
      <Link
        href="/contact"
        className="ml-2 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:from-purple-400 hover:to-fuchsia-400 hover:shadow-purple-500/40"
      >
        Start Free Trial
      </Link>
    </nav>
  )
}
