import Script from 'next/script'
import React from 'react'
import { themeLocalStorageKey } from '../ThemeSelector/types'

export const InitTheme: React.FC = () => {
  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    // CloudRent: Force dark theme for marketing site
    var themeToSet = 'dark'
    var preference = window.localStorage.getItem('${themeLocalStorageKey}')
    if (preference === 'light' || preference === 'dark') {
      themeToSet = preference
    }
    document.documentElement.setAttribute('data-theme', themeToSet)
  })();
  `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
