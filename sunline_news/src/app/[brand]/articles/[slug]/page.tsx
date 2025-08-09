import { draftMode } from 'next/headers';
import { client, previewClient } from '@/lib/sanity';
import query from '@/lib/queries/article';

export default async function ArticlePage({ params }: { params: { brand: string; slug: string } }) {
  const { brand, slug } = params;

  const { isEnabled } = await draftMode();
  const isDraft = isEnabled;
  const dataClient = isDraft ? previewClient : client;

  const article = await dataClient.fetch(query, { slug, brand });

  return (
    <main>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
    </main>
  );
}
