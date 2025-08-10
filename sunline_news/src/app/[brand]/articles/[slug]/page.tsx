import { draftMode } from 'next/headers';
import { client, previewClient } from '@/lib/sanity';
import query from '@/lib/queries/article';

export default async function ArticlePage({ params }: { params: { brand: string; slug: string } }) {
  const { brand, slug } = params;

  // Only define isDraft once
  const { isEnabled: isDraft } = await draftMode();

  // Choose the correct Sanity client
  const dataClient = isDraft ? previewClient : client;

  // Fetch the article
  const article = await dataClient.fetch(query, { brand, slug });

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <article>
      <h1>{article.title}</h1>
      <p>{article.publishedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: article.body }} />
    </article>
  );
}
