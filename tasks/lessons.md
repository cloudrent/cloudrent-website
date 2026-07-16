# CloudRent Links Page: Lessons Learned

## Phase 0

1. **Subdomain pattern established**: The help.cloudrent.me subdomain uses middleware rewrite, not vercel.json rewrites. This pattern works well and should be replicated for links.cloudrent.me.

2. **Font loading is per-layout**: The main site uses Inter only. Plus Jakarta Sans and JetBrains Mono need to be added specifically to the links page layout via next/font/google.

3. **Icon assets are raster-in-SVG**: The CloudRent hexagon logo SVGs contain embedded 456x494 PNGs, not true vector artwork. The existing apple-touch-icon.png (500x500) is an acceptable high-quality source.

4. **GA4 is client-side only**: Events are pushed to dataLayer for GTM processing. No server-side Measurement Protocol integration exists. For instant 302 redirects, the Payload clicks counter is the primary tracking mechanism.

5. **ISR revalidation at 60 seconds**: The roadmap page uses `export const revalidate = 60` for incremental static regeneration. This pattern should be mirrored for the links page.
