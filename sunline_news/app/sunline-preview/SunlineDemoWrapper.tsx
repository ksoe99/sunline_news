'use client';

import dynamic from 'next/dynamic';

const SunlineDemo = dynamic(
  () => import('@/components/SunlineKit').then((mod) => mod.SunlineKit),
  { ssr: false }
);

export default function SunlineDemoWrapper() {
  return <SunlineDemo />;
}
