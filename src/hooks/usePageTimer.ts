'use client'

import { useEffect, useRef, useState } from 'react'

interface UsePageTimerOptions {
  delay: number
  enabled?: boolean
  onTrigger?: () => void
}

export function usePageTimer({ delay, enabled = true, onTrigger }: UsePageTimerOptions): boolean {
  const [hasTriggered, setHasTriggered] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!enabled || hasTriggered) {
      return
    }

    timerRef.current = setTimeout(() => {
      setHasTriggered(true)
      onTrigger?.()
    }, delay)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [delay, enabled, hasTriggered, onTrigger])

  return hasTriggered
}
