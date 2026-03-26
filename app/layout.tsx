import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import PageTransitionProvider from "@/components/page-transition"
import "./globals.css"

export const viewport: Viewport = {
  themeColor: "#0f0c0a",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "B2 | AndromedaTsx",
    template: "%s | AndromedaTsx",
  },
  description: "Esteban Canales Monge - Full Stack Developer Portfolio",
  keywords: ["developer", "portfolio", "react", "next.js", "typescript", "full stack"],
  authors: [{ name: "Esteban Canales Monge" }],
  creator: "Esteban Canales Monge",
  metadataBase: new URL("https://andromedatsx.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "B2 | AndromedaTsx",
    description: "Esteban Canales Monge - Full Stack Developer Portfolio",
    siteName: "AndromedaTsx",
  },
  twitter: {
    card: "summary_large_image",
    title: "B2 | AndromedaTsx",
    description: "Esteban Canales Monge - Full Stack Developer Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-mono ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <PageTransitionProvider>
            {children}
          </PageTransitionProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
