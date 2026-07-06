export type Blog = {
  id: string
  title: string
  author: string
  url: string
  likes: number
}

let blogs: Blog[] = [
  { id: "1", title: "React Patterns", author: "Dan Abramov", url: "https://react.dev", likes: 42 },
  { id: "2", title: "Next.js Guide", author: "Lee Robinson", url: "https://nextjs.org", likes: 35 },
  { id: "3", title: "TypeScript Handbook", author: "Anders Hejlsberg", url: "https://typescriptlang.org", likes: 28 },
  { id: "4", title: "Tailwind CSS", author: "Adam Wathan", url: "https://tailwindcss.com", likes: 15 },
]

export function getBlogs(): Blog[] {
  return blogs
}

export function getBlog(id: string): Blog | undefined {
  return blogs.find((b) => b.id === id)
}

export function addBlog(title: string, author: string, url: string): Blog {
  const blog: Blog = {
    id: String(Date.now()),
    title,
    author,
    url,
    likes: 0,
  }
  blogs = [blog, ...blogs]
  return blog
}

export function likeBlog(id: string): Blog | undefined {
  const blog = blogs.find((b) => b.id === id)
  if (blog) {
    blog.likes += 1
  }
  return blog
}
