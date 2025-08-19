import { SunlineKit } from '@/components/SunlineKit';
import { getBrand } from '@/lib/branding';
import { articles } from '@/lib/articles';
import Link from 'next/link';

export default async function SunlineHome({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const brandParam = Array.isArray(sp?.brand) ? sp.brand[0] : sp?.brand;
  const brand = await getBrand({ brand: brandParam });
  const featured = articles.find(a => a.brands.includes(brand.key));

  return (
    <SunlineKit brand={brand}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[var(--color-card)] p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-2 text-[var(--color-primary)]">Featured</h2>
          {featured && (
            <div>
              <h3 className="text-2xl font-semibold">{featured.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{featured.summary}</p>
              <Link
                href={`/articles/${featured.id}?brand=${brand.key}`}
                className="mt-4 inline-block underline text-sm text-blue-400"
              >
                Read more →
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-[var(--color-card)] p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Weather</h3>
            <div className="text-sm text-muted">Live conditions above</div>
          </div>

          <div className="bg-[var(--color-card)] p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Live Feed</h3>
            <Link
              href={`/live?brand=${brand.key}`}
              className="text-sm underline text-[var(--color-primary)]"
            >
              Watch Now →
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Latest Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {articles
            .filter(a => a.brands.includes(brand.key))
            .map(article => (
              <div
                key={article.id}
                className="bg-[var(--color-card)] p-4 rounded-xl border border-[var(--color-border)]"
              >
                <h4 className="font-semibold text-lg mb-2">{article.title}</h4>
                <p className="text-sm mb-2">{article.summary}</p>
                <Link
                  href={`/articles/${article.id}?brand=${brand.key}`}
                  className="text-sm text-blue-500 underline"
                >
                  Read more
                </Link>
              </div>
            ))}
        </div>
      </div>
    </SunlineKit>
  );
}
