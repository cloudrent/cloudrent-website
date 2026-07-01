'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Check, Activity, Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { EngageCTA } from '@/components/EngageCTA'

type RoadmapStatus = 'shipped' | 'in-progress' | 'planned'
type RoadmapCategory =
  | 'Dispatch'
  | 'Invoicing'
  | 'Mobile'
  | 'Integrations'
  | 'Inventory'
  | 'Customer Portal'
  | 'Reporting'
  | 'Staff'
  | 'AI'
  | 'Safety'
  | 'Platform'

interface RoadmapItem {
  id: number
  title: string
  description: string
  status: 'shipped' | 'in-progress' | 'planned'
  category: string
  product: string
  quarter?: string | null
  learnMoreUrl?: string | null
  order?: number | null
}

interface RoadmapPageClientProps {
  items: RoadmapItem[]
}

const allCategories: RoadmapCategory[] = [
  'Dispatch',
  'Invoicing',
  'Mobile',
  'Integrations',
  'Inventory',
  'Customer Portal',
  'Reporting',
  'Staff',
  'AI',
  'Safety',
  'Platform',
]

export default function RoadmapPageClient({ items }: RoadmapPageClientProps) {
  const [activeStatus, setActiveStatus] = useState<'all' | RoadmapStatus>('all')
  const [activeCategories, setActiveCategories] = useState<RoadmapCategory[]>([])

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const statusMatch = activeStatus === 'all' || item.status === activeStatus
      const categoryMatch =
        activeCategories.length === 0 || activeCategories.includes(item.category as RoadmapCategory)
      return statusMatch && categoryMatch
    })
  }, [items, activeStatus, activeCategories])

  const shipped = filtered.filter((i) => i.status === 'shipped')
  const inProgress = filtered.filter((i) => i.status === 'in-progress')
  const planned = filtered.filter((i) => i.status === 'planned')

  // Stats computed from all items (not filtered)
  const shippedCount = items.filter((i) => i.status === 'shipped').length
  const inProgressCount = items.filter((i) => i.status === 'in-progress').length
  const plannedCount = items.filter((i) => i.status === 'planned').length

  const toggleCategory = (cat: RoadmapCategory) => {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0a0a1a] font-sans text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
      </div>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <div className="relative px-5 pb-10 pt-20 text-center">
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-5 inline-block rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-1.5 text-[15px] font-semibold uppercase tracking-wider text-purple-300">
            Updated July 2026
          </div>

          <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            CloudRent Product Roadmap
          </h1>

          <p className="mx-auto max-w-lg text-lg leading-relaxed text-gray-400">
            We build in the open. Here is what we have shipped, what we are working on right now,
            and what is coming next.
          </p>
        </div>
      </div>

      {/* ═══════════════ STATS STRIP ═══════════════ */}
      <div className="relative mx-auto mb-8 max-w-4xl px-5">
        <div className="flex flex-wrap items-center justify-center gap-6 rounded-xl border border-purple-500/20 bg-purple-900/20 px-6 py-4 md:gap-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{shippedCount}</div>
            <div className="text-sm text-gray-400">Features shipped</div>
          </div>
          <div className="hidden h-8 w-px bg-purple-500/30 md:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">{inProgressCount}</div>
            <div className="text-sm text-gray-400">In progress now</div>
          </div>
          <div className="hidden h-8 w-px bg-purple-500/30 md:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-400">{plannedCount}</div>
            <div className="text-sm text-gray-400">On the roadmap</div>
          </div>
        </div>
      </div>

      {/* ═══════════════ FILTER BAR ═══════════════ */}
      <div className="sticky top-0 z-20 border-b border-purple-500/20 bg-[#0a0a1a]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-5 py-4">
          {/* Row 1 — Status tabs */}
          <div className="mb-4 flex flex-wrap justify-center gap-1">
            {(['all', 'shipped', 'in-progress', 'planned'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={cn(
                  'cursor-pointer rounded-lg border-none px-4 py-2 text-sm font-medium transition-all',
                  activeStatus === status
                    ? 'bg-[#881ba9] text-white'
                    : 'bg-transparent text-white/60 hover:bg-white/5 hover:text-white',
                )}
              >
                {status === 'all'
                  ? 'All'
                  : status === 'shipped'
                    ? 'Shipped'
                    : status === 'in-progress'
                      ? 'In Progress'
                      : 'Planned'}
              </button>
            ))}
          </div>

          {/* Row 2 — Category pills */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategories([])}
              className={cn(
                'cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                activeCategories.length === 0
                  ? 'border border-[#881ba9] bg-[#881ba9]/20 text-white'
                  : 'border border-white/20 bg-transparent text-white/60 hover:border-white/40',
              )}
            >
              All Categories
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={cn(
                  'cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                  activeCategories.includes(cat)
                    ? 'border border-[#881ba9] bg-[#881ba9]/20 text-white'
                    : 'border border-white/20 bg-transparent text-white/60 hover:border-white/40',
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════ ROADMAP BOARD ═══════════════ */}
      <div className="relative mx-auto max-w-6xl space-y-10 px-5 py-10">
        {/* Section: Shipped */}
        {(activeStatus === 'all' || activeStatus === 'shipped') && shipped.length > 0 && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Check className="h-5 w-5 text-green-400" />
              <span className="font-semibold text-white">Shipped</span>
              <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                {shipped.length}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {shipped.map((item) => (
                <RoadmapCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Section: In Progress */}
        {(activeStatus === 'all' || activeStatus === 'in-progress') && inProgress.length > 0 && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#F97312]" />
              <span className="font-semibold text-white">In Progress</span>
              <span className="rounded-full bg-[#F97312]/20 px-2 py-0.5 text-xs font-medium text-[#F97312]">
                {inProgress.length}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {inProgress.map((item) => (
                <RoadmapCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Section: Planned */}
        {(activeStatus === 'all' || activeStatus === 'planned') && planned.length > 0 && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#3A81F6]" />
              <span className="font-semibold text-white">Planned</span>
              <span className="rounded-full bg-[#3A81F6]/20 px-2 py-0.5 text-xs font-medium text-[#3A81F6]">
                {planned.length}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {planned.map((item) => (
                <RoadmapCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-white/40">No items match filters</p>
        )}
      </div>

      {/* ═══════════════ SUGGEST A FEATURE ═══════════════ */}
      <div className="relative mx-auto max-w-2xl px-5 pb-14">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Got an idea for CloudRent?</h2>
          <p className="mb-6 text-gray-400">
            We build based on what hire businesses actually need. Tell us what would make your
            operation run better.
          </p>
          <Link
            href="/contact/?subject=Feature+suggestion"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-purple-400 hover:to-fuchsia-400"
          >
            Suggest a feature
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-6 text-sm text-white/40">Roadmap last updated July 2026</p>
        </div>
      </div>

      {/* ═══════════════ ENGAGE CTA ═══════════════ */}
      <div className="relative mx-auto max-w-5xl px-5 py-14">
        <EngageCTA />
      </div>
    </div>
  )
}

function cardBorderClass(status: 'shipped' | 'in-progress' | 'planned') {
  if (status === 'shipped') return 'border-l-[3px] border-l-[#41ab01]'
  if (status === 'in-progress') return 'border-l-[3px] border-l-[#F97312]'
  return 'border-l-[3px] border-l-[#3A81F6]'
}

function RoadmapCard({ item, showStatus }: { item: RoadmapItem; showStatus?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 transition hover:border-white/20 hover:bg-white/[0.05]',
        cardBorderClass(item.status),
      )}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-white/20 px-2 py-0.5 text-xs text-white/60">
          {item.category}
        </span>
        <span className="text-xs text-white/40">{item.product}</span>
        {showStatus && (
          <span
            className={cn(
              'ml-auto rounded-full px-2 py-0.5 text-xs font-medium',
              item.status === 'shipped' && 'bg-green-500/20 text-green-400',
              item.status === 'in-progress' && 'bg-purple-500/20 text-purple-400',
              item.status === 'planned' && 'bg-white/10 text-gray-400',
            )}
          >
            {item.status === 'shipped'
              ? 'Shipped'
              : item.status === 'in-progress'
                ? 'In Progress'
                : 'Planned'}
          </span>
        )}
      </div>
      <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
      <p className="text-sm text-white/60">{item.description}</p>
      {item.quarter && <p className="mt-2 text-xs text-purple-400">{item.quarter}</p>}
      {item.learnMoreUrl && (
        <Link
          href={item.learnMoreUrl}
          className="mt-3 inline-flex items-center gap-1 text-xs text-purple-400 transition-colors hover:text-purple-300"
        >
          Learn more <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  )
}
