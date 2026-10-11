Repo: /Users/cloudrentimac/projects/cloudrent/cloudrent-website
Worktree for this phase: /Users/cloudrentimac/worktrees/website-launch-offer-removal
Branch for this phase: feat/launch-offer-removal

# Launch partner offer removal and pricing copy (marketing site) - Phase 1 build, v2

Date: 11 October 2026
Owner: Ron
Phase: 1 of 2. Build on the feature branch only. Hard stop at the end.
This file replaces the 9 October Phase 1 prompt. Phase 0 and its gap closures are accepted. This file is the source of truth.

## Decisions locked by Ron

1. The launch partner offer is removed from every public page of this site. It will not return.
2. $1 first month: $1 for the first 30 days, then the subscription continues on the Professional plan at $85 per user per month. Cancel anytime.
3. Plan prices: Starter $49, Professional $85, Business $129 per user per month, AUD ex GST.
4. App licensing: the Command mobile app is $10 per user per month. Each paid user includes two Crew app logins. Extra Crew logins are $10 per month each. The driver app is no longer described as free or unlimited.
5. The 30-day money-back guarantee stays as a general promise. Do not edit the TestimonialsSection badges.
6. The phrase "free data migration" goes wherever it still appears. The "Migration Assistance" badge stays as it is.
7. LaunchPopup and TrialPopup are unmounted dead code. Delete both.
8. The Terms of Service page is out of scope. Do not edit it.

## Rules

1. Work only in the worktree and branch named at the top of this file. Never commit to main. Never push to main. Never merge. Never open or merge a pull request.
2. A push to main auto-deploys production on Vercel. Pushing `feat/launch-offer-removal` is allowed and expected.
3. Do not create branches, worktrees or folders. Ron created them.
4. No deploy commands. No Vercel CLI.
5. No writes to Payload CMS or any database. No migrations. No seed scripts.
6. Edit only the files listed in this prompt. If a search finds a reference in any other file, report it and do not edit it.
7. Do not touch `src/app/(standalone)/dollar-offer/`, `src/app/(frontend)/terms/`, `src/components/TestimonialsSection/` or `src/app/(frontend)/[slug]/page.tsx`.
8. Locate code by the section markers and strings named below, not by line number. Line numbers from Phase 0 are hints only.
9. No new dependencies. No refactors. No new sections. No copy beyond what this prompt specifies. Use the copy exactly as written here.
10. Do not invent environment values. If a command needs an env variable you do not have, stop and report.
11. Paste raw output inside your reply text. Collapsed tool output does not count as evidence. No summary in place of output. No self-grading.
12. Do not print secrets.

## First output (before any edit)

Paste raw output of:

1. `pwd`
2. `git branch --show-current`
3. `git status`
4. `git fetch origin` then `git log origin/main..HEAD --oneline`
5. The `scripts` section of `package.json`
6. `ls *lock*`

Stop if any of these is true:

- `pwd` is not the worktree path at the top of this file.
- The branch is not `feat/launch-offer-removal`.
- `git status` shows uncommitted changes.
- `git log origin/main..HEAD` shows any commit other than commits adding prompt files under `tasks/`. This means an earlier session already changed code on this branch.

## Task 1 - Delete the launch route and dead components

Delete:

1. `src/app/(frontend)/launch/page.tsx`
2. `src/app/(frontend)/launch/LaunchPageClient.tsx`
3. `src/components/LaunchPopup/` (whole folder)
4. `src/components/TrialPopup/` (whole folder)

Before deleting 3 and 4, grep `src` for `LaunchPopup` and `TrialPopup` and paste the output. Phase 0 found no imports or mounts. If you find one, stop and report.

Then update the two code comments naming TrialPopup so they no longer name a deleted component:

- `src/app/embed/layout.tsx` (comment near line 27)
- `src/app/(landing)/layout.tsx` (comment near line 51)

## Task 2 - Homepage

File: `src/app/(frontend)/HomePageClient.tsx`

Remove:

