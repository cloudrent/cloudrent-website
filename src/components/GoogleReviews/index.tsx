'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react'
import { reviews } from './reviews'

// Google G logo SVG component
function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  )
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-base tracking-wider">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? 'text-yellow-400' : 'text-[#3a3a45]'}>
          ★
        </span>
      ))}
    </span>
  )
}

export function GoogleReviews() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const trackRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const isPausedRef = useRef(false)

  // Calculate cards per view based on viewport
  const updateCardsPerView = useCallback(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth <= 640) {
      setCardsPerView(1)
    } else if (window.innerWidth <= 960) {
      setCardsPerView(2)
    } else {
      setCardsPerView(3)
    }
  }, [])

  const totalSlides = Math.max(1, reviews.length - cardsPerView + 1)

  const goToSlide = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, totalSlides - 1))
      setCurrentSlide(clampedIndex)

      if (trackRef.current) {
        const card = trackRef.current.querySelector('.review-card') as HTMLElement
        if (card) {
          const gap = 24 // matches gap-6
          const cardWidth = card.offsetWidth + gap
          trackRef.current.scrollTo({ left: clampedIndex * cardWidth, behavior: 'smooth' })
        }
      }
    },
    [totalSlides],
  )

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }
    autoplayRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setCurrentSlide((prev) => {
          const next = prev >= totalSlides - 1 ? 0 : prev + 1
          if (trackRef.current) {
            const card = trackRef.current.querySelector('.review-card') as HTMLElement
            if (card) {
              const gap = 24
              const cardWidth = card.offsetWidth + gap
              trackRef.current.scrollTo({ left: next * cardWidth, behavior: 'smooth' })
            }
          }
          return next
        })
      }
    }, 6000)
  }, [totalSlides])

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }, [])

  // Initialize and handle resize
  useEffect(() => {
    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [updateCardsPerView])

  // Start autoplay
  useEffect(() => {
    startAutoplay()
    return () => stopAutoplay()
  }, [startAutoplay, stopAutoplay])

  // Sync scroll position to current slide
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const card = track.querySelector('.review-card') as HTMLElement
        if (card) {
          const gap = 24
          const cardWidth = card.offsetWidth + gap
          if (cardWidth > 0) {
            setCurrentSlide(Math.round(track.scrollLeft / cardWidth))
          }
        }
      }, 100)
    }

    track.addEventListener('scroll', handleScroll)
    return () => {
      track.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  const handlePrev = () => {
    stopAutoplay()
    goToSlide(currentSlide - 1)
  }

  const handleNext = () => {
    stopAutoplay()
    goToSlide(currentSlide + 1)
  }

  const handleDotClick = (index: number) => {
    stopAutoplay()
    goToSlide(index)
  }

  const handleMouseEnter = () => {
    isPausedRef.current = true
  }

  const handleMouseLeave = () => {
    isPausedRef.current = false
    startAutoplay()
  }

  return (
    <div className="mb-16 mt-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
            Verified · Google Reviews
          </span>
        </div>
        <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">
          Don&apos;t just take our word for it.
        </h2>
        <p className="mx-auto max-w-xl text-base text-white/60">
          Real reviews from real operators — verified by Google and published publicly.
        </p>

        {/* Aggregate Rating Strip */}
        <div className="mt-6 inline-flex items-center gap-5 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <GoogleLogo className="h-5 w-5" />
            <span>Google</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex items-center gap-2.5">
            <span className="text-xl font-bold text-white">4.9</span>
            <span className="text-yellow-400">★★★★★</span>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth px-3 py-4 scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={() => (isPausedRef.current = true)}
          >
            {reviews.map((review, i) => (
              <article
                key={i}
                className="review-card flex flex-shrink-0 flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.05]"
                style={{
                  scrollSnapAlign: 'start',
                  width: `calc((100% - ${(cardsPerView - 1) * 24}px) / ${cardsPerView})`,
                  minWidth:
                    cardsPerView === 1 ? '85%' : `calc((100% - ${(cardsPerView - 1) * 24}px) / ${cardsPerView})`,
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                {/* Header: Avatar + Name + Google Badge */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-sm font-bold text-white">
                      {review.initial || getInitials(review.name)}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-white">{review.name}</div>
                      <div className="text-xs text-white/40">{review.date}</div>
                    </div>
                  </div>
                  <GoogleLogo className="h-6 w-6 flex-shrink-0" />
                </div>

                {/* Stars + Verified */}
                <div className="mb-4 flex items-center gap-2">
                  <StarRating rating={review.rating} />
                  <span className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-blue-400">
                    <BadgeCheck className="h-3 w-3" />
                    Verified
                  </span>
                </div>

                {/* Review Text */}
                <p className="flex-1 text-[15px] font-light leading-relaxed text-white/90">{review.text}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-all hover:border-purple-500/50 hover:bg-purple-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:bg-white/[0.03]"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 px-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlide ? 'w-6 bg-purple-500' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentSlide === totalSlides - 1}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-all hover:border-purple-500/50 hover:bg-purple-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:bg-white/[0.03]"
            aria-label="Next reviews"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default GoogleReviews
