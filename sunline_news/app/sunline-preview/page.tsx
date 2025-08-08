'use client';

import dynamic from 'next/dynamic';

const SunlineDemo = dynamic(() => import('@/components/SunlineKit'), { ssr: false });

export default function Page() {
  return <SunlineDemo />;
}
