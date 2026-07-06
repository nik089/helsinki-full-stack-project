import { db } from "./db"
import { users, blogs } from "./schema"

async function seed() {
  const insertedUsers = await db
    .insert(users)
    .values([
      { name: "Dan Abramov", email: "dan@react.dev" },
      { name: "Lee Robinson", email: "lee@nextjs.org" },
      { name: "Anders Hejlsberg", email: "anders@typescriptlang.org" },
      { name: "Adam Wathan", email: "adam@tailwindcss.com" },
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
