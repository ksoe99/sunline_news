'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const exchangeSession = async () => {
      const code = searchParams.get('code') || '';

      const {
        data: { session },
        error,
      } = await supabase.auth.exchangeCodeForSession(code);

      if (error || session?.user.email !== 'newscasteruk@gmail.com') {
        await supabase.auth.signOut();
        router.push('/login');
        return;
      }

      router.push('/');
    };

    exchangeSession();
  }, [router, searchParams]);

  return <div className="p-4 text-center">Authenticating...</div>;
}
