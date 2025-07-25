import './globals.css';
import { headers } from 'next/headers';
import { getBrandFromHost } from '@/lib/branding';
import brandThemes from '@/lib/themes';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const host = headersList.get('host');
  const brand = getBrandFromHost(host || '');

  const theme = brandThemes[brand] || brandThemes.sunline;
  const themeColor: Record<string, string> = {
    sunline: '#ffffff',
    skyline: '#000000',
    atlas: '#e0f2fe',
    echo: '#f3f4f6',
    sovereign: '#f4f4f5',
  };

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content={themeColor[brand] || '#ffffff'} />
      </head>
      <body className={`${theme} min-h-screen`}>
        {children}
      </body>
    </html>
  );
}