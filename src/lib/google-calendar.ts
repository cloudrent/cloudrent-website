import { google, calendar_v3 } from 'googleapis'

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events',
]

/**
 * Get OAuth2 client for Google Calendar API
 */
export function getOAuth2Client() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  // Use production URL for OAuth redirect
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://www.cloudrent.me'
    : (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000')
  const redirectUri = `${baseUrl}/api/booking/google/callback`

  if (!clientId || !clientSecret) {
    throw new Error('Google OAuth credentials not configured')
  }

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri)
}

/**
 * Generate OAuth URL for admin to connect Google Calendar
 */
export function getAuthUrl(): string {
  const oauth2Client = getOAuth2Client()
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // Force refresh token generation
    scope: SCOPES,
  })
}

/**
 * Exchange authorization code for tokens
 */
export async function exchangeCodeForTokens(code: string) {
  const oauth2Client = getOAuth2Client()
  const { tokens } = await oauth2Client.getToken(code)
  return tokens
}

/**
 * Get authenticated Google Calendar client
 * Returns null if not configured
 */
export async function getCalendarClient(): Promise<calendar_v3.Calendar | null> {
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN
  if (!refreshToken) {
    console.log('Google Calendar not configured: missing GOOGLE_REFRESH_TOKEN')
    return null
  }

  try {
    const oauth2Client = getOAuth2Client()
    oauth2Client.setCredentials({ refresh_token: refreshToken })

    // Force token refresh to ensure we have valid access
    await oauth2Client.getAccessToken()

    return google.calendar({ version: 'v3', auth: oauth2Client })
  } catch (error) {
    console.error('Failed to initialize Google Calendar client:', error)
    return null
  }
}

/**
 * Fetch busy times from Google Calendar for a date range
 */
export async function getBusyTimes(
  startDate: Date,
  endDate: Date,
  calendarId = 'primary'
): Promise<{ start: Date; end: Date }[]> {
  const calendar = await getCalendarClient()
  if (!calendar) return []

  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        items: [{ id: calendarId }],
      },
    })

    const busy = response.data.calendars?.[calendarId]?.busy || []
    return busy.map((b) => ({
      start: new Date(b.start!),
      end: new Date(b.end!),
    }))
  } catch (error) {
    console.error('Failed to fetch busy times:', error)
    return []
  }
}

/**
 * Create a calendar event, optionally with Google Meet
 */
export async function createCalendarEvent(params: {
  summary: string
  description: string
  startTime: Date
  endTime: Date
  attendeeEmail: string
  attendeeName: string
  hostEmail: string
  timezone: string
  createGoogleMeet?: boolean
}): Promise<{ eventId: string; meetingUrl: string } | null> {
  const calendar = await getCalendarClient()
  if (!calendar) return null

  try {
    const event = await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: params.createGoogleMeet ? 1 : 0,
      sendUpdates: 'all', // Send email invites to attendees
      requestBody: {
        summary: params.summary,
        description: params.description,
        start: {
          dateTime: params.startTime.toISOString(),
          timeZone: params.timezone,
        },
        end: {
          dateTime: params.endTime.toISOString(),
          timeZone: params.timezone,
        },
        attendees: [
          { email: params.attendeeEmail, displayName: params.attendeeName },
          { email: params.hostEmail, organizer: true },
        ],
        ...(params.createGoogleMeet && {
          conferenceData: {
            createRequest: {
              requestId: `booking-${Date.now()}-${Math.random().toString(36).substring(7)}`,
              conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
          },
        }),
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 60 }, // 1 hour before
            { method: 'popup', minutes: 15 }, // 15 minutes before
          ],
        },
      },
    })

    return {
      eventId: event.data.id!,
      meetingUrl: event.data.hangoutLink || '',
    }
  } catch (error) {
    console.error('Failed to create calendar event:', error)
    return null
  }
}

/**
 * Delete a calendar event (for cancellations)
 */
export async function deleteCalendarEvent(eventId: string): Promise<boolean> {
  const calendar = await getCalendarClient()
  if (!calendar) return false

  try {
    await calendar.events.delete({
      calendarId: 'primary',
      eventId,
      sendUpdates: 'all', // Notify attendees of cancellation
    })
    return true
  } catch (error) {
    console.error('Failed to delete calendar event:', error)
    return false
  }
}

/**
 * Get connected user's email address
 */
export async function getConnectedEmail(): Promise<string | null> {
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN
  if (!refreshToken) return null

  try {
    const oauth2Client = getOAuth2Client()
    oauth2Client.setCredentials({ refresh_token: refreshToken })

    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client })
    const userInfo = await oauth2.userinfo.get()
    return userInfo.data.email || null
  } catch (error) {
    console.error('Failed to get connected email:', error)
    return null
  }
}
