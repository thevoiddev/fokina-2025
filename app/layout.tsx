import React, { JSX } from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { SchemaOrg } from "@/components/schema-org"
import { SEOHead } from "@/components/seo-head"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FOKINA - Трекер воды для здоровья | Отслеживай потребление воды",
  description: "FOKINA - умный трекер потребления воды. Отслеживай суточное потребление воды, улучши здоровье и самочувствие. Персональные рекомендации и статистика.",
  keywords: "трекер воды, отслеживание воды, здоровье, гидратация, потребление воды, приложение для здоровья, контроль воды, суточная норма воды",
  authors: [{ name: "FOKINA" }],
  creator: "FOKINA",
  publisher: "FOKINA",
  generator: "v0.app",
  applicationName: "FOKINA",
  category: "Health & Wellness",
  classification: "Health Application",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://fokina.app",
    title: "FOKINA - Трекер воды для здоровья",
    description: "Умный трекер потребления воды. Отслеживай суточное потребление воды и улучши свое здоровье.",
    siteName: "FOKINA",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "FOKINA - Трекер воды",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FOKINA - Трекер воды для здоровья",
    description: "Умный трекер потребления воды. Отслеживай суточное потребление воды и улучши свое здоровье.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://fokina.app",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#9AABB8",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        <SchemaOrg />
        <SEOHead />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#9AABB8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FOKINA" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="FOKINA" />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
