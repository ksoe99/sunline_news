// src/app/articles/[id]/page.tsx

import { notFound } from 'next/navigation';
import { articles } from "../../../lib/articles";
import { getBrand } from "../../../lib/branding";
import SunlineKit from "../../../components/SunlineKit";
import Link from 'next/link';

export default async function ArticleDetail({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const brandParam = Array.isArray(sp?.brand) ? sp.brand[0] : sp?.brand;
  const brand = await getBrand({ brand: brandParam });

  const article = articles.find(a => a.id === params.id && a.brands.includes(brand.key));
  if (!article) return notFound();

  return (
    <SunlineKit brand={brand}>
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-[var(--color-primary)]">{article.title}</h1>
        <p className="text-sm text-muted-foreground mb-1">By {article.author || 'Editorial Staff'} • {article.publishedAt || 'Today'}</p>
        {article.tags && (
          <div className="flex flex-wrap gap-2 text-xs text-blue-300 mb-4">
            {article.tags.map((tag, i) => (
              <span key={i} className="bg-blue-900 px-2 py-0.5 rounded-full">#{tag}</span>
            ))}
          </div>
        )}
        <p className="text-base leading-relaxed text-[var(--color-foreground)] mb-6">{article.summary}</p>

        <div className="flex gap-4 text-sm">
          <a
            href={`https://twitter.com/share?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent('https://example.com/articles/' + article.id)}`}
            className="text-blue-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on Twitter
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://example.com/articles/' + article.id)}&title=${encodeURIComponent(article.title)}`}
            className="text-blue-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on LinkedIn
          </a>
        </div>

        <div className="mt-8">
          <Link href={`/articles?brand=${brand.key}`} className="text-sm underline text-blue-400">
            ← Back to Articles
          </Link>
        </div>
      </article>
    </SunlineKit>
  );
}
