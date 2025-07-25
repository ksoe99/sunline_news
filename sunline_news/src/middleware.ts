// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Brand = 'sunline' | 'skyline' | 'atlas' | 'echo' | 'sovereign';

const BRAND_BY_HOST: Record<string, Brand> = {
  'www.sunlinenews.com': 'sunline',
  'sunlinenews.com': 'sunline',
  'www.theskylinenews.com': 'skyline',
  'theskylinenews.com': 'skyline',
  'www.atlaslivenews.com': 'atlas',
  'atlaslivenews.com': 'atlas',
  'www.echolivenews.com': 'echo',
  'echolivenews.com': 'echo',
  'www.sovereignwirenews.com': 'sovereign',
  'sovereignwirenews.com': 'sovereign',
};

const CANONICAL_BY_BRAND: Record<Brand, string> = {
  sunline: 'www.sunlinenews.com',
  skyline: 'www.theskylinenews.com',
  atlas: 'www.atlaslivenews.com',
  echo: 'www.echolivenews.com',
  sovereign: 'www.sovereignwirenews.com',
};

// If you add preview domains you *don’t* want indexed, put them here
const DISALLOW_INDEX_HOSTS: Set<string> = new Set([
  // e.g. 'main--sunline-network.netlify.app'
]);

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const host = req.headers.get('host') ?? '';
  const proto = req.headers.get('x-forwarded-proto') ?? 'https';

  // 1) Kick anything on *.netlify.app to primary prod domain
  if (host.endsWith('netlify.app')) {
    const url = new URL(nextUrl);
    url.hostname = CANONICAL_BY_BRAND.sunline;
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  const brand = BRAND_BY_HOST[host] ?? null;

  // 2) Force HTTPS (mostly redundant on Netlify, but safe if infra changes)
  if (proto !== 'https') {
    const url = new URL(nextUrl);
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  // 3) If host is known but not the canonical for that brand, 308 to canonical
  if (brand) {
    const canonical = CANONICAL_BY_BRAND[brand];
    if (host !== canonical) {
      const url = new URL(nextUrl);
      url.hostname = canonical;
      url.protocol = 'https:';
      return NextResponse.redirect(url, 308);
    }
  } else {
    // 4) Unknown host → brand-aware 404 (served from the primary)
    const url = new URL(nextUrl);
    url.hostname = CANONICAL_BY_BRAND.sunline;
    url.pathname = '/404';
    return NextResponse.rewrite(url);
  }

  // 5) Pass through & attach useful headers
  const res = NextResponse.next();

  // Make brand available to RSC/route handlers via headers()
  res.headers.set('x-brand', brand);

  // (Optional) Disallow indexing for any non-canonical or preview hosts
  if (DISALLOW_INDEX_HOSTS.has(host)) {
    res.headers.set('x-robots-tag', 'noindex, nofollow, noarchive');
  }

  // Basic hardening headers (tune CSP to your needs)
  res.headers.set('x-frame-options', 'SAMEORIGIN');
  res.headers.set('x-content-type-options', 'nosniff');
  res.headers.set('referrer-policy', 'strict-origin-when-cross-origin');
  res.headers.set(
    'permissions-policy',
    'camera=(), microphone=(), geolocation=()'
  );
  // Example CSP skeleton (expand as you lock things down)
  // res.headers.set(
  //   'content-security-policy',
  //   "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; font-src 'self'; frame-ancestors 'self'; form-action 'self'; base-uri 'self';"
  // );

  return res;
}

// Skip static assets, image optimizer, files, and (optionally) API routes
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/health).*)',
  ],
};
