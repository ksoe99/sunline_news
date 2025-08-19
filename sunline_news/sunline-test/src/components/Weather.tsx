// src/components/Weather.tsx
"use client";
import { useEffect, useState } from "react";

type OM = {
  current?: {
    temperature_2m?: number;
    apparent_temperature?: number;
    wind_speed_10m?: number;
    weather_code?: number;
  };
};

function wc(code?: number) {
  if (code == null) return "—";
  if ([0].includes(code)) return "Clear";
  if ([1,2,3].includes(code)) return "Partly cloudy";
  if ([45,48].includes(code)) return "Fog";
  if ([51,53,55].includes(code)) return "Drizzle";
  if ([61,63,65,80,81,82].includes(code)) return "Rain";
  if ([66,67].includes(code)) return "Freezing rain";
  if ([71,73,75,77,85,86].includes(code)) return "Snow";
  if ([95,96,99].includes(code)) return "Thunderstorm";
  return "—";
}

export default function Weather() {
  const [latlon, setLatlon] = useState<{lat:number, lon:number, label?:string}>();
  const [data, setData] = useState<OM>();
  const [err, setErr] = useState<string>();

  useEffect(() => {
    // 1) get user location; fallback to IP-based
    const byIP = async () => {
      try {
        const r = await fetch("https://ipapi.co/json/");
        const j = await r.json();
        setLatlon({ lat: j.latitude, lon: j.longitude, label: `${j.city ?? ""} ${j.country_name ?? ""}`.trim() });
      } catch { setErr("Unable to determine your location."); }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        p => setLatlon({ lat: p.coords.latitude, lon: p.coords.longitude, label: "Your location" }),
        () => void byIP(),
        { enableHighAccuracy: false, timeout: 3000 }
      );
    } else { void byIP(); }
  }, []);

  useEffect(() => {
    (async () => {
      if (!latlon) return;
      try {
        const r = await fetch(`/api/weather?lat=${latlon.lat}&lon=${latlon.lon}`, { cache: "no-store" });
        if (!r.ok) throw new Error("weather fetch failed");
        setData(await r.json());
      } catch (e:any) { setErr(e?.message ?? "Weather error"); }
    })();
  }, [latlon]);

  const c = data?.current;

  return (
    <section style={{margin:"1.5rem 0",padding:"1rem",border:"1px solid var(--color-border)",background:"var(--color-card)",borderRadius:"12px",color:"var(--color-fg)"}}>
      <h2 style={{margin:"0 0 .5rem",color:"var(--color-primary)"}}>
        Local Weather {latlon?.label ? `· ${latlon.label}` : ""}
      </h2>
      {!data && !err && <p>Loading weather…</p>}
      {err && <p style={{color:"#f87171"}}>{err}</p>}
      {c && (
        <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",alignItems:"baseline"}}>
          <div style={{fontSize:"2rem",fontWeight:700}}>{c.temperature_2m ?? "—"}°C</div>
          <div>{wc(c.weather_code)}</div>
          <div style={{opacity:.85}}>Feels like {c.apparent_temperature ?? "—"}°C</div>
          <div style={{opacity:.85}}>Wind {c.wind_speed_10m ?? "—"} m/s</div>
        </div>
      )}
    </section>
  );
}
