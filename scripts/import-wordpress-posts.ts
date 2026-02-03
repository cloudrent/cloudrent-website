/**
 * WordPress to Payload CMS Blog Import Script
 *
 * Usage: npx tsx scripts/import-wordpress-posts.ts
 *
 * This script fetches blog posts from the WordPress REST API
 * and imports them into Payload CMS, including inline images.
 */

import 'dotenv/config'
import { getPayload, Payload } from 'payload'
import config from '@payload-config'
import { JSDOM } from 'jsdom'
import path from 'path'
import fs from 'fs'
import https from 'https'
import http from 'http'

const WORDPRESS_API = 'https://cloudrent.me/wp-json/wp/v2'

interface WPPost {
  id: number
  date: string
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
    'wp:term'?: Array<
      Array<{
        id: number
        name: string
        slug: string
      }>
    >
  }
}

// Download image to temp file
async function downloadImage(url: string, filename: string): Promise<string> {
  const tempDir = path.join(process.cwd(), 'temp-imports')
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }

  const filePath = path.join(tempDir, filename)
  const protocol = url.startsWith('https') ? https : http

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath)
    protocol
      .get(url, (response) => {
        // Handle redirects
        if (response.statusCode === 301 || response.statusCode === 302) {
          const redirectUrl = response.headers.location
          if (redirectUrl) {
            file.close()
            fs.unlinkSync(filePath)
            downloadImage(redirectUrl, filename).then(resolve).catch(reject)
            return
          }
        }

        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve(filePath)
        })
      })
      .on('error', (err) => {
        fs.unlink(filePath, () => {})
        reject(err)
      })
  })
}

