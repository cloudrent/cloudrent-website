'use client'

import React from 'react'
import { Check, X, AlertCircle, Mail, ExternalLink, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { EngineResult } from './index'

interface FullReportProps {
  results: EngineResult[]
  keywords: string[]
  businessName: string
  score: { found: number; total: number }
  email: string
}

export default function FullReport({
  results,
  keywords,
  businessName,
  score,
  email,
}: FullReportProps) {
  // Get unique engines for summary
  const engineSummary = new Map<string, { label: string; found: boolean; snippets: string[] }>()
  for (const result of results) {
    if (!engineSummary.has(result.engine)) {
      engineSummary.set(result.engine, {
        label: result.engineLabel,
        found: result.status === 'found',
        snippets: result.snippets,
      })
    } else {
      const existing = engineSummary.get(result.engine)!
      if (result.status === 'found') {
        existing.found = true
        existing.snippets = [...existing.snippets, ...result.snippets]
      }
    }
  }

  // Group results by keyword
  const resultsByKeyword = keywords
    .filter((k) => k.trim())
    .map((keyword) => ({
      keyword,
      engines: results.filter((r) => r.keyword === keyword),
    }))

  const getScoreMessage = () => {
    if (score.found === 0) return "Your business wasn't found in any AI search engine"
    if (score.found < score.total / 2) return 'Your business has limited AI visibility'
    if (score.found < score.total) return 'Your business has good AI visibility'
    return 'Excellent! Your business is highly visible in AI search'
  }

  const getScoreColor = () => {
    if (score.found === 0) return 'text-red-400'
    if (score.found < score.total / 2) return 'text-orange-400'
    if (score.found < score.total) return 'text-yellow-400'
    return 'text-brand-green'
  }

  return (
    <div>
      {/* Email Sent Confirmation */}
      <div className="mb-8 flex items-center justify-center gap-3 rounded-xl border border-brand-green/30 bg-brand-green/10 px-4 py-3">
        <Mail className="h-5 w-5 text-brand-green" />
        <span className="text-brand-green">
          Full report sent to <strong>{email}</strong>
        </span>
      </div>

      {/* Score Header */}
      <div className="mb-8 rounded-2xl border border-brand-purple/30 bg-gradient-to-br from-brand-purple/20 to-brand-purple/5 p-8 text-center">
        <div className="mb-3 text-xs uppercase tracking-widest text-white/40">
          AI Visibility Score for {businessName}
        </div>
        <div className="flex items-baseline justify-center gap-2">
          <span className={`text-7xl font-semibold ${getScoreColor()}`}>{score.found}</span>
          <span className="text-2xl text-white/40">/ {score.total}</span>
        </div>
        <p className="mt-2 text-white/60">{getScoreMessage()}</p>
      </div>

      {/* Engine Summary Grid */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-white">Engine-by-Engine Results</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from(engineSummary.entries()).map(([engine, { label, found, snippets }]) => (
            <div
              key={engine}
              className={`rounded-xl border p-4 ${
                found
                  ? 'border-brand-green/30 bg-brand-green/10'
                  : 'border-red-500/30 bg-red-500/10'
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                {found ? (
                  <Check className="h-5 w-5 text-brand-green" />
                ) : (
                  <X className="h-5 w-5 text-red-400" />
                )}
                <span className="font-medium text-white">{label}</span>
              </div>
              {found && snippets.length > 0 && (
                <p className="text-sm text-white/60">
                  {snippets[0]?.substring(0, 100)}...
                </p>
              )}
              {!found && (
                <p className="text-sm text-white/50">Not mentioned in search results</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Results by Keyword */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-white">Results by Keyword</h3>
        <div className="space-y-4">
          {resultsByKeyword.map((group, index) => (
            <div
              key={group.keyword}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <h4 className="mb-4 text-sm font-medium text-brand-purple">
                Keyword {index + 1}: &quot;{group.keyword}&quot;
              </h4>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {group.engines.map((engine, i) => (
                  <div
                    key={`${engine.engine}-${i}`}
                    className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2"
                  >
                    {engine.status === 'found' && (
                      <Check className="h-4 w-4 flex-shrink-0 text-brand-green" />
                    )}
                    {engine.status === 'not_found' && (
                      <X className="h-4 w-4 flex-shrink-0 text-red-400" />
                    )}
                    {(engine.status === 'timeout' || engine.status === 'error') && (
                      <AlertCircle className="h-4 w-4 flex-shrink-0 text-yellow-400" />
                    )}
                    <span className="truncate text-sm text-white/80">{engine.engineLabel}</span>
                  </div>
                ))}
              </div>

              {/* Show snippets if any found */}
              {group.engines.some((e) => e.snippets.length > 0) && (
                <div className="mt-4 space-y-2">
                  {group.engines
                    .filter((e) => e.snippets.length > 0)
                    .map((e, i) => (
                      <div key={i} className="rounded-lg bg-white/5 p-3">
                        <p className="mb-1 text-xs text-brand-purple">{e.engineLabel} says:</p>
                        <p className="text-sm text-white/70">{e.snippets[0]}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-white">How to Improve Your AI Visibility</h3>
        <div className="space-y-3">
          {[
            {
              title: 'Build a strong online presence',
              description:
                'Create quality content about your services. AI search engines pull from authoritative sources with detailed, helpful information.',
            },
            {
              title: 'Get listed on industry directories',
              description:
                'Register on hire industry directories, Google Business Profile, and review platforms. These are trusted sources for AI search.',
            },
            {
              title: 'Optimize for structured data',
              description:
                'Use schema markup on your website to help AI understand your business details, services, and location.',
            },
            {
              title: 'Encourage customer reviews',
              description:
                'Positive reviews on Google, Trustpilot, and industry platforms signal trustworthiness to AI systems.',
            },
          ].map((rec, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-purple text-sm font-bold text-white">
                {i + 1}
              </div>
              <div>
                <h4 className="font-medium text-white">{rec.title}</h4>
                <p className="text-sm text-white/60">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Card */}
      <div className="rounded-2xl border border-brand-purple/30 bg-gradient-to-br from-brand-purple/20 to-brand-purple/5 p-8 text-center">
        <Sparkles className="mx-auto mb-4 h-10 w-10 text-brand-purple" />
        <h3 className="mb-2 text-2xl font-semibold text-white">
          CloudRent Pro Helps You Get Found
        </h3>
        <p className="mb-6 text-white/60">
          Our platform automatically optimizes your online presence with structured data,
          SEO-optimized equipment pages, and integration with major search platforms.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/try?utm_source=ai_visibility&utm_medium=web&utm_campaign=report"
            className="inline-flex items-center gap-2 rounded-full bg-brand-purple px-8 py-4 font-semibold text-white transition-all hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Start Free Trial
            <ExternalLink className="h-4 w-4" />
          </Link>
          <Link
            href="/demo?utm_source=ai_visibility&utm_medium=web&utm_campaign=report"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition-all hover:bg-white/5"
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </div>
  )
}
