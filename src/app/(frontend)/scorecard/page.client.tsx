'use client'

import { Scorecard } from '@/components/Scorecard'

export default function ScorecardPageClient() {
  return (
    <div className="min-h-screen bg-[#0e0b14]">
      {/* Subtle purple glow at top */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(136, 27, 169, 0.08), transparent)',
        }}
      />
      <div className="relative">
        <Scorecard variant="standalone" />
      </div>
    </div>
  )
}
