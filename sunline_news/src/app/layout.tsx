import './globals.css'; // ✅ Correct for location: src/app/globals.css
import { headers } from 'next/headers';
import { getBrandFromHost } from '@/lib/branding';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const host = headersList.get('host');
  const brand = getBrandFromHost(host || '');

  import brandThemes from '@/lib/themes';

  const theme = brandThemes[brand] || brandThemes.sunline;

  return (
    <html lang="en">
      <body className={`${theme} min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
