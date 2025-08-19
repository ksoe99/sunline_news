'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { Search, Menu, ChevronRight, Clock, ArrowRight } from 'lucide-react';

/* ---------- THEMES ---------- */
export const themes = {
  sunline: {
    key: 'sunline',
    name: 'Sunline News',
    colors: { primary: '#B01919', accent: '#F6C026', text: '#111827', subtle: '#6B7280', bg: '#FFFFFF', bgMuted: '#FFF7ED' },
    fonts: { heading: 'Merriweather, ui-serif, Georgia, serif', body: 'Inter, ui-sans-serif, system-ui' },
    logo: '/assets/logos/sunline-news.svg'
  },
  atlas: {
    key: 'atlas',
    name: 'Atlas Live News',
    colors: { primary: '#1E5AA8', accent: '#A7C8F2', text: '#0F172A', subtle: '#64748B', bg: '#FFFFFF', bgMuted: '#EFF6FF' },
    fonts: { heading: 'Inter, ui-sans-serif, system-ui', body: 'Inter, ui-sans-serif, system-ui' },
    logo: '/assets/logos/atlas-live-news.svg'
  },
  sovereign: {
    key: 'sovereign',
    name: 'Sovereign Wire News',
    colors: { primary: '#0B2147', accent: '#C8A94B', text: '#0B1220', subtle: '#6B7280', bg: '#FFFFFF', bgMuted: '#F8FAFC' },
    fonts: { heading: 'Merriweather, ui-serif, Georgia, serif', body: 'Source Serif Pro, ui-serif, Georgia, serif' },
    logo: '/assets/logos/sovereign-wire-news.svg'
  },
  skyline: {
    key: 'skyline',
    name: 'The Skyline News',
    colors: { primary: '#344556', accent: '#8FA6BF', text: '#111827', subtle: '#6B7280', bg: '#FFFFFF', bgMuted: '#F3F4F6' },
    fonts: { heading: 'Inter, ui-sans-serif, system-ui', body: 'Inter, ui-sans-serif, system-ui' },
    logo: '/assets/logos/the-skyline-news.svg'
  },
  echo: {
    key: 'echo',
    name: 'Echo Live News',
    colors: { primary: '#FF3B30', accent: '#00C7BE', text: '#111827', subtle: '#6B7280', bg: '#FFFFFF', bgMuted: '#FFF1F2' },
    fonts: { heading: 'Archivo Black, ui-sans-serif, system-ui', body: 'Inter, ui-sans-serif, system-ui' },
    logo: '/assets/logos/echo-live-news.svg'
  }
} as const;

type BrandKey = keyof typeof themes;
const DEFAULT_BRAND: BrandKey = 'sunline';

export function safeBrand(value?: string | null): BrandKey {
  const v = (value ?? '').toLowerCase();
  return (Object.keys(themes) as BrandKey[]).includes(v as BrandKey) ? (v as BrandKey) : DEFAULT_BRAND;
}

/* ---------- THEME PROVIDER ---------- */
type Tokens = (typeof themes)[BrandKey];
type ThemeContextType = { brand: BrandKey; tokens: Tokens };
const ThemeCtx = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ brand = DEFAULT_BRAND, children }: { brand?: BrandKey; children?: React.ReactNode }) {
  const tokens = useMemo(() => themes[brand], [brand]);
  return (
    <ThemeCtx.Provider value={{ brand, tokens }}>
      <div
        style={
          {
            ['--brand-primary']: tokens.colors.primary,
            ['--brand-accent']: tokens.colors.accent,
            ['--brand-text']: tokens.colors.text,
            ['--brand-subtle']: tokens.colors.subtle,
            ['--brand-bg']: tokens.colors.bg,
            ['--brand-bgMuted']: tokens.colors.bgMuted,
            ['--brand-heading']: tokens.fonts.heading,
            ['--brand-body']: tokens.fonts.body
          } as React.CSSProperties
        }
        className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)]"
      >
        {children}
      </div>
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}

