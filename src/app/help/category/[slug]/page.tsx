import { getCategories, getDocsByCategory, type SupportDoc } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, FileText, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: category.name,
    description: category.description || `Browse ${category.name} articles in CloudRent Pro Help Center`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const [categories, docs] = await Promise.all([getCategories(), getDocsByCategory(slug)])

  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/help" className="hover:text-white">
          Help Center
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <Link
          href="/help"
          className="mb-4 inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Help Center
        </Link>
        <h1 className="mb-2 text-3xl font-bold">{category.name}</h1>
        {category.description && <p className="text-gray-400">{category.description}</p>}
      </div>

      {/* Articles List */}
      {docs.length === 0 ? (
        <div className="rounded-xl border border-purple-500/20 bg-purple-900/10 p-8 text-center">
          <FileText className="mx-auto mb-4 h-12 w-12 text-gray-500" />
          <p className="text-gray-400">No articles in this category yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {docs.map((doc) => (
            <Link
              key={doc.id}
              href={`/help/article/${doc.slug}`}
              className="block rounded-xl border border-purple-500/20 bg-purple-900/10 p-6 transition-all hover:border-purple-500/40 hover:bg-purple-900/20"
            >
              <h2 className="mb-2 text-lg font-semibold text-white">{doc.title}</h2>
              {doc.excerpt && <p className="text-gray-400">{doc.excerpt}</p>}
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <span>{doc.view_count} views</span>
                {doc.video_url && (
                  <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-purple-300">
                    Video
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
