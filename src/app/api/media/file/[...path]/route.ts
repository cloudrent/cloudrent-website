import { NextRequest, NextResponse } from 'next/server'

const BLOB_BASE_URL = 'https://ipjpelt6tqi5wdno.public.blob.vercel-storage.com/media'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const filename = path.join('/')

  // Redirect to Vercel Blob storage
  const blobUrl = `${BLOB_BASE_URL}/${filename}`

  return NextResponse.redirect(blobUrl, 301)
}
