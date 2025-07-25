'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const email = data.session?.user?.email;
      if (email === 'newscasteruk@gmail.com') {
        setAuthorized(true);
      } else {
        setAuthorized(false);
        router.replace('/login');
      }
    })();
  }, [router]);

  if (authorized === null) {
    return <div className="p-4 text-sm">Loading admin…</div>;
  }

  if (!authorized) return null; // we redirected

  return <>{children}</>;
}
