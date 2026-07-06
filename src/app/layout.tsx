import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Blog App",
  description: "Full Stack Open Next.js Chapter 3",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col font-sans">
        <nav className="border-b border-zinc-200 bg-white">
          <div className="mx-auto flex max-w-4xl items-center gap-6 px-4 py-3">
            <Link href="/" className="text-lg font-bold text-zinc-900">
              Blog App
            </Link>
            <Link href="/blogs" className="text-sm text-zinc-600 hover:text-zinc-900">
              Blogs
            </Link>
            <Link href="/blogs/new" className="text-sm text-zinc-600 hover:text-zinc-900">
              New Blog
            </Link>
            <Link href="/users" className="text-sm text-zinc-600 hover:text-zinc-900">
              Users
            </Link>
          </div>
        </nav>
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
