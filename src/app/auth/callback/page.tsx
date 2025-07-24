'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const { error } = await supabase.auth.getSessionFromUrl();
      if (error) {
        console.error('Error exchanging code for session:', error);
        return;
      }

      // Optional: redirect to dashboard or home
      router.replace('/');
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl font-medium">Authenticating...</p>
    </div>
  );
}
