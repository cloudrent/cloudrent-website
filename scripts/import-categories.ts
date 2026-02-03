import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const categories = [
  { title: 'Technology', slug: 'technology' },
  { title: 'News', slug: 'news' },
  { title: 'Finance', slug: 'finance' },
  { title: 'Design', slug: 'design' },
  { title: 'Software', slug: 'software' },
  { title: 'Engineering', slug: 'engineering' },
  { title: 'Blog', slug: 'blog' },
]

async function importCategories() {
  const payload = await getPayload({ config })

  console.log('Importing categories...')

  for (const category of categories) {
    // Check if category already exists
    const existing = await payload.find({
      collection: 'categories',
      where: {
        slug: {
          equals: category.slug,
        },
      },
    })

    if (existing.docs.length > 0) {
      console.log(`Category "${category.title}" already exists, skipping...`)
      continue
    }

    // Create the category
    await payload.create({
      collection: 'categories',
      data: {
        title: category.title,
        slug: category.slug,
      },
    })

    console.log(`Created category: ${category.title}`)
  }

  console.log('Done importing categories!')
  process.exit(0)
}

importCategories().catch((err) => {
  console.error('Error importing categories:', err)
  process.exit(1)
})
