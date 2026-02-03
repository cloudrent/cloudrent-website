'use client'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export type Category = {
  id: number | string
  title: string
  slug: string
}

type CategoryTabsProps = {
  categories: Category[]
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories }) => {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category')

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Link
        href="/posts"
        className={cn(
          'rounded-full px-4 py-2 text-sm font-medium transition-all',
          !activeCategory
            ? 'bg-purple-500 text-white'
            : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white',
        )}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/posts?category=${category.slug}`}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-all',
            activeCategory === category.slug
              ? 'bg-purple-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white',
          )}
        >
          {category.title}
        </Link>
      ))}
    </div>
  )
}
