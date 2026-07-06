import { redirect } from "next/navigation"
import { addBlog } from "@/lib/blogs"
import { auth } from "@/lib/auth"

async function createBlog(formData: FormData) {
  "use server"
  const session = await auth()
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  const userId = session?.user?.id ? Number(session.user.id) : undefined
  await addBlog(title, author, url, userId)
  redirect("/blogs?notification=Blog+created+successfully")
}

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">New Blog</h1>
      <form action={createBlog} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-zinc-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-zinc-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-zinc-700">
            Author
          </label>
          <input
            id="author"
            name="author"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-zinc-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-zinc-700">
            URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-zinc-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          data-testid="create-blog-button"
          className="rounded-lg bg-zinc-900 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Create
        </button>
      </form>
    </div>
  )
}
