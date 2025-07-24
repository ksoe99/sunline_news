'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const exchange = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession();
      if (error) {
        console.error('Auth error:', error.message);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email === 'newscasteruk@gmail.com') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    };

    exchange();
  }, [router]);

  return <div className="p-4 text-center">Authenticating...</div>;
}
