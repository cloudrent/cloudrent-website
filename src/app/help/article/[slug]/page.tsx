import { getDocBySlug, getPublishedDocs, incrementViewCount } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ArrowLeft, ThumbsUp, ThumbsDown, Play, Eye } from 'lucide-react'
import type { Metadata } from 'next'
import { ArticleContent } from './ArticleContent'
import { FeedbackButtons } from './FeedbackButtons'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await getDocBySlug(slug)

  if (!doc) {
    return { title: 'Article Not Found' }
  }

  return {
    title: doc.title,
    description: doc.excerpt || `Learn about ${doc.title} in CloudRent Pro Help Center`,
  }
}

export async function generateStaticParams() {
  const docs = await getPublishedDocs()
  return docs.map((doc) => ({
    slug: doc.slug,
  }))
}

// Sanitize HTTP links to HTTPS for internal domains (server-side for SEO)
function sanitizeInternalLinks(content: string): string {
  return content
    .replace(/http:\/\/cloudrent\.me/g, 'https://www.cloudrent.me')
    .replace(/http:\/\/www\.cloudrent\.me/g, 'https://www.cloudrent.me')
    .replace(/http:\/\/app\.cloudrent\.me/g, 'https://app.cloudrent.me')
    .replace(/http:\/\/docs\.cloudrent\.me/g, 'https://docs.cloudrent.me')
}

// Helper to get YouTube embed URL
function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

// Helper to get video embed URL for various platforms
function getVideoEmbedUrl(url: string): string | null {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return getYouTubeEmbedUrl(url)
  }
  if (url.includes('loom.com')) {
    return url.replace('/share/', '/embed/')
  }
  if (url.includes('vimeo.com')) {
    const match = url.match(/vimeo\.com\/(\d+)/)
    return match ? `https://player.vimeo.com/video/${match[1]}` : null
  }
  if (url.includes('arcade.software')) {
    return url.replace('/share/', '/embed/')
  }
  return null
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const doc = await getDocBySlug(slug)

  if (!doc) {
    notFound()
  }

  // Increment view count (fire and forget)
  incrementViewCount(doc.id)

  const videoEmbedUrl = doc.video_url ? getVideoEmbedUrl(doc.video_url) : null

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/help" className="hover:text-white">
          Help Center
        </Link>
        <ChevronRight className="h-4 w-4" />
        {doc.category && (
          <>
            <Link href={`/help/category/${doc.category.slug}`} className="hover:text-white">
              {doc.category.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
          </>
        )}
        <span className="text-white">{doc.title}</span>
      </nav>

      {/* Back link */}
      <Link
        href={doc.category ? `/help/category/${doc.category.slug}` : '/help'}
        className="mb-6 inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300"
      >
        <ArrowLeft className="h-4 w-4" />
        {doc.category ? `Back to ${doc.category.name}` : 'Back to Help Center'}
      </Link>

      {/* Article */}
      <article className="rounded-2xl border border-purple-500/20 bg-purple-900/10 p-8">
        {/* Header */}
        <header className="mb-8">
          {doc.category && (
            <span
              className="mb-4 inline-block rounded-full px-3 py-1 text-sm font-medium"
              style={{
                backgroundColor: `${doc.category.color}20`,
                color: doc.category.color,
              }}
            >
              {doc.category.name}
            </span>
          )}
          <h1 className="mb-4 text-3xl font-bold text-white">{doc.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {doc.view_count} views
            </span>
            {doc.updated_at && (
              <span>
                Updated{' '}
                {new Date(doc.updated_at).toLocaleDateString('en-AU', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            )}
          </div>
        </header>

        {/* Video (if present) */}
        {videoEmbedUrl && (
          <div className="mb-8 overflow-hidden rounded-xl border border-purple-500/30">
            <div className="aspect-video bg-gray-900">
              <iframe
                src={videoEmbedUrl}
                title={doc.title}
                className="h-full w-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <ArticleContent content={sanitizeInternalLinks(doc.content)} />

        {/* Tags */}
        {doc.tags && doc.tags.length > 0 && (
          <div className="mt-8 border-t border-purple-500/20 pt-6">
            <h4 className="mb-3 text-sm font-medium text-gray-400">Related Topics</h4>
            <div className="flex flex-wrap gap-2">
              {doc.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Feedback */}
        <div className="mt-8 border-t border-purple-500/20 pt-6">
          <h4 className="mb-4 text-center text-gray-400">Was this article helpful?</h4>
          <FeedbackButtons docId={doc.id} />
        </div>
      </article>

      {/* Contact CTA */}
      <div className="mt-8 rounded-xl border border-purple-500/20 bg-purple-900/10 p-6 text-center">
        <p className="mb-4 text-gray-400">Still need help?</p>
        <Link
          href="https://www.cloudrent.me/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500"
        >
          Contact Support
        </Link>
      </div>
    </div>
  )
}
