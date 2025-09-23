import type React from "react"
import "./globals.css"
import { Inter_Tight, DM_Serif_Display } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import ScrollReveal from "@/components/scroll-reveal"

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-serif",
})

export const metadata = {
  title: {
    default: "Swetha Reddy Ganta | AI Engineer",
    template: "%s | Swetha Reddy Ganta",
  },
  description:
    "Portfolio website for Swetha Reddy Ganta, AI Engineer specializing in machine learning, deep learning, NLP, and computer vision.",
  metadataBase: new URL("https://srg-portfolio.vercel.app"),
  openGraph: {
    title: "Swetha Reddy Ganta | AI Engineer",
    description:
      "AI Engineer specializing in machine learning, deep learning, NLP, and computer vision.",
    url: "/",
    siteName: "Swetha Reddy Ganta",
    images: [
      { url: "/images/profile.jpeg", width: 1200, height: 630, alt: "Swetha Reddy Ganta" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swetha Reddy Ganta | AI Engineer",
    description:
      "AI Engineer specializing in machine learning, deep learning, NLP, and computer vision.",
    images: ["/images/profile.jpeg"],
  },
  alternates: {
    canonical: "/",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-black grid-pattern font-sans antialiased", interTight.variable, dmSerifDisplay.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} enableColorScheme={false} disableTransitionOnChange>
          <ScrollReveal />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

