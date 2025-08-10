'use client';

import React, { createContext, useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Menu, ChevronRight, Clock, ArrowRight } from "lucide-react";

// ----------------------
// THEME LAYER
// ----------------------

const themes = {
  sunline: {
    name: "Sunline News",
    colors: {
      primary: "#B01919", // deep red
      accent: "#F6C026",  // sun yellow
      text: "#111827",
      subtle: "#6B7280",
      bg: "#FFFFFF",
      bgMuted: "#FFF7ED",
    },
    fonts: {
      heading: "Merriweather, ui-serif, Georgia, serif",
      body: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\"",
    },
    logo: "/assets/logos/sunline-news.svg",
  },
} as const;

type BrandKey = keyof typeof themes;

type ThemeContextType = {
  brand: BrandKey;
  tokens: typeof themes[BrandKey];
};

const ThemeCtx = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ brand = "sunline" as BrandKey, children }: { brand?: BrandKey; children: React.ReactNode }) {
  const tokens = useMemo(() => themes[brand], [brand]);

  return (
    <ThemeCtx.Provider value={{ brand, tokens }}>
      <div
        style={{
          ["--brand-primary" as any]: tokens.colors.primary,
          ["--brand-accent" as any]: tokens.colors.accent,
          ["--brand-text" as any]: tokens.colors.text,
          ["--brand-subtle" as any]: tokens.colors.subtle,
          ["--brand-bg" as any]: tokens.colors.bg,
          ["--brand-bgMuted" as any]: tokens.colors.bgMuted,
          ["--brand-heading" as any]: tokens.fonts.heading,
          ["--brand-body" as any]: tokens.fonts.body,
        }}
        className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)]"
      >
        {children}
      </div>
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

// ----------------------
// PRIMITIVES
// ----------------------

function Button({ children, className = "", variant = "primary", ...props }: any) {
  const base =
    "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles: Record<string, string> = {
    primary:
      "bg-[var(--brand-primary)] text-white hover:bg-red-700 focus:ring-[var(--brand-primary)]",
    subtle:
      "bg-white text-[var(--brand-text)] border border-gray-200 hover:bg-gray-50 focus:ring-gray-300",
    accent:
      "bg-[var(--brand-accent)] text-[var(--brand-text)] hover:brightness-95 focus:ring-[var(--brand-accent)]",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Badge({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "primary" | "muted" }) {
  const toneCls =
    tone === "primary"
      ? "bg-[var(--brand-primary)] text-white"
      : tone === "muted"
      ? "bg-gray-100 text-gray-700"
      : "bg-[var(--brand-accent)] text-[var(--brand-text)]";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${toneCls}`}>{children}</span>;
}

function Card({ children, className = "" }: any) {
  return <div className={`rounded-2xl border border-gray-100 bg-white shadow-sm ${className}`}>{children}</div>;
}

// ----------------------
// HEADER / NAV
// ----------------------

function Header() {
  const { tokens } = useTheme();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-4">
          <img src={tokens.logo} alt="Sunline News" className="h-9 w-auto" />
          <nav className="hidden md:flex items-center gap-5 text-sm font-semibold">
            {[
              { label: "Top Stories", href: "#" },
              { label: "Politics", href: "#" },
              { label: "Business", href: "#" },
              { label: "Tech", href: "#" },
              { label: "World", href: "#" },
              { label: "Culture", href: "#" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="hover:text-[var(--brand-primary)]">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="subtle" className="hidden sm:inline-flex">
            <Search className="h-4 w-4" /> Search
          </Button>
          <Button variant="primary" className="hidden md:inline-flex">
            Subscribe <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="subtle" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

// ----------------------
// ARTICLE CARD
// ----------------------

type Article = {
  id: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string;
  image?: string;
};

function ArticleCard({ article, feature = false }: { article: Article; feature?: boolean }) {
  return (
    <Card className={`${feature ? "md:col-span-2" : ""} overflow-hidden`}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
          <img src={article.image || "/assets/placeholders/16x9.jpg"} alt="" className="h-full w-full object-cover" />
          <div className="absolute left-3 top-3"><Badge>{article.category}</Badge></div>
        </div>
        <div className="flex flex-col gap-3 p-4 md:p-6">
          <a href="#" className="group">
            <h3 className="font-serif text-2xl font-extrabold leading-tight tracking-tight md:text-3xl" style={{ fontFamily: "var(--brand-heading)" }}>
              {article.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              {article.summary}
            </p>
          </a>
          <div className="mt-auto flex items-center justify-between pt-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {new Date(article.publishedAt).toLocaleDateString()}</span>
            <a href="#" className="inline-flex items-center gap-1 text-[var(--brand-primary)] hover:underline">
              Read more <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ----------------------
// HOMEPAGE LAYOUT
// ----------------------

function HomePage({ articles }: { articles: Article[] }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 lg:px-6 lg:py-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ArticleCard article={articles[0]} feature />
        <div className="grid grid-cols-1 gap-4">
          <ArticleCard article={articles[1]} />
          <ArticleCard article={articles[2]} />
        </div>
      </div>
    </main>
  );
}

// ----------------------
// ARTICLE PAGE LAYOUT
// ----------------------

function ArticlePage({ article }: { article: Article }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 lg:px-0">
      <h1 className="mb-3 font-serif text-4xl font-black leading-tight" style={{ fontFamily: "var(--brand-heading)" }}>{article.title}</h1>
      <p className="mb-6 text-lg text-gray-700">{article.summary}</p>
    </main>
  );
}

// ----------------------
// FOOTER
// ----------------------

function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600 lg:px-6">
        <p className="mt-6 text-xs text-gray-400">© {new Date().getFullYear()} Sunline News. Part of the Sunline Network.</p>
      </div>
    </footer>
  );
}

// ----------------------
// DEMO WRAPPER
// ----------------------

const mock: Article[] = Array.from({ length: 3 }).map((_, i) => ({
  id: `${i + 1}`,
  title: [
    "City Council Approves Affordable Housing Plan",
    "Markets Rally as Inflation Cools",
    "New Transit Line Cuts Commute Times"
  ][i % 3],
  summary: "Concise dek that previews the article and sets reader expectations.",
  category: ["Politics", "Business", "Local"][i % 3],
  author: ["Ava Reed", "Miles Chen", "Nora Patel"][i % 3],
  publishedAt: new Date(Date.now() - i * 36e5).toISOString(),
  image: `https://picsum.photos/seed/sunline-${i}/960/540`,
}));

export default function SunlineKit({ brand = "sunline", articles = mock }: { brand?: BrandKey; articles?: Article[] }) {
  const [view, setView] = useState<"home" | "article">("home");
  return (
    <ThemeProvider brand={brand}>
      <Header />
      {view === "home" ? <HomePage articles={articles} /> : <ArticlePage article={articles[0]} />}
      <Footer />
    </ThemeProvider>
  );
}
