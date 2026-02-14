import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

async function checkPages() {
  const payload = await getPayload({ config })

  // Check all pages (including drafts)
  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
    draft: true,
  })

  console.log('\n=== Pages in database ===')
  if (pages.docs.length === 0) {
    console.log('No pages found in database!')
  } else {
    pages.docs.forEach((page) => {
      console.log(`- ${page.title} (/${page.slug}) - Status: ${page._status || 'published'}`)
    })
  }

  console.log(`\nTotal pages: ${pages.totalDocs}`)

  process.exit(0)
}

checkPages().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
