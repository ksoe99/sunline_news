'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const url = window.location.href;
      const { error } = await supabase.auth.exchangeCodeForSession(url);
      if (error) {
        console.error('Error exchanging code for session:', error);
      } else {
        router.push('/');
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold">Completing login...</h1>
    </div>
  );
}
