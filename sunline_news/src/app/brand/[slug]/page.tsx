import { groq } from 'next-sanity';
import { createClient } from 'next-sanity';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const client = createClient({
  projectId: 'your_project_id_here',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-07-25',
});

const query = groq`
  *[_type == "article" && brand->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt
  }
`;

export default async function BrandPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const articles = await client.fetch(query, { slug });

  if (!articles.length) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-semibold">No articles found for brand: {slug}</h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 capitalize">{slug} Articles</h1>
      <ul className="space-y-4">
        {articles.map((article: any) => (
          <li key={article._id}>
            <Link
              href={`/${slug}/articles/${article.slug.current}`}
              className="text-lg font-medium underline"
            >
              {article.title}
            </Link>
            <div className="text-sm text-gray-500">
              {new Date(article.publishedAt).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
