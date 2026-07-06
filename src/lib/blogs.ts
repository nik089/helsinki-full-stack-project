import { db } from "./db"
import { blogs, users, readingList, apiTokens } from "./schema"
import { eq, sql, desc, like, and } from "drizzle-orm"
import bcrypt from "bcryptjs"
import crypto from "crypto"

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
  username: string
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

export async function addBlog(
  title: string,
  author: string,
  url: string,
  userId?: number,
): Promise<Blog> {
  const rows = await db
    .insert(blogs)
    .values({ title, author, url, likes: 0, userId })
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
  return db
    .select({ id: users.id, username: users.username, name: users.name, email: users.email })
    .from(users)
}

export async function getUser(id: number): Promise<User | undefined> {
  const rows = await db
    .select({ id: users.id, username: users.username, name: users.name, email: users.email })
    .from(users)
    .where(eq(users.id, id))
    .limit(1)
  return rows[0]
}

export async function getUserBlogs(userId: number): Promise<Blog[]> {
  return db
    .select()
    .from(blogs)
    .where(eq(blogs.userId, userId))
    .orderBy(desc(blogs.likes))
}

export async function createUser(
  username: string,
  name: string,
  password: string,
): Promise<User> {
  const passwordHash = await bcrypt.hash(password, 10)
  const rows = await db
    .insert(users)
    .values({ username, name, email: `${username}@example.com`, passwordHash })
    .returning()
  return rows[0]
}

export async function addToReadingList(
  userId: number,
  blogId: number,
): Promise<void> {
  const existing = await db
    .select()
    .from(readingList)
    .where(
      and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
    )
    .limit(1)

  if (existing.length === 0) {
    await db
      .insert(readingList)
      .values({ userId, blogId, read: false })
  }
}

export async function getReadingList(userId: number) {
  return db
    .select({
      id: readingList.id,
      blogId: readingList.blogId,
      read: readingList.read,
      title: blogs.title,
      author: blogs.author,
    })
    .from(readingList)
    .innerJoin(blogs, eq(readingList.blogId, blogs.id))
    .where(eq(readingList.userId, userId))
    .orderBy(desc(readingList.createdAt))
}

export async function markAsRead(readingListId: number): Promise<void> {
  await db
    .update(readingList)
    .set({ read: true })
    .where(eq(readingList.id, readingListId))
}

export async function generateApiToken(userId: number): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex")
  await db.insert(apiTokens).values({ userId, token })
  return token
}

export async function getApiTokens(userId: number) {
  return db
    .select()
    .from(apiTokens)
    .where(eq(apiTokens.userId, userId))
    .orderBy(desc(apiTokens.createdAt))
}

export async function resetAllData(): Promise<void> {
  await db.delete(readingList)
  await db.delete(apiTokens)
  await db.delete(blogs)
  await db.delete(users)
}
