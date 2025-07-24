'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email: 'newscasteruk@gmail.com',
      options: {
        shouldCreateUser: false,
      },
    });

    if (error) {
      console.error('Error sending magic link:', error.message);
      setMessage('Failed to send magic link.');
    } else {
      setMessage('Magic link sent! Check your email.');
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl mb-4">Admin Login</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send Magic Link
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
