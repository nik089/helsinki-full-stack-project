"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

  async function registerAction(_prev: unknown, formData: FormData) {
    const username = formData.get("username") as string
    const name = formData.get("name") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (username.length < 4) {
      return { field: "username", message: "Username must be at least 4 characters" }
    }

    if (password !== confirmPassword) {
      return { field: "passwordConfirm", message: "Passwords do not match" }
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, name, password }),
    })

    if (!res.ok) {
      return { field: "username", message: "Username already taken" }
    }

    router.push("/login")
    return {}
  }

  const [state, formAction] = useActionState(registerAction, {})

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">Register</h1>
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-zinc-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            required
            minLength={4}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-zinc-500 focus:outline-none"
          />
          {state && "field" in state && state.field === "username" && (
            <p data-testid="username-error" className="mt-1 text-sm text-red-600">
              {state.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
            Name
          </label>
          <input
            id="name"
            name="name"
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
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-zinc-500 focus:outline-none"
          />
          {state && "field" in state && state.field === "passwordConfirm" && (
            <p data-testid="passwordConfirm-error" className="mt-1 text-sm text-red-600">
              {state.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          data-testid="register-button"
          className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Register
        </button>
      </form>
    </div>
  )
}
