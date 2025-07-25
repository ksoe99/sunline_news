// src/app/[brand]/articles/[slug]/page.tsx
import { groq } from 'next-sanity';
import { client } from '@/lib/sanity.client';
import { previewClient } from '@/lib/sanity.preview';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';

export const dynamic = 'force-dynamic';

const query = groq`
  *[_type == "article" && slug.current == $slug && brand->slug.current == $brand][0] {
    title,
    publishedAt,
    body,
    brand->{ name, slug }
  }
`;

export default async function ArticlePage({ params }: { params: { brand: string; slug: string } }) {
  const { brand, slug } = params;
  const isDraft = draftMode().isEnabled;
  const dataClient = isDraft ? previewClient : client;

  const article = await dataClient.fetch(query, { slug, brand });

  if (!article) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(article.publishedAt).toLocaleDateString()} — {article.brand.name}
      </p>
      <div className="prose">
        <PortableText value={article.body} />
      </div>
    </div>
  );
}
