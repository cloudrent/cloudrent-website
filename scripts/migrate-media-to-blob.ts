/**
 * Migration script to upload local media files to Vercel Blob storage
 * and update the Payload database with the new URLs.
 *
 * Usage:
 *   pnpm migrate:media              # Run migration
 *   pnpm migrate:media --dry-run    # Preview without making changes
 *
 * Required environment variables:
 *   - BLOB_READ_WRITE_TOKEN: Vercel Blob storage token
 *   - DATABASE_URL: PostgreSQL connection string
 */

import { put } from '@vercel/blob'
import pg from 'pg'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

const { Pool } = pg

// Load environment variables
config()

const MEDIA_DIR = path.resolve(process.cwd(), 'public/media')
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN
const DATABASE_URL = process.env.DATABASE_URL
const DRY_RUN = process.argv.includes('--dry-run')

if (!BLOB_TOKEN) {
  console.error('Error: BLOB_READ_WRITE_TOKEN environment variable is required')
  console.error('Get it from: Vercel Dashboard → Storage → Blob → Copy token')
  process.exit(1)
}

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
}

async function uploadToBlob(filePath: string, filename: string): Promise<string | null> {
  if (DRY_RUN) {
    return `https://example.blob.vercel-storage.com/${filename}`
  }

  try {
    const fileBuffer = fs.readFileSync(filePath)
    const blob = await put(`media/${filename}`, fileBuffer, {
      access: 'public',
      token: BLOB_TOKEN,
    })
    return blob.url
  } catch (error) {
    console.error(`  ❌ Failed to upload ${filename}:`, error)
    return null
  }
}

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function findRelatedFiles(baseFilename: string): string[] {
  const ext = path.extname(baseFilename)
  const name = path.basename(baseFilename, ext)
  const files = fs.readdirSync(MEDIA_DIR)

  // Find all files that start with the base name (includes sized versions)
  const pattern = new RegExp(`^${escapeRegex(name)}(-\\d+(x\\d+)?)?${escapeRegex(ext)}$`)
  return files.filter((f) => pattern.test(f))
}

async function migrateMedia() {
  console.log('🚀 Starting media migration to Vercel Blob storage...')
  console.log(`📁 Media directory: ${MEDIA_DIR}`)
  console.log('')

  // Check if media directory exists
  if (!fs.existsSync(MEDIA_DIR)) {
    console.error(`Error: Media directory not found: ${MEDIA_DIR}`)
    process.exit(1)
  }

  // Connect to database
  const pool = new Pool({ connectionString: DATABASE_URL })

  try {
    // Test database connection
    await pool.query('SELECT 1')
    console.log('✅ Database connected\n')

    // Get all media records
    const result = await pool.query<MediaRecord>(`
      SELECT id, filename, url
      FROM media
      ORDER BY id
    `)

    const mediaRecords = result.rows
    console.log(`📊 Found ${mediaRecords.length} media records to process\n`)

    let successCount = 0
    let skippedCount = 0
    let failCount = 0
    const uploadedFiles = new Set<string>()

    for (const record of mediaRecords) {
      process.stdout.write(`[${record.id}] ${record.filename}`)

      // Check if already migrated (URL starts with https://)
      if (record.url && record.url.startsWith('https://')) {
        console.log(' → Already migrated, skipping')
        skippedCount++
        continue
      }

      const mainFilePath = path.join(MEDIA_DIR, record.filename)

      // Check if main file exists
      if (!fs.existsSync(mainFilePath)) {
        console.log(' → ❌ File not found locally')
        failCount++
        continue
      }

      console.log('')

      // Find all related files (main + sized versions)
      const relatedFiles = findRelatedFiles(record.filename)
      const uploadedUrls: Record<string, string> = {}

      // Upload all related files
      for (const filename of relatedFiles) {
        if (uploadedFiles.has(filename)) continue

        const filePath = path.join(MEDIA_DIR, filename)
        const url = await uploadToBlob(filePath, filename)

        if (url) {
          uploadedUrls[filename] = url
          uploadedFiles.add(filename)
          console.log(`  ✅ Uploaded: ${filename}`)
        }
      }

      // Get the main file URL
      const mainUrl = uploadedUrls[record.filename]
      if (!mainUrl) {
        console.log(`  ❌ Failed to upload main file`)
        failCount++
        continue
      }

      // Build update query for sized versions
      const ext = path.extname(record.filename)
      const name = path.basename(record.filename, ext)

      const sizeConfigs = [
        { field: 'sizes_thumbnail_url', pattern: `${name}-300` },
        { field: 'sizes_square_url', pattern: `${name}-500x500` },
        { field: 'sizes_small_url', pattern: `${name}-600` },
        { field: 'sizes_medium_url', pattern: `${name}-900` },
        { field: 'sizes_large_url', pattern: `${name}-1400` },
        { field: 'sizes_xlarge_url', pattern: `${name}-1920` },
        { field: 'sizes_og_url', pattern: `${name}-1200x630` },
      ]

      const updates: string[] = ['url = $1']
      const values: (string | null)[] = [mainUrl]
      let paramIndex = 2

      for (const sizeConfig of sizeConfigs) {
        // Find the uploaded URL for this size
        const matchingFile = Object.keys(uploadedUrls).find((f) =>
          f.startsWith(sizeConfig.pattern)
        )
        if (matchingFile) {
          updates.push(`${sizeConfig.field} = $${paramIndex}`)
          values.push(uploadedUrls[matchingFile])
          paramIndex++
        }
      }

      values.push(record.id.toString())

      // Update database
      if (!DRY_RUN) {
        try {
          await pool.query(
            `UPDATE media SET ${updates.join(', ')}, updated_at = NOW() WHERE id = $${paramIndex}`,
            values
          )
          console.log(`  ✅ Database updated`)
        } catch (dbError) {
          console.error(`  ❌ Database update failed:`, dbError)
          failCount++
          continue
        }
      } else {
        console.log(`  [DRY RUN] Would update database with URL: ${mainUrl}`)
      }

      successCount++
    }

    console.log('\n========================================')
    console.log('Migration complete!')
    console.log(`  ✅ Success: ${successCount}`)
    console.log(`  ⏭️  Skipped (already migrated): ${skippedCount}`)
    console.log(`  ❌ Failed: ${failCount}`)
    console.log(`  📦 Total files uploaded: ${uploadedFiles.size}`)
    console.log('========================================\n')

    if (DRY_RUN) {
      console.log('This was a dry run. Run without --dry-run to apply changes.')
    }
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

// Run migration
migrateMedia()
