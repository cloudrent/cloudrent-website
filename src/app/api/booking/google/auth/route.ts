import { NextResponse } from 'next/server'
import { getAuthUrl } from '@/lib/google-calendar'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Check if Google OAuth is configured
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return NextResponse.json(
        { error: 'Google OAuth not configured. Please add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to environment variables.' },
        { status: 503 }
      )
    }

    const authUrl = getAuthUrl()
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('Failed to generate Google auth URL:', error)
    return NextResponse.json({ error: 'Failed to initiate Google authentication' }, { status: 500 })
  }
}
