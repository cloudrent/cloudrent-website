/**
 * Event type configurations for booking system
 *
 * Each event type has its own duration and display settings.
 * The schedule, availability windows, and Google Calendar integration
 * are shared via the Payload Global `booking-settings`.
 */

export const eventTypes = {
  demo: {
    slug: 'demo' as const,
    name: 'Product Demo',
    description: '60-minute walkthrough of CloudRent Pro tailored to your business',
    duration: 60,
  },
  training: {
    slug: 'training' as const,
    name: 'Training Session',
    description: '30-minute training session with our team',
    duration: 30,
  },
} as const

export type EventTypeSlug = keyof typeof eventTypes
export type EventTypeConfig = (typeof eventTypes)[EventTypeSlug]

export function getEventType(slug: string | null | undefined): EventTypeConfig | null {
  if (!slug) return eventTypes.demo // Default to demo
  if (slug in eventTypes) {
    return eventTypes[slug as EventTypeSlug]
  }
  return null // Invalid type
}

export function isValidEventType(slug: string | null | undefined): slug is EventTypeSlug {
  if (!slug) return true // Will default to demo
  return slug in eventTypes
}
