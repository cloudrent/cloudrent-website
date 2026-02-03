import React from 'react'
import Link from 'next/link'
import type { ShipFastBlock as ShipFastBlockType } from '@/payload-types'

export const ShipFastBlock: React.FC<ShipFastBlockType> = ({
  badge,
  headline,
  description,
  stats,
  ctaLabel,
  ctaUrl,
}) => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#881ba9]/5 to-transparent" />
      <div className="absolute w-96 h-96 bg-[#881ba9] rounded-full blur-3xl opacity-10 top-0 right-0" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 bg-[#881ba9]/10 border border-[#881ba9]/20 rounded-full px-4 py-2 mb-8">
            <svg className="w-5 h-5 text-[#881ba9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-[#881ba9] text-sm font-medium">{badge}</span>
          </div>
        )}
        
        {headline && (
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {headline.includes('fast') ? (
              <>
                {headline.split('fast')[0]}
                <span className="text-[#881ba9]">fast</span>
                {headline.split('fast')[1]}
              </>
            ) : (
              headline
            )}
          </h2>
        )}
        
        {description && (
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {description.includes('weeks') ? (
              <>
                {description.split('weeks')[0]}
                <span className="text-foreground font-medium">weeks</span>
                {description.split('weeks')[1]}
              </>
            ) : (
              description
            )}
          </p>
        )}
        
        {stats && stats.length > 0 && (
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {ctaLabel && ctaUrl && (
          <Link
            href={ctaUrl}
            className="mt-12 inline-flex items-center gap-2 border border-[#881ba9]/30 text-[#881ba9] hover:bg-[#881ba9]/10 px-6 py-3 rounded-xl transition-all"
          >
            {ctaLabel}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        )}
      </div>
    </section>
  )
}

export default ShipFastBlock
