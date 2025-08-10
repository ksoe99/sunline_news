import { headers } from 'next/headers';
import { getBrandFromHost } from '@/lib/branding';

export default function NotFound() {
  const brand = getBrandFromHost(headers().get('host') || '') ?? 'sunline';
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p>Sorry, we couldn’t find that page.</p>
    </div>
  );
}
