'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const exchange = async () => {
      const error = await supabase.auth.exchangeCodeForSession(); // no args needed
      if (error) {
        console.error('Auth error:', error.message);
        return;
      }
      // Redirect to admin
      router.replace('/admin');
    };
    exchange();
  }, [router]);

  return <div className="p-4 text-center">Authenticating…</div>;
}
