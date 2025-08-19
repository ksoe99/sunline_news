// src/app/live/page.tsx

import { getBrand } from "../../../lib/branding";
import SunlineKit from "../../../components/SunlineKit";

export default async function LivePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const brandParam = Array.isArray(sp?.brand) ? sp.brand[0] : sp?.brand;
  const brand = await getBrand({ brand: brandParam });

  return (
    <SunlineKit brand={brand}>
      <h2 className="text-2xl font-bold mb-4">{brand.name} - Live Feed</h2>
      <div className="aspect-video w-full max-w-5xl mx-auto">
        {brand.liveUrl ? (
          <iframe
            src={brand.liveUrl}
            width="100%"
            height="100%"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full border rounded-lg shadow"
          />
        ) : (
          <p className="text-center">No live feed available for this brand.</p>
        )}
      </div>
    </SunlineKit>
  );
}
