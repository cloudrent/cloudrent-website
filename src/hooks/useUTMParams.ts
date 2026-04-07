'use client'

import { useState, useEffect } from 'react'

/**
 * Hook to capture and preserve UTM parameters from the URL.
 * Returns a query string that can be appended to CTA links.
 *
 * @example
 * const utmString = useUTMParams()
 * // If URL has ?utm_source=google&utm_medium=cpc
 * // utmString = "?utm_source=google&utm_medium=cpc"
 *
 * <a href={`https://app.cloudrent.me/register${utmString}`}>Start Trial</a>
 */
export function useUTMParams(): string {
  const [utmString, setUtmString] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

    const utmParams = utmKeys
      .filter((key) => params.has(key))
      .map((key) => `${key}=${encodeURIComponent(params.get(key) || '')}`)

    if (utmParams.length > 0) {
      setUtmString(`?${utmParams.join('&')}`)
    }
  }, [])

  return utmString
}
