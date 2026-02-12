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
    <div className="relative">
      {/* Animated glow effect */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-60 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(136, 27, 169, 0.6) 0%, transparent 70%)',
          transform: 'scale(1.2)',
        }}
      />
      <img
        alt="CloudRent Logo"
        width={85}
        height={85}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('h-[85px] w-auto relative z-10 transition-transform duration-300 hover:scale-105', className)}
        src="/images/CloudRent-Hexagon.svg"
      />
    </div>
  )
}
