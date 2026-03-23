import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <p style={{ margin: 0, color: 'var(--theme-text)' }}>
        <b>Welcome to CloudRent Pro</b>
      </p>
      <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: 'var(--theme-elevation-500)' }}>
        Sign in to manage your equipment rental website.
      </p>
    </div>
  )
}

export default BeforeLogin
