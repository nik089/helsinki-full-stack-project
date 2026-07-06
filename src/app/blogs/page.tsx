import { getBlogs, getBlogsFiltered } from "@/lib/blogs"
import Link from "next/link"

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; notification?: string }>
}) {
  const { filter, notification } = await searchParams
  const blogs = filter ? await getBlogsFiltered(filter) : await getBlogs()

  return (
    <div>
      {notification && (
        <div data-testid="notification" className="mb-6 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-800">
          {notification}
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Blogs</h1>
        <Link
          href="/blogs/new"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          New Blog
        </Link>
      </div>

      <form className="mb-6 flex gap-2">
        <input
          name="filter"
          data-testid="filter-input"
          defaultValue={filter ?? ""}
          placeholder="Search by title..."
          className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-zinc-500 focus:outline-none"
        />
        <button
          type="submit"
          data-testid="search-button"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Search
        </button>
      </form>

      {blogs.length === 0 ? (
        <p className="text-zinc-500">No blogs found.</p>
      ) : (
        <ul data-testid="blogs-list" className="space-y-3">
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link
                href={`/blogs/${blog.id}`}
                className="block rounded-lg border border-zinc-200 p-4 transition-colors hover:border-zinc-400"
              >
                <h2 className="font-semibold text-zinc-900">{blog.title}</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  by {blog.author} &middot; {blog.likes} likes
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
