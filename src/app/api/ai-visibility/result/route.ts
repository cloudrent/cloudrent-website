import { NextResponse } from 'next/server'

export interface EngineResult {
  engine: 'google' | 'google_ai' | 'chatgpt' | 'perplexity' | 'copilot' | 'gemini'
  engineLabel: string
  keyword: string
  status: 'found' | 'not_found' | 'timeout' | 'error'
  snippets: string[]
  rank?: number
  competitorMentions: string[]
}

interface ParsedResults {
  results: EngineResult[]
  score: number
  totalEngines: number
}

function parseApifyResults(
  items: any[],
  businessName: string,
  keywords: string[]
): ParsedResults {
  const results: EngineResult[] = []
  const businessNameLower = businessName.toLowerCase()

  // Define engines to check
  const engines: Array<{
    key: string
    engine: EngineResult['engine']
    label: string
  }> = [
    { key: 'organicResults', engine: 'google', label: 'Google' },
    { key: 'aiOverview', engine: 'google_ai', label: 'Google AI' },
    { key: 'chatGptSearch', engine: 'chatgpt', label: 'ChatGPT' },
    { key: 'perplexitySearch', engine: 'perplexity', label: 'Perplexity' },
    { key: 'copilotSearch', engine: 'copilot', label: 'Copilot' },
    { key: 'geminiSearch', engine: 'gemini', label: 'Gemini' },
  ]

  // Process each search result item (one per query)
  for (const item of items) {
    // Extract keyword from query
    const query = item.searchQuery?.term || item.query || ''
    const matchedKeyword = keywords.find(
      (k) => query.toLowerCase().includes(k.toLowerCase())
    ) || keywords[0]

    for (const { key, engine, label } of engines) {
      let found = false
      const snippets: string[] = []
      const competitorMentions: string[] = []
      let rank: number | undefined

      // Check organic results
      if (key === 'organicResults' && Array.isArray(item.organicResults)) {
        for (let i = 0; i < item.organicResults.length; i++) {
          const result = item.organicResults[i]
          const title = (result.title || '').toLowerCase()
          const description = (result.description || '').toLowerCase()
          const url = (result.url || '').toLowerCase()

          if (
            title.includes(businessNameLower) ||
            description.includes(businessNameLower) ||
            url.includes(businessNameLower.replace(/\s+/g, ''))
          ) {
            found = true
            rank = i + 1
            snippets.push(result.description || result.title || '')
          }
        }
      }

      // Check AI Overview
      if (key === 'aiOverview' && item.aiOverview) {
        const overview = typeof item.aiOverview === 'string'
          ? item.aiOverview
          : item.aiOverview.text || item.aiOverview.content || JSON.stringify(item.aiOverview)

        if (overview.toLowerCase().includes(businessNameLower)) {
          found = true
          snippets.push(overview.substring(0, 500))
        }
      }

      // Check ChatGPT search results
      if (key === 'chatGptSearch' && item.chatGptSearch) {
        const content = typeof item.chatGptSearch === 'string'
          ? item.chatGptSearch
          : item.chatGptSearch.answer || item.chatGptSearch.response || JSON.stringify(item.chatGptSearch)

        if (content.toLowerCase().includes(businessNameLower)) {
          found = true
          snippets.push(content.substring(0, 500))
        }
      }

      // Check Perplexity search results
      if (key === 'perplexitySearch' && item.perplexitySearch) {
        const content = typeof item.perplexitySearch === 'string'
          ? item.perplexitySearch
          : item.perplexitySearch.answer || item.perplexitySearch.response || JSON.stringify(item.perplexitySearch)

        if (content.toLowerCase().includes(businessNameLower)) {
          found = true
          snippets.push(content.substring(0, 500))
        }
      }

      // Check Copilot search results
      if (key === 'copilotSearch' && item.copilotSearch) {
        const content = typeof item.copilotSearch === 'string'
          ? item.copilotSearch
          : item.copilotSearch.answer || item.copilotSearch.response || JSON.stringify(item.copilotSearch)

        if (content.toLowerCase().includes(businessNameLower)) {
          found = true
          snippets.push(content.substring(0, 500))
        }
      }

      // Check Gemini search results
      if (key === 'geminiSearch' && item.geminiSearch) {
        const content = typeof item.geminiSearch === 'string'
          ? item.geminiSearch
          : item.geminiSearch.answer || item.geminiSearch.response || JSON.stringify(item.geminiSearch)

        if (content.toLowerCase().includes(businessNameLower)) {
          found = true
          snippets.push(content.substring(0, 500))
        }
      }

      // Add result
      results.push({
        engine,
        engineLabel: label,
        keyword: matchedKeyword,
        status: found ? 'found' : 'not_found',
        snippets,
        rank,
        competitorMentions,
      })
    }
  }

  // Calculate score
  const uniqueEngineResults = new Map<string, EngineResult>()

  // Get best result per engine (found > not_found)
  for (const result of results) {
    const existing = uniqueEngineResults.get(result.engine)
    if (!existing || (result.status === 'found' && existing.status !== 'found')) {
      uniqueEngineResults.set(result.engine, result)
    }
  }

  const finalResults = Array.from(uniqueEngineResults.values())
  const foundCount = finalResults.filter((r) => r.status === 'found').length
  const checkedCount = finalResults.filter(
    (r) => r.status === 'found' || r.status === 'not_found'
  ).length

  return {
    results,
    score: foundCount,
    totalEngines: checkedCount || 6, // Default to 6 if no results
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const runId = searchParams.get('runId')
    const businessName = searchParams.get('businessName') || ''
    const keywordsParam = searchParams.get('keywords') || ''
    const keywords = keywordsParam ? keywordsParam.split(',') : []

    if (!runId) {
      return NextResponse.json({ error: 'Missing runId' }, { status: 400 })
    }

    if (!process.env.APIFY_API_KEY) {
      return NextResponse.json({ error: 'AI visibility service not configured' }, { status: 500 })
    }

    // Check Apify run status
    const statusResponse = await fetch(
      `https://api.apify.com/v2/actor-runs/${runId}?token=${process.env.APIFY_API_KEY}`
    )

    if (!statusResponse.ok) {
      console.error('Apify status check failed:', await statusResponse.text())
      return NextResponse.json({ status: 'error', error: 'Failed to check status' })
    }

    const statusData = await statusResponse.json()
    const runStatus = statusData.data?.status

    console.log('Apify run status:', runId, runStatus)

    if (runStatus === 'RUNNING' || runStatus === 'READY') {
      return NextResponse.json({ status: 'running' })
    }

    if (runStatus === 'FAILED' || runStatus === 'ABORTED' || runStatus === 'TIMED-OUT') {
      return NextResponse.json({
        status: 'failed',
        error: `Search ${runStatus.toLowerCase()}`,
      })
    }

    if (runStatus === 'SUCCEEDED') {
      // Get results from dataset
      const datasetId = statusData.data?.defaultDatasetId

      if (!datasetId) {
        return NextResponse.json({ status: 'failed', error: 'No results found' })
      }

      const resultsResponse = await fetch(
        `https://api.apify.com/v2/datasets/${datasetId}/items?token=${process.env.APIFY_API_KEY}`
      )

      if (!resultsResponse.ok) {
        console.error('Apify results fetch failed:', await resultsResponse.text())
        return NextResponse.json({ status: 'failed', error: 'Failed to fetch results' })
      }

      const items = await resultsResponse.json()

      // Parse results to find business mentions
      const parsed = parseApifyResults(items, businessName, keywords)

      return NextResponse.json({
        status: 'complete',
        results: parsed.results,
        score: parsed.score,
        totalEngines: parsed.totalEngines,
      })
    }

    return NextResponse.json({ status: 'unknown', rawStatus: runStatus })
  } catch (error) {
    console.error('AI visibility result error:', error)
    return NextResponse.json(
      { status: 'error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
