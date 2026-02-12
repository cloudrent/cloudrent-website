'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import type { Page } from '@/payload-types'
import { Play, X } from 'lucide-react'

export const CloudRentHero: React.FC<Page['hero']> = ({
  badge,
  headline,
  subheadline,
  description,
  primaryButtonLabel,
  primaryButtonUrl,
  secondaryButtonLabel,
  secondaryButtonUrl,
  trustSignals,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const openVideo = () => {
    setIsVideoOpen(true)
  }

  const closeVideo = useCallback(() => {
    setIsVideoOpen(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }, [])

  // Close on Escape key
  useEffect(() => {
    if (!isVideoOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeVideo()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isVideoOpen, closeVideo])

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-[100px]">
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center -mt-[50px]">
        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-muted-foreground text-sm">{badge}</span>
          </div>
        )}

        {/* Headline */}
        {headline && (
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            {headline.includes('hire business') ? (
              <>
                {headline.split('hire business')[0]}
                <span className="bg-gradient-to-r from-brand-purple via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  hire business
                </span>
                {headline.split('hire business')[1]}
              </>
            ) : (
              headline
            )}
          </h1>
        )}

        {/* Subheadline */}
        {subheadline && (
          <p className="text-xl sm:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto font-light">
            {subheadline.includes('weeks') ? (
              <>
                {subheadline.split('weeks')[0]}
                <span className="text-foreground font-medium">weeks</span>
                {subheadline.split('weeks')[1]}
              </>
            ) : (
              subheadline
            )}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            {description}
          </p>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          {primaryButtonLabel && primaryButtonUrl && (
            <Link
              href={primaryButtonUrl}
              className="group relative bg-gradient-to-r from-brand-purple to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all hover:shadow-[0_0_40px_rgba(136,27,169,0.5)] w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {primaryButtonLabel}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          )}
          
          {secondaryButtonLabel && secondaryButtonUrl && (
            <Link
              href={secondaryButtonUrl}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all w-full sm:w-auto justify-center backdrop-blur-sm hover:bg-white/5"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              {secondaryButtonLabel}
            </Link>
          )}
        </div>

        {/* Trust Signals */}
        {trustSignals && (
          <p className="text-muted-foreground text-sm">{trustSignals}</p>
        )}

        {/* Video Section */}
        <div className="mt-16 w-full max-w-4xl mx-auto">
          <div
            className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/50 cursor-pointer group shadow-2xl shadow-purple-900/20"
            onClick={openVideo}
          >
            {/* Video Thumbnail/Preview */}
            <video
              className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
              muted
              playsInline
              poster="/media/CloudRent-launch-Feb-2026.mp4#t=0.1"
            >
              <source src="/media/CloudRent-launch-Feb-2026.mp4" type="video/mp4" />
            </video>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-brand-purple to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
            </div>

            {/* Label */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <p className="text-white text-sm font-medium">Watch the CloudRent Launch Video</p>
            </div>
          </div>
        </div>
      </div>

      {/* Built For How You Work Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-12 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Built for how you{' '}
          <span className="bg-gradient-to-r from-brand-purple via-purple-400 to-blue-400 bg-clip-text text-transparent">
            actually work
          </span>
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Not another generic tool. CloudRent Pro is designed specifically for Australian equipment hire businesses.
        </p>

        {/* Device Mockup */}
        <div className="relative">
          <img
            src="/images/cloudrent-rental-software-all-devices-mockup.webp"
            alt="CloudRent Pro rental management software on desktop, laptop, tablet and mobile devices"
            className="w-full max-w-5xl mx-auto"
          />
          {/* Decorative glow */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 blur-3xl" />
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={closeVideo}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={closeVideo}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Video Player */}
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              className="w-full h-full rounded-xl"
              controls
              autoPlay
            >
              <source src="/media/CloudRent-launch-Feb-2026.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Click anywhere to close hint */}
          <p className="absolute bottom-4 text-white/50 text-sm">
            Click anywhere or press Esc to close
          </p>
        </div>
      )}
    </section>
  )
}
