import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { CategoryTabs } from '@/components/CategoryTabs'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
  searchParams: Promise<{
    category?: string
  }>
}

export default async function Page({ params: paramsPromise, searchParams: searchParamsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const { category } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  // Fetch all categories
  const categoriesResult = await payload.find({
    collection: 'categories',
    limit: 100,
    overrideAccess: false,
    select: {
      id: true,
      title: true,
      slug: true,
    },
  })

  const categories = categoriesResult.docs.map((cat) => ({
    id: cat.id,
    title: cat.title || '',
    slug: cat.slug || '',
  }))

  // Build the where clause for filtering by category
  const whereClause = category
    ? {
        'categories.slug': {
          equals: category,
        },
      }
    : undefined

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
    ...(whereClause && { where: whereClause }),
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
    },
  })

  return (
    <div className="pb-14 pt-12">
      <PageClient />
      {/* Hero */}
      <div className="mb-10 px-4 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            Insights & Updates
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            CloudRent Pro{' '}
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Tips, guides, and industry insights to help you grow your equipment hire business.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="container mb-10">
        <Suspense fallback={<div className="h-10" />}>
          <CategoryTabs categories={categories} />
        </Suspense>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts?.page && posts?.totalPages > 1 && (
          <Suspense fallback={null}>
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          </Suspense>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Blog - Page ${pageNumber} | CloudRent Pro`,
    description:
      'Tips, guides, and industry insights for equipment hire businesses. Learn how to grow your rental business with CloudRent Pro.',
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 12)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
