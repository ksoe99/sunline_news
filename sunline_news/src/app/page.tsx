import { headers } from 'next/headers'
import { getBrandFromHost } from '@/src/lib/branding'
import SunlineKit from '@/components/SunlineKit'

export default function Page() {
  const host = headers().get('host') || ''
  const brand = getBrandFromHost(host) ?? 'sunline'
  // For now, all brands show SunlineKit; swap once other kits exist
  return <SunlineKit articles={[]} />
}
