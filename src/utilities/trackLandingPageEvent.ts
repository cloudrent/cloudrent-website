/**
 * Track landing page conversion events for GA4 and Google Ads
 *
 * Events are pushed to dataLayer for GTM processing.
 * Google Ads conversion tracking is handled via GTM tags.
 */

type LandingPageEvent = 'begin_trial' | 'book_demo' | 'nav_cta_click'
type PageType = 'damage' | 'safety'

export function trackLandingPageEvent(eventName: LandingPageEvent, pageType: PageType): void {
  if (typeof window === 'undefined') return

  const dataLayer = (window as any).dataLayer
  if (!dataLayer) return

  // Push GA4 event to dataLayer
  dataLayer.push({
    event: eventName,
    event_category: eventName === 'nav_cta_click' ? 'engagement' : 'conversion',
    event_label: 'landing_page_cta',
    page_type: pageType,
  })
}

/**
 * Track page view with page type for segmentation
 */
export function trackLandingPageView(pageType: PageType): void {
  if (typeof window === 'undefined') return

  const dataLayer = (window as any).dataLayer
  if (!dataLayer) return

  dataLayer.push({
    event: 'page_view',
    page_type: pageType,
  })
}
