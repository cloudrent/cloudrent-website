'use client'

import { useState, useEffect, useCallback } from 'react'

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

interface UsePopupSuppressionReturn {
  isSuppressed: boolean
  suppress: () => void
  checkSuppression: () => boolean
}

export function usePopupSuppression(storageKey: string): UsePopupSuppressionReturn {
  const [isSuppressed, setIsSuppressed] = useState(true) // Start suppressed until we check

  const checkSuppression = useCallback((): boolean => {
    if (typeof window === 'undefined') return true

    try {
      const stored = localStorage.getItem(storageKey)
      if (!stored) return false

      const timestamp = parseInt(stored, 10)
      if (isNaN(timestamp)) return false

      const now = Date.now()
      const isWithinWindow = now - timestamp < SEVEN_DAYS_MS

      return isWithinWindow
    } catch {
      return false
    }
  }, [storageKey])

  const suppress = useCallback(() => {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(storageKey, Date.now().toString())
      setIsSuppressed(true)
    } catch {
      // localStorage might be unavailable
    }
  }, [storageKey])

  useEffect(() => {
    setIsSuppressed(checkSuppression())
  }, [checkSuppression])

  return { isSuppressed, suppress, checkSuppression }
}
