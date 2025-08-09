import './globals.css';
import { headers } from 'next/headers';
import { getBrandFromHost } from '@/lib/branding';
import themes from '@/lib/themes';

export async function generateMetadata() {
  const host = (await headers()).get('host') || '';
  const brand = getBrandFromHost(host);
  const theme = themes[brand] || themes.sunline;

  return {
    title: theme.name,
    themeColor: theme.color,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
