import { getCategories, getPublishedDocs, type DocCategory, type SupportDoc } from '@/lib/supabase'
import Link from 'next/link'
import {
  Search,
  Rocket,
  Calendar,
  Wrench,
  Users,
  Receipt,
  ShieldCheck,
  BarChart3,
  Settings,
  LifeBuoy,
  FileText,
  ChevronRight,
} from 'lucide-react'

// Map category icons to Lucide icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  rocket: Rocket,
  calendar: Calendar,
  construct: Wrench,
  people: Users,
  receipt: Receipt,
  'shield-checkmark': ShieldCheck,
  'bar-chart': BarChart3,
  settings: Settings,
  'help-buoy': LifeBuoy,
}

function CategoryIcon({ icon, color }: { icon: string; color: string }) {
  const IconComponent = iconMap[icon] || FileText
  return (
    <div
      className="category-icon"
      style={{ backgroundColor: `${color}20`, color: color }}
    >
      <IconComponent className="h-6 w-6" />
    </div>
  )
}

export default async function HelpHomePage() {
  const [categories, docs] = await Promise.all([getCategories(), getPublishedDocs()])

  // Group docs by category
  const docsByCategory = docs.reduce(
    (acc, doc) => {
      const catId = doc.category_id || 'uncategorized'
      if (!acc[catId]) acc[catId] = []
      acc[catId].push(doc)
      return acc
    },
    {} as Record<string, SupportDoc[]>,
  )

  // Get popular docs (by view count)
  const popularDocs = [...docs].sort((a, b) => b.view_count - a.view_count).slice(0, 5)

  return (
    <div>
      {/* Hero Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            How can we{' '}
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              help you?
            </span>
          </h1>
          <p className="mb-8 text-lg text-gray-400">
            Search our knowledge base or browse categories below
          </p>

          {/* Search */}
          <form action="/help/search" method="GET" className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="q"
              placeholder="Search for articles..."
              className="help-search"
              autoComplete="off"
            />
          </form>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="mb-8 text-2xl font-bold">Browse by Category</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const categoryDocs = docsByCategory[category.id] || []
            return (
              <Link
                key={category.id}
                href={`/help/category/${category.slug}`}
                className="help-card group"
              >
                <div className="mb-4 flex items-start justify-between">
                  <CategoryIcon icon={category.icon} color={category.color} />
                  <span className="rounded-full bg-purple-500/20 px-2 py-1 text-xs text-purple-300">
                    {categoryDocs.length} articles
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-purple-300">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-400">{category.description}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Popular Articles */}
      {popularDocs.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="mb-8 text-2xl font-bold">Popular Articles</h2>
          <div className="space-y-3">
            {popularDocs.map((doc) => (
              <Link
                key={doc.id}
                href={`/help/article/${doc.slug}`}
                className="flex items-center justify-between rounded-xl border border-purple-500/20 bg-purple-900/10 p-4 transition-all hover:border-purple-500/40 hover:bg-purple-900/20"
              >
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-purple-400" />
                  <div>
                    <h3 className="font-medium text-white">{doc.title}</h3>
                    {doc.category && (
                      <span className="text-sm text-gray-500">{doc.category.name}</span>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="mb-8 text-2xl font-bold">All Articles</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {docs.map((doc) => (
            <Link
              key={doc.id}
              href={`/help/article/${doc.slug}`}
              className="help-card group"
            >
              <div className="mb-2 flex items-center gap-2">
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
              <h3 className="mb-2 font-semibold text-white group-hover:text-purple-300">
                {doc.title}
              </h3>
              {doc.excerpt && (
                <p className="line-clamp-2 text-sm text-gray-400">{doc.excerpt}</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-fuchsia-900/30 p-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">Can&apos;t find what you&apos;re looking for?</h2>
          <p className="mb-6 text-gray-400">Our support team is here to help</p>
          <Link
            href="https://www.cloudrent.me/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-500"
          >
            <LifeBuoy className="h-5 w-5" />
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  )
}
