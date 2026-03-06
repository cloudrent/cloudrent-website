import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { createCalendarEvent } from '@/lib/google-calendar'
import { Resend } from 'resend'
import { formatDate, formatTime } from '@/lib/booking/calculate-slots'

export const dynamic = 'force-dynamic'

// Blocked email domains (spam prevention)
const BLOCKED_DOMAINS = [
  'tempmail.com',
  'throwaway.email',
  'mailinator.com',
  'guerrillamail.com',
  'sharklasers.com',
  '10minutemail.com',
  'temp-mail.org',
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { date, startTime, name, email, phone, company, message, timezone } = body

    // Validation
    if (!date || !startTime || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^\S[^\s@]*@\S+\.\S+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Check for blocked email domains
    const emailDomain = email.split('@')[1]?.toLowerCase()
    if (BLOCKED_DOMAINS.some((d) => emailDomain?.includes(d))) {
      // Silent success to not reveal spam detection
      return NextResponse.json({ success: true, booking: { id: 'blocked' } })
    }

    // Basic spam detection - check for gibberish
    if (isGibberish(name) || (company && isGibberish(company))) {
      return NextResponse.json({ success: true, booking: { id: 'blocked' } })
    }

    const payload = await getPayload({ config: configPromise })
    const settings = await payload.findGlobal({ slug: 'booking-settings' })

    // Calculate end time
    const duration = settings.availability?.slotDuration || 30
    const [hours, minutes] = startTime.split(':').map(Number)
    const endMinutes = hours * 60 + minutes + duration
    const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, '0')}:${String(endMinutes % 60).padStart(2, '0')}`

    // Verify slot is still available (prevent race conditions)
    const conflicting = await payload.find({
      collection: 'bookings',
      where: {
        and: [
          { date: { equals: date } },
          { startTime: { equals: startTime } },
          { status: { in: ['pending', 'confirmed'] } },
        ],
      },
    })

    if (conflicting.docs.length > 0) {
      return NextResponse.json(
        { error: 'This time slot is no longer available. Please select another time.' },
        { status: 409 }
      )
    }

    // Use custom meeting link if configured, otherwise use Google Meet
    let googleEventId: string | null = null
    let meetingUrl: string | null = settings.meetingLink || null
    const useGoogleMeet = !settings.meetingLink // Only create Google Meet if no custom link

    if (settings.googleCalendar?.connected) {
      const hostTimezone = settings.availability?.timezone || 'Australia/Sydney'
      const startDateTime = new Date(`${date}T${startTime}:00`)
      const endDateTime = new Date(`${date}T${endTime}:00`)

      const calendarResult = await createCalendarEvent({
        summary: `${settings.eventName || 'Demo'} with ${name}`,
        description: `Company: ${company || 'N/A'}\nPhone: ${phone || 'N/A'}\nMessage: ${message || 'N/A'}\nMeeting: ${meetingUrl || 'Google Meet (see calendar invite)'}`,
        startTime: startDateTime,
        endTime: endDateTime,
        attendeeEmail: email,
        attendeeName: name,
        hostEmail: settings.hostEmail || '',
        timezone: hostTimezone,
        createGoogleMeet: useGoogleMeet,
      })

      if (calendarResult) {
        googleEventId = calendarResult.eventId
        // Only use Google Meet URL if no custom meeting link
        if (useGoogleMeet && calendarResult.meetingUrl) {
          meetingUrl = calendarResult.meetingUrl
        }
      }
    }

    // Create booking in Payload
    const booking = await payload.create({
      collection: 'bookings',
      data: {
        date,
        startTime,
        endTime,
        duration,
        timezone: timezone || settings.availability?.timezone || 'Australia/Sydney',
        guestName: name,
        guestEmail: email,
        guestPhone: phone || '',
        guestCompany: company || '',
        message: message || '',
        status: 'confirmed',
        googleEventId: googleEventId || '',
        meetingUrl: meetingUrl || '',
        source: 'website',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
      },
    })

    // Send confirmation emails
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      const resend = new Resend(resendApiKey)
      const hostTimezone = settings.availability?.timezone || 'Australia/Sydney'
      const formattedDate = formatDate(date, hostTimezone)
      const formattedTime = formatTime(startTime, hostTimezone)

      // Send guest confirmation
      if (settings.notifications?.sendGuestConfirmation !== false) {
        try {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'CloudRent <onboarding@resend.dev>',
            to: email,
            subject: `Booking Confirmed: ${settings.eventName || 'Demo'} on ${formattedDate}`,
            html: getGuestConfirmationEmail({
              guestName: name,
              eventName: settings.eventName || 'Product Demo',
              hostName: settings.hostName || 'CloudRent Team',
              date: formattedDate,
              time: formattedTime,
              duration,
              meetingUrl: meetingUrl || undefined,
              timezone: hostTimezone,
            }),
          })
        } catch (emailError) {
          console.error('Failed to send guest confirmation:', emailError)
        }
      }

      // Send host notification
      if (settings.notifications?.sendHostNotification !== false && settings.hostEmail) {
        try {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'CloudRent <onboarding@resend.dev>',
            to: settings.hostEmail,
            replyTo: email,
            subject: `New Booking: ${settings.eventName || 'Demo'} with ${name}`,
            html: getHostNotificationEmail({
              guestName: name,
              guestEmail: email,
              guestPhone: phone,
              guestCompany: company,
              message,
              eventName: settings.eventName || 'Product Demo',
              date: formattedDate,
              time: formattedTime,
              duration,
              meetingUrl: meetingUrl || undefined,
            }),
          })
        } catch (emailError) {
          console.error('Failed to send host notification:', emailError)
        }
      }
    }

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        date,
        startTime,
        endTime,
        meetingUrl,
      },
      calendarLinks: {
        google: generateGoogleCalendarLink({
          title: `${settings.eventName || 'Demo'} with ${settings.hostName || 'CloudRent'}`,
          date,
          startTime,
          endTime,
          description: message || '',
        }),
      },
    })
  } catch (error) {
    console.error('Failed to create booking:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

// Spam detection helper
function isGibberish(text: string): boolean {
  if (!text || text.length < 2) return false

  // Check for excessive consonant runs (5+ consonants in a row)
  const consonantRun = /[bcdfghjklmnpqrstvwxyz]{5,}/i
  if (consonantRun.test(text)) return true

  // Check for random case changes (aAbBcC pattern)
  const mixedCase = text.split('').filter((c, i, arr) => {
    if (i === 0) return false
    const prevIsUpper = arr[i - 1] === arr[i - 1].toUpperCase()
    const currIsUpper = c === c.toUpperCase()
    return /[a-zA-Z]/.test(c) && /[a-zA-Z]/.test(arr[i - 1]) && prevIsUpper !== currIsUpper
  }).length
  if (mixedCase > text.length * 0.5 && text.length > 4) return true

  return false
}

// Generate Google Calendar add link
function generateGoogleCalendarLink(params: {
  title: string
  date: string
  startTime: string
  endTime: string
  description: string
}): string {
  const start = `${params.date.replace(/-/g, '')}T${params.startTime.replace(/:/g, '')}00`
  const end = `${params.date.replace(/-/g, '')}T${params.endTime.replace(/:/g, '')}00`

  const url = new URL('https://calendar.google.com/calendar/render')
  url.searchParams.set('action', 'TEMPLATE')
  url.searchParams.set('text', params.title)
  url.searchParams.set('dates', `${start}/${end}`)
  if (params.description) {
    url.searchParams.set('details', params.description)
  }

  return url.toString()
}

// Guest confirmation email template
function getGuestConfirmationEmail(params: {
  guestName: string
  eventName: string
  hostName: string
  date: string
  time: string
  duration: number
  meetingUrl?: string
  timezone: string
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f4f4f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); color: white; padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
      <h1 style="margin: 0; font-size: 28px;">Booking Confirmed!</h1>
    </div>
    <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px;">
      <p style="font-size: 16px; color: #374151;">Hi ${params.guestName},</p>
      <p style="font-size: 16px; color: #374151;">Your <strong>${params.eventName}</strong> with ${params.hostName} has been confirmed.</p>

      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0;">
        <p style="margin: 8px 0; color: #374151;"><strong>Date:</strong> ${params.date}</p>
        <p style="margin: 8px 0; color: #374151;"><strong>Time:</strong> ${params.time} (${params.timezone})</p>
        <p style="margin: 8px 0; color: #374151;"><strong>Duration:</strong> ${params.duration} minutes</p>
        ${params.meetingUrl ? `<p style="margin: 8px 0; color: #374151;"><strong>Meeting Link:</strong> <a href="${params.meetingUrl}" style="color: #7c3aed;">${params.meetingUrl}</a></p>` : ''}
      </div>

      ${params.meetingUrl ? `<p style="text-align: center;"><a href="${params.meetingUrl}" style="display: inline-block; background: #7c3aed; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">Join Meeting</a></p>` : ''}

      <p style="font-size: 14px; color: #6b7280; margin-top: 24px;">A calendar invitation has also been sent to your email.</p>

      <p style="font-size: 14px; color: #6b7280;">Need to reschedule or cancel? Simply reply to this email and we'll help you out.</p>

      <p style="font-size: 16px; color: #374151; margin-top: 24px;">Looking forward to speaking with you!</p>
      <p style="font-size: 16px; color: #374151;">The CloudRent Team</p>
    </div>
  </div>
</body>
</html>
`
}

