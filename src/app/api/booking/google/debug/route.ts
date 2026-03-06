import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const nodeEnv = process.env.NODE_ENV
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

  // Calculate what redirect URI would be used
  const baseUrl = nodeEnv === 'production'
    ? 'https://www.cloudrent.me'
    : (serverUrl || 'http://localhost:3000')
  const redirectUri = `${baseUrl}/api/booking/google/callback`

  return NextResponse.json({
    nodeEnv,
    serverUrl: serverUrl || '(not set)',
    calculatedBaseUrl: baseUrl,
    redirectUri,
    clientIdConfigured: !!clientId,
    clientIdPrefix: clientId ? clientId.substring(0, 20) + '...' : null,
    clientSecretConfigured: !!clientSecret,
  })
}
