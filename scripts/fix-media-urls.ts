/**
 * Fix script to update remaining media URLs to Vercel Blob storage URLs.
 * Files are already uploaded, just need to update database URLs.
 *
 * Usage:
 *   pnpm tsx scripts/fix-media-urls.ts              # Run fix
 *   pnpm tsx scripts/fix-media-urls.ts --dry-run    # Preview changes
 */

import pg from 'pg'
import { config } from 'dotenv'

const { Pool } = pg

// Load environment variables
config()

const DATABASE_URL = process.env.DATABASE_URL
const DRY_RUN = process.argv.includes('--dry-run')
const BLOB_BASE_URL = 'https://ipjpelt6tqi5wdno.public.blob.vercel-storage.com/media'

if (!DATABASE_URL) {
  console.error('Error: DATABASE_URL environment variable is required')
  process.exit(1)
}

if (DRY_RUN) {
  console.log('🔍 DRY RUN MODE - No changes will be made\n')
}

interface MediaRecord {
  id: number
  filename: string
  url: string | null
  sizes_thumbnail_filename: string | null
  sizes_thumbnail_url: string | null
  sizes_square_filename: string | null
  sizes_square_url: string | null
  sizes_small_filename: string | null
  sizes_small_url: string | null
  sizes_medium_filename: string | null
  sizes_medium_url: string | null
  sizes_large_filename: string | null
  sizes_large_url: string | null
  sizes_xlarge_filename: string | null
  sizes_xlarge_url: string | null
  sizes_og_filename: string | null
  sizes_og_url: string | null
}

async function fixMediaUrls() {
  console.log('🔧 Fixing media URLs to point to Vercel Blob storage...\n')

  const pool = new Pool({ connectionString: DATABASE_URL })

  try {
    // Test connection
    await pool.query('SELECT 1')
    console.log('✅ Database connected\n')

    // Get all media records that need fixing
    const result = await pool.query<MediaRecord>(`
      SELECT
        id, filename, url,
        sizes_thumbnail_filename, sizes_thumbnail_url,
        sizes_square_filename, sizes_square_url,
        sizes_small_filename, sizes_small_url,
        sizes_medium_filename, sizes_medium_url,
        sizes_large_filename, sizes_large_url,
        sizes_xlarge_filename, sizes_xlarge_url,
        sizes_og_filename, sizes_og_url
      FROM media
      ORDER BY id
    `)

    const records = result.rows
    console.log(`📊 Found ${records.length} media records to check\n`)

    let fixedCount = 0
    let skippedCount = 0

    for (const record of records) {
      const updates: string[] = []
      const values: (string | number)[] = []
      let paramIndex = 1

      // Check main URL
      if (record.url && !record.url.startsWith('https://')) {
        const blobUrl = `${BLOB_BASE_URL}/${record.filename}`
        updates.push(`url = $${paramIndex}`)
        values.push(blobUrl)
        paramIndex++
      }

      // Check sized URLs - use filename field if available
      const sizeFields = [
        { urlField: 'sizes_thumbnail_url', filenameField: 'sizes_thumbnail_filename', url: record.sizes_thumbnail_url, filename: record.sizes_thumbnail_filename },
        { urlField: 'sizes_square_url', filenameField: 'sizes_square_filename', url: record.sizes_square_url, filename: record.sizes_square_filename },
        { urlField: 'sizes_small_url', filenameField: 'sizes_small_filename', url: record.sizes_small_url, filename: record.sizes_small_filename },
        { urlField: 'sizes_medium_url', filenameField: 'sizes_medium_filename', url: record.sizes_medium_url, filename: record.sizes_medium_filename },
        { urlField: 'sizes_large_url', filenameField: 'sizes_large_filename', url: record.sizes_large_url, filename: record.sizes_large_filename },
        { urlField: 'sizes_xlarge_url', filenameField: 'sizes_xlarge_filename', url: record.sizes_xlarge_url, filename: record.sizes_xlarge_filename },
        { urlField: 'sizes_og_url', filenameField: 'sizes_og_filename', url: record.sizes_og_url, filename: record.sizes_og_filename },
      ]

      for (const size of sizeFields) {
        if (size.url && !size.url.startsWith('https://') && size.filename) {
          const blobUrl = `${BLOB_BASE_URL}/${size.filename}`
          updates.push(`${size.urlField} = $${paramIndex}`)
          values.push(blobUrl)
          paramIndex++
        }
      }

      if (updates.length === 0) {
        skippedCount++
        continue
      }

      values.push(record.id)
      const updateQuery = `UPDATE media SET ${updates.join(', ')}, updated_at = NOW() WHERE id = $${paramIndex}`

      if (!DRY_RUN) {
        try {
          await pool.query(updateQuery, values)
          console.log(`✅ [${record.id}] ${record.filename} - Fixed ${updates.length} URLs`)
        } catch (error) {
          console.error(`❌ [${record.id}] ${record.filename} - Failed:`, error)
        }
      } else {
        console.log(`[DRY RUN] [${record.id}] ${record.filename} - Would fix ${updates.length} URLs`)
      }

      fixedCount++
    }

    console.log('\n========================================')
    console.log('Fix complete!')
    console.log(`  ✅ Fixed: ${fixedCount}`)
    console.log(`  ⏭️  Already correct: ${skippedCount}`)
    console.log('========================================\n')

    if (DRY_RUN) {
      console.log('This was a dry run. Run without --dry-run to apply changes.')
    }
  } catch (error) {
    console.error('Fix failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

// Run fix
fixMediaUrls()
