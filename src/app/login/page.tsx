'use client';

import React, { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
      setError('')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Login with Magic Link</h1>
      {sent ? (
        <p className="text-green-600">✅ Check your email for the magic link.</p>
      ) : (
        <>
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleLogin}>Send Magic Link</Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      )}
    </div>
  )
}
