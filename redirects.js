const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // ========================================
  // Migration redirects from old cloudrent.me site
  // ========================================
  const migrationRedirects = [
    // Main pages
    { source: '/cloudrent-platform', destination: '/about', permanent: true },
    { source: '/cloudrent-platform/', destination: '/about', permanent: true },
    { source: '/create-your-quote', destination: '/contact', permanent: true },
    { source: '/create-your-quote/', destination: '/contact', permanent: true },
    { source: '/contact/', destination: '/contact', permanent: true },

    // Features - redirect individual feature pages to main features page with anchors
    { source: '/ai-damage-detection-automation', destination: '/features#damage', permanent: true },
    { source: '/ai-damage-detection-automation/', destination: '/features#damage', permanent: true },
    { source: '/inventory-rental', destination: '/features#equipment', permanent: true },
    { source: '/inventory-rental/', destination: '/features#equipment', permanent: true },
    { source: '/intuitive-scheduling-tool', destination: '/features', permanent: true },
    { source: '/intuitive-scheduling-tool/', destination: '/features', permanent: true },
    { source: '/inventory-financial-management', destination: '/features#payments', permanent: true },
    { source: '/inventory-financial-management/', destination: '/features#payments', permanent: true },
    { source: '/fleet-safety-reinvented-cloudrents-fatigue-management-camera-system', destination: '/features#safety', permanent: true },
    { source: '/fleet-safety-reinvented-cloudrents-fatigue-management-camera-system/', destination: '/features#safety', permanent: true },
    { source: '/pos', destination: '/features', permanent: true },
    { source: '/pos/', destination: '/features', permanent: true },
    { source: '/qr-code-equipment-management', destination: '/features#equipment', permanent: true },
    { source: '/qr-code-equipment-management/', destination: '/features#equipment', permanent: true },
    { source: '/artificial-intelligence', destination: '/features#damage', permanent: true },
    { source: '/artificial-intelligence/', destination: '/features#damage', permanent: true },

    // Mobile app
    { source: '/features/mobile-rental-app', destination: '/mobile-app', permanent: true },
    { source: '/features/mobile-rental-app/', destination: '/mobile-app', permanent: true },

    // Web portal / online store
    { source: '/online-rental-store', destination: '/web-portal', permanent: true },
    { source: '/online-rental-store/', destination: '/web-portal', permanent: true },

    // Blog / News
    { source: '/news', destination: '/posts', permanent: true },
    { source: '/news/', destination: '/posts', permanent: true },
    { source: '/news/:slug', destination: '/posts/:slug', permanent: true },
    { source: '/news/:slug/', destination: '/posts/:slug', permanent: true },

    // FAQ
    { source: '/cloudrent-faqs', destination: '/faq', permanent: true },
    { source: '/cloudrent-faqs/', destination: '/faq', permanent: true },

    // About / Company
    { source: '/our-company-background', destination: '/about', permanent: true },
    { source: '/our-company-background/', destination: '/about', permanent: true },

    // Pricing
    { source: '/rental-software-pricing', destination: '/pricing', permanent: true },
    { source: '/rental-software-pricing/', destination: '/pricing', permanent: true },
    { source: '/rental-software-small-hire-shops', destination: '/pricing', permanent: true },
    { source: '/rental-software-small-hire-shops/', destination: '/pricing', permanent: true },
    { source: '/hot-deals', destination: '/pricing', permanent: true },
    { source: '/hot-deals/', destination: '/pricing', permanent: true },

    // Media / Videos → Demo
    { source: '/media-resources-rental-business', destination: '/demo', permanent: true },
    { source: '/media-resources-rental-business/', destination: '/demo', permanent: true },

    // Partners / Case studies → Contact
    { source: '/partner', destination: '/contact', permanent: true },
    { source: '/partner/', destination: '/contact', permanent: true },
    { source: '/use-case-consolidated-group', destination: '/about', permanent: true },
    { source: '/use-case-consolidated-group/', destination: '/about', permanent: true },

    // Spark waitlist → Contact
    { source: '/spark-waitlist', destination: '/contact', permanent: true },
    { source: '/spark-waitlist/', destination: '/contact', permanent: true },

    // Legal pages
    { source: '/terms', destination: '/terms', permanent: true },
    { source: '/privacy-policy', destination: '/privacy', permanent: true },
    { source: '/privacy-policy/', destination: '/privacy', permanent: true },
  ]

  const redirects = [internetExplorerRedirect, ...migrationRedirects]

  return redirects
}

export default redirects
