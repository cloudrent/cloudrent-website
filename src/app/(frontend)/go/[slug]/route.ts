import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params

  const payload = await getPayload({ config })

  // Find the link by slug
  const { docs } = await payload.find({
    collection: 'quick-links',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  const link = docs[0]

  if (!link) {
    // Redirect to links page if not found
    return NextResponse.redirect(new URL('/links', request.url))
  }

  // Check if link is enabled and within visibility window
  const now = new Date()
  const visibleFrom = link.visibleFrom ? new Date(link.visibleFrom) : null
  const visibleUntil = link.visibleUntil ? new Date(link.visibleUntil) : null

  const isVisible =
    link.enabled &&
    (!visibleFrom || now >= visibleFrom) &&
    (!visibleUntil || now < visibleUntil)

  if (!isVisible) {
    return NextResponse.redirect(new URL('/links', request.url))
  }

  // Fire and forget: increment click count without blocking
  payload
    .update({
      collection: 'quick-links',
      id: link.id,
      data: {
        clicks: (link.clicks || 0) + 1,
      },
    })
    .catch(() => {
      // Silently ignore errors - click tracking should never block the redirect
    })

  // Immediate 302 redirect to the destination
  return NextResponse.redirect(link.url, 302)
}
