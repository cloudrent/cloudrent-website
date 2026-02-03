import React from 'react'
import Link from 'next/link'
import type { Page } from '@/payload-types'

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
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center">
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
                <span className="bg-gradient-to-r from-[#881ba9] via-purple-400 to-blue-400 bg-clip-text text-transparent">
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
              className="group relative bg-gradient-to-r from-[#881ba9] to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all hover:shadow-[0_0_40px_rgba(136,27,169,0.5)] w-full sm:w-auto"
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
      </div>
    </section>
  )
}
