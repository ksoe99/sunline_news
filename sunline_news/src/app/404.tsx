// src/app/404.tsx
import { headers } from 'next/headers';
import { getBrandFromHost } from '@/lib/branding';
import Link from 'next/link';

const brandThemes: Record<string, { name: string; color: string; bg: string; text: string }> = {
  sunline: { name: 'Sunline News', color: '#ffffff', bg: 'bg-white', text: 'text-black' },
  skyline: { name: 'Skyline News', color: '#000000', bg: 'bg-black', text: 'text-white' },
  atlas: { name: 'Atlas Live', color: '#eff6ff', bg: 'bg-blue-50', text: 'text-blue-900' },
  echo: { name: 'Echo Live', color: '#f3f4f6', bg: 'bg-gray-100', text: 'text-gray-900' },
  sovereign: { name: 'Sovereign Wire', color: '#f4f4f5', bg: 'bg-zinc-100', text: 'text-zinc-900' },
};

export default async function NotFound() { // ✅ async here
  const hdrs = await headers(); // ✅ Await the promise
  const host = hdrs.get('host') || '';
  const brand = getBrandFromHost(host);
  const theme = brandThemes[brand] || brandThemes.sunline;

  return (
    <html lang="en">
      <head>
        <title>Page Not Found — {theme.name}</title>
        <meta name="theme-color" content={theme.color} />
      </head>
      <body className={`${theme.bg} ${theme.text} min-h-screen flex flex-col items-center justify-center p-8 text-center`}>
        <h1 className="text-4xl font-bold mb-4">404 — Page Not Found</h1>
        <p className="mb-6">We couldn’t find what you were looking for.</p>
        <Link href="/">
          <span className="underline">Return to {theme.name}</span>
        </Link>
      </body>
    </html>
  );
}

