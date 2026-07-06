import { db } from "./db"
import { users, blogs } from "./schema"
import bcrypt from "bcryptjs"

async function seed() {
  const passwordHash = await bcrypt.hash("password123", 10)

  const insertedUsers = await db
    .insert(users)
    .values([
      { username: "dan", name: "Dan Abramov", email: "dan@react.dev", passwordHash },
      { username: "lee", name: "Lee Robinson", email: "lee@nextjs.org", passwordHash },
      { username: "anders", name: "Anders Hejlsberg", email: "anders@typescriptlang.org", passwordHash },
      { username: "adam", name: "Adam Wathan", email: "adam@tailwindcss.com", passwordHash },
    ])
    .returning()

  await db.insert(blogs).values([
    { title: "React Patterns", author: "Dan Abramov", url: "https://react.dev", likes: 42, userId: insertedUsers[0].id },
    { title: "Next.js Guide", author: "Lee Robinson", url: "https://nextjs.org", likes: 35, userId: insertedUsers[1].id },
    { title: "TypeScript Handbook", author: "Anders Hejlsberg", url: "https://typescriptlang.org", likes: 28, userId: insertedUsers[2].id },
    { title: "Tailwind CSS", author: "Adam Wathan", url: "https://tailwindcss.com", likes: 15, userId: insertedUsers[3].id },
  ])

  console.log("Seed data inserted successfully")
}

seed().catch(console.error)
