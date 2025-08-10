import { headers } from 'next/headers'
import { getBrandFromHost } from '@/lib/branding'
import SunlineKit from '@/components/SunlineKit'

export default async function Page() {
  const host = (await headers()).get('host') || ''
  const brand = getBrandFromHost(host) ?? 'sunline'
  return <SunlineKit brand={brand} />
}