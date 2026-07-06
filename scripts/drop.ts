import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

async function main() {
  await sql`DROP TABLE IF EXISTS reading_list, api_tokens, blogs, users CASCADE`
  console.log("Tables dropped successfully")
}

main().catch(console.error)
