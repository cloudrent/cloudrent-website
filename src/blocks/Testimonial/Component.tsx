import React from 'react'
import type { TestimonialBlock as TestimonialBlockType } from '@/payload-types'

export const TestimonialBlock: React.FC<TestimonialBlockType> = ({
  preHeadline,
  quote,
  authorName,
  authorTitle,
  authorInitials,
}) => {
  return (
    <section className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        {preHeadline && (
          <div className="text-center mb-12">
            <p className="text-muted-foreground uppercase tracking-widest text-sm">
              {preHeadline}
            </p>
          </div>
        )}
        
        {/* Testimonial Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto text-center hover:bg-white/10 transition-all duration-500">
          {quote && (
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 italic leading-relaxed">
              "{quote}"
            </p>
          )}
          
          <div className="flex items-center justify-center gap-4">
            {authorInitials && (
              <div className="w-14 h-14 rounded-full bg-[#881ba9]/20 flex items-center justify-center">
                <span className="text-[#881ba9] font-semibold text-lg">{authorInitials}</span>
              </div>
            )}
            <div className="text-left">
              {authorName && (
                <div className="text-foreground font-semibold">{authorName}</div>
              )}
              {authorTitle && (
                <div className="text-muted-foreground text-sm">{authorTitle}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialBlock
