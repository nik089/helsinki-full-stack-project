import { getUsers } from "@/lib/blogs"
import Link from "next/link"

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">Users</h1>
      {users.length === 0 ? (
        <p className="text-zinc-500">No users found.</p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li key={user.id}>
              <Link
                href={`/users/${user.id}`}
                className="block rounded-lg border border-zinc-200 p-4 transition-colors hover:border-zinc-400"
              >
                <h2 className="font-semibold text-zinc-900">{user.name}</h2>
                <p className="mt-1 text-sm text-zinc-500">{user.email}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