1. The whole block under the `COUNTDOWN BANNER` marker comment.
2. The `useCountdown` hook under the `COUNTDOWN HOOK` marker, its `TimeLeft` type if nothing else uses it, and the `useCountdown()` call inside the component.
3. The benefits array under the `LAUNCH PARTNER BENEFITS DATA` marker.
4. The whole section under the `LAUNCH PARTNER SECTION` marker, from the marker comment to the section's closing tag. This includes the price comparison, the spots counter, the countdown timer, the CTA to `app.cloudrent.me/launch`, and the trust line holding "30-day money-back guarantee", "Cancel anytime" and "Free data migration".
5. Imports left unused by the removals above.

Do not change any other section of the homepage. Do not add a replacement section.

## Task 3 - Hero

File: `src/heros/ImmersiveHero/index.tsx`

Remove:

1. The `useCountdown` function under the `COUNTDOWN` marker.
2. The `const countdown = useCountdown()` call.
3. The eyebrow block under the comment `Eyebrow — live countdown`, including the line "Launch offer · $85/user/month locked for life".
4. Imports and variables left unused, including `expired` if nothing else reads it.

## Task 4 - Pricing page: remove the offer

File: `src/app/(frontend)/pricing/page.client.tsx`

Remove:

1. The block under the `LAUNCH OFFER BANNER` marker.
2. The block under the `LAUNCH OFFER CALLOUT` marker, including the link to `/launch`.
3. The FAQ entry with the question "Do Launch Customers keep their pricing forever?".
4. Imports and state left unused.

## Task 5 - Pricing page: app licensing and first month copy

File: `src/app/(frontend)/pricing/page.client.tsx`

Paste each existing string with its line number before editing. Then make these five edits and nothing else.

5.1 Strip under the plan cards. Find the text `Mobile App: $10/user/mo` with `Driver App: Free` and its sub-line "Available as add-ons to any plan. Offline sync, barcode scanning, push notifications."

Replace the heading text with:
`Command mobile app: $10/user/mo • Crew app: 2 logins per paid user`

Replace the sub-line with:
`Command is an add-on to any plan. Crew logins are included with every paid user. Offline sync, barcode scanning, push notifications.`

5.2 Add-on card "Mobile App Access".

- Title: `CloudRent Command`
- Price: `$10/user/mo` (unchanged)
- Description: `Mobile app for managers and admins, with offline sync`

5.3 Add-on card "Driver App".

- Title: `CloudRent Crew`
- Price label: `2 logins per paid user`
- Description: `Driver and workshop app. Assigned jobs, accept or decline, GPS clock-in. Extra logins $10/mo each.`

5.4 FAQ "What does 'per user' mean?". Replace the answer with:

"Each person who logs in to the CloudRent Pro web app counts as a user. The Command mobile app is $10 per user per month. Each paid user includes two Crew app logins for drivers and workshop staff. Extra Crew logins are $10 per month each."

5.5 FAQ "What happens after my 30-day access?". Replace the answer with:

"After your first 30 days, your subscription continues on the Professional plan at $85 per user per month. Cancel anytime before then and you pay nothing more. All your data stays in place, and you change plans whenever you like."

File: `src/app/(frontend)/pricing/page.tsx` (metadata, two places near lines 10 and 23)

Replace both descriptions with:

`Transparent rental software pricing. Starter $49, Professional $85, Business $129 per user per month. $1 for your first month. Cancel anytime.`

Paste before and after for both.

## Task 6 - /trial landing page

File: `src/app/(landing)/trial/TrialPageClient.tsx`

Paste the full FAQ entry near line 20 and the full paragraph near lines 190-205 before editing.

FAQ answer near line 20. Replace the whole answer string with:

"After your first month, your subscription continues at A$85 per user per month on the Professional plan. We'll remind you before your first month ends, and you can cancel in one click beforehand."

Paragraph near lines 197-198. Rewrite only the sentence holding "locked for life for the first 100 customers". The new sentence opens with the text below and keeps whatever follows "Cancel anytime in one click" in the existing sentence:

