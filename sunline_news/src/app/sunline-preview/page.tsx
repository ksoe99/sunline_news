'use client';

import dynamic from 'next/dynamic';
import React from 'react';

type BrandProps = {
  brand: {
    key: string;
    name: string;
    logo: string;
    colors: {
      primary: string;
      background: string;
      foreground: string;
      card: string;
      border: string;
    };
  };
  children?: React.ReactNode;
};

const SunlineDemo = dynamic(() =>
  import('@/components/SunlineKit').then(mod => mod.SunlineKit as React.ComponentType<BrandProps>),
  { ssr: false }
);

export default function Page() {
  const dummyBrand = {
    key: 'demo',
    name: 'Sunline Demo',
    logo: '',
    colors: {
      primary: '#1E90FF',
      background: '#ffffff',
      foreground: '#000000',
      card: '#f9f9f9',
      border: '#e0e0e0',
    },
  };

  return (
    <SunlineDemo brand={dummyBrand}>
      <p>Preview Content</p>
    </SunlineDemo>
  );
}
