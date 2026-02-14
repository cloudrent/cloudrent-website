'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Play, X } from 'lucide-react'

interface VideoModalProps {
  buttonLabel: string
  videoSrc: string
}

export function VideoModal({ buttonLabel, videoSrc }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const close = useCallback(() => {
    setIsOpen(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, close])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all w-full sm:w-auto justify-center backdrop-blur-sm hover:bg-white/5"
      >
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <Play className="w-6 h-6" fill="currentColor" />
        </div>
        {buttonLabel}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={close}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={close}
          >
            <X className="w-6 h-6 text-white" />
          </button>

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
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <p className="absolute bottom-4 text-white/50 text-sm">
            Click anywhere or press Esc to close
          </p>
        </div>
      )}
    </>
  )
}
