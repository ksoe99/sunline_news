import { NextRequest } from "next/server";

export const revalidate = 900; // 15 min ISR cache for GET

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  if (!lat || !lon) {
    return new Response(JSON.stringify({ error: "lat & lon required" }), { status: 400 });
  }

  const base = "https://api.open-meteo.com/v1/forecast";
  const url = new URL(base);
  url.searchParams.set("latitude", lat);
  url.searchParams.set("longitude", lon);
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("hourly", "temperature_2m,weather_code,apparent_temperature,wind_speed_10m");
  url.searchParams.set("daily", "sunrise,sunset,uv_index_max");
  url.searchParams.set("minutely_15", "wind_gusts_10m");
  url.searchParams.set("current", "temperature_2m,apparent_temperature,wind_speed_10m,weather_code");

  const res = await fetch(url.toString(), { next: { revalidate } });
  if (!res.ok) {
    return new Response(JSON.stringify({ error: "open-meteo failed" }), { status: 502 });
  }
  const json = await res.json();
  return Response.json(json, {
    // Hint browsers/CDN to cache a bit too:
    headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=300" },
  });
}
