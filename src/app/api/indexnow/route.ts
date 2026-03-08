import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const INDEXNOW_KEY = 'a4614d998743d0cc080805619523acd2'
const SITE_URL = 'https://www.cloudrent.me'

// All indexable pages
const INDEXABLE_URLS = [
  '/',
  '/features/',
  '/pricing/',
  '/demo/',
  '/contact/',
  '/about/',
  '/mobile-app/',
  '/web-portal/',
  '/faq/',
  '/posts/',
  '/videos/',
  '/launch/',
  '/privacy/',
  '/terms/',
]

export async function POST(request: NextRequest) {
  // Verify secret to prevent unauthorized submissions
  const authHeader = request.headers.get('authorization')
  const secret = process.env.INDEXNOW_SECRET

  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get URLs to submit (from request body or use defaults)
    let urls: string[]
    try {
      const body = await request.json()
      urls = body.urls || INDEXABLE_URLS
    } catch {
      urls = INDEXABLE_URLS
    }

    // Build full URLs
    const fullUrls = urls.map((url: string) =>
      url.startsWith('http') ? url : `${SITE_URL}${url}`
    )

    // Submit to IndexNow (Bing endpoint - also works for Yandex, etc.)
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: 'www.cloudrent.me',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: fullUrls,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('IndexNow submission failed:', text)
      return NextResponse.json(
        { error: 'IndexNow submission failed', details: text },
        { status: response.status }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Submitted ${fullUrls.length} URLs to IndexNow`,
      urls: fullUrls,
    })
  } catch (error) {
    console.error('IndexNow error:', error)
    return NextResponse.json(
      { error: 'Failed to submit to IndexNow' },
      { status: 500 }
    )
  }
}

// GET endpoint to check status
export async function GET() {
  return NextResponse.json({
    key: INDEXNOW_KEY,
    keyUrl: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    indexableUrls: INDEXABLE_URLS.length,
    usage: 'POST to this endpoint to submit URLs to IndexNow',
  })
}