// Fetch posts from WordPress
async function fetchWordPressPosts(): Promise<WPPost[]> {
  const response = await fetch(`${WORDPRESS_API}/posts?_embed&per_page=100`)
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`)
  }
  return response.json()
}

// Extract all image URLs from HTML
function extractImageUrls(html: string): string[] {
  const dom = new JSDOM(html)
  const images = dom.window.document.querySelectorAll('img')
  const urls: string[] = []

  images.forEach((img) => {
    const src = img.getAttribute('src')
    if (src && src.startsWith('http')) {
      urls.push(src)
    }
  })

  return urls
}

// Upload image to Payload and return the media ID
async function uploadImageToPayload(
  payload: Payload,
  url: string,
  altText: string,
  postId: number,
  index: number
): Promise<string | null> {
  try {
    const urlObj = new URL(url)
    const ext = path.extname(urlObj.pathname) || '.jpg'
    const filename = `wp-${postId}-inline-${index}${ext}`

    const tempPath = await downloadImage(url, filename)

    const uploadedMedia = await payload.create({
      collection: 'media',
      data: {
        alt: altText || `Image ${index + 1}`,
      },
      filePath: tempPath,
    })

    // Clean up temp file
    fs.unlinkSync(tempPath)

    return uploadedMedia.id as string
  } catch (error) {
    console.log(`      ⚠️  Failed to upload inline image: ${url}`)
    return null
  }
}

// Create a proper Lexical text node
function createTextNode(text: string, format: number = 0): any {
  return {
    type: 'text',
    detail: 0,
    format: format, // 0 = normal, 1 = bold, 2 = italic
    mode: 'normal',
    style: '',
    text: text,
    version: 1,
  }
}

// Create a media block for Lexical
function createMediaBlock(mediaId: string): any {
  return {
    type: 'block',
    fields: {
      blockName: '',
      blockType: 'mediaBlock',
      media: mediaId,
    },
    format: '',
    version: 2,
  }
}

// Convert HTML to Payload's Lexical format
function htmlToLexical(html: string, imageMap: Map<string, string>): any {
  const dom = new JSDOM(html)
  const document = dom.window.document
  const body = document.body

  const children: any[] = []

  function processInlineNodes(element: Element): any[] {
    const result: any[] = []

    element.childNodes.forEach((node) => {
      if (node.nodeType === 3) {
        // Text node
        const text = node.textContent || ''
        if (text) {
          result.push(createTextNode(text))
        }
      } else if (node.nodeType === 1) {
        const el = node as Element
        const tagName = el.tagName.toLowerCase()

        if (tagName === 'strong' || tagName === 'b') {
          const text = el.textContent || ''
          if (text) {
            result.push(createTextNode(text, 1)) // 1 = bold
          }
        } else if (tagName === 'em' || tagName === 'i') {
          const text = el.textContent || ''
          if (text) {
            result.push(createTextNode(text, 2)) // 2 = italic
          }
        } else if (tagName === 'a') {
          const href = el.getAttribute('href') || ''
          const linkChildren = processInlineNodes(el)
          if (linkChildren.length > 0) {
            result.push({
              type: 'link',
              children: linkChildren,
              direction: 'ltr',
              fields: {
                linkType: 'custom',
                newTab: href.startsWith('http'),
                url: href,
              },
              format: '',
              indent: 0,
              version: 3,
            })
          }
        } else if (tagName === 'br') {
          result.push({ type: 'linebreak', version: 1 })
        } else {
          // Recursively process other inline elements
          result.push(...processInlineNodes(el))
        }
      }
    })

    return result
  }

  function processBlockNode(element: Element): any | any[] | null {
    const tagName = element.tagName.toLowerCase()

    switch (tagName) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4': {
        const inlineChildren = processInlineNodes(element)
        if (inlineChildren.length === 0) {
          inlineChildren.push(createTextNode(''))
        }
        return {
          type: 'heading',
          children: inlineChildren,
          direction: 'ltr',
          format: '',
          indent: 0,
          tag: tagName,
          version: 1,
        }
      }

      case 'p': {
        // Check if paragraph contains only an image
        const img = element.querySelector('img')
        if (img && element.textContent?.trim() === '') {
          const src = img.getAttribute('src') || ''
          const mediaId = imageMap.get(src)
          if (mediaId) {
            return createMediaBlock(mediaId)
          }
          return null
        }

        const inlineChildren = processInlineNodes(element)
        if (inlineChildren.length === 0) return null
        return {
          type: 'paragraph',
          children: inlineChildren,
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        }
      }

      case 'img': {
        const src = element.getAttribute('src') || ''
        const mediaId = imageMap.get(src)
        if (mediaId) {
          return createMediaBlock(mediaId)
        }
        return null
      }

      case 'figure': {
        const img = element.querySelector('img')
        if (img) {
          const src = img.getAttribute('src') || ''
          const mediaId = imageMap.get(src)
          if (mediaId) {
            return createMediaBlock(mediaId)
          }
        }
        return null
      }

      case 'ul': {
        const listItems = Array.from(element.querySelectorAll(':scope > li')).map((li) => {
          const liChildren = processInlineNodes(li)
          if (liChildren.length === 0) {
            liChildren.push(createTextNode(''))
          }
          return {
            type: 'listitem',
            children: liChildren,
            direction: 'ltr',
            format: '',
            indent: 0,
            value: 1,
            version: 1,
          }
        })
        if (listItems.length === 0) return null
        return {
          type: 'list',
          children: listItems,
          direction: 'ltr',
          format: '',
          indent: 0,
          listType: 'bullet',
          start: 1,
          tag: 'ul',
          version: 1,
        }
      }

      case 'ol': {
        const listItems = Array.from(element.querySelectorAll(':scope > li')).map((li, index) => {
          const liChildren = processInlineNodes(li)
          if (liChildren.length === 0) {
            liChildren.push(createTextNode(''))
          }
          return {
            type: 'listitem',
            children: liChildren,
            direction: 'ltr',
            format: '',
            indent: 0,
            value: index + 1,
            version: 1,
          }
        })
        if (listItems.length === 0) return null
        return {
          type: 'list',
          children: listItems,
          direction: 'ltr',
          format: '',
          indent: 0,
          listType: 'number',
          start: 1,
          tag: 'ol',
          version: 1,
        }
      }

      case 'blockquote': {
        const quoteChildren = processInlineNodes(element)
        if (quoteChildren.length === 0) {
          quoteChildren.push(createTextNode(''))
        }
        return {
          type: 'quote',
          children: quoteChildren,
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        }
      }

      case 'div':
      case 'section':
      case 'article': {
        // Process children of container elements
        const containerChildren: any[] = []
        Array.from(element.children).forEach((child) => {
          const processed = processBlockNode(child)
          if (processed) {
            if (Array.isArray(processed)) {
              containerChildren.push(...processed)
            } else {
              containerChildren.push(processed)
            }
          }
        })
        return containerChildren.length > 0 ? containerChildren : null
      }

      default: {
        // Try to treat as paragraph if it has text content
        const text = element.textContent?.trim()
        if (text) {
          return {
            type: 'paragraph',
            children: [createTextNode(text)],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          }
        }
        return null
      }
    }
  }

  // Process top-level elements
  Array.from(body.children).forEach((child) => {
    const processed = processBlockNode(child)
    if (processed) {
      if (Array.isArray(processed)) {
        children.push(...processed)
      } else {
        children.push(processed)
      }
    }
  })

  // Ensure we have at least one paragraph
  if (children.length === 0) {
    children.push({
      type: 'paragraph',
      children: [createTextNode('')],
      direction: 'ltr',
      format: '',
      indent: 0,
      textFormat: 0,
      version: 1,
    })
  }

  // Wrap in Lexical root structure
  return {
    root: {
      type: 'root',
      children: children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

// Strip HTML tags for excerpt
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

// Decode HTML entities
function decodeHtmlEntities(text: string): string {
  const dom = new JSDOM(`<!DOCTYPE html><body>${text}</body>`)
  return dom.window.document.body.textContent || text
}

// Main import function
async function importPosts() {
  console.log('🚀 Starting WordPress import...\n')

  // Initialize Payload
  const payload = await getPayload({ config })
  console.log('✅ Payload initialized\n')

  // Fetch WordPress posts
  console.log('📥 Fetching posts from WordPress...')
  const wpPosts = await fetchWordPressPosts()
  console.log(`   Found ${wpPosts.length} posts\n`)

  // Get or create a default category
  let defaultCategory: any
  const existingCategories = await payload.find({
    collection: 'categories',
    where: { title: { equals: 'Blog' } },
  })

  if (existingCategories.docs.length > 0) {
    defaultCategory = existingCategories.docs[0]
  } else {
    defaultCategory = await payload.create({
      collection: 'categories',
      data: { title: 'Blog' },
    })
    console.log('✅ Created default "Blog" category\n')
  }

  // Import each post
  for (const wpPost of wpPosts) {
    const title = decodeHtmlEntities(wpPost.title.rendered)
    console.log(`\n📝 Processing: "${title}"`)

    try {
      // Check if post already exists
      const existingPost = await payload.find({
        collection: 'posts',
        where: { slug: { equals: wpPost.slug } },
      })

      if (existingPost.docs.length > 0) {
        console.log(`   ⏭️  Skipping - already exists`)
        continue
      }

      // Upload featured image if available
      let heroImageId: string | undefined
      if (wpPost._embedded?.['wp:featuredmedia']?.[0]) {
        const featuredMedia = wpPost._embedded['wp:featuredmedia'][0]
        console.log(`   📷 Downloading featured image...`)

        try {
          const imageUrl = featuredMedia.source_url
          const imageName = `wp-${wpPost.id}-hero${path.extname(imageUrl).split('?')[0] || '.jpg'}`
          const tempPath = await downloadImage(imageUrl, imageName)

          const uploadedMedia = await payload.create({
            collection: 'media',
            data: {
              alt: featuredMedia.alt_text || title,
            },
            filePath: tempPath,
          })

          heroImageId = uploadedMedia.id as string
          console.log(`   ✅ Hero image uploaded`)

          fs.unlinkSync(tempPath)
        } catch (imgError) {
          console.log(`   ⚠️  Failed to upload hero image`)
        }
      }

      // Extract and upload inline images
      const imageUrls = extractImageUrls(wpPost.content.rendered)
      const imageMap = new Map<string, string>()

      if (imageUrls.length > 0) {
        console.log(`   📷 Uploading ${imageUrls.length} inline images...`)

        for (let i = 0; i < imageUrls.length; i++) {
          const url = imageUrls[i]
          const mediaId = await uploadImageToPayload(payload, url, `Image from ${title}`, wpPost.id, i)
          if (mediaId) {
            imageMap.set(url, mediaId)
          }
        }

        console.log(`   ✅ Uploaded ${imageMap.size}/${imageUrls.length} inline images`)
      }

      // Convert content to Lexical with image references
      const lexicalContent = htmlToLexical(wpPost.content.rendered, imageMap)

      // Create the post (with revalidation disabled for CLI import)
      const newPost = await payload.create({
        collection: 'posts',
        context: {
          disableRevalidate: true,
        },
        data: {
          title: title,
          slug: wpPost.slug,
          content: lexicalContent,
          heroImage: heroImageId,
          categories: [defaultCategory.id],
          publishedAt: new Date(wpPost.date).toISOString(),
          meta: {
            title: title,
            description: stripHtml(wpPost.excerpt.rendered).slice(0, 160),
          },
          _status: 'published',
        },
      })

      console.log(`   ✅ Created post: ${newPost.id}`)
    } catch (error) {
      console.error(`   ❌ Error importing post: ${error}`)
    }
  }

  console.log('\n\n🎉 Import complete!')

  // Cleanup temp directory
  const tempDir = path.join(process.cwd(), 'temp-imports')
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true })
    console.log('🧹 Cleaned up temp files')
  }

  process.exit(0)
}

// Run the import
importPosts().catch((error) => {
  console.error('Import failed:', error)
  process.exit(1)
})
