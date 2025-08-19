import * as React from "react";
import type { Brand } from "@/lib/branding";

interface Article {
  id: string;
  title: string;
  summary: string;
  brands: string[];
}

export function ArticleCard({
  article,
  brand,
}: {
  article: Article;
  brand: Brand;
}) {
  return (
    <a
      href={`/articles/${article.id}${
        process.env.NODE_ENV !== "production" ? `?brand=${brand.key}` : ""
      }`}
      style={{
        display: "block",
        border: `2px solid ${brand.colors.border}`,
        borderRadius: "8px",
        background: brand.colors.card,
        color: brand.colors.foreground,
        padding: "1rem",
        textDecoration: "none",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)")
      }
    >
      {/* Logo + Accent Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.75rem",
        }}
      >
        {brand.logo && (
          <img
            src={brand.logo}
            alt={brand.name}
            style={{ height: "28px", objectFit: "contain" }}
          />
        )}
        <div
          style={{
            height: "4px",
            flex: 1,
            background: brand.colors.primary,
            borderRadius: "2px",
          }}
        />
      </div>

      {/* Headline */}
      <h2
        style={{
          fontSize:
            brand.key === "sunline"
              ? "1.75rem" // Tabloid big headline
              : brand.key === "sovereign"
              ? "1.25rem" // More restrained, FT style
              : "1.4rem",
          fontWeight: brand.key === "sovereign" ? 600 : 700,
          margin: "0 0 0.5rem",
          color: brand.key === "sunline" ? "#d60000" : "var(--color-fg)",
        }}
      >
        {article.title}
      </h2>

      {/* Summary */}
      <p
        style={{
          fontSize: brand.key === "sovereign" ? "0.95rem" : "1rem",
          lineHeight: 1.5,
          color: brand.colors.foreground,
          opacity: brand.key === "echo" ? 0.9 : 1,
        }}
      >
        {article.summary}
      </p>
    </a>
  );
}
