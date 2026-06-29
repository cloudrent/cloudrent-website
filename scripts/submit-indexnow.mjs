#!/usr/bin/env node
/**
 * Submit new SEO pages to IndexNow for immediate indexing
 *
 * Usage: node scripts/submit-indexnow.mjs
 *
 * This script submits URLs directly to the IndexNow API.
 * For production, you can also POST to /api/indexnow with the URLs.
 */

const INDEXNOW_KEY = 'a4614d998743d0cc080805619523acd2'
const SITE_URL = 'https://www.cloudrent.me'

// New URLs to submit (Phase 1, 2, and 3)
const NEW_URLS = [
  // Phase 1 - Core SEO pages
  '/equipment-rental-software/',
  '/equipment-rental-software-australia/',
  // Phase 2 - Industry pages
  '/construction-equipment-rental-software/',
  '/rental-inventory-management-software/',
  '/hire-business-software/',
  // Phase 3 - Comparison pages
  '/compare/cloudrent-vs-spreadsheets/',
  '/compare/cloudrent-vs-erp/',
]

async function submitToIndexNow() {
  console.log('Submitting URLs to IndexNow...\n')

  const fullUrls = NEW_URLS.map(url => `${SITE_URL}${url}`)

  console.log('URLs to submit:')
  fullUrls.forEach(url => console.log(`  - ${url}`))
  console.log('')

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: 'www.cloudrent.me',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: fullUrls,
      }),
    })

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`✓ Successfully submitted ${fullUrls.length} URLs to IndexNow`)
      console.log(`  Status: ${response.status}`)
      return true
    } else {
      const text = await response.text()
      console.error(`✗ IndexNow submission failed`)
      console.error(`  Status: ${response.status}`)
      console.error(`  Response: ${text}`)
      return false
    }
  } catch (error) {
    console.error('✗ Error submitting to IndexNow:', error.message)
    return false
  }
}

// Run the submission
submitToIndexNow()
  .then(success => {
    process.exit(success ? 0 : 1)
  })
  .catch(err => {
    console.error('Unexpected error:', err)
    process.exit(1)
  })
