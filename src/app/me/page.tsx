import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getReadingList, markAsRead, generateApiToken, getApiTokens } from "@/lib/blogs"
import { revalidatePath } from "next/cache"

export default async function MePage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const userId = Number(session.user.id)
  const list = await getReadingList(userId)
  const tokens = await getApiTokens(userId)
  const unread = list.filter((item) => !item.read)
  const read = list.filter((item) => item.read)

  return (
    <div data-testid="user-profile" className="max-w-2xl">
      <h1 className="text-2xl font-bold text-zinc-900">My Profile</h1>
      <div className="mt-4 space-y-2 text-zinc-600">
        <p data-testid="user-name">
          <span className="font-medium text-zinc-700">Name:</span> {session.user.name}
        </p>
        <p data-testid="user-username">
          <span className="font-medium text-zinc-700">Username:</span> {session.user.email?.split("@")[0]}
        </p>
      </div>

      <section data-testid="reading-list-section" className="mt-8">
        <h2 className="text-lg font-semibold text-zinc-900">Reading List</h2>

        <div data-testid="unread-section" className="mt-4">
          <h3 className="text-sm font-medium text-zinc-700">Unread</h3>
          {unread.length === 0 ? (
            <p data-testid="no-unread-blogs" className="mt-2 text-sm text-zinc-500">No unread blogs.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {unread.map((item) => (
                <li key={item.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3">
                  <div>
                    <p className="font-medium text-zinc-900">{item.title}</p>
                    <p className="text-sm text-zinc-500">{item.author}</p>
                  </div>
                  <MarkReadForm id={item.id} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-zinc-700">Read</h3>
          {read.length === 0 ? (
            <p data-testid="empty-reading-list" className="mt-2 text-sm text-zinc-500">No blogs in your reading list yet.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {read.map((item) => (
                <li key={item.id} className="rounded-lg border border-zinc-200 p-3">
                  <p className="font-medium text-zinc-900">{item.title}</p>
                  <p className="text-sm text-zinc-500">{item.author}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section data-testid="api-token-section" className="mt-8">
        <h2 className="text-lg font-semibold text-zinc-900">API Tokens</h2>
        {tokens.length === 0 ? (
          <p data-testid="no-token-message" className="mt-2 text-sm text-zinc-500">No API tokens generated yet.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {tokens.map((t) => (
              <li key={t.id} className="rounded-lg border border-zinc-200 p-3">
                <div data-testid="token-display">
                  <code data-testid="api-token" className="break-all text-sm">{t.token}</code>
                </div>
              </li>
            ))}
          </ul>
        )}
        <GenerateTokenForm userId={userId} />
      </section>
    </div>
  )
}

async function markReadAction(formData: FormData) {
  "use server"
  const id = Number(formData.get("id"))
  await markAsRead(id)
  revalidatePath("/me")
}

function MarkReadForm({ id }: { id: number }) {
  return (
    <form action={markReadAction}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        data-testid={`mark-read-${id}`}
        className="text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        Mark as read
      </button>
    </form>
  )
}

async function generateTokenAction() {
  "use server"
  const session = await auth()
  if (!session?.user?.id) return
  await generateApiToken(Number(session.user.id))
  revalidatePath("/me")
}

function GenerateTokenForm({ userId: _ }: { userId: number }) {
  return (
    <form action={generateTokenAction} className="mt-3">
      <button
        type="submit"
        data-testid="generate-token-button"
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
      >
        Generate New Token
      </button>
    </form>
  )
}
