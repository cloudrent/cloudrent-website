/**
 * Script to compress oversized images in Vercel Blob storage
 *
 * This script:
 * 1. Lists all images in Vercel Blob storage
 * 2. Identifies images that are too large (>4MB)
 * 3. Downloads, compresses, and re-uploads them
 * 4. Deletes the old oversized versions
 *
 * Usage:
 *   pnpm compress:images              # Run compression
 *   pnpm compress:images --dry-run    # Preview without making changes
 *
 * Required environment variables:
 *   - BLOB_READ_WRITE_TOKEN: Vercel Blob storage token
 *   - DATABASE_URL: PostgreSQL connection string (optional, for DB updates)
 */

import { list, put, del } from '@vercel/blob'
import sharp from 'sharp'
import pg from 'pg'
import { config } from 'dotenv'

const { Pool } = pg

// Load environment variables
config()

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN
const DATABASE_URL = process.env.DATABASE_URL
const DRY_RUN = process.argv.includes('--dry-run')

// Configuration
const MAX_FILE_SIZE = 4 * 1024 * 1024 // 4MB - Vercel Image Optimization limit
const MAX_DIMENSION = 2400 // Max width/height in pixels
const JPEG_QUALITY = 85
const WEBP_QUALITY = 85

if (!BLOB_TOKEN) {
  console.error('Error: BLOB_READ_WRITE_TOKEN environment variable is required')
  console.error('Get it from: Vercel Dashboard → Storage → Blob → Copy token')
  process.exit(1)
}

if (DRY_RUN) {
  console.log('🔍 DRY RUN MODE - No changes will be made\n')
}