"$1 for your first month, then A$85 per user per month on the Professional plan. Cancel anytime in one click"

Do not edit any other copy on this page. Paste before and after for both edits.

## Task 7 - Structured data and llms.txt

File: `src/components/StructuredData/index.tsx` (FAQ answer near line 202)

Replace the answer text with:

"Most businesses are running on CloudRent Pro within a week. Direct onboarding support and a 30-day money-back guarantee are included. Migration assistance is available."

File: `public/llms.txt`

1. Line 17. Replace the Pricing line with:
   `- [Pricing](https://www.cloudrent.me/pricing/): Starter $49, Professional $85 and Business $129 per user per month, AUD ex GST. $1 for your first month. Command mobile app $10 per user per month. Two Crew app logins included per paid user.`
2. Near line 30. Change the phrase `$1 trial` to `$1 first month`. Paste the full line before and after. Change nothing else on that line.

## Task 8 - Sitemap, IndexNow, redirects, popup exclusions

1. `next-sitemap.config.cjs`: remove the `/launch` entry.
2. `src/app/api/indexnow/route.ts`: remove `'/launch/'` from the URL list.
3. `redirects.js`: add these two entries beside the existing page redirects:
   ```
   { source: '/launch', destination: '/pricing/', permanent: true },
   { source: '/launch/', destination: '/pricing/', permanent: true },
   ```
4. `src/components/popups/AIVisibilityPopup.tsx` and `src/components/popups/RevenueLeakPopup.tsx`: remove `'/launch'` from `EXCLUDED_PATHS`.

## Task 9 - Image

Grep the repo for `founders-club`. If no reference remains after Tasks 1 and 2, delete `public/images/cloudrent-founders-club.webp`. If any reference remains, stop and report.

## Task 10 - Sweep for leftovers

Run each search case-insensitive across the repo, excluding `node_modules`, `.next` and `tasks/`. Paste raw output for each.

Expected zero hits:

- `launch partner`
- `launch customer`
- `launch offer`
- `first 100`
- `spots`
- `locked in`
- `locked for life`
- `founders-club`
- `Never Pay More`
- `Closing Soon`
- `almost gone`
- `Save $44`
- `app.cloudrent.me/launch`
- `LaunchPopup`
- `TrialPopup`
- `useCountdown`
- `Foundation Customer`
- `Driver App: Free`
- `always free`
- `for 14 days`

Expected hits only in `redirects.js`:

- `/launch`

Report every hit, edit nothing further. Ron decides on each:

- `unlimited`
- `driver app`
- `mobile app`
- `forever`
- `free data migration`
- `data migration`
- `money-back` and `money back`
- `free trial`
- `$1 trial`
- `no credit card`
- `no setup`
- `choose a plan`

## Task 11 - Checks

1. Run the repo's lint script. Paste full raw output.
2. Run `npx tsc --noEmit`. Paste full raw output. If the repo had type errors before this change, prove it by running the same command against `origin/main` in a way that leaves this worktree untouched, or state plainly you did not compare.
3. Run the repo's build script. Paste the full raw output. If the build needs env variables or a database you do not have, stop and report the missing variable names. Do not invent values.

## Task 12 - Commit and push

1. Paste `git status` and `git diff --stat`.
2. Paste the full `git diff` in your reply text.
3. Commit with message: `remove launch partner offer, update pricing and app licensing copy`
4. Push to `origin feat/launch-offer-removal`. Paste the push output.
5. State the commit hash.

## Phase 1 report format

1. First output block.
2. Task 1 to Task 9: what changed per file, with before and after where this prompt asks for it.
3. Task 10 raw sweep output, one section per term.
4. Task 11 raw check output.
5. Task 12 raw git output and the commit hash.
6. Anything found outside the listed files.
7. Anything in this prompt you did not do, and why.

## STOP

End of Phase 1. Do not merge, open a pull request, deploy or touch main. Ron checks the Vercel preview and merges himself.
