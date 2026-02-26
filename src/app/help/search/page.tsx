import { searchDocs } from '@/lib/supabase'
import Link from 'next/link'
import { Search, FileText, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `Search: ${q}` : 'Search',
    description: 'Search the CloudRent Pro Help Center',
  }
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  const query = q || ''
  const results = query ? await searchDocs(query) : []

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Back link */}
      <Link
        href="/help"
        className="mb-6 inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Help Center
      </Link>

      {/* Search Form */}
      <div className="mb-8">
        <h1 className="mb-6 text-3xl font-bold">Search Help Center</h1>
        <form action="/help/search" method="GET" className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search for articles..."
            className="help-search"
            autoComplete="off"
            autoFocus
          />
        </form>
      </div>

      {/* Results */}
      {query && (
        <div>
          <p className="mb-6 text-gray-400">
            {results.length === 0
              ? `No results found for "${query}"`
              : `Found ${results.length} result${results.length === 1 ? '' : 's'} for "${query}"`}
          </p>

          {results.length > 0 && (
            <div className="space-y-4">
              {results.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/help/article/${doc.slug}`}
                  className="block rounded-xl border border-purple-500/20 bg-purple-900/10 p-6 transition-all hover:border-purple-500/40 hover:bg-purple-900/20"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-400" />
                    {doc.category && (
                      <span
                        className="rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: `${doc.category.color}20`,
                          color: doc.category.color,
                        }}
                      >
                        {doc.category.name}
                      </span>
                    )}
                  </div>
                  <h2 className="mb-2 text-lg font-semibold text-white">{doc.title}</h2>
                  {doc.excerpt && (
                    <p className="line-clamp-2 text-gray-400">{doc.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          )}

          {results.length === 0 && (
            <div className="rounded-xl border border-purple-500/20 bg-purple-900/10 p-8 text-center">
              <Search className="mx-auto mb-4 h-12 w-12 text-gray-500" />
              <p className="mb-4 text-gray-400">Try different keywords or browse categories</p>
              <Link
                href="/help"
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500"
              >
                Browse All Articles
              </Link>
            </div>
          )}
        </div>
      )}

      {!query && (
        <div className="rounded-xl border border-purple-500/20 bg-purple-900/10 p-8 text-center">
          <Search className="mx-auto mb-4 h-12 w-12 text-gray-500" />
          <p className="text-gray-400">Enter a search term to find articles</p>
        </div>
      )}
    </div>
  )
}
