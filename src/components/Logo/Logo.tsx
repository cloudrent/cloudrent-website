import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props
  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <img
      alt="CloudRent Logo"
      width={85}
      height={85}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('h-[85px] w-auto', className)}
      src="/media/CloudRent-Hexagon.svg"
    />
  )
}
