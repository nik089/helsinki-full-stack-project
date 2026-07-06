import { getUser, getUserBlogs } from "@/lib/blogs"
import { notFound } from "next/navigation"
import Link from "next/link"

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const user = await getUser(Number(id))

  if (!user) {
    notFound()
  }

  const blogs = await getUserBlogs(user.id)

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">{user.name}</h1>
      <p className="mt-2 text-zinc-500">{user.email}</p>

      <h2 className="mb-4 mt-8 text-lg font-semibold text-zinc-900">Blogs</h2>
      {blogs.length === 0 ? (
        <p className="text-zinc-500">No blogs yet.</p>
      ) : (
        <ul className="space-y-3">
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link
                href={`/blogs/${blog.id}`}
                className="block rounded-lg border border-zinc-200 p-4 transition-colors hover:border-zinc-400"
              >
                <h3 className="font-semibold text-zinc-900">{blog.title}</h3>
                <p className="mt-1 text-sm text-zinc-500">{blog.likes} likes</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
