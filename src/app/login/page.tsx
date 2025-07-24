'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) return router.replace('/login');
      if (session.user.email !== 'newscasteruk@gmail.com') {
        return router.replace('/login');
      }
      setUser(session.user.email);
    });
  }, [router]);

  if (!user) return <div className="p-4 text-center">Loading admin…</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user}</h1>
      <div className="mt-6 space-x-4">
        <button onClick={() => router.push('/admin/tech')} className="btn">Tech</button>
        <button onClick={() => router.push('/admin/sports')} className="btn">Sports</button>
        <button onClick={() => router.push('/admin/weather')} className="btn">Weather</button>
        <button onClick={() => router.push('/admin/business')} className="btn">Business</button>
        <button onClick={() => router.push('/admin/featured')} className="btn">Featured</button>
      </div>
    </div>
  );
}
