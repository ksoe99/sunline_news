import { headers } from 'next/headers'
import { getBrandFromHost } from '@/lib/branding'
import SunlineKit from '@/components/SunlineKit'

export default function Page() {
  const brand = getBrandFromHost(headers().get('host') || '') ?? 'sunline'
  return <SunlineKit brand={brand} />
}
