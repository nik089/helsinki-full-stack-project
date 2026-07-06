import { getBlog, likeBlog } from "@/lib/blogs"
import { notFound, redirect } from "next/navigation"

async function like(formData: FormData) {
  "use server"
  const id = Number(formData.get("id"))
  await likeBlog(id)
  redirect(`/blogs/${id}`)
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const blog = await getBlog(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">{blog.title}</h1>
      <div className="mt-4 space-y-2 text-zinc-600">
        <p>
          <span className="font-medium text-zinc-700">Author:</span> {blog.author}
        </p>
        <p>
          <span className="font-medium text-zinc-700">URL:</span>{" "}
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {blog.url}
          </a>
        </p>
        <p>
          <span className="font-medium text-zinc-700">Likes:</span> {blog.likes}
        </p>
      </div>

      <form action={like} className="mt-6">
        <input type="hidden" name="id" value={blog.id} />
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Like
        </button>
      </form>
    </div>
  )
}
