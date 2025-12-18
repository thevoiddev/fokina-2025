import React from "react"

export function SEOHead(): React.ReactElement {
  return (
    <>
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS prefetch for analytics */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Canonical link */}
      <link rel="canonical" href="https://fokina.app" />
      
      {/* Language alternatives */}
      <link rel="alternate" hrefLang="ru" href="https://fokina.app" />
      <link rel="alternate" hrefLang="x-default" href="https://fokina.app" />
      
      {/* Additional meta tags for SEO */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="format-detection" content="email=no" />
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      
      {/* Mobile optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Verification tags (add your actual verification codes) */}
      {/* <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" /> */}
      {/* <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_CODE" /> */}
      
      {/* Social media meta tags */}
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="FOKINA" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@fokina" />
      <meta name="twitter:creator" content="@fokina" />
      
      {/* Additional security headers */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self' https:; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://mc.yandex.ru; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:" />
    </>
  )
}
