import { resetAllData } from "@/lib/blogs"

export async function DELETE() {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "Not available in production" }, { status: 404 })
  }
  await resetAllData()
  return Response.json({ message: "Database reset" })
}
