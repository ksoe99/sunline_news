import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const brand = hostname.split('.')[0]

  if (request.nextUrl.pathname === '/robots.txt') {
    return NextResponse.rewrite(new URL(`/${brand}/robots.txt`, request.url))
  }

  return NextResponse.next()
}
