import { getBrand } from "../../../lib/branding";
import { SunlineKit } from "../../../components/SunlineKit"; // ✅
import { articles } from "../../../lib/articles";

export default async function ArticleDetail({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const brandParam = Array.isArray(searchParams?.brand)
    ? searchParams?.brand[0]
    : searchParams?.brand;
  const brand = await getBrand({ brand: brandParam });

  const article = articles.find(
    (a) => a.id === params.id && a.brands.includes(brand.key)
  );

  return (
    <SunlineKit brand={brand}>
      {!article ? (
        <div>
          <h2 style={{ fontSize: "1.25rem" }}>Not found</h2>
          <p>No article with id "{params.id}" for {brand.name}.</p>
        </div>
      ) : (
        <article>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{article.title}</h1>
          <p style={{ color: "var(--color-fg)" }}>{article.summary}</p>
          <p style={{ marginTop: "1rem" }}>
            <a
              href={`/articles${
                process.env.NODE_ENV !== "production" ? `?brand=${brand.key}` : ""
              }`}
              style={{ color: "var(--color-primary)" }}
            >
              ← Back to Articles
            </a>
          </p>
        </article>
      )}
    </SunlineKit>
  );
}




