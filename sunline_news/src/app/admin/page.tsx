'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import AdminGate from '@/components/AdminGate';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <AdminGate>
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
    </AdminGate>
  );
}

