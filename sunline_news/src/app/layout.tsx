import './globals.css'
import { headers } from 'next/headers'
import { getBrandFromHost } from '@/src/lib/branding'
import { themes } from '@/src/lib/themes'

export async function generateMetadata() {
  const host = headers().get('host') || ''
  const brand = getBrandFromHost(host) ?? 'sunline'
  const t = themes[brand]
  const domain = `https://${host}`
  return {
    title: { default: t.meta.title, template: `%s • ${t.meta.title}` },
    description: t.meta.description,
    metadataBase: new URL(domain),
    themeColor: t.colors.primary,
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: domain,
      siteName: t.meta.title,
      images: [`/${brand}/og.jpg`],
      type: 'website',
    },
    icons: { icon: `/${brand}/favicon.ico` },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
