'use client';

import dynamic from 'next/dynamic';

const SunlineDemo = dynamic(() => import('@/components/SunlineKit'), {
  ssr: false,
});

const mockBrand: Brand = {
  key: 'sunline',
  name: 'Sunline News',
  logo: '/logos/sunline.png',
  colors: {
    background: '#fff0f0',
    foreground: '#111',
  },
};

export default function SunlineDemoWrapper() {
  return <SunlineDemo brand={mockBrand} />;
}
