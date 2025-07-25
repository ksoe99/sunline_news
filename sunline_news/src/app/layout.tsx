import './globals.css'; // Correct for location: src/app/globals.css
import { headers } from 'next/headers';
import { getBrandFromHost } from '@/lib/branding';
import brandThemes from '@/lib/themes'; // ✅ Moved to the top-level

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const host = headersList.get('host');
  const brand = getBrandFromHost(host || '');

  const theme = brandThemes[brand] || brandThemes.sunline;

  return (
    <html lang="en">
      <body className={`${theme} min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
