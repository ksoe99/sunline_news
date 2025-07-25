// src/app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';
import { getBrandFromHost } from '@/lib/branding';

export async function GET(req: Request) {
  const host = req.headers.get('host') || '';
  const brand = getBrandFromHost(host);

  const baseUrlMap: Record<string, string> = {
    sunline: 'https://www.sunlinenews.com',
    skyline: 'https://www.theskylinenews.com',
    atlas: 'https://www.atlaslivenews.com',
    echo: 'https://www.echolivenews.com',
    sovereign: 'https://www.sovereignwirenews.com',
  };

  const baseUrl = baseUrlMap[brand] || baseUrlMap.sunline;

  // Placeholder — ideally fetch these from your CMS or page registry
  const pages = [
    '', // homepage
    'about',
    'contact',
    'articles/sample-headline',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map(
        (page) => `
      <url>
        <loc>${baseUrl}/${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>${page === '' ? '1.0' : '0.8'}</priority>
      </url>`
      )
      .join('')}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
