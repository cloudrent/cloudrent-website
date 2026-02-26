import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  // Check if this is the help subdomain
  if (hostname.startsWith('help.')) {
    // Rewrite to /help routes
    const url = request.nextUrl.clone()

    // If already on a /help path, let it through
    if (pathname.startsWith('/help')) {
      return NextResponse.next()
    }

    // Rewrite root and other paths to /help prefix
    url.pathname = `/help${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
}
