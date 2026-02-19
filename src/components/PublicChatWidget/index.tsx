'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Minus, Send, Loader2, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

const QUICK_ACTIONS = [
  { id: 'what-is-cloudrent', label: 'What is CloudRent Pro?' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'features', label: 'Features' },
  { id: 'free-trial', label: 'Free trial' },
]

const SUPABASE_URL = 'https://bawidpmocsxudwpsppsz.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhd2lkcG1vY3N4dWR3cHNwcHN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMjI2OTYsImV4cCI6MjA1MTU5ODY5Nn0.XJqjHWKFNkVfx-HW0W0cVDzlLnPJLjyE1cj4zrxsGOM'

// Simple markdown renderer for bold and links
function renderMarkdown(text: string, isUserMessage: boolean = false): React.ReactNode[] {
  const elements: React.ReactNode[] = []
  let key = 0

  // Split by markdown patterns and process
  // Handle **bold**, *italic*, and [text](url) links
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g
  const parts = text.split(pattern)

  for (const part of parts) {
    if (!part) continue

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**')) {
      elements.push(
        <strong key={key++} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    // Italic: *text*
    else if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      elements.push(
        <em key={key++}>
          {part.slice(1, -1)}
        </em>
      )
    }
    // Link: [text](url)
    else if (part.match(/^\[[^\]]+\]\([^)]+\)$/)) {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (match) {
        elements.push(
          <a
            key={key++}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className={isUserMessage
              ? "underline hover:opacity-80"
              : "text-brand-purple underline hover:text-brand-purple/80"
            }
          >
            {match[1]}
          </a>
        )
      }
    }
    // Plain text
    else {
      elements.push(<span key={key++}>{part}</span>)
    }
  }

  return elements
}

