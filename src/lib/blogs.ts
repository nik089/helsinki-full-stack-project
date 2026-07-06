import { db } from "./db"
import { blogs, users } from "./schema"
import { eq, sql, desc, like } from "drizzle-orm"

export type Blog = {
  id: number
  title: string
  author: string
  url: string
  likes: number
  userId: number | null
}

export type User = {
  id: number
  name: string
  email: string
}

export async function getBlogs(): Promise<Blog[]> {
  return db.select().from(blogs).orderBy(desc(blogs.likes))
}

export async function getBlog(id: number): Promise<Blog | undefined> {
  const rows = await db.select().from(blogs).where(eq(blogs.id, id)).limit(1)
  return rows[0]
}

export async function getBlogsFiltered(filter: string): Promise<Blog[]> {
  return db
    .select()
    .from(blogs)
    .where(like(blogs.title, `%${filter}%`))
    .orderBy(desc(blogs.likes))
}

export async function addBlog(title: string, author: string, url: string): Promise<Blog> {
  const rows = await db
    .insert(blogs)
    .values({ title, author, url, likes: 0 })
    .returning()
  return rows[0]
}

export async function likeBlog(id: number): Promise<void> {
  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id))
}

export async function getUsers(): Promise<User[]> {
  return db.select().from(users)
}

export async function getUser(id: number): Promise<User | undefined> {
  const rows = await db.select().from(users).where(eq(users.id, id)).limit(1)
  return rows[0]
}

export async function getUserBlogs(userId: number): Promise<Blog[]> {
  return db
    .select()
    .from(blogs)
    .where(eq(blogs.userId, userId))
    .orderBy(desc(blogs.likes))
}
