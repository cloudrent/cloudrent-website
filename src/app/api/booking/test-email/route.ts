import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Add ?email=your@email.com to test' }, { status: 400 })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    return NextResponse.json({ error: 'Resend not configured' }, { status: 503 })
  }

  const resend = new Resend(resendApiKey)

  try {
    // Send guest confirmation sample
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'CloudRent <onboarding@resend.dev>',
      to: email,
      subject: 'Booking Confirmed: Product Demo on Friday, March 14, 2025',
      html: getGuestConfirmationEmail({
        guestName: 'John',
        eventName: 'Product Demo',
        hostName: 'CloudRent Team',
        date: 'Friday, March 14, 2025',
        time: '10:00 AM',
        duration: 30,
        meetingUrl: 'https://meet.google.com/abc-defg-hij',
        timezone: 'Australia/Sydney',
      }),
    })

    // Send reminder sample
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'CloudRent <onboarding@resend.dev>',
      to: email,
      subject: 'Starting Soon: Product Demo in 1 Hour',
      html: getReminderEmail({
        guestName: 'John',
        eventName: 'Product Demo',
        hostName: 'CloudRent Team',
        date: 'Friday, March 14, 2025',
        time: '10:00 AM',
        duration: 30,
        meetingUrl: 'https://meet.google.com/abc-defg-hij',
        timezone: 'Australia/Sydney',
        reminderType: '1h',
      }),
    })

    return NextResponse.json({
      success: true,
      message: `Sent 2 test emails to ${email} (confirmation + reminder)`
    })
  } catch (error) {
    console.error('Failed to send test email:', error)
    return NextResponse.json({
      error: 'Failed to send',
      details: error instanceof Error ? error.message : 'Unknown'
    }, { status: 500 })
  }
}

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
    <div style="background: linear-gradient(135deg, ${isOneHour ? '#059669' : '#7c3aed'} 0%, ${isOneHour ? '#10b981' : '#a855f7'} 100%); color: white; padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
      <h1 style="margin: 0; font-size: 28px;">${headerText}</h1>
    </div>
    <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px;">
      <p style="font-size: 16px; color: #374151;">Hi ${params.guestName},</p>
      <p style="font-size: 16px; color: #374151;">${introText}</p>

      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0;">
        <p style="margin: 8px 0; color: #374151;"><strong>Date:</strong> ${params.date}</p>
        <p style="margin: 8px 0; color: #374151;"><strong>Time:</strong> ${params.time} (${params.timezone})</p>
        <p style="margin: 8px 0; color: #374151;"><strong>Duration:</strong> ${params.duration} minutes</p>
        ${params.meetingUrl ? `<p style="margin: 8px 0; color: #374151;"><strong>Meeting Link:</strong> <a href="${params.meetingUrl}" style="color: #7c3aed;">${params.meetingUrl}</a></p>` : ''}
      </div>

      ${params.meetingUrl ? `<p style="text-align: center;"><a href="${params.meetingUrl}" style="display: inline-block; background: ${isOneHour ? '#059669' : '#7c3aed'}; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">Join Meeting</a></p>` : ''}

      <p style="font-size: 14px; color: #6b7280; margin-top: 24px;">Need to reschedule or cancel? Simply reply to this email and we'll help you out.</p>

      <p style="font-size: 16px; color: #374151; margin-top: 24px;">Looking forward to speaking with you!</p>
      <p style="font-size: 16px; color: #374151;">The CloudRent Team</p>
    </div>
  </div>
</body>
</html>
`
}
