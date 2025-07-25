'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (!error) setSent(true);
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin login</h1>
      {sent ? (
        <p>Check your email for the magic link.</p>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            className="w-full border p-2 rounded"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button className="bg-black text-white px-4 py-2 rounded" type="submit">
            Send magic link
          </button>
        </form>
      )}
    </main>
  );
}
