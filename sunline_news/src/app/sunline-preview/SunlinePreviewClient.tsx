'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const SunlineDemo = dynamic(() => import('@/components/SunlineKit'), { ssr: false });

export default function SunlinePreviewClient() {
  const brand = {
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

  return <SunlineDemo brand={brand} />;
}

