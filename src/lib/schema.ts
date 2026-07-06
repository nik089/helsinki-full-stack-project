import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  likes: integer("likes").default(0).notNull(),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
