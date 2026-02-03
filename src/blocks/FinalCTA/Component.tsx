import React from 'react'
import Link from 'next/link'
import type { FinalCtaBlock as FinalCtaBlockType } from '@/payload-types'

export const FinalCtaBlock: React.FC<FinalCtaBlockType> = ({
  headline,
  subheadline,
  primaryButtonLabel,
  primaryButtonUrl,
  secondaryButtonLabel,
  secondaryButtonUrl,
  trustSignals,
}) => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#881ba9]/10 to-transparent" />
      <div className="absolute w-[600px] h-[600px] bg-[#881ba9] rounded-full blur-3xl opacity-10 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {headline && (
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {headline}
          </h2>
        )}
        
        {subheadline && (
          <p className="text-xl text-muted-foreground mb-8">
            {subheadline}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
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
              className="text-muted-foreground hover:text-foreground px-6 py-4 transition-colors"
            >
              {secondaryButtonLabel}
            </Link>
          )}
        </div>
        
        {trustSignals && trustSignals.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm">
            {trustSignals.map((signal, index) => (
              <span key={index} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {signal.text}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FinalCtaBlock
