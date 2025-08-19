// src/app/api/local-news/route.ts

import { NextResponse } from 'next/server';

const CURRENTS_API_KEY = process.env.CURRENTS_API_KEY;

async function reverseGeocode(lat: string, lon: string): Promise<string | null> {
  const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
  const data = await res.json();
  return data?.address?.city || data?.address?.town || data?.address?.state || null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon || !CURRENTS_API_KEY) {
    return NextResponse.json({ error: 'Missing lat/lon or API key' }, { status: 400 });
  }

  const location = await reverseGeocode(lat, lon);
  if (!location) {
    return NextResponse.json({ error: 'Failed to geocode location' }, { status: 500 });
  }

  const response = await fetch(`https://api.currentsapi.services/v1/search?keywords=${encodeURIComponent(
    location
  )}&apiKey=${CURRENTS_API_KEY}`);

  const data = await response.json();
  return NextResponse.json(data);
}
