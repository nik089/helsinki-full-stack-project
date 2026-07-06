import { createUser } from "@/lib/blogs"

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "Not available in production" }, { status: 404 })
  }
  const { username, name, password } = await request.json()
  try {
    const user = await createUser(username, name, password)
    return Response.json(user)
  } catch {
    return Response.json({ error: "User creation failed" }, { status: 400 })
  }
}
