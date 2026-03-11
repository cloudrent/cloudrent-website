// Ensure URL has https:// protocol
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return process.env.NEXT_PUBLIC_SERVER_URL
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return 'https://www.cloudrent.me'
}

const SITE_URL = getBaseUrl()

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  // Exclude dynamic routes that are handled by separate sitemaps or shouldn't be indexed
  exclude: [
    '/posts-sitemap.xml',
    '/pages-sitemap.xml',
    '/admin/*',
    '/api/*',
    '/posts/*',      // Handled by posts-sitemap.xml
    '/posts/page/*', // Pagination
    '/search',       // Search results page
    '/ie-incompatible.html',
    '/_next/*',
    '/blog',         // Redirects to /posts
    '/blog/*',       // Redirects to /posts
    '/help',         // Help center (separate subdomain)
    '/help/*',       // Help center (separate subdomain)
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/*', '/api/*', '/search', '/_next/*'],
        allow: '/',
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/posts-sitemap.xml`,
    ],
  },
  // Static pages to include in sitemap
  additionalPaths: async () => {
    const staticPages = [
      { loc: '/', priority: 1.0, changefreq: 'weekly' },
      { loc: '/features', priority: 0.9, changefreq: 'weekly' },
      { loc: '/pricing', priority: 0.9, changefreq: 'weekly' },
      { loc: '/demo', priority: 0.9, changefreq: 'weekly' },
      { loc: '/contact', priority: 0.8, changefreq: 'monthly' },
      { loc: '/about', priority: 0.8, changefreq: 'monthly' },
      { loc: '/mobile-app', priority: 0.8, changefreq: 'monthly' },
      { loc: '/web-portal', priority: 0.8, changefreq: 'monthly' },
      { loc: '/faq', priority: 0.7, changefreq: 'monthly' },
      { loc: '/posts', priority: 0.7, changefreq: 'daily' },
      { loc: '/videos', priority: 0.6, changefreq: 'weekly' },
      { loc: '/launch', priority: 0.9, changefreq: 'daily' },
      { loc: '/privacy', priority: 0.3, changefreq: 'yearly' },
      { loc: '/terms', priority: 0.3, changefreq: 'yearly' },
    ]
    return staticPages
  },
}
