import { getBlog, likeBlog, addToReadingList } from "@/lib/blogs"
import { notFound, redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

async function like(formData: FormData) {
  "use server"
  const id = Number(formData.get("id"))
  await likeBlog(id)
  redirect(`/blogs/${id}`)
}

async function addToReadingListAction(formData: FormData) {
  "use server"
  const session = await auth()
  if (!session?.user?.id) return
  const userId = Number(session.user.id)
  const blogId = Number(formData.get("blogId"))
  await addToReadingList(userId, blogId)
  revalidatePath("/me")
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
    <div data-testid="blog-detail">
      <h1 data-testid="blog-title" className="text-2xl font-bold text-zinc-900">
        {blog.title}
      </h1>
      <div className="mt-4 space-y-2 text-zinc-600">
        <p data-testid="blog-author">
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

      <form action={like} className="mt-6 inline-block">
        <input type="hidden" name="id" value={blog.id} />
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Like
        </button>
      </form>

      <form action={addToReadingListAction} className="mt-6 inline-block ml-4">
        <input type="hidden" name="blogId" value={blog.id} />
        <button
          type="submit"
          data-testid="add-to-reading-list-button"
          className="rounded-lg border border-zinc-300 px-6 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Add to Reading List
        </button>
      </form>
    </div>
  )
}
