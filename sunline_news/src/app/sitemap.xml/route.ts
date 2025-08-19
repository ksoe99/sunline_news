import { headers } from 'next/headers'
import { getBrandFromHost, safeBrand, defaultBrand } from '@/lib/branding'

export const dynamic = 'force-dynamic'

function urlsForBrand(_brand: ReturnType<typeof safeBrand>) {
  // TODO: replace with real per‑brand routes
  return ['/', '/about', '/contact']
}

export async function GET() {
  const hostHeader = (await headers()).get('host') ?? ''
  const brand = safeBrand(getBrandFromHost(hostHeader) ?? defaultBrand)
  const origin = `https://${hostHeader}`

  const urls = urlsForBrand(brand)
    .map(
      (path) =>
        `<url><loc>${origin}${path}</loc><changefreq>hourly</changefreq></url>`
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`

  return new Response(xml, {
    status: 200,
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  })
}

