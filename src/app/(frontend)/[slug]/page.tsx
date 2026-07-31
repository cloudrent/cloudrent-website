import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getBuilderContent } from '@/lib/builder'
import { RenderBuilderContent } from '@/components/builder/RenderBuilderContent'

// Slugs handled by other route groups - these should not be matched by this dynamic route
const EXCLUDED_SLUGS = ['dollar-offer']

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })

    return pages.docs
      ?.filter((doc) => doc.slug !== 'home' && !EXCLUDED_SLUGS.includes(doc.slug))
      .map(({ slug }) => ({ slug }))
  } catch (error) {
    // Database may not be available during build - pages will be generated on-demand
    console.warn('generateStaticParams: Could not fetch pages, will generate on-demand')
    return []
  }
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  // Skip slugs handled by other route groups (e.g., standalone pages)
  if (EXCLUDED_SLUGS.includes(decodedSlug)) {
    notFound()
  }

  const url = '/' + decodedSlug

  // 1. Check Builder.io first for marketing/landing pages
  const builderContent = await getBuilderContent('page', url, {
    options: { includeUnpublished: draft },
  })

  if (builderContent) {
    return (
      <article className="flex-1">
        <RenderBuilderContent content={builderContent} />
      </article>
    )
  }

  // 2. Fall back to Payload CMS
  let page: RequiredDataFromCollectionSlug<'pages'> | null
  page = await queryPageBySlug({
    slug: decodedSlug,
  })

  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const isCloudRentHero = hero?.type === 'cloudrent'

  return (
    <article className={`flex-1 ${isCloudRentHero ? 'pb-0' : 'pt-16 pb-24'}`}>
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  // Skip slugs handled by other route groups
  if (EXCLUDED_SLUGS.includes(decodedSlug)) {
    return {}
  }

  const url = '/' + decodedSlug

  // Check Builder.io for SEO metadata first
  const builderContent = await getBuilderContent('page', url)

  if (builderContent?.data) {
    const { title, description } = builderContent.data
    if (title || description) {
      return {
        title: title || undefined,
        description: description || undefined,
      }
    }
  }

  // Fall back to Payload
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
