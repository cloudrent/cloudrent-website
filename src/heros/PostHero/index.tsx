import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="pt-[50px]">
      <div className="container max-w-4xl mx-auto">
        {/* Hero Image */}
        {heroImage && typeof heroImage !== 'string' && (
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
            <Media fill priority imgClassName="object-cover" resource={heroImage} />
          </div>
        )}

        {/* Content Below Image */}
        <div className="mt-8">
          <div className="uppercase text-sm mb-2 text-gray-400">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <h1 className="mb-4 text-2xl md:text-3xl lg:text-4xl font-bold">{title}</h1>

          <div className="flex flex-col gap-1 text-gray-400 text-sm">
            {publishedAt && (
              <div>
                <span>Date Published</span>
                <time className="block text-white" dateTime={publishedAt}>
                  {formatDateTime(publishedAt)}
                </time>
              </div>
            )}
            {hasAuthors && (
              <div className="mt-2">
                <span>Author</span>
                <p className="text-white">{formatAuthors(populatedAuthors)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