export function PublicChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [messagesRemaining, setMessagesRemaining] = useState<number | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, isMinimized])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    }

    // Add assistant placeholder
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    }

    setMessages(prev => [...prev, userMessage, assistantMessage])
    setIsStreaming(true)
    setError(null)
    setInput('')

    try {
      // Build message history for context
      const messageHistory = messages
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .slice(-6)
        .map(m => ({ role: m.role, content: m.content }))

      const response = await fetch(`${SUPABASE_URL}/functions/v1/support-agent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          message: content,
          messageHistory,
          screenContext: window.location.pathname,
          stream: true,
        }),
      })

      if (!response.ok) {
        let errorMessage = `Server error (${response.status})`
        try {
          const errorData = await response.json()
          if (errorData.error) {
            errorMessage = errorData.error
          }
          if (errorData.rateLimited) {
            setMessagesRemaining(0)
          }
        } catch {
          if (response.status === 429) {
            errorMessage = 'Too many requests. Please try again later or sign up for unlimited access.'
            setMessagesRemaining(0)
          }
        }
        throw new Error(errorMessage)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let fullContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))

              if (data.type === 'text') {
                fullContent += data.content
                setMessages(prev =>
                  prev.map(m =>
                    m.isStreaming ? { ...m, content: fullContent } : m
                  )
                )
              } else if (data.type === 'thinking') {
                // Show searching indicator
                setMessages(prev =>
                  prev.map(m =>
                    m.isStreaming ? { ...m, content: '🔍 Searching documentation...' } : m
                  )
                )
              } else if (data.type === 'done') {
                if (data.remaining !== undefined) {
                  setMessagesRemaining(data.remaining)
                }
              } else if (data.type === 'error') {
                throw new Error(data.message)
              }
            } catch (e) {
              // Ignore parse errors for incomplete chunks
            }
          }
        }
      }

      // Finalize the message
      setMessages(prev =>
        prev.map(m =>
          m.isStreaming ? { ...m, content: fullContent, isStreaming: false } : m
        )
      )
    } catch (err: any) {
      console.error('Chat error:', err)
      setMessages(prev => prev.filter(m => !m.isStreaming))
      setError(err.message || 'Failed to get response')

      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'system',
          content: "Sorry, I couldn't process your request. Please try again.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsStreaming(false)
    }
  }

  const handleQuickAction = (actionId: string) => {
    const prompts: Record<string, string> = {
      'what-is-cloudrent': 'What is CloudRent Pro and who is it for?',
      'pricing': 'What does CloudRent Pro cost?',
      'features': 'What features does CloudRent Pro have?',
      'free-trial': 'Tell me about the free trial',
    }
    const prompt = prompts[actionId]
    if (prompt) sendMessage(prompt)
  }

  const handleSend = () => {
    if (input.trim()) sendMessage(input.trim())
  }

  const clearChat = () => {
    setMessages([])
    setError(null)
    setMessagesRemaining(null)
  }

  // Floating button when closed
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-brand-purple hover:bg-brand-purple/80 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 z-50"
        aria-label="Open chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    )
  }

  // Minimized state
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 hover:shadow-xl transition-shadow z-50"
      >
        <div className="w-10 h-10 bg-brand-purple/10 rounded-full flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-brand-purple" />
        </div>
        <div className="text-left">
          <p className="font-medium text-gray-900 text-sm">CloudRent Assistant</p>
          <p className="text-xs text-green-600">Online</p>
        </div>
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-purple to-brand-purple/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">CloudRent Assistant</h3>
            <p className="text-xs text-white/70">
              {isStreaming ? 'Typing...' : 'Sales Assistant'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={clearChat}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="New chat"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-brand-purple" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Welcome to CloudRent Pro!</h4>
            <p className="text-sm text-gray-500 mb-5">
              Ask me anything about our equipment rental software.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-2">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-brand-purple hover:text-brand-purple transition-colors"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Sign up CTA */}
            <div className="mt-5 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">
                Ready to streamline your rental business?
              </p>
              <Link
                href="https://app.cloudrent.me/register"
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-purple text-white text-sm font-medium rounded-lg hover:bg-brand-purple/90 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    message.role === 'user'
                      ? 'bg-brand-purple text-white'
                      : message.role === 'system'
                      ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">
                    {renderMarkdown(message.content, message.role === 'user')}
                  </div>
                  {message.isStreaming && (
                    <span className="inline-block w-2 h-4 bg-current opacity-50 animate-pulse ml-1" />
                  )}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Rate limit warning */}
        {messagesRemaining !== null && messagesRemaining <= 3 && messagesRemaining > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-700">
            <p className="font-medium">
              {messagesRemaining} {messagesRemaining === 1 ? 'message' : 'messages'} remaining
            </p>
            <p className="text-xs mt-1">
              <Link href="https://app.cloudrent.me/register" className="text-brand-purple underline">
                Sign up for free
              </Link>{' '}
              for unlimited access.
            </p>
          </div>
        )}

        {/* Sign up prompt after messages */}
        {messages.length >= 4 && messages.length % 4 === 0 && (
          <div className="bg-brand-purple/5 border border-brand-purple/20 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-800 font-medium">Ready to try CloudRent Pro?</p>
            <Link
              href="https://app.cloudrent.me/register"
              className="inline-block mt-2 px-4 py-2 bg-brand-purple text-white text-sm font-medium rounded-lg hover:bg-brand-purple/90 transition-colors"
            >
              Start Your Free Trial
            </Link>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask about features, pricing, or how it works..."
            disabled={isStreaming}
            className="flex-1 px-4 py-2.5 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-brand-purple focus:bg-white transition-colors text-sm disabled:opacity-50 text-gray-900"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="p-2.5 bg-brand-purple hover:bg-brand-purple/90 disabled:bg-gray-300 text-white rounded-xl transition-colors disabled:cursor-not-allowed"
          >
            {isStreaming ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">
          Ask about features, pricing, or how CloudRent Pro works
        </p>
      </div>
    </div>
  )
}
