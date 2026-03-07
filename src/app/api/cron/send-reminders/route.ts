import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Resend } from 'resend'
import { formatDate, formatTime } from '@/lib/booking/calculate-slots'

export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Allow up to 60 seconds for processing

// Verify cron secret to prevent unauthorized access
function verifyCronSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  // If no secret configured, allow in development
  if (!cronSecret) {
    return process.env.NODE_ENV !== 'production'
  }

  return authHeader === `Bearer ${cronSecret}`
}

export async function GET(request: NextRequest) {
  // Verify authorization
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    return NextResponse.json({ error: 'Resend not configured' }, { status: 503 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const resend = new Resend(resendApiKey)
    const settings = await payload.findGlobal({ slug: 'booking-settings' })
    const timezone = settings.availability?.timezone || 'Australia/Sydney'

    const now = new Date()
    const results = {
      checked: 0,
      reminder24hSent: 0,
      reminder1hSent: 0,
      errors: [] as string[],
    }

    // Find confirmed bookings that need reminders
    const bookings = await payload.find({
      collection: 'bookings',
      where: {
        and: [
          { status: { equals: 'confirmed' } },
          {
            or: [
              { reminder24hSent: { equals: false } },
              { reminder1hSent: { equals: false } },
            ],
          },
        ],
      },
      limit: 100,
    })

    results.checked = bookings.docs.length

    for (const booking of bookings.docs) {
      const bookingDateTime = new Date(`${booking.date}T${booking.startTime}:00`)
      const hoursUntilBooking = (bookingDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)

      // Skip past bookings
      if (hoursUntilBooking < 0) continue

      const formattedDate = formatDate(booking.date as string, timezone)
      const formattedTime = formatTime(booking.startTime as string, timezone)

      // 24-hour reminder (send between 23-25 hours before)
      if (!booking.reminder24hSent && hoursUntilBooking <= 25 && hoursUntilBooking >= 23) {
        try {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'CloudRent <onboarding@resend.dev>',
            to: booking.guestEmail as string,
            replyTo: settings.hostEmail || undefined,
            subject: `Reminder: ${settings.eventName || 'Demo'} Tomorrow`,
            html: getReminderEmail({
              guestName: booking.guestName as string,
              eventName: settings.eventName || 'Product Demo',
              hostName: settings.hostName || 'CloudRent Team',
              date: formattedDate,
              time: formattedTime,
              duration: booking.duration as number,
              meetingUrl: booking.meetingUrl as string | undefined,
              timezone,
              reminderType: '24h',
            }),
          })

          await payload.update({
            collection: 'bookings',
            id: booking.id,
            data: { reminder24hSent: true },
          })

          results.reminder24hSent++
        } catch (err) {
          results.errors.push(`24h reminder failed for ${booking.id}: ${err}`)
        }
      }

      // 1-hour reminder (send between 0.5-1.5 hours before)
      if (!booking.reminder1hSent && hoursUntilBooking <= 1.5 && hoursUntilBooking >= 0.5) {
        try {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'CloudRent <onboarding@resend.dev>',
            to: booking.guestEmail as string,
            replyTo: settings.hostEmail || undefined,
            subject: `Starting Soon: ${settings.eventName || 'Demo'} in 1 Hour`,
            html: getReminderEmail({
              guestName: booking.guestName as string,
              eventName: settings.eventName || 'Product Demo',
              hostName: settings.hostName || 'CloudRent Team',
              date: formattedDate,
              time: formattedTime,
              duration: booking.duration as number,
              meetingUrl: booking.meetingUrl as string | undefined,
              timezone,
              reminderType: '1h',
            }),
          })

          await payload.update({
            collection: 'bookings',
            id: booking.id,
            data: { reminder1hSent: true },
          })

          results.reminder1hSent++
        } catch (err) {
          results.errors.push(`1h reminder failed for ${booking.id}: ${err}`)
        }
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: now.toISOString(),
      results,
    })
  } catch (error) {
    console.error('Reminder cron error:', error)
    return NextResponse.json({ error: 'Failed to process reminders' }, { status: 500 })
  }
}

// Reminder email template
function getReminderEmail(params: {
  guestName: string
  eventName: string
  hostName: string
  date: string
  time: string
  duration: number
  meetingUrl?: string
  timezone: string
  reminderType: '24h' | '1h'
}): string {
  const isOneHour = params.reminderType === '1h'
  const headerText = isOneHour ? 'Your Meeting Starts Soon!' : 'Meeting Reminder'
  const introText = isOneHour
    ? `Your <strong>${params.eventName}</strong> with ${params.hostName} starts in about 1 hour.`
    : `This is a friendly reminder about your upcoming <strong>${params.eventName}</strong> with ${params.hostName} tomorrow.`

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f4f4f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, ${isOneHour ? '#059669' : '#881ba9'} 0%, ${isOneHour ? '#10b981' : '#a83cc9'} 100%); color: white; padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
      <h1 style="margin: 0; font-size: 28px;">${headerText}</h1>
    </div>
    <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px;">
      <p style="font-size: 16px; color: #374151;">Hi ${params.guestName},</p>
      <p style="font-size: 16px; color: #374151;">${introText}</p>

      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0;">
        <p style="margin: 8px 0; color: #374151;"><strong>Date:</strong> ${params.date}</p>
        <p style="margin: 8px 0; color: #374151;"><strong>Time:</strong> ${params.time} (${params.timezone})</p>
        <p style="margin: 8px 0; color: #374151;"><strong>Duration:</strong> ${params.duration} minutes</p>
        ${params.meetingUrl ? `<p style="margin: 8px 0; color: #374151;"><strong>Meeting Link:</strong> <a href="${params.meetingUrl}" style="color: #881ba9;">${params.meetingUrl}</a></p>` : ''}
      </div>

      ${params.meetingUrl ? `<p style="text-align: center;"><a href="${params.meetingUrl}" style="display: inline-block; background: ${isOneHour ? '#059669' : '#881ba9'}; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">Join Meeting</a></p>` : ''}

      <p style="font-size: 14px; color: #6b7280; margin-top: 24px;">Need to reschedule or cancel? Simply reply to this email and we'll help you out.</p>

      <p style="font-size: 16px; color: #374151; margin-top: 24px;">Looking forward to speaking with you!</p>
      <p style="font-size: 16px; color: #374151;">The CloudRent Team</p>
    </div>
  </div>
</body>
</html>
`
}
