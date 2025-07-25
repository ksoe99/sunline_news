import './globals.css';
import { headers } from 'next/headers';
import { getBrandFromHost } from '../../lib/branding';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sunline Network',
  description: 'Multi-brand news network',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const host = headersList.get('host');
  const brand = getBrandFromHost(host || '');

  const brandThemes: Record<string, string> = {
    sunline: 'bg-yellow-100 text-black',
    skyline: 'bg-blue-900 text-white',
    atlas: 'bg-indigo-800 text-white',
    echo: 'bg-rose-950 text-white',
    sovereign: 'bg-gray-950 text-white',
  };

  return (
    <html lang="en">
      <body className={brandThemes[brand] || ''}>
        {children}
      </body>
    </html>
  );
}
