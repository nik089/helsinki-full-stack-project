import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { auth } from "@/lib/auth"

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
  description: "Full Stack Open Next.js",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col font-sans">
        <nav className="border-b border-zinc-200 bg-white">
          <div className="mx-auto flex max-w-4xl items-center gap-6 px-4 py-3">
            <Link href="/" className="text-lg font-bold text-zinc-900">
              Blog App
            </Link>
            <Link href="/blogs" className="text-sm text-zinc-600 hover:text-zinc-900">
              blogs
            </Link>
            <Link href="/users" className="text-sm text-zinc-600 hover:text-zinc-900">
              users
            </Link>
            {session?.user ? (
              <>
                <Link href="/me" className="text-sm text-zinc-600 hover:text-zinc-900">
                  me
                </Link>
                <form action="/api/auth/signout" method="POST" className="ml-auto">
                  <button
                    type="submit"
                    className="text-sm text-zinc-600 hover:text-zinc-900"
                  >
                    logout
                  </button>
                </form>
              </>
            ) : (
              <div className="ml-auto flex gap-4">
                <Link href="/login" className="text-sm text-zinc-600 hover:text-zinc-900">
                  login
                </Link>
                <Link href="/register" className="text-sm text-zinc-600 hover:text-zinc-900">
                  register
                </Link>
              </div>
            )}
          </div>
        </nav>
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
