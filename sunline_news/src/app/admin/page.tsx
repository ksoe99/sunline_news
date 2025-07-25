'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user?.email === 'newscasteruk@gmail.com') {
        setAuthorized(true);
      } else {
        router.replace('/login');
      }
      setLoading(false);
    };
    check();
  }, [router]);

  if (loading) return <div className="p-4">Checking credentials…</div>;
  if (!authorized) return null;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-6">Welcome. Manage all Sunline network verticals below.</p>

      <div className="grid gap-3">
        <Button onClick={() => router.push('/admin/sunline')}>Manage Sunline News</Button>
        <Button onClick={() => router.push('/admin/tech')}>Manage Sunline Tech</Button>
        <Button onClick={() => router.push('/admin/politics')}>Manage Sunline Politics</Button>
        <Button onClick={() => router.push('/admin/world')}>Manage Sunline World</Button>
        <Button onClick={() => router.push('/admin/green')}>Manage Sunline Green</Button>
      </div>
    </div>
  );
}
