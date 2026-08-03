import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const path = searchParams.get('path') || '/'

  // Enable draft mode for preview
  const draft = await draftMode()
  draft.enable()

  redirect(path)
}
