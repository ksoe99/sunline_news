import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const brandDomains: Record<string, string> = {
  'www.sunlinenews.com': 'sunline',
  'www.theskylinenews.com': 'skyline',
  'www.atlaslivenews.com': 'atlas',
  'www.echolivenews.com': 'echo',
  'www.sovereignwirenews.com': 'sovereign',
};

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  
  // Optional: force redirect from netlify.app
  if (host.includes('netlify.app')) {
    const url = new URL(request.url);
    url.hostname = 'www.sunlinenews.com';
    return NextResponse.redirect(url.toString(), 308);
  }

  return NextResponse.next();
}
