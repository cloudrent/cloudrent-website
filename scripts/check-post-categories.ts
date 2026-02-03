import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

async function checkPostCategories() {
  const payload = await getPayload({ config })

  // Check categories
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
  })
  console.log('\n=== Categories in database ===')
  categories.docs.forEach((cat) => {
    console.log(`- ${cat.title} (${cat.slug})`)
  })

  // Check posts with categories
  const posts = await payload.find({
    collection: 'posts',
    limit: 100,
    depth: 1,
  })

  console.log('\n=== Posts and their categories ===')
  let postsWithCategories = 0
  posts.docs.forEach((post) => {
    const cats = post.categories as any[]
    if (cats && cats.length > 0) {
      postsWithCategories++
      const catNames = cats.map((c) => (typeof c === 'object' ? c.title : c)).join(', ')
      console.log(`- "${post.title}" -> [${catNames}]`)
    }
  })

  console.log(`\nTotal posts: ${posts.docs.length}`)
  console.log(`Posts with categories: ${postsWithCategories}`)
  console.log(`Posts without categories: ${posts.docs.length - postsWithCategories}`)

  process.exit(0)
}

checkPostCategories().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
