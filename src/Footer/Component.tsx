import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Media } from '@/components/Media'

// Quick Menu links
const quickMenuLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/posts' },
  { label: 'Contact', href: '/contact' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'HRIA', href: 'https://www.hireandrental.com.au/', external: true },
]

// Social media links
const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/CloudRentSoftware',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://twitter.com/cloudrental',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/cloudrental',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/cloudrent',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@cloudrent',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

async function getLatestPost() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    limit: 1,
    sort: '-publishedAt',
    depth: 1,
    select: {
      title: true,
      slug: true,
      heroImage: true,
      publishedAt: true,
    },
  })
  return posts.docs[0] || null
}

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const latestPost = await getLatestPost()

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <footer className="mt-auto border-t border-[#881ba9]/20 bg-[#0a0a1a]">
      <div className="container py-16">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Logo Section */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <Logo className="h-[80px] w-auto" />
            </Link>
            {/* AI Badge */}
            <div className="group mt-6 inline-flex cursor-pointer flex-col items-center rounded-lg px-4 py-3 transition-all duration-300 hover:scale-105 hover:bg-[#881ba9]/10 hover:shadow-[0_0_30px_rgba(136,27,169,0.3)]">
              <div className="flex items-center gap-2 text-[#881ba9] transition-all duration-300 group-hover:text-[#a855c9]">
                <svg className="h-8 w-8 transition-transform duration-500 group-hover:rotate-180 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
                <span className="text-lg font-semibold transition-all duration-300 group-hover:tracking-wider">AI</span>
              </div>
              <span className="mt-1 text-xs tracking-widest text-[#881ba9]/80 transition-all duration-300 group-hover:text-[#881ba9]">ARTIFICIAL INTELLIGENCE</span>
              <span className="text-xs tracking-widest text-[#881ba9]/80 transition-all duration-300 group-hover:text-[#881ba9]">IN RENTALS</span>
            </div>
          </div>

          {/* Quick Menu */}
          <div className="lg:col-span-3">
            <h4 className="mb-6 border-b border-[#881ba9]/30 pb-2 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Menu
            </h4>
            <ul className="space-y-1.5">
              {quickMenuLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#881ba9] transition-colors hover:text-[#a855c9]"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[#881ba9] transition-colors hover:text-[#a855c9]"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Latest News */}
          <div className="lg:col-span-5">
            <h4 className="mb-6 border-b border-[#881ba9]/30 pb-2 text-sm font-semibold uppercase tracking-wider text-white">
              Latest News
            </h4>
            {latestPost && (
              <Link href={`/posts/${latestPost.slug}`} className="group block">
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-[#881ba9]/20">
                    {latestPost.heroImage && typeof latestPost.heroImage !== 'string' && (
                      <Media
                        fill
                        imgClassName="object-cover transition-transform group-hover:scale-105"
                        resource={latestPost.heroImage}
                      />
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <h5 className="font-semibold leading-tight text-white transition-colors group-hover:text-[#881ba9]">
                      {latestPost.title}
                    </h5>
                    {latestPost.publishedAt && (
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-400">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(latestPost.publishedAt)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#881ba9]/20 bg-[#050510]">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          {/* Copyright */}
          <p className="text-sm text-gray-400">
            Copyright © {new Date().getFullYear()} CloudRent Pty Ltd. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-sm">
            <Link href="/terms" className="text-gray-400 transition-colors hover:text-white">
              Terms of Service
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/privacy" className="text-gray-400 transition-colors hover:text-white">
              Privacy Policy
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#881ba9] transition-colors hover:text-[#a855c9]"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
