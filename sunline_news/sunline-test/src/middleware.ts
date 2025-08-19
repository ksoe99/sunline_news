import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  let brand = 'sunline';

  if (host.includes('atlas')) brand = 'atlas';
  else if (host.includes('sovereign')) brand = 'sovereign';
  else if (host.includes('skyline')) brand = 'skyline';
  else if (host.includes('echo')) brand = 'echo';

  const url = request.nextUrl;
  url.searchParams.set('brand', brand);
  return NextResponse.rewrite(url);
}
