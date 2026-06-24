'use client'

import React from 'react'

type Props = {
  html: string
}

export const HTMLRenderer: React.FC<Props> = ({ html }) => {
  if (!html) return null

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
