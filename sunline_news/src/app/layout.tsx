// src/app/layout.tsx
import './globals.css';
import { headers } from 'next/headers';
import { getBrandFromHost } from '@/lib/branding';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const brand = getBrandFromHost(host);
console.log('Active brand:', brand);

  const brandThemes: Record<string, string> = {
    sunline: 'bg-white text-black',
    skyline: 'bg-black text-white',
    atlas: 'bg-blue-50 text-blue-900',
    echo: 'bg-gray-100 text-gray-900',
    sovereign: 'bg-zinc-100 text-zinc-900',
  };

  const themeColorMap: Record<string, string> = {
    sunline: '#ffffff',
    skyline: '#000000',
    atlas: '#eff6ff',
    echo: '#f3f4f6',
    sovereign: '#f4f4f5',
  };

  const titleMap: Record<string, string> = {
    sunline: 'Sunline News',
    skyline: 'Skyline News — Tech & Future',
    atlas: 'Atlas Live — Global Affairs',
    echo: 'Echo Live — Policy & Society',
    sovereign: 'Sovereign Wire — Investigations',
  };

  const descriptionMap: Record<string, string> = {
    sunline: 'Top headlines and fearless journalism from Sunline News.',
    skyline: 'Explore tech breakthroughs and future trends on Skyline News.',
    atlas: 'Global political coverage from Atlas Live.',
    echo: 'Public policy, civil society, and law on Echo Live.',
    sovereign: 'In-depth investigations and reporting at Sovereign Wire.',
  };

  const ogImageMap: Record<string, string> = {
    sunline: '/sunline/og.jpg',
    skyline: '/skyline/og.jpg',
    atlas: '/atlas/og.jpg',
    echo: '/echo/og.jpg',
    sovereign: '/sovereign/og.jpg',
  };

  const faviconMap: Record<string, string> = {
    sunline: '/sunline/favicon.ico',
    skyline: '/skyline/favicon.ico',
    atlas: '/atlas/favicon.ico',
    echo: '/echo/favicon.ico',
    sovereign: '/sovereign/favicon.ico',
  };

  const canonicalMap: Record<string, string> = {
    sunline: 'https://www.sunlinenews.com',
    skyline: 'https://www.theskylinenews.com',
    atlas: 'https://www.atlaslivenews.com',
    echo: 'https://www.echolivenews.com',
    sovereign: 'https://www.sovereignwirenews.com',
  };

  const theme = brandThemes[brand] || brandThemes.sunline;
  const title = titleMap[brand] || titleMap.sunline;
  const description = descriptionMap[brand] || descriptionMap.sunline;
  const ogImage = ogImageMap[brand] || ogImageMap.sunline;
  const favicon = faviconMap[brand] || '/sunline/favicon.ico';
  const themeColor = themeColorMap[brand] || '#ffffff';
  const canonicalUrl = canonicalMap[brand] || canonicalMap.sunline;

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content={themeColor} />
        <link rel="icon" href={favicon} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${theme} min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
