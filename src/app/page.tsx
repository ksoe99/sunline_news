'use client';

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session?.user?.email === "newscasteruk@gmail.com") {
        setUserEmail(data.session.user.email);
      }
    };

    getSession();
  }, [supabase]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <header className="bg-red-600 text-white p-4 rounded-2xl shadow-md">
        <h1 className="text-4xl font-extrabold tracking-tight">THE SUNLINE</h1>
        <p className="text-sm italic">Fearless News. Sharp Stories. Daily Truths.</p>
        {userEmail && (
          <p className="mt-2 text-sm text-yellow-200">
            Logged in as <strong>{userEmail}</strong>
          </p>
        )}
      </header>

      <div className="my-4">
        <Input placeholder="Search articles..." className="w-full" />
      </div>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-2 bg-yellow-50 border-2 border-red-500">
          <CardContent className="p-4">
            <h2 className="text-2xl font-bold text-red-700">EXCLUSIVE: Tech Mogul Turns Philanthropist</h2>
            <p className="mt-2 text-base text-gray-800">
              {`In a surprising turn, the once-reclusive CEO has donated over $10 million to rebuild education systems in underfunded communities. “It's about giving back,” he said.`}
            </p>
            <Button className="mt-4 bg-red-600 hover:bg-red-700">Read More</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">BREAKING: Local Hero Saves Family From Flood</h3>
            <p className="text-sm mt-2">A spontaneous act of bravery earns nationwide praise.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">OPINION: The Media&apos;s Role in Healing Society</h3>
            <p className="text-sm mt-2">We need more truth and less division in the headlines. It&apos;s what journalism should be.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">SPOTLIGHT: Rising Entrepreneurs Changing the Game</h3>
            <p className="text-sm mt-2">Innovation meets compassion in today’s business leaders.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
