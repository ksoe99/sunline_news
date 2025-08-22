'use client';

import dynamic from 'next/dynamic';
import { Brand } from '@/lib/branding';

// ✅ Correct way to dynamically import a named export
const SunlineDemo = dynamic(
  () => import('@/components/SunlineKit').then(mod => mod.SunlineKit),
  { ssr: false }
);

// ✅ Required static brand for preview
const previewBrand: Brand = {
  key: 'sunline',
  name: 'Sunline News',
  logo: '/logos/sunline.png',
  colors: {
    primary: '#d0021b',
    background: '#fff0f0',
    foreground: '#111',
    card: '#ffffff',
    border: '#ddd',
  },
};

export default function Page() {
  return <SunlineDemo brand={previewBrand}>Previewing SunlineKit</SunlineDemo>;
}
