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
    { source: '/privacy-policy', destination: '/privacy/', permanent: true },
    { source: '/privacy-policy/', destination: '/privacy/', permanent: true },

    // Blog redirect (WordPress compatibility)
    { source: '/blog', destination: '/posts/', permanent: true },
    { source: '/blog/', destination: '/posts/', permanent: true },
    { source: '/blog/:slug', destination: '/posts/:slug/', permanent: true },
    { source: '/blog/:slug/', destination: '/posts/:slug/', permanent: true },

    // Old blog post URLs (WordPress slugs without /posts/ prefix)
    { source: '/why-film-crews-are-using-cloudrent-rental-software', destination: '/posts/why-film-crews-are-using-cloudrent-rental-software/', permanent: true },
    { source: '/why-film-crews-are-using-cloudrent-rental-software/', destination: '/posts/why-film-crews-are-using-cloudrent-rental-software/', permanent: true },
    { source: '/the-ultimate-software-for-sub-rental-or-cross-hire', destination: '/posts/the-ultimate-software-for-sub-rental-or-cross-hire/', permanent: true },
    { source: '/the-ultimate-software-for-sub-rental-or-cross-hire/', destination: '/posts/the-ultimate-software-for-sub-rental-or-cross-hire/', permanent: true },
    { source: '/great-delivery-tips', destination: '/posts/great-delivery-tips/', permanent: true },
    { source: '/great-delivery-tips/', destination: '/posts/great-delivery-tips/', permanent: true },
    { source: '/why-more-people-are-turning-to-renting-items-instead-of-buying', destination: '/posts/why-more-people-are-turning-to-renting-items-instead-of-buying/', permanent: true },
    { source: '/why-more-people-are-turning-to-renting-items-instead-of-buying/', destination: '/posts/why-more-people-are-turning-to-renting-items-instead-of-buying/', permanent: true },
    { source: '/revolutionizing-rental-business-marketing-with-chatgpt-integration', destination: '/posts/revolutionizing-rental-business-marketing-with-chatgpt-integration/', permanent: true },
    { source: '/revolutionizing-rental-business-marketing-with-chatgpt-integration/', destination: '/posts/revolutionizing-rental-business-marketing-with-chatgpt-integration/', permanent: true },
    { source: '/manage-your-rental-business-on-the-go-with-cloudrents-mobile-app', destination: '/posts/manage-your-rental-business-on-the-go-with-cloudrents-mobile-app/', permanent: true },
    { source: '/manage-your-rental-business-on-the-go-with-cloudrents-mobile-app/', destination: '/posts/manage-your-rental-business-on-the-go-with-cloudrents-mobile-app/', permanent: true },
    { source: '/introducing-garth-kerr-cloudrents-new-chief-operating-officer', destination: '/posts/introducing-garth-kerr-cloudrents-new-chief-operating-officer/', permanent: true },
    { source: '/introducing-garth-kerr-cloudrents-new-chief-operating-officer/', destination: '/posts/introducing-garth-kerr-cloudrents-new-chief-operating-officer/', permanent: true },
    { source: '/executive-interview-with-cloudrent-ceo-ron-neville', destination: '/posts/executive-interview-with-cloudrent-ceo-ron-neville/', permanent: true },
    { source: '/executive-interview-with-cloudrent-ceo-ron-neville/', destination: '/posts/executive-interview-with-cloudrent-ceo-ron-neville/', permanent: true },
    { source: '/the-ultimate-guide-to-seo-for-inventory-rental-companies', destination: '/posts/the-ultimate-guide-to-seo-for-inventory-rental-companies/', permanent: true },
    { source: '/the-ultimate-guide-to-seo-for-inventory-rental-companies/', destination: '/posts/the-ultimate-guide-to-seo-for-inventory-rental-companies/', permanent: true },
    { source: '/cloudrent-investment-opportunities', destination: '/about/', permanent: true },
    { source: '/cloudrent-investment-opportunities/', destination: '/about/', permanent: true },
    { source: '/revolutionizing-rental-efficiency-unlock-the-power-of-qr-codes', destination: '/posts/revolutionizing-rental-efficiency-unlock-the-power-of-qr-codes/', permanent: true },
    { source: '/revolutionizing-rental-efficiency-unlock-the-power-of-qr-codes/', destination: '/posts/revolutionizing-rental-efficiency-unlock-the-power-of-qr-codes/', permanent: true },
    { source: '/what-event-planners-wish-audio-visual-rental-companies-knew', destination: '/posts/what-event-planners-wish-audio-visual-rental-companies-knew/', permanent: true },
    { source: '/what-event-planners-wish-audio-visual-rental-companies-knew/', destination: '/posts/what-event-planners-wish-audio-visual-rental-companies-knew/', permanent: true },
    { source: '/factors-to-consider-while-choosing-a-rental-management-software', destination: '/posts/factors-to-consider-while-choosing-online-equipment-rental-software/', permanent: true },
    { source: '/factors-to-consider-while-choosing-a-rental-management-software/', destination: '/posts/factors-to-consider-while-choosing-online-equipment-rental-software/', permanent: true },
    { source: '/factors-to-consider-while-choosing-online-equipment-rental-software', destination: '/posts/factors-to-consider-while-choosing-online-equipment-rental-software/', permanent: true },
    { source: '/factors-to-consider-while-choosing-online-equipment-rental-software/', destination: '/posts/factors-to-consider-while-choosing-online-equipment-rental-software/', permanent: true },
    { source: '/home-items-you-didnt-know-you-can-rent', destination: '/posts/home-items-you-didnt-know-you-can-rent/', permanent: true },
    { source: '/home-items-you-didnt-know-you-can-rent/', destination: '/posts/home-items-you-didnt-know-you-can-rent/', permanent: true },
    { source: '/top-benefits-inventory-rental-scheduling-software', destination: '/posts/top-benefits-inventory-rental-scheduling-software/', permanent: true },
    { source: '/top-benefits-inventory-rental-scheduling-software/', destination: '/posts/top-benefits-inventory-rental-scheduling-software/', permanent: true },
    { source: '/top-7-benefits-of-rental-scheduling-software-in-2022', destination: '/posts/top-benefits-inventory-rental-scheduling-software/', permanent: true },
    { source: '/top-7-benefits-of-rental-scheduling-software-in-2022/', destination: '/posts/top-benefits-inventory-rental-scheduling-software/', permanent: true },
    { source: '/hria-article-august-2023', destination: '/posts/', permanent: true },
    { source: '/hria-article-august-2023/', destination: '/posts/', permanent: true },

    // Old page redirects
    { source: '/our-company', destination: '/about/', permanent: true },
    { source: '/our-company/', destination: '/about/', permanent: true },
    { source: '/aboutus', destination: '/about/', permanent: true },
    { source: '/aboutus/', destination: '/about/', permanent: true },
    { source: '/investors', destination: '/about/', permanent: true },
    { source: '/investors/', destination: '/about/', permanent: true },
    { source: '/get-started', destination: '/demo/', permanent: true },
    { source: '/get-started/', destination: '/demo/', permanent: true },
    { source: '/30daytrial', destination: '/demo/', permanent: true },
    { source: '/30daytrial/', destination: '/demo/', permanent: true },
    { source: '/video', destination: '/videos/', permanent: true },
    { source: '/video/', destination: '/videos/', permanent: true },
    { source: '/media', destination: '/videos/', permanent: true },
    { source: '/media/', destination: '/videos/', permanent: true },
    { source: '/intro', destination: '/', permanent: true },
    { source: '/intro/', destination: '/', permanent: true },
    { source: '/landingpage', destination: '/demo/', permanent: true },
    { source: '/landingpage/', destination: '/demo/', permanent: true },
    { source: '/landingpage-mobile', destination: '/mobile-app/', permanent: true },
    { source: '/landingpage-mobile/', destination: '/mobile-app/', permanent: true },
    { source: '/my-account', destination: 'https://app.cloudrent.me/', permanent: true },
    { source: '/my-account/', destination: 'https://app.cloudrent.me/', permanent: true },
    { source: '/support-portal', destination: 'https://help.cloudrent.me/', permanent: true },
    { source: '/support-portal/', destination: 'https://help.cloudrent.me/', permanent: true },
    { source: '/rental-inventory', destination: '/features/', permanent: true },
    { source: '/rental-inventory/', destination: '/features/', permanent: true },
    { source: '/ai', destination: '/features#damage/', permanent: true },
    { source: '/ai/', destination: '/features#damage/', permanent: true },

    // Feature/Module pages
    { source: '/module/cloudrent-inventory', destination: '/features/', permanent: true },
    { source: '/module/cloudrent-inventory/', destination: '/features/', permanent: true },
    { source: '/module/cloud-based-web-app', destination: '/web-portal/', permanent: true },
    { source: '/module/cloud-based-web-app/', destination: '/web-portal/', permanent: true },
    { source: '/module/online-web-store', destination: '/web-portal/', permanent: true },
    { source: '/module/online-web-store/', destination: '/web-portal/', permanent: true },
    { source: '/features/mobile', destination: '/mobile-app/', permanent: true },
    { source: '/features/mobile/', destination: '/mobile-app/', permanent: true },
    { source: '/features/inventory-rental', destination: '/features/', permanent: true },
    { source: '/features/inventory-rental/', destination: '/features/', permanent: true },
    { source: '/features/innovative-integrated-rental-software', destination: '/features/', permanent: true },
    { source: '/features/innovative-integrated-rental-software/', destination: '/features/', permanent: true },
    { source: '/rentcheck-forms', destination: '/features/', permanent: true },
    { source: '/rentcheck-forms/', destination: '/features/', permanent: true },

    // Old product/feature pages
    { source: '/driveguard360-rugged-dual-hd-connected-camera-system', destination: '/features#safety/', permanent: true },
    { source: '/driveguard360-rugged-dual-hd-connected-camera-system/', destination: '/features#safety/', permanent: true },
    { source: '/tempfencepanels', destination: '/', permanent: true },
    { source: '/tempfencepanels/', destination: '/', permanent: true },

    // Category/Author pages → Blog
    { source: '/category/:slug', destination: '/posts/', permanent: true },
    { source: '/category/:slug/', destination: '/posts/', permanent: true },
    { source: '/author/:slug', destination: '/posts/', permanent: true },
    { source: '/author/:slug/', destination: '/posts/', permanent: true },
    { source: '/author/:slug/page/:page', destination: '/posts/', permanent: true },
    { source: '/author/:slug/page/:page/', destination: '/posts/', permanent: true },
    { source: '/blog-post-categories/:slug', destination: '/posts/', permanent: true },
    { source: '/blog-post-categories/:slug/', destination: '/posts/', permanent: true },

    // Template/misc pages
    { source: '/template-pages/:slug', destination: '/', permanent: true },
    { source: '/template-pages/:slug/', destination: '/', permanent: true },
  ]

  const redirects = [internetExplorerRedirect, ...migrationRedirects]

  return redirects
}

export default redirects
