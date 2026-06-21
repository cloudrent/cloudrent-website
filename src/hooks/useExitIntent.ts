'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface UseExitIntentOptions {
  enabled?: boolean
  minTimeOnPage?: number // Minimum time before exit intent can trigger (ms)
  mobileInactivityDelay?: number // Time without activity before triggering on mobile (ms)
  onTrigger?: () => void
}

export function useExitIntent({
  enabled = true,
  minTimeOnPage = 10000, // 10 seconds default
  mobileInactivityDelay = 45000, // 45 seconds default
  onTrigger,
}: UseExitIntentOptions): boolean {
  const [hasTriggered, setHasTriggered] = useState(false)
  const [canTrigger, setCanTrigger] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)
  const hasCalledTrigger = useRef(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Wait for minimum time on page before allowing trigger
  useEffect(() => {
    if (!enabled) return

    const timer = setTimeout(() => {
      setCanTrigger(true)
    }, minTimeOnPage)

    return () => clearTimeout(timer)
  }, [enabled, minTimeOnPage])

  // Trigger the callback only once
  const trigger = useCallback(() => {
    if (hasCalledTrigger.current || hasTriggered) return
    hasCalledTrigger.current = true
    setHasTriggered(true)
    onTrigger?.()
  }, [hasTriggered, onTrigger])

  // Desktop: mouseleave at top of viewport
  useEffect(() => {
    if (!enabled || !canTrigger || hasTriggered || isMobile) return

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when leaving from the top
      if (e.clientY < 10) {
        trigger()
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [enabled, canTrigger, hasTriggered, isMobile, trigger])

  // Mobile: inactivity timer
  useEffect(() => {
    if (!enabled || !canTrigger || hasTriggered || !isMobile) return

    const resetInactivityTimer = () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }

      inactivityTimerRef.current = setTimeout(() => {
        trigger()
      }, mobileInactivityDelay)
    }

    // Start the timer
    resetInactivityTimer()

    // Reset on activity
    const handleActivity = () => resetInactivityTimer()

    window.addEventListener('scroll', handleActivity, { passive: true })
    window.addEventListener('touchstart', handleActivity, { passive: true })
    window.addEventListener('touchmove', handleActivity, { passive: true })

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
      window.removeEventListener('scroll', handleActivity)
      window.removeEventListener('touchstart', handleActivity)
      window.removeEventListener('touchmove', handleActivity)
    }
  }, [enabled, canTrigger, hasTriggered, isMobile, mobileInactivityDelay, trigger])

  return hasTriggered
}
