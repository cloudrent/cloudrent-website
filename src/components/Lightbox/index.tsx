'use client'

import { useState, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'

interface LightboxImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export function LightboxImage({ src, alt, className, priority = false }: LightboxImageProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleClose])

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className={`cursor-zoom-in transition-transform hover:scale-[1.02] ${className || ''}`}
        onClick={() => setIsOpen(true)}
        priority={priority}
        quality={85}
      />

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          {/* Close button */}
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
          </button>

          {/* Image */}
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Click anywhere to close hint */}
          <p className="absolute bottom-4 text-sm text-white/50">
            Click anywhere or press Esc to close
          </p>
        </div>
      )}
    </>
  )
}
