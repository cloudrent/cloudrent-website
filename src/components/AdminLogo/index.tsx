import React from 'react'

export const AdminLogo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <img
        src="/apple-touch-icon.png"
        alt="CloudRent Pro"
        style={{ height: '40px', width: 'auto' }}
      />
      <span
        style={{
          fontSize: '20px',
          fontWeight: 600,
          color: 'var(--theme-text)',
        }}
      >
        CloudRent Pro
      </span>
    </div>
  )
}