interface BlobFile {
  url: string
  pathname: string
  size: number
  uploadedAt: Date
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.statusText}`)
  }
  return Buffer.from(await response.arrayBuffer())
}

async function compressImage(buffer: Buffer, filename: string): Promise<Buffer> {
  const ext = filename.split('.').pop()?.toLowerCase()

  let image = sharp(buffer)
  const metadata = await image.metadata()

  // Resize if dimensions are too large
  if (metadata.width && metadata.width > MAX_DIMENSION) {
    image = image.resize(MAX_DIMENSION, undefined, { withoutEnlargement: true })
  }
  if (metadata.height && metadata.height > MAX_DIMENSION) {
    image = image.resize(undefined, MAX_DIMENSION, { withoutEnlargement: true })
  }

  // Compress based on format
  if (ext === 'jpg' || ext === 'jpeg') {
    return image.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()
  } else if (ext === 'png') {
    return image.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer()
  } else if (ext === 'webp') {
    return image.webp({ quality: WEBP_QUALITY }).toBuffer()
  }

  // For other formats, just resize
  return image.toBuffer()
}

async function listAllBlobs(): Promise<BlobFile[]> {
  const allBlobs: BlobFile[] = []
  let cursor: string | undefined

  console.log('📋 Listing all blobs in storage...')

  do {
    const result = await list({
      token: BLOB_TOKEN,
      prefix: 'media/',
      cursor,
      limit: 1000,
    })

    allBlobs.push(...result.blobs)
    cursor = result.cursor

    process.stdout.write(`\r   Found ${allBlobs.length} files...`)
  } while (cursor)

  console.log(`\n   Total: ${allBlobs.length} files\n`)
  return allBlobs
}

function isImageFile(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase()
  return ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'].includes(ext || '')
}

async function updateDatabaseUrl(pool: pg.Pool, oldUrl: string, newUrl: string): Promise<void> {
  // Update main URL
  await pool.query(
    `UPDATE media SET url = $1, updated_at = NOW() WHERE url = $2`,
    [newUrl, oldUrl]
  )

  // Update sized URLs
  const sizeFields = [
    'sizes_thumbnail_url',
    'sizes_square_url',
    'sizes_small_url',
    'sizes_medium_url',
    'sizes_large_url',
    'sizes_xlarge_url',
    'sizes_og_url',
  ]

  for (const field of sizeFields) {
    await pool.query(
      `UPDATE media SET ${field} = $1, updated_at = NOW() WHERE ${field} = $2`,
      [newUrl, oldUrl]
    )
  }
}

async function compressOversizedImages() {
  console.log('🚀 Starting image compression for Vercel Blob storage...')
  console.log(`📏 Max file size: ${formatBytes(MAX_FILE_SIZE)}`)
  console.log(`📐 Max dimension: ${MAX_DIMENSION}px`)
  console.log('')

  // List all blobs
  const blobs = await listAllBlobs()

  // Filter to images only
  const images = blobs.filter(blob => isImageFile(blob.pathname))
  console.log(`🖼️  Found ${images.length} image files\n`)

  // Find oversized images
  const oversized = images.filter(img => img.size > MAX_FILE_SIZE)
  console.log(`⚠️  Found ${oversized.length} oversized images (>${formatBytes(MAX_FILE_SIZE)})\n`)

  if (oversized.length === 0) {
    console.log('✅ No oversized images found. Nothing to do!')
    return
  }

  // Sort by size (largest first)
  oversized.sort((a, b) => b.size - a.size)

  // Connect to database if available
  let pool: pg.Pool | null = null
  if (DATABASE_URL) {
    pool = new Pool({ connectionString: DATABASE_URL })
    try {
      await pool.query('SELECT 1')
      console.log('✅ Database connected\n')
    } catch (e) {
      console.log('⚠️  Database connection failed, URLs will not be updated\n')
      pool = null
    }
  }

  let successCount = 0
  let failCount = 0
  let totalSaved = 0

  console.log('Processing oversized images:\n')
  console.log('─'.repeat(80))

  for (const blob of oversized) {
    const filename = blob.pathname.split('/').pop() || blob.pathname
    console.log(`\n📄 ${filename}`)
    console.log(`   Original size: ${formatBytes(blob.size)}`)
    console.log(`   URL: ${blob.url}`)

    if (DRY_RUN) {
      console.log(`   [DRY RUN] Would compress and re-upload`)
      successCount++
      continue
    }

    try {
      // Download the image
      process.stdout.write('   Downloading... ')
      const originalBuffer = await downloadImage(blob.url)
      console.log('✓')

      // Compress the image
      process.stdout.write('   Compressing... ')
      const compressedBuffer = await compressImage(originalBuffer, filename)
      const savings = originalBuffer.length - compressedBuffer.length
      const savingsPercent = ((savings / originalBuffer.length) * 100).toFixed(1)
      console.log(`✓ (${formatBytes(compressedBuffer.length)}, saved ${savingsPercent}%)`)

      // Only re-upload if we actually saved space
      if (compressedBuffer.length >= originalBuffer.length) {
        console.log('   ⏭️  Skipping - compression did not reduce size')
        continue
      }

      // Upload compressed version (overwrite existing)
      process.stdout.write('   Uploading... ')
      const newBlob = await put(blob.pathname, compressedBuffer, {
        access: 'public',
        token: BLOB_TOKEN,
        addRandomSuffix: false,
        allowOverwrite: true,
      })
      console.log('✓')

      // Update database if connected and URL changed
      if (pool && newBlob.url !== blob.url) {
        process.stdout.write('   Updating database... ')
        await updateDatabaseUrl(pool, blob.url, newBlob.url)
        console.log('✓')
      }

      // Delete old blob if URL is different
      if (newBlob.url !== blob.url) {
        process.stdout.write('   Deleting old blob... ')
        await del(blob.url, { token: BLOB_TOKEN })
        console.log('✓')
      }

      console.log(`   ✅ Compressed: ${formatBytes(blob.size)} → ${formatBytes(compressedBuffer.length)}`)

      successCount++
      totalSaved += savings

    } catch (error) {
      console.log(`   ❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      failCount++
    }
  }

  console.log('\n' + '─'.repeat(80))
  console.log('\n📊 Summary:')
  console.log(`   ✅ Compressed: ${successCount}`)
  console.log(`   ❌ Failed: ${failCount}`)
  console.log(`   💾 Total space saved: ${formatBytes(totalSaved)}`)

  if (DRY_RUN) {
    console.log('\n⚠️  This was a dry run. Run without --dry-run to apply changes.')
  }

  if (pool) {
    await pool.end()
  }
}

// Run the script
compressOversizedImages().catch(error => {
  console.error('Script failed:', error)
  process.exit(1)
})
