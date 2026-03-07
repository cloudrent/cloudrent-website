import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { exchangeCodeForTokens, getOAuth2Client } from '@/lib/google-calendar'
import { google } from 'googleapis'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const error = request.nextUrl.searchParams.get('error')

  // Use production URL for redirect
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://www.cloudrent.me'
    : (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000')
  const adminUrl = `${baseUrl}/admin/globals/booking-settings`

  if (error) {
    console.error('Google OAuth error:', error)
    return NextResponse.redirect(`${adminUrl}?error=oauth_denied`)
  }

  if (!code) {
    return NextResponse.redirect(`${adminUrl}?error=no_code`)
  }

  try {
    // Exchange code for tokens
    let tokens
    try {
      tokens = await exchangeCodeForTokens(code)
    } catch (tokenErr) {
      const msg = tokenErr instanceof Error ? tokenErr.message : 'Unknown'
      return NextResponse.redirect(`${adminUrl}?error=token_exchange_failed&details=${encodeURIComponent(msg)}`)
    }

    if (!tokens.refresh_token) {
      console.error('No refresh token received. User may need to revoke access and try again.')
      return NextResponse.redirect(`${adminUrl}?error=no_refresh_token`)
    }

    // Try to get user email, but don't fail if it doesn't work
    let connectedEmail = ''
    try {
      const oauth2Client = getOAuth2Client()
      oauth2Client.setCredentials(tokens)
      const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client })
      const userInfo = await oauth2.userinfo.get()
      connectedEmail = userInfo.data.email || ''
    } catch (emailErr) {
      console.log('Could not fetch user email, continuing without it:', emailErr)
      // Continue without the email - not critical
    }

    // Update booking settings to mark as connected
    const payload = await getPayload({ config: configPromise })
    await payload.updateGlobal({
      slug: 'booking-settings',
      data: {
        googleCalendar: {
          connected: true,
          connectedEmail,
          calendarId: 'primary',
        },
      },
    })

    // Log the refresh token - this needs to be added to environment variables
    console.log('='.repeat(60))
    console.log('GOOGLE CALENDAR CONNECTED SUCCESSFULLY!')
    console.log('='.repeat(60))
    console.log('Connected account:', connectedEmail || '(email not available)')
    console.log('')
    console.log('IMPORTANT: Add this refresh token to your environment variables:')
    console.log('')
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`)
    console.log('')
    console.log('Add this to:')
    console.log('1. Your local .env file')
    console.log('2. Vercel environment variables (Settings > Environment Variables)')
    console.log('='.repeat(60))

    return NextResponse.redirect(`${adminUrl}?success=connected&token=${encodeURIComponent(tokens.refresh_token || '')}`)
  } catch (err) {
    console.error('Google OAuth callback error:', err)
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.redirect(`${adminUrl}?error=oauth_failed&details=${encodeURIComponent(errorMessage)}`)
  }
}
