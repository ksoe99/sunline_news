// src/app/not-found.tsx
export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-4xl font-black" style={{ fontFamily: 'var(--brand-heading)', color: 'var(--brand-primary)' }}>
        404
      </h1>
      <p className="mt-2 text-gray-600" style={{ fontFamily: 'var(--brand-body)' }}>
        We couldn’t find that page.
      </p>
      <a href="/" className="mt-6 inline-block text-[var(--brand-primary)] hover:underline">
        Go home
      </a>
    </main>
  )
}
