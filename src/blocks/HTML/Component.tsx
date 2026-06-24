import React from 'react'

import { HTMLRenderer } from './Component.client'

export type HTMLBlockProps = {
  html: string
  blockType: 'html'
}

type Props = HTMLBlockProps & {
  className?: string
}

export const HTMLBlock: React.FC<Props> = ({ className, html }) => {
  return (
    <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
      <HTMLRenderer html={html} />
    </div>
  )
}