/* ---------- COMPONENT EXPORT ---------- */
type Article = {
  id: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string;
  image?: string;
};

type Props = {
  brand?: string;
  articles?: Article[];
  children?: React.ReactNode;
};

const mock: Article[] = Array.from({ length: 3 }).map((_, i) => ({
  id: `${i + 1}`,
  title: ['City Council Approves Affordable Housing Plan', 'Markets Rally as Inflation Cools', 'New Transit Line Cuts Commute Times'][i % 3],
  summary: 'Concise dek that previews the article and sets reader expectations.',
  category: ['Politics', 'Business', 'Local'][i % 3],
  author: ['Ava Reed', 'Miles Chen', 'Nora Patel'][i % 3],
  publishedAt: new Date(Date.now() - i * 36e5).toISOString(),
  image: `https://picsum.photos/seed/sunline-${i}/960/540`
}));

function SunlineKit({ brand = 'sunline', articles = mock, children }: Props) {
  const resolvedBrand = safeBrand(brand);
  const [view] = useState<'home' | 'article'>('home');

  return (
    <ThemeProvider brand={resolvedBrand}>
      <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
          <div className="flex items-center gap-4">
            <img src={themes[resolvedBrand].logo} alt={themes[resolvedBrand].name} className="h-9 w-auto" />
            <nav className="hidden md:flex items-center gap-5 text-sm font-semibold">
              {['Top Stories', 'Politics', 'Business', 'Tech', 'World', 'Culture'].map((label) => (
                <a key={label} href="#" className="hover:text-[var(--brand-primary)]">
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden sm:inline-flex bg-white text-[var(--brand-text)] border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-2xl text-sm font-semibold">
              <Search className="h-4 w-4 mr-2" /> Search
            </button>
            <button className="hidden md:inline-flex bg-[var(--brand-primary)] text-white px-4 py-2 rounded-2xl text-sm font-semibold">
              Subscribe <ChevronRight className="h-4 w-4 ml-2" />
            </button>
            <button className="md:hidden px-2 py-2" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {view === 'home' ? (
        <main className="mx-auto max-w-6xl px-4 py-6 lg:px-6 lg:py-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ArticleCard article={articles[0]} feature />
            <div className="grid grid-cols-1 gap-4">
              <ArticleCard article={articles[1]} />
              <ArticleCard article={articles[2]} />
            </div>
          </div>
        </main>
      ) : (
        <main className="mx-auto max-w-3xl px-4 py-8 lg:px-0">
          <h1 className="mb-3 font-serif text-4xl font-black leading-tight" style={{ fontFamily: 'var(--brand-heading)' }}>
            {articles[0].title}
          </h1>
          <p className="mb-6 text-lg text-gray-700">{articles[0].summary}</p>
        </main>
      )}

      {children}

      <footer className="mt-10 border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600 lg:px-6">
          <p className="mt-6 text-xs text-gray-400">
            © {new Date().getFullYear()} {themes[resolvedBrand].name}. Part of the Sunline Network.
          </p>
        </div>
      </footer>
    </ThemeProvider>
  );
}

function ArticleCard({ article, feature }: { article: Article; feature?: boolean }) {
  return (
    <div className={`${feature ? 'md:col-span-2' : ''} overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm`}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
          <img src={article.image || '/assets/placeholders/16x9.jpg'} alt="" className="h-full w-full object-cover" />
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-[var(--brand-accent)] text-[var(--brand-text)]">
              {article.category}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4 md:p-6">
          <a href="#" className="group">
            <h3 className="font-serif text-2xl font-extrabold leading-tight tracking-tight md:text-3xl" style={{ fontFamily: 'var(--brand-heading)' }}>
              {article.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600">{article.summary}</p>
          </a>
          <div className="mt-auto flex items-center justify-between pt-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" /> {new Date(article.publishedAt).toLocaleDateString()}
            </span>
            <a href="#" className="inline-flex items-center gap-1 text-[var(--brand-primary)] hover:underline">
              Read more <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SunlineKit };
