'use client'

import AIVisibilityChecker from '@/components/AIVisibilityChecker'

export default function AICheckPageClient() {
  return (
    <div className="relative min-h-screen bg-[#0e0b14]">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
      </div>

      {/* Subtle radial gradient glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(136, 27, 169, 0.08), transparent)',
        }}
      />

      {/* Content */}
      <div className="relative">
        <AIVisibilityChecker />
      </div>
    </div>
  )
}
