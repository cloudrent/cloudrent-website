'use client'

import React from 'react'
import { Check, X, AlertCircle, Lock, ArrowRight } from 'lucide-react'
import { EngineResult } from './index'

interface TeaserResultProps {
  results: EngineResult[]
  keywords: string[]
  score: { found: number; total: number }
  onUnlock: () => void
}

export default function TeaserResult({ results, keywords, score, onUnlock }: TeaserResultProps) {
  // Get unique engines for summary
  const engineSummary = new Map<string, { label: string; found: boolean }>()
  for (const result of results) {
    if (!engineSummary.has(result.engine)) {
      engineSummary.set(result.engine, {
        label: result.engineLabel,
        found: result.status === 'found',
      })
    } else if (result.status === 'found') {
      engineSummary.get(result.engine)!.found = true
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
    if (score.found < score.total / 2) return "Your business has limited AI visibility"
    if (score.found < score.total) return "Your business has good AI visibility"
    return "Excellent! Your business is highly visible in AI search"
  }

  const getScoreColor = () => {
    if (score.found === 0) return 'text-red-400'
    if (score.found < score.total / 2) return 'text-orange-400'
    if (score.found < score.total) return 'text-yellow-400'
    return 'text-brand-green'
  }

  return (
    <div>
      {/* Score Header */}
      <div className="mb-8 text-center">
        <div className="mb-3 text-xs uppercase tracking-widest text-white/40">
          AI Visibility Score
        </div>
        <div className="flex items-baseline justify-center gap-2">
          <span className={`text-7xl font-semibold ${getScoreColor()}`}>{score.found}</span>
          <span className="text-2xl text-white/40">/ {score.total}</span>
        </div>
        <p className="mt-2 text-white/60">{getScoreMessage()}</p>
      </div>

      {/* Engine Summary Grid */}
      <div className="mb-8 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {Array.from(engineSummary.entries()).map(([engine, { label, found }]) => (
          <div
            key={engine}
            className={`rounded-xl border p-3 text-center ${
              found
                ? 'border-brand-green/30 bg-brand-green/10'
                : 'border-red-500/30 bg-red-500/10'
            }`}
          >
            {found ? (
              <Check className="mx-auto mb-1 h-5 w-5 text-brand-green" />
            ) : (
              <X className="mx-auto mb-1 h-5 w-5 text-red-400" />
            )}
            <span className="text-xs text-white/70">{label}</span>
          </div>
        ))}
      </div>

      {/* Results by Keyword */}
      <div className="space-y-4">
        {resultsByKeyword.map((group, index) => (
          <div key={group.keyword} className="relative">
            <div
              className={`rounded-xl border p-5 ${
                index === 0
                  ? 'border-brand-purple/30 bg-brand-purple/10'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {/* Blur overlay for keywords 2 and 3 */}
              {index > 0 && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-[#0e0b14]/80 backdrop-blur-sm">
                  <Lock className="mb-2 h-6 w-6 text-brand-purple" />
                  <span className="text-sm text-white/60">Unlock full report to view</span>
                </div>
              )}

              <h3 className="mb-4 text-sm font-medium text-white/70">
                Keyword {index + 1}: &quot;{group.keyword}&quot;
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {group.engines.length > 0 ? (
                  group.engines.map((engine, i) => (
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
                  ))
                ) : (
                  <div className="col-span-3 text-center text-sm text-white/40">
                    No results for this keyword
                  </div>
                )}
              </div>

              {/* Show snippet for first keyword if found */}
              {index === 0 && group.engines.some((e) => e.snippets.length > 0) && (
                <div className="mt-4 rounded-lg bg-white/5 p-3">
                  <p className="text-xs text-white/40">What AI said:</p>
                  <p className="mt-1 text-sm text-white/70">
                    {group.engines
                      .find((e) => e.snippets.length > 0)
                      ?.snippets[0]?.substring(0, 200)}
                    ...
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-8 rounded-2xl border border-brand-purple/30 bg-gradient-to-br from-brand-purple/20 to-brand-purple/5 p-6 text-center">
        <Lock className="mx-auto mb-3 h-8 w-8 text-brand-purple" />
        <h3 className="mb-2 text-xl font-semibold text-white">
          Unlock Your Full AI Visibility Report
        </h3>
        <p className="mb-6 text-white/60">
          Get detailed insights for all keywords, see exactly what AI says about you, and receive
          personalized recommendations to improve your visibility.
        </p>
        <button
          onClick={onUnlock}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-purple px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/25"
        >
          Enter Details to Unlock
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}
