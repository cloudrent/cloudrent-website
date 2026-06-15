'use client'

import React, { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface ScanningStateProps {
  businessName: string
}

const SCANNING_MESSAGES = [
  'Checking Google...',
  'Checking Google AI Overviews...',
  'Checking ChatGPT...',
  'Checking Perplexity...',
  'Checking Copilot...',
  'Checking Gemini...',
  'Analysing results...',
]

export default function ScanningState({ businessName }: ScanningStateProps) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % SCANNING_MESSAGES.length)
    }, 4000)

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev
        return prev + Math.random() * 3
      })
    }, 500)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      {/* Animated Spinner */}
      <div className="relative mb-8">
        <div className="h-24 w-24 animate-spin rounded-full border-4 border-brand-purple/20 border-t-brand-purple" />
        <Loader2 className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-pulse text-brand-purple" />
      </div>

      {/* Business Name */}
      <h2 className="mb-2 text-2xl font-semibold text-white">
        Scanning for &quot;{businessName}&quot;
      </h2>

      {/* Rotating Messages */}
      <p className="mb-8 text-lg text-brand-purple transition-all duration-500">
        {SCANNING_MESSAGES[messageIndex]}
      </p>

      {/* Progress Bar */}
      <div className="mb-4 w-full max-w-md">
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-purple to-fuchsia-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Estimated Time */}
      <p className="text-sm text-white/40">
        This usually takes about 30 seconds...
      </p>

      {/* Engine Checklist */}
      <div className="mt-8 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
        {['Google', 'Google AI', 'ChatGPT', 'Perplexity', 'Copilot', 'Gemini'].map(
          (engine, index) => (
            <div
              key={engine}
              className={`rounded-lg border px-3 py-2 transition-all ${
                index <= messageIndex && messageIndex < SCANNING_MESSAGES.length - 1
                  ? 'border-brand-purple/30 bg-brand-purple/10 text-white'
                  : 'border-white/10 bg-white/5 text-white/40'
              }`}
            >
              {index < messageIndex && messageIndex < SCANNING_MESSAGES.length - 1 ? (
                <span className="mr-1.5 text-brand-green">✓</span>
              ) : index === messageIndex && messageIndex < SCANNING_MESSAGES.length - 1 ? (
                <Loader2 className="mr-1.5 inline h-3 w-3 animate-spin" />
              ) : null}
              {engine}
            </div>
          )
        )}
      </div>
    </div>
  )
}
