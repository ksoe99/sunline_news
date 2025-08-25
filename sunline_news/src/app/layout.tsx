import "./globals.css"
import { headers } from "next/headers"
import SunlineKit from "@/components/SunlineKit"
import { resolveBrandFromHostOrEnv } from "@/lib/branding"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers()
  const host = h.get("host") ?? ""
  const brand = resolveBrandFromHostOrEnv(host)

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
