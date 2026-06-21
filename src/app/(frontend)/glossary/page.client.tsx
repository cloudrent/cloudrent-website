'use client'

import { useState, useMemo } from 'react'
import { Search, BookOpen, ChevronRight } from 'lucide-react'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

interface GlossaryTerm {
  term: string
  definition: string
  category: string
  relatedTerms?: string[]
}

interface GlossaryPageClientProps {
  terms: GlossaryTerm[]
}

export default function GlossaryPageClient({ terms }: GlossaryPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeLetter, setActiveLetter] = useState<string | null>(null)

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(terms.map((t) => t.category))]
    return cats
  }, [terms])

  // Get alphabet for navigation
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const availableLetters = useMemo(() => {
    return new Set(terms.map((t) => t.term[0].toUpperCase()))
  }, [terms])

  // Filter terms
  const filteredTerms = useMemo(() => {
    return terms.filter((term) => {
      const matchesSearch =
        searchQuery === '' ||
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === 'All' || term.category === activeCategory
      const matchesLetter = !activeLetter || term.term[0].toUpperCase() === activeLetter
      return matchesSearch && matchesCategory && matchesLetter
    })
  }, [terms, searchQuery, activeCategory, activeLetter])

  // Group terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {}
    filteredTerms.forEach((term) => {
      const letter = term.term[0].toUpperCase()
      if (!groups[letter]) groups[letter] = []
      groups[letter].push(term)
    })
    // Sort alphabetically
    return Object.keys(groups)
      .sort()
      .reduce(
        (acc, key) => {
          acc[key] = groups[key].sort((a, b) => a.term.localeCompare(b.term))
          return acc
        },
        {} as Record<string, GlossaryTerm[]>,
      )
  }, [filteredTerms])

  return (
    <div className="min-h-screen text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
      </div>

      <div className="relative">
        {/* Hero */}
        <section className="px-4 pb-8 pt-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
              <BookOpen className="h-4 w-4" />
              {terms.length}+ industry terms defined
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              Equipment Rental{' '}
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Glossary
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              A comprehensive guide to hire industry terminology. From scaffold hire to SWMS, learn
              the language of equipment rental in Australia.
            </p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="mx-auto max-w-5xl px-4 pb-6">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setActiveLetter(null)
              }}
              className="w-full rounded-xl border border-purple-500/30 bg-purple-950/50 py-4 pl-12 pr-4 text-white placeholder-purple-300/50 transition-colors focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
            />
          </div>

          {/* Alphabet Navigation */}
          <div className="mb-6 flex flex-wrap justify-center gap-1">
            {alphabet.map((letter) => {
              const isAvailable = availableLetters.has(letter)
              const isActive = activeLetter === letter
              return (
                <button
                  key={letter}
                  onClick={() => {
                    setActiveLetter(isActive ? null : letter)
                    setSearchQuery('')
                  }}
                  disabled={!isAvailable}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-purple-500 text-white'
                      : isAvailable
                        ? 'border border-purple-500/30 text-purple-300 hover:bg-purple-500/20'
                        : 'cursor-not-allowed text-purple-500/30',
                  )}
                >
                  {letter}
                </button>
              )
            })}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all',
                  activeCategory === category
                    ? 'bg-purple-500 text-white'
                    : 'border border-purple-500/30 text-purple-300 hover:bg-purple-500/20',
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Glossary List */}
        <section className="mx-auto max-w-5xl px-4 pb-20">
          {Object.keys(groupedTerms).length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-400">No terms match your search. Try a different term.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedTerms).map(([letter, letterTerms]) => (
                <div key={letter} id={`letter-${letter}`}>
                  {/* Letter Header */}
                  <div className="mb-4 flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 text-2xl font-bold text-white">
                      {letter}
                    </span>
                    <div className="h-px flex-1 bg-purple-500/30" />
                  </div>

                  {/* Terms */}
                  <div className="grid gap-4 md:grid-cols-2">
                    {letterTerms.map((term, index) => (
                      <article
                        key={index}
                        className="rounded-xl border border-purple-500/20 bg-purple-900/20 p-5 transition-colors hover:border-purple-500/40 hover:bg-purple-900/30"
                      >
                        <div className="mb-1 flex items-start justify-between gap-2">
                          <h2 className="text-lg font-semibold text-white">{term.term}</h2>
                          <span className="shrink-0 rounded-full bg-purple-500/20 px-2 py-0.5 text-xs font-medium text-purple-300">
                            {term.category}
                          </span>
                        </div>
                        <p className="mb-3 text-sm leading-relaxed text-gray-300">
                          {term.definition}
                        </p>
                        {term.relatedTerms && term.relatedTerms.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs text-purple-400">Related:</span>
                            {term.relatedTerms.map((related, i) => (
                              <span
                                key={i}
                                className="text-xs text-purple-300 hover:text-purple-200"
                              >
                                {related}
                                {i < term.relatedTerms!.length - 1 && ','}
                              </span>
                            ))}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-900/60 to-fuchsia-900/60 p-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-white">
              Ready to streamline your hire business?
            </h2>
            <p className="mb-6 text-purple-200">
              CloudRent Pro is the all-in-one equipment rental software built for Australian hire
              companies.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="https://app.cloudrent.me/try"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:from-purple-400 hover:to-fuchsia-400"
              >
                Start Free Trial
                <ChevronRight className="h-4 w-4" />
              </a>
              <Link
                href="/features"
                className="rounded-xl border border-purple-400/50 px-8 py-3 font-semibold text-purple-100 transition-all hover:bg-purple-500/20"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
