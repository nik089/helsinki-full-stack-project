export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ notification?: string }>
}) {
  const { notification } = await searchParams

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {notification && (
        <div data-testid="notification" className="mb-6 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-800">
          {notification}
        </div>
      )}
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
        Welcome to Blog App
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        A Next.js application built for Full Stack Open.
      </p>
    </div>
  )
}
