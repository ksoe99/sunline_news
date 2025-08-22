'use client';

import dynamic from 'next/dynamic';
import { Brand } from '@/lib/branding';

const SunlineKit = dynamic(() =>
  import('@/components/SunlineKit').then(mod => mod.default), { ssr: false }
);

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
  return (
    <SunlineKit brand={previewBrand}>
      Previewing SunlineKit
    </SunlineKit>
  );
}