// Host notification email template
function getHostNotificationEmail(params: {
  guestName: string
  guestEmail: string
  guestPhone?: string
  guestCompany?: string
  message?: string
  eventName: string
  date: string
  time: string
  duration: number
  meetingUrl?: string
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f4f4f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 32px; border-radius: 12px 12px 0 0;">
      <h1 style="margin: 0; font-size: 24px;">New Booking: ${params.eventName}</h1>
    </div>
    <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px;">
      <p style="font-size: 16px; color: #374151;">You have a new booking!</p>

      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0;">
        <h3 style="margin: 0 0 12px 0; color: #374151;">Meeting Details</h3>
        <p style="margin: 8px 0; color: #374151;"><strong>Date:</strong> ${params.date}</p>
        <p style="margin: 8px 0; color: #374151;"><strong>Time:</strong> ${params.time}</p>
        <p style="margin: 8px 0; color: #374151;"><strong>Duration:</strong> ${params.duration} minutes</p>
        ${params.meetingUrl ? `<p style="margin: 8px 0; color: #374151;"><strong>Meeting:</strong> <a href="${params.meetingUrl}" style="color: #059669;">Join Google Meet</a></p>` : ''}
      </div>

      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0;">
        <h3 style="margin: 0 0 12px 0; color: #374151;">Guest Details</h3>
        <p style="margin: 8px 0; color: #374151;"><strong>Name:</strong> ${params.guestName}</p>
        <p style="margin: 8px 0; color: #374151;"><strong>Email:</strong> <a href="mailto:${params.guestEmail}" style="color: #059669;">${params.guestEmail}</a></p>
        ${params.guestPhone ? `<p style="margin: 8px 0; color: #374151;"><strong>Phone:</strong> ${params.guestPhone}</p>` : ''}
        ${params.guestCompany ? `<p style="margin: 8px 0; color: #374151;"><strong>Company:</strong> ${params.guestCompany}</p>` : ''}
        ${params.message ? `<p style="margin: 8px 0; color: #374151;"><strong>Message:</strong> ${params.message}</p>` : ''}
      </div>

      <p style="font-size: 14px; color: #6b7280;">This meeting has been added to your Google Calendar.</p>
    </div>
  </div>
</body>
</html>
`
}
