'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface FeedbackButtonsProps {
  docId: string
}

export function FeedbackButtons({ docId }: FeedbackButtonsProps) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleFeedback = async (helpful: boolean) => {
    if (submitting || submitted) return

    setSubmitting(true)

    try {
      const column = helpful ? 'helpful_count' : 'not_helpful_count'

      // Increment the counter
      const { data, error } = await supabase
        .from('support_docs')
        .select(column)
        .eq('id', docId)
        .single()

      if (!error && data) {
        const currentValue = (data as any)[column] || 0
        await supabase
          .from('support_docs')
          .update({ [column]: currentValue + 1 })
          .eq('id', docId)
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting feedback:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-lg bg-green-500/20 py-3 text-green-300">
        <Check className="h-5 w-5" />
        Thanks for your feedback!
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => handleFeedback(true)}
        disabled={submitting}
        className="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-900/20 px-6 py-3 text-white transition-all hover:border-green-500/50 hover:bg-green-500/20 disabled:opacity-50"
      >
        <ThumbsUp className="h-5 w-5" />
        Yes
      </button>
      <button
        onClick={() => handleFeedback(false)}
        disabled={submitting}
        className="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-900/20 px-6 py-3 text-white transition-all hover:border-red-500/50 hover:bg-red-500/20 disabled:opacity-50"
      >
        <ThumbsDown className="h-5 w-5" />
        No
      </button>
    </div>
  )
}
