'use client'

import { Content, isPreviewing } from '@builder.io/sdk-react'
import { builderApiKey } from '@/lib/builder'
import { builderCustomComponents } from './custom-components'

interface RenderBuilderContentProps {
  content: any
  model?: string
}

export function RenderBuilderContent({ content, model = 'page' }: RenderBuilderContentProps) {
  const isPreview = isPreviewing()

  // If no content and not previewing, return null
  if (!content && !isPreview) {
    return null
  }

  return (
    <Content
      model={model}
      content={content}
      apiKey={builderApiKey}
      customComponents={builderCustomComponents}
    />
  )
}
