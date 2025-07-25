import './globals.css'; // ✅ Correct for location: src/app/globals.css
import { headers } from 'next/headers';
import { getBrandFromHost } from '@/lib/branding';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const host = headersList.get('host');
  const brand = getBrandFromHost(host || '');

  const brandThemes: Record<string, string> = {
    sunline: 'bg-white text-black',
    skyline: 'bg-black text-white',
    atlas: 'bg-blue-50 text-blue-900',
    echo: 'bg-gray-100 text-gray-900',
    sovereign: 'bg-zinc-100 text-zinc-900',
  };

  const theme = brandThemes[brand] || brandThemes.sunline;

  return (
    <html lang="en">
      <body className={`${theme} min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
