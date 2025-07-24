'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

function CallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const exchangeSession = async () => {
      const code = searchParams.get('code');
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error('Error exchanging code for session:', error);
        } else {
          router.push('/');
        }
      }
    };
    exchangeSession();
  }, [router, searchParams]);

  return <div className="p-4 text-center">Authenticating...</div>;
}

export default function Callback() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <CallbackInner />
    </Suspense>
  );
}
