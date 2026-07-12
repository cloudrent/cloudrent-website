/**
 * Appends gclid and utm_* params from the current URL to a target URL.
 * Used to preserve attribution when navigating to the signup flow.
 */
export function appendUTMParams(targetUrl: string): string {
  if (typeof window === 'undefined') return targetUrl

  const currentParams = new URLSearchParams(window.location.search)
  const targetUrlObj = new URL(targetUrl)

  // List of params to preserve
  const paramsToPreserve = ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

  paramsToPreserve.forEach((param) => {
    const value = currentParams.get(param)
    if (value) {
      targetUrlObj.searchParams.set(param, value)
    }
  })

  return targetUrlObj.toString()
}

/**
 * Hook to get the signup URL with UTM params appended.
 * Call this in a useEffect or event handler, not during render.
 */
export function getSignupUrlWithUTM(baseUrl: string = 'https://app.cloudrent.me/register'): string {
  return appendUTMParams(baseUrl)
}
