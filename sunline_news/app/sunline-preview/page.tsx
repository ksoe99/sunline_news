import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import SunlineKit with named export support
const SunlineDemo = dynamic(
  () => import('@/components/SunlineKit').then((mod) => mod.SunlineKit),
  { ssr: false }
);

export default function Page() {
  return <SunlineDemo />;
}

