'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AdminPage() {
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user?.email === 'newscasteruk@gmail.com') {
        setUser(session.user.email)
      } else {
        // Not authorized—redirect to login
        window.location.href = '/login'
      }
    }
    fetchSession()
  }, [])

  if (!user) {
    return <div className="p‑4 text‑center font‑medium">Loading admin...</div>
  }

  return (
    <div className="p‑4 max‑w‑3xl mx‑auto">
      <h1 className="text‑2xl font‑bold mb‑4">Admin Dashboard</h1>
      <p>Welcome, {user}. You can manage all five news sites from here.</p>
      {/* Add your page update controls here */}
    </div>
  )
}
