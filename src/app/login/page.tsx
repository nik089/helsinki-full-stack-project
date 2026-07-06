"use client"

import { useActionState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  async function loginAction(_prev: unknown, formData: FormData) {
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    })

    if (result?.error) {
      return { error: "Invalid username or password" }
    }

    router.push("/?notification=Successfully+logged+in")
    return {}
  }

  const [state, formAction] = useActionState(loginAction, {})

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">Login</h1>

      {state && "error" in state && state.error && (
        <div data-testid="error-message" className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-800">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-zinc-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-zinc-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-zinc-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          data-testid="login-button"
          className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Login
        </button>
      </form>
    </div>
  )
}
