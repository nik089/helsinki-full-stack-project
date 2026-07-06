import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "./db"
import { users } from "./schema"
import { eq } from "drizzle-orm"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const username = credentials.username as string
        const password = credentials.password as string

        const rows = await db
          .select()
          .from(users)
          .where(eq(users.username, username))
          .limit(1)

        const user = rows[0]
        if (!user) return null

        const match = await bcrypt.compare(password, user.passwordHash)
        if (!match) return null

        return { id: String(user.id), name: user.name, email: user.email }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
