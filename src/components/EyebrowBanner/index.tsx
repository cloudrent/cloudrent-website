'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BannerMessage {
  background: string
  dotColor: string
  pulseClass: string
  text: string
  cta: string
  link: string
}

const messages: BannerMessage[] = [
  {
    background: '#b45309',
    dotColor: '#fbbf24',
    pulseClass: 'animate-pulse-amber',
    text: 'The average hire business loses $2,300/month without knowing it.',
    cta: 'Check for free →',
    link: '/scorecard',
  },
  {
    background: '#4a0e6e',
    dotColor: '#c084fc',
    pulseClass: 'animate-pulse-purple',
    text: 'Your competitor just got recommended by ChatGPT. Did you?',
    cta: 'Check my AI visibility →',
    link: '/ai-check',
  },
]

interface EyebrowBannerProps {
  excludedPaths?: string[]
}

export function EyebrowBanner({ excludedPaths = [] }: EyebrowBannerProps) {
  const pathname = usePathname()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)

  // Check if current path is excluded
  const isExcluded = excludedPaths.some((path) => pathname === path || pathname.startsWith(path + '/'))

  // Rotate messages every 3.5 seconds
  useEffect(() => {
    if (isExcluded) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
      setAnimationKey((prev) => prev + 1)
    }, 3500)

    return () => clearInterval(interval)
  }, [isExcluded])

  if (isExcluded) return null

  const currentMessage = messages[currentIndex]

  return (
    <Link
      href={currentMessage.link}
      className="block w-full transition-colors duration-300"
      style={{ backgroundColor: currentMessage.background }}
    >
      <div className="flex items-center justify-center gap-3 px-6 py-[11px] sm:gap-4">
        {/* Pulsing dot */}
        <div
          className={`h-[10px] w-[10px] shrink-0 rounded-full ${currentMessage.pulseClass}`}
          style={{ backgroundColor: currentMessage.dotColor }}
        />

        {/* Content wrapper */}
        <div
          key={animationKey}
          className="flex flex-col items-center gap-1 animate-banner-fadein sm:flex-row sm:gap-2"
        >
          {/* Message text */}
          <span className="text-center text-[12px] font-medium text-white sm:text-[13px]">
            {currentMessage.text}
          </span>

          {/* CTA */}
          <span className="text-[12px] text-white/80 underline underline-offset-2 sm:text-[13px]">
            {currentMessage.cta}
          </span>
        </div>

        {/* Spacer for indicator dots alignment */}
        <div className="hidden flex-1 sm:block" />

        {/* Indicator dots */}
        <div className="hidden items-center gap-[6px] sm:flex">
          {messages.map((_, index) => (
            <div
              key={index}
              className="h-[6px] w-[6px] rounded-full transition-colors duration-300"
              style={{
                backgroundColor:
                  index === currentIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
      </div>
    </Link>
  )
}
