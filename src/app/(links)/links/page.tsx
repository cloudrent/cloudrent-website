import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

async function getQuickLinks() {
  const payload = await getPayload({ config })

  const now = new Date().toISOString()

  const { docs } = await payload.find({
    collection: 'quick-links',
    where: {
      and: [
        { enabled: { equals: true } },
        {
          or: [{ visibleFrom: { exists: false } }, { visibleFrom: { less_than_equal: now } }],
        },
        {
          or: [{ visibleUntil: { exists: false } }, { visibleUntil: { greater_than: now } }],
        },
      ],
    },
    sort: 'sortOrder',
    limit: 100,
  })

  return docs
}

function HexagonOutline({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 110" aria-hidden="true">
      <polygon
        points="50,2 96,29 96,81 50,108 4,81 4,29"
        fill="none"
        stroke="#881ba9"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg
      className="w-4 h-4 flex-none opacity-70"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default async function LinksPage() {
  const links = await getQuickLinks()

  return (
    <>
      {/* Ambient hexagon field */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <HexagonOutline className="absolute -top-20 -right-[120px] w-[380px] opacity-5" />
        <HexagonOutline className="absolute -bottom-28 -left-24 w-[260px] opacity-5" />
      </div>

      <main className="relative z-10 min-h-screen flex justify-center">
        <div className="w-full max-w-[380px] px-6 pt-12 pb-10 flex flex-col items-center">
          {/* Logo */}
          <div className="w-[100px] h-[100px] mb-5 flex items-center justify-center">
            <Image
              src="/links/cloudrent-logo.png"
              alt="CloudRent"
              width={100}
              height={100}
              className="w-[100px] h-[100px]"
              priority
            />
          </div>

          {/* Wordmark */}
          <h1 className="text-[30px] font-normal tracking-[-0.015em] mb-2">
            Cloud<span className="text-[#9c27c2] font-medium">Rent</span>
          </h1>

          {/* Tagline */}
          <p className="text-[#9ca3af] text-[15px] leading-relaxed text-center max-w-[300px] mb-9">
            Equipment rental software for growing businesses
          </p>

          {/* Links */}
          <div className="w-full flex flex-col gap-3.5">
            {links.map((link) => (
              <Link
                key={link.id}
                href={`/go/${link.slug}`}
                className="relative flex items-center justify-between w-full px-[22px] py-[18px] bg-gradient-to-br from-[#881ba9] to-[#4a0e5e] border border-[rgba(136,27,169,0.25)] rounded-[14px] text-[#f5f5f7] text-base font-medium transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(136,27,169,0.4)] focus-visible:outline-2 focus-visible:outline-[#9c27c2] focus-visible:outline-offset-[3px] active:translate-y-0"
              >
                <div>
                  <span>{link.label}</span>
                  {link.subline && (
                    <span className="block font-normal text-[13px] text-[rgba(245,245,247,0.7)] mt-0.5">
                      {link.subline}
                    </span>
                  )}
                </div>
                <ChevronRight />
              </Link>
            ))}

            {links.length === 0 && (
              <div className="text-center text-[#9ca3af] py-8">No links available</div>
            )}
          </div>

          {/* Add to home screen hint */}
          <div className="mt-9 w-full bg-[#12122a] border border-[rgba(255,255,255,0.06)] rounded-[14px] px-[18px] py-4 flex gap-3.5 items-center">
            <Image
              src="/links/cloudrent-logo.png"
              alt=""
              width={40}
              height={40}
              className="w-[40px] h-[40px] flex-none"
              aria-hidden="true"
            />
            <p className="text-[13px] leading-relaxed text-[#9ca3af]">
              <strong className="text-[#f5f5f7] font-medium">Add to home screen</strong> for quick
              access any time
            </p>
          </div>

          {/* Footer */}
          <footer className="mt-10 flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/cloudrent/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9ca3af] hover:text-[#f5f5f7] transition-colors"
              aria-label="CloudRent on LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://www.cloudrent.me"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-jetbrains)] text-sm text-[#9ca3af] hover:text-[#f5f5f7] transition-colors"
            >
              cloudrent.me
            </a>
          </footer>
        </div>
      </main>
    </>
  )
}
