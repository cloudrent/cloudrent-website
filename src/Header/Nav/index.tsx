'use client'
import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import Link from 'next/link'

// Main navigation links
const navLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Web Portal', href: '/web-portal' },
  { label: 'Mobile App', href: '/mobile-app' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Videos', href: '/videos' },
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
          className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
