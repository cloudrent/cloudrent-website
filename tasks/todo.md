# CloudRent Links Page: To Do

## Phase 1: QuickLinks collection
- [x] Create QuickLinks collection with all required fields
- [x] Add to payload.config.ts
- [x] Run migrations / regenerate types
- [x] Seed the four launch links (via migration)
- [ ] Verify collection visible in Payload admin on live deployment

## Phase 2: Public links page
- [ ] Add Plus Jakarta Sans + JetBrains Mono fonts to links layout
- [ ] Extend middleware for links.cloudrent.me subdomain
- [ ] Build links page matching mockup design
- [ ] Test fetch pattern with ISR revalidation
- [ ] Verify page renders CMS content on subdomain

## Phase 3: Redirect route with click logging
- [ ] Create /go/[slug] route handler
- [ ] Implement Payload clicks increment (fire and forget)
- [ ] Handle unknown/disabled slugs gracefully
- [ ] Verify instant 302 redirect with no interstitial

## Phase 4: Add to home screen support
- [ ] Generate icon sizes (512px, 192px, 180px) from apple-touch-icon.png
- [ ] Create manifest.webmanifest
- [ ] Add apple-touch-icon and iOS meta tags
- [ ] Test on real device / accurate simulation
