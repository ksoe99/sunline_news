'use client';

import dynamic from 'next/dynamic';

const SunlineDemo = dynamic(() => import('@/components/SunlineKit'), {
  ssr: false,
});

const mockBrand = {
  name: 'Sunline News',
  colors: {
    background: '#ffffff',
    foreground: '#000000',
  },
};

export default function SunlineDemoWrapper() {
  return <SunlineDemo brand={mockBrand} />;
}