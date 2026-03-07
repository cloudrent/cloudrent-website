'use client'

import { useState } from 'react'
import { Play, Clock, X } from 'lucide-react'

const categoryLabels: Record<string, string> = {
  demo: 'Product Demo',
  tutorial: 'Tutorial',
  feature: 'Feature Spotlight',
  customer: 'Customer Story',
  webinar: 'Webinar',
}

const categoryColors: Record<string, string> = {
  demo: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  tutorial: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  feature: 'bg-green-500/20 text-green-300 border-green-500/30',
  customer: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  webinar: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
}

interface VideoCardProps {
  video: {
    id: number | string
    title: string
    description?: string | null
    youtubeId: string
    category: string
    duration?: string | null
  }
}

export function VideoCard({ video }: VideoCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className="group rounded-xl border border-purple-500/20 bg-purple-900/20 overflow-hidden transition-all hover:border-purple-500/40 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {/* Thumbnail with play overlay */}
        <div className="relative aspect-video">
          <img
            src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
            alt={video.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full shadow-lg" style={{ backgroundColor: '#881ba9', boxShadow: '0 10px 15px -3px rgba(136, 27, 169, 0.5)' }}>
              <Play className="h-8 w-8 text-white ml-1" fill="white" />
            </div>
          </div>
          {video.duration && (
            <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
              {video.duration}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium mb-2 ${categoryColors[video.category]}`}>
            {categoryLabels[video.category]}
          </span>
          <h3 className="font-semibold text-white mb-1 line-clamp-2">{video.title}</h3>
          {video.description && (
            <p className="text-sm text-gray-400 line-clamp-2">{video.description}</p>
          )}
        </div>
      </div>

      {/* Modal */}
      <VideoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        video={video}
      />
    </>
  )
}

export function FeaturedVideoCard({ video }: VideoCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className="group rounded-2xl border border-purple-500/20 bg-purple-900/20 overflow-hidden transition-all hover:border-purple-500/40 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {/* Thumbnail with play overlay */}
        <div className="relative aspect-video">
          <img
            src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
            alt={video.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-20 w-20 items-center justify-center rounded-full shadow-lg" style={{ backgroundColor: '#881ba9', boxShadow: '0 10px 15px -3px rgba(136, 27, 169, 0.5)' }}>
              <Play className="h-10 w-10 text-white ml-1" fill="white" />
            </div>
          </div>
          {video.duration && (
            <span className="absolute bottom-3 right-3 rounded bg-black/80 px-3 py-1.5 text-sm font-medium text-white">
              {video.duration}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${categoryColors[video.category]}`}>
              {categoryLabels[video.category]}
            </span>
            {video.duration && (
              <span className="flex items-center gap-1 text-sm text-gray-400">
                <Clock className="h-3.5 w-3.5" />
                {video.duration}
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{video.title}</h2>
          {video.description && (
            <p className="text-gray-300">{video.description}</p>
          )}
        </div>
      </div>

      {/* Modal */}
      <VideoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        video={video}
      />
    </>
  )
}

// Video Modal Component
function VideoModal({
  isOpen,
  onClose,
  video,
}: {
  isOpen: boolean
  onClose: () => void
  video: VideoCardProps['video']
}) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <span className="text-sm">Close</span>
          <X className="h-6 w-6" />
        </button>

        {/* Video */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>

        {/* Title below video */}
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold text-white">{video.title}</h3>
        </div>
      </div>
    </div>
  )
}
