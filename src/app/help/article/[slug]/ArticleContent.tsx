'use client'

import { useEffect, useRef } from 'react'

interface ArticleContentProps {
  content: string
}

// Simple markdown to HTML conversion
function markdownToHtml(markdown: string): string {
  let html = markdown

  // Escape HTML in code blocks first
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const escaped = code.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return `<pre><code class="language-${lang}">${escaped}</code></pre>`
  })

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Headers
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // Bold and italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr />')

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')

  // Tables
  html = html.replace(/^\|(.+)\|$/gm, (match, content) => {
    const cells = content.split('|').map((cell: string) => cell.trim())
    return `<tr>${cells.map((cell: string) => `<td>${cell}</td>`).join('')}</tr>`
  })

  // Wrap consecutive table rows
  html = html.replace(/(<tr>.*?<\/tr>\n?)+/g, (match) => {
    const rows = match.trim().split('\n').filter(Boolean)
    if (rows.length >= 2) {
      // Check if second row is separator
      if (rows[1].includes('---')) {
        const headerRow = rows[0].replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>')
        const bodyRows = rows.slice(2).join('\n')
        return `<table><thead>${headerRow}</thead><tbody>${bodyRows}</tbody></table>`
      }
    }
    return `<table>${match}</table>`
  })

  // Remove separator rows
  html = html.replace(/<tr><td>-+<\/td>.*?<\/tr>/g, '')

  // Lists (unordered)
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)

  // Lists (ordered)
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>')

  // Paragraphs (wrap remaining text blocks)
  html = html
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim()
      if (
        trimmed &&
        !trimmed.startsWith('<h') &&
        !trimmed.startsWith('<ul') &&
        !trimmed.startsWith('<ol') &&
        !trimmed.startsWith('<table') &&
        !trimmed.startsWith('<pre') &&
        !trimmed.startsWith('<blockquote') &&
        !trimmed.startsWith('<hr')
      ) {
        return `<p>${trimmed}</p>`
      }
      return trimmed
    })
    .join('\n\n')

  return html
}

export function ArticleContent({ content }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  // Process content
  const html = markdownToHtml(content)

  return (
    <div
      ref={contentRef}
      className="help-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
