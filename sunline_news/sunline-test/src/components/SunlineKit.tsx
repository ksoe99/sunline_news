// src/components/SunlineKit.tsx

'use client';

import React, { useEffect } from 'react';
import { Brand } from '@/lib/branding';
import Image from 'next/image';
import Weather from './Weather';
import LocalNews from './LocalNews';
import Link from 'next/link';

interface Props {
  brand: Brand;
  children: React.ReactNode;
}

export function SunlineKit({ brand, children }: Props) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', brand.colors.primary);
    root.style.setProperty('--color-background', brand.colors.background);
    root.style.setProperty('--color-foreground', brand.colors.foreground);
    root.style.setProperty('--color-card', brand.colors.card);
    root.style.setProperty('--color-border', brand.colors.border);
  }, [brand]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-foreground)' }}>
      <header className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src={brand.logo || ''} alt={brand.name} width={40} height={40} />
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{brand.name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Weather />
            <Link href={`/live?brand=${brand.key}`} className="text-sm underline">
              Watch Live
            </Link>
          </div>
        </div>
      </header>
      <main className="p-6">
        {children}
        <div className="mt-10">
          <LocalNews />
        </div>
      </main>
      <footer className="p-4 text-sm text-center border-t" style={{ borderColor: 'var(--color-border)' }}>
        &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
      </footer>
    </div>
  );
}
