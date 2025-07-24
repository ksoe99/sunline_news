'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const exchangeSession = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession({
        query: {
          code: searchParams.get('code') || '',
        },
      });

      if (error) {
        console.error('Error exchanging code for session:', error);
      } else {
        router.push('/');
      }
    };

    exchangeSession();
  }, [router, searchParams]);

  return <div className="p-4 text-center">Authenticating...</div>;
}
