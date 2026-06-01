'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { Scorecard } from './index'

interface ScorecardModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ScorecardModal({ isOpen, onClose }: ScorecardModalProps) {
  // Handle escape key and body scroll
  useEffect(() => {
    if (!isOpen) return

    // Lock body scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Escape key handler
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed right-4 top-4 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        aria-label="Close scorecard"
      >
        <X className="h-6 w-6 text-white" />
      </button>

      {/* Content container */}
      <div
        className="relative w-full max-w-4xl py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-2xl bg-[#0e0b14]">
          <Scorecard variant="modal" onClose={onClose} />
        </div>
      </div>

      {/* Escape hint */}
      <p className="fixed bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/40">
        Press Esc to close
      </p>
    </div>
  )
}

export default ScorecardModal
