import type { Metadata } from 'next'
import Image from 'next/image'
import { Users, Zap, Shield, Heart, Target, Award, ArrowRight, User, UserRound, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { LightboxImage } from '@/components/Lightbox'
import { BreadcrumbSchema } from '@/components/StructuredData'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

// SEO metadata - ranking #2.7, improve CTR
export const metadata: Metadata = {
  title: 'About Us | Australian Equipment Rental Software Company – CloudRent',
  description:
    '100% Australian-owned rental software company. 18+ years in hire industry, 300+ global licenses. Meet the Gold Coast team building CloudRent Pro.',
  keywords: [
    'Australian rental software',
    'equipment rental software company',
    'CloudRent team',
    'hire business software Australia',
  ],
  alternates: {
    canonical: 'https://www.cloudrent.me/about/',
  },
  openGraph: mergeOpenGraph({
    title: 'About Us | Australian Equipment Rental Software Company – CloudRent',
    description:
      '100% Australian-owned rental software company. 18+ years in hire industry, 300+ global licenses. Meet the Gold Coast team building CloudRent Pro.',
    url: '/about/',
  }),
}

const leadership = [
  {
    name: 'Ron Neville',
    role: 'Founder & Chief Executive Officer',
    image: '/images/Ron-Neville-CEO.png',
    bio: "With 18 years dedicated to developing software for the hire and rental industry, Ron's vision has driven CloudRent from a simple booking tool to a comprehensive cloud-based rental management platform. His hands-on development approach—personally writing code and building features—has resulted in over 300 licenses sold globally. Ron's deep understanding of the industry, forged through partnerships with leading rental companies worldwide, ensures CloudRent Pro solves real challenges that hire businesses face every day.",
  },
  {
    name: 'Garth Kerr',
    role: 'Chief Operations Officer',
    image: '/images/Garth-Kerr-COO.png',
    bio: "A lawyer and seasoned executive with over 25 years' experience as General Counsel and business leader for global publicly listed technology companies, including TechnologyOne Ltd, CSG Systems International Inc, and Intec Telecom Systems PLC. Garth brings extensive experience in customer engagement, negotiating and securing new business, leading global teams, and managing risk while supporting sustainable growth.",
  },
  {
    name: 'Sam Girgis',
    role: 'Global Sales Manager',
    image: '/images/Sam_Girgis-Global-Sales-Manager.png',
    bio: "With 25+ years of senior sales and marketing experience in the Australian IT industry across multinational technology vendors and distributors, Sam is passionate about emerging technologies and how they reshape the world. His proven track record in creating markets for technology products and solutions drives CloudRent's global expansion.",
  },
]

const values = [
  {
    icon: Zap,
    title: 'Speed Matters',
    description:
      "We ship fast. New features in weeks, not months. Bug fixes in hours, not days. If it's not here yet, we'll build it.",
  },
  {
    icon: Heart,
    title: 'Customer Obsessed',
    description:
      "Every feature we build comes from real customer feedback. You talk, we listen. It's that simple.",
  },
  {
    icon: Shield,
    title: 'Reliability First',
    description:
      'Your business depends on us. We take that seriously with 99.9% uptime, secure data centers, and regular backups.',
  },
  {
    icon: Target,
    title: 'Purpose Built',
    description:
      "We don't try to be everything to everyone. We focus exclusively on equipment hire businesses and do it exceptionally well.",
  },
]

const stats = [
  { value: '18+', label: 'Years in hire & rental software' },
  { value: '300+', label: 'Licenses sold globally' },
  { value: '100,000+', label: 'Rentals processed' },
  { value: '99.9%', label: 'Platform uptime' },
]

const advisors = [
  {
    name: "David Duncalfe",
    company: "Excel Events",
    tag: "Industry advisor — events and government technology",
    bio: "David brings deep experience in large-scale event management and has guided CloudRent's thinking on government service integrations, including communications infrastructure and development site mapping capabilities.",
    gender: "male" as const,
  },
  {
    name: "Theo Tsorvas",
    company: "Consolidated Group",
    tag: "Industry advisor — civil and mining",
    bio: "Theo leads a 100-strong civil and mining operation working with majors including BHP and Rio Tinto. His input has shaped CloudRent's asset tracking and operational workflows for high-volume industrial hire.",
    gender: "male" as const,
  },
  {
    name: "Matt Giles",
    company: "Event Services International",
    tag: "Industry advisor — events and traffic management",
    bio: "Matt's expertise across events and traffic management has helped inform CloudRent's approach to logistics, scheduling, and the coordination demands of large-scale temporary deployments.",
    gender: "male" as const,
  },
  {
    name: "Aidan Corbley",
    company: "Corbley Event Hire",
    tag: "Industry advisor — party and events hire",
    bio: "Aidan's hands-on experience running a party and events hire business has contributed directly to CloudRent Pro's booking, inventory, and customer management workflows.",
    gender: "male" as const,
  },
  {
    name: "Keshia Dorrington",
    company: "All Fence U Rent",
    tag: "Industry advisor — temporary fencing",
    bio: "Keshia operates one of Perth's largest temporary fencing companies and has been instrumental in developing CloudRent's functionality for managing high-volume temporary fencing operations at scale.",
    gender: "female" as const,
  },
  {
    name: "Cameron Drake",
    company: "Hire Rite Temp Fencing",
    tag: "Industry advisor — temporary fencing",
    bio: "Cameron's experience in the temporary fencing sector has added further depth to CloudRent's fencing-specific workflows, ensuring the platform handles the real operational demands of the industry.",
    gender: "male" as const,
  },
  {
    name: "Dave Hasson",
    company: "Western Safety Consulting",
    tag: "Strategic partner — North America",
    bio: "Dave brings extensive expertise in workplace health and safety across the North American market and is a key partner in CloudRent's expansion into the EHS and safety management sector.",
    gender: "male" as const,
  },
  {
    name: "Craig McDonald",
    company: "Earth Communications",
    tag: "Strategic partner and shareholder",
    bio: "Craig's background spanning oil and gas MSAs across North America gives CloudRent direct insight into the compliance, asset tracking, and operational requirements of high-risk industrial environments.",
    gender: "male" as const,
  },
]

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.cloudrent.me/' },
          { name: 'About', url: 'https://www.cloudrent.me/about/' },
        ]}
      />
      <div className="min-h-screen text-white">
        {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
      </div>

      <div className="relative">
        {/* Hero */}
        <section className="px-4 pb-16 pt-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
              <Users className="h-4 w-4" />
              Built in Australia, for Australia
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              The rental software your
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                business deserves
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300">
              CloudRent Pro was born from a simple idea: equipment hire businesses deserve software that actually
              understands their industry. Not a generic tool adapted from something else, but purpose-built from the
              ground up.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl border border-purple-500/20 bg-purple-900/20 p-8 md:p-12">
            <h2 className="mb-8 text-2xl font-bold">Our Story</h2>
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
              {/* Image */}
              <div className="flex justify-center lg:w-1/3">
                <div className="relative">
                  <LightboxImage
                    src="/images/ron-neville-founder-ceo-cloudrent.webp"
                    alt="Ron Neville - Founder & CEO of CloudRent, with guitar"
                    className="w-80 rounded-2xl md:w-[22rem]"
                  />
                </div>
              </div>
              {/* Text */}
              <div className="space-y-4 text-gray-300 lg:w-2/3">
                <p>
                  CloudRent&apos;s story began in the early 2000s when founder Ron Neville, a professional musician
                  touring Australia&apos;s East Coast, needed a better way to manage his performance bookings. Unable
                  to find software that fit his needs, he built his own—and fellow musicians quickly wanted it too.
                </p>
                <p>
                  That hands-on problem-solving approach never changed. Today, CloudRent Pro is purpose-built for
                  Australian equipment hire businesses, packed with features that actually matter: AI-powered damage
                  detection, digital SWMS and safety compliance, real-time equipment tracking, native mobile apps
                  for field staff, and seamless Xero integration.
                </p>
                <p>
                  We&apos;re not a faceless corporation. We&apos;re a focused team that ships fast, listens to
                  customers, and builds what you need. No feature requests disappearing into a black hole. No waiting
                  months for basic fixes. Just real software built by people who understand the rental industry
                  inside and out.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Leadership Team</h2>
            <p className="text-gray-400">The people driving CloudRent&apos;s vision forward</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {leadership.map((person, i) => (
              <div
                key={i}
                className="rounded-2xl border border-purple-500/20 bg-purple-900/20 p-6 text-center transition-colors hover:border-purple-500/40"
              >
                <Image
                  src={person.image}
                  alt={person.name}
                  width={128}
                  height={128}
                  className="mx-auto mb-4 h-32 w-32 rounded-full object-cover border-2 border-purple-500/30"
                  loading="lazy"
                />
                <h3 className="text-xl font-semibold text-white">{person.name}</h3>
                <p className="mb-4 text-sm font-medium text-purple-400">{person.role}</p>
                <p className="text-sm leading-relaxed text-gray-300">{person.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Industry Advisors */}
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Industry advisors</h2>
            <p className="mx-auto max-w-3xl text-gray-400">
              CloudRent is shaped by the people who use it. These hire and rental professionals from across the globe
              have contributed real-world knowledge that directly influences how CloudRent Pro works.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {advisors.map((advisor, i) => (
              <div
                key={i}
                className="rounded-2xl border border-purple-500/10 bg-purple-900/10 p-5 text-center transition-colors hover:border-purple-500/30"
              >
                <div
                  className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
                    advisor.gender === 'female' ? 'bg-pink-900/40' : 'bg-purple-900/40'
                  }`}
                >
                  {advisor.gender === 'female' ? (
                    <UserRound className="h-7 w-7 text-pink-400" />
                  ) : (
                    <User className="h-7 w-7 text-purple-400" />
                  )}
                </div>
                <h3 className="text-base font-semibold text-white">{advisor.name}</h3>
                <p className="text-xs font-medium text-purple-400">{advisor.company}</p>
                <p className="mt-1 text-xs italic text-gray-500">{advisor.tag}</p>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">{advisor.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Built with AI */}
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="rounded-2xl border border-purple-500/20 bg-purple-900/20 px-8 py-12 text-center">
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-purple-400" />
            <h2 className="mb-6 text-3xl font-bold">Built with AI</h2>
            <div className="mx-auto max-w-2xl space-y-4 text-gray-300 leading-relaxed">
              <p>
                CloudRent Pro is developed using an AI-assisted development model — meaning we move faster, build
                smarter, and respond to customer needs at a pace traditional software companies simply can&apos;t match.
                Our advisors identify the problems. Our platform solves them, often within days, not months.
              </p>
              <p>
                This is why CloudRent customers across 25+ countries get a platform that genuinely reflects how their
                industry works, not how a developer imagined it might.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">What We Stand For</h2>
            <p className="text-gray-400">The principles that guide everything we do</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-purple-500/20 bg-purple-900/20 p-8 transition-colors hover:border-purple-500/40"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-purple-500/20 p-3">
                    <Icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-xl border border-purple-500/20 bg-purple-900/20 p-6 text-center"
              >
                <div className="mb-1 text-3xl font-bold text-purple-400">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Australia */}
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-900/40 to-fuchsia-900/40 p-8 md:p-12">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-purple-500/20 p-3">
                <Award className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-bold">Built for Australian Business</h2>
                <div className="space-y-3 text-gray-300">
                  <p>
                    We&apos;re not a US company that bolted on GST as an afterthought. CloudRent Pro is designed from
                    the ground up for Australian hire businesses:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                      <span>ABN validation and tracking built-in</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                      <span>GST calculations and BAS-ready reporting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                      <span>SWMS and Australian WHS compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                      <span>Data stored in Australian data centers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                      <span>Support during Australian business hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                      <span>Native Xero integration</span>
                    </li>
                  </ul>
                  <p className="mt-4">
                    See how CloudRent Pro stacks up against other rental software platforms including{' '}
                    <Link href="/cloudrent-pro-vs-hirepos/" className="text-purple-400 hover:text-purple-300 underline">HirePOS</Link>,{' '}
                    <Link href="/cloudrent-pro-vs-point-of-rental/" className="text-purple-400 hover:text-purple-300 underline">Point of Rental</Link>,{' '}
                    <Link href="/cloudrent-pro-vs-texada/" className="text-purple-400 hover:text-purple-300 underline">Texada</Link> and{' '}
                    <Link href="/cloudrent-pro-vs-booqable/" className="text-purple-400 hover:text-purple-300 underline">Booqable</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-900/60 to-fuchsia-900/60 p-8 text-center md:p-12">
            <h2 className="mb-4 text-3xl font-bold text-white">Ready to see it in action?</h2>
            <p className="mx-auto mb-8 max-w-xl text-gray-300">
              Start your $1 trial today. Just the tools your hire business needs to thrive.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="https://app.cloudrent.me/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:from-purple-400 hover:to-fuchsia-400"
              >
                Start $1 Trial
                <ArrowRight className="h-5 w-5" />
              </a>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-400/50 px-8 py-4 font-semibold text-purple-100 transition-all hover:bg-purple-500/20"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  )
}
