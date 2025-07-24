'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="max-w-md mx-auto mt-20 p-4 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <p className="text-sm text-gray-600 mb-6 text-center">Enter your email to receive a magic login link</p>
      <Input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
      />
      <Button className="w-full bg-red-600 hover:bg-red-700">Send Magic Link</Button>
    </div>
  );
}
