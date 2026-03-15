import type { Metadata } from 'next'
import { Play, Filter } from 'lucide-react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { VideoCard, FeaturedVideoCard } from './VideoCard'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Videos | CloudRent Pro - Tutorials, Demos & More',
  description:
    'Watch product demos, tutorials, and customer stories. Learn how CloudRent Pro can transform your equipment hire business.',
  alternates: {
    canonical: 'https://www.cloudrent.me/videos/',
  },
  openGraph: mergeOpenGraph({
    title: 'Videos | CloudRent Pro - Tutorials, Demos & More',
    description:
      'Watch product demos, tutorials, and customer stories. Learn how CloudRent Pro can transform your equipment hire business.',
    url: '/videos/',
  }),
}

async function getVideos() {
  try {
    const payload = await getPayload({ config: configPromise })

    const videos = await payload.find({
      collection: 'videos',
      limit: 100,
      sort: 'order',
    })

    return videos.docs
  } catch (error) {
    console.error('Error fetching videos:', error)
    return []
  }
}

export default async function VideosPage() {
  const videos = await getVideos()

  const featuredVideo = videos.find((v) => v.featured)
  const otherVideos = videos.filter((v) => !v.featured)

  // Group videos by category
  const categories = [...new Set(videos.map((v) => v.category))]

  return (
    <div className="min-h-screen text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
      </div>

      <div className="relative">
        {/* Hero */}
        <section className="px-4 pb-12 pt-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
              <Play className="h-4 w-4" />
              Video Library
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              See CloudRent Pro
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                in action
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300">
              Watch demos, tutorials, and customer stories to see how CloudRent Pro can transform your equipment hire business.
            </p>
          </div>
        </section>

        {/* Featured Video */}
        {featuredVideo && (
          <section className="mx-auto max-w-5xl px-4 pb-16">
            <FeaturedVideoCard video={featuredVideo} />
          </section>
        )}

        {/* Video Grid */}
        {otherVideos.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 pb-20">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">All Videos</h2>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Filter className="h-4 w-4" />
                {videos.length} videos
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {videos.length === 0 && (
          <section className="mx-auto max-w-4xl px-4 pb-20">
            <div className="rounded-2xl border border-purple-500/20 bg-purple-900/20 p-12 text-center">
              <Play className="mx-auto mb-4 h-12 w-12 text-purple-400" />
              <h2 className="mb-2 text-xl font-bold">Videos coming soon</h2>
              <p className="text-gray-400">
                We&apos;re working on creating helpful video content. Check back soon!
              </p>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-900/60 to-fuchsia-900/60 p-8 text-center md:p-12">
            <h2 className="mb-4 text-3xl font-bold text-white">Ready to get started?</h2>
            <p className="mx-auto mb-8 max-w-xl text-gray-300">
              Start your $1 trial today and experience the full platform.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="https://app.cloudrent.me/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:from-purple-400 hover:to-fuchsia-400"
              >
                Start $1 Trial
              </a>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-400/50 px-8 py-4 font-semibold text-purple-100 transition-all hover:bg-purple-500/20"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

