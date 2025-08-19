// src/app/articles/page.tsx
import { getBrand } from "../../../lib/branding";
import { articles } from "../../../lib/articles";
import SunlineKit from "../../../components/SunlineKit";
import Link from 'next/link';

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams; // <-- await the promise
  const brandParam = Array.isArray(sp?.brand) ? sp.brand[0] : sp?.brand;

  const brand = await getBrand({ brand: brandParam });
  const filtered = articles.filter((a) => a.brands.includes(brand.key));

  return (
    <SunlineKit brand={brand}>
      <h2 className="text-xl font-semibold mb-4">Articles</h2>
      <ul className="space-y-4">
        {filtered.map((article) => (
          <li key={article.id}>
            <Link
              href={`/articles/${article.id}?brand=${brand.key}`}
              className="text-lg text-[var(--color-primary)] underline"
            >
              {article.title}
            </Link>
            <p className="text-sm">{article.summary}</p>
          </li>
        ))}
      </ul>
    </SunlineKit>
  );
}

