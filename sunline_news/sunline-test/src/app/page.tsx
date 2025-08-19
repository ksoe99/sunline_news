// src/app/page.tsx
import { getBrand } from '@/lib/branding';
import { SunlineKit } from '@/components/SunlineKit';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams; // ⬅️ Await required
  const brandParam = Array.isArray(sp?.brand) ? sp.brand[0] : sp?.brand;
  const brand = await getBrand({ brand: brandParam });

  return (
    <SunlineKit brand={brand}>
      <h2 className="text-3xl font-bold">Welcome to {brand.name}</h2>
      <p className="text-sm mt-2 text-muted">This is the home of real-time digital journalism.</p>
    </SunlineKit>
  );
}



