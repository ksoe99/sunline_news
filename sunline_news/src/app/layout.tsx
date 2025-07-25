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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
const host = headersList.get('host');
  const brand = getBrandFromHost(host || '');

  const brandThemes: Record<string, string> = {
    sunline: 'bg-white text-black',
    skyline: 'bg-black text-white',
    atlas: 'bg-slate-800 text-white',
    echo: 'bg-white text-green-800',
    sovereign: 'bg-zinc-900 text-red-500',
  };

  const theme = brandThemes[brand] || brandThemes['sunline'];

  return (
    <html lang="en">
      <body className={`${inter.className} ${theme}`}>
        <div className="min-h-screen px-6 py-4">
          <header className="mb-6 text-3xl font-bold capitalize">{brand} news</header>
          {children}
        </div>
      </body>
    </html>
  );
}
