import { headers } from 'next/headers'
import { getBrandFromHost } from '@/src/lib/branding'

export default function NotFound() {
  const brand = getBrandFromHost(headers().get('host') || '') ?? 'sunline'
  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-gray-600">
        We couldn’t find that page on {brand === 'sunline' ? 'Sunline News' : brand}.
      </p>
      <a href="/" className="mt-4 inline-block text-red-700 underline">Go home</a>
    </main>
  )
}
