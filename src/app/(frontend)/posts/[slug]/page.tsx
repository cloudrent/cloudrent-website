import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { ArticleSchema, BreadcrumbSchema } from '@/components/StructuredData'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post, Media } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { PostCTA } from '@/components/PostCTA'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })

    return posts.docs.map(({ slug }) => ({ slug }))
  } catch (error) {
    // Database may not be available during build - pages will be generated on-demand
    console.warn('generateStaticParams: Could not fetch posts, will generate on-demand')
    return []
  }
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  // Extract image URL for schema
  const heroMedia = post.heroImage
  const imageUrl =
    typeof heroMedia === 'object' && heroMedia !== null
      ? `https://www.cloudrent.me${(heroMedia as Media).url}`
      : undefined

  // Extract author name
  const authorName =
    post.populatedAuthors && post.populatedAuthors.length > 0
      ? (post.populatedAuthors[0]?.name || undefined)
      : undefined

  return (
    <article className="pb-16">
      <ArticleSchema
        post={{
          title: post.title,
          description: post.meta?.description || '',
          slug: post.slug || '',
          datePublished: post.publishedAt || post.createdAt,
          dateModified: post.updatedAt,
          author: authorName,
          image: imageUrl,
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.cloudrent.me/' },
          { name: 'Blog', url: 'https://www.cloudrent.me/posts/' },
          { name: post.title, url: `https://www.cloudrent.me/posts/${post.slug}/` },
        ]}
      />
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={post} />

      <div className="container max-w-4xl mx-auto pt-8">
        <RichText data={post.content} enableGutter={false} />

        <PostCTA />

        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <RelatedPosts
            className="mt-12"
            docs={post.relatedPosts.filter((post) => typeof post === 'object')}
          />
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
