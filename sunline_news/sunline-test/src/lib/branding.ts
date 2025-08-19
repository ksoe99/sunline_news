// src/lib/branding.ts

import { headers } from "next/headers";

export type BrandKey = "sunline" | "atlas" | "sovereign" | "skyline" | "echo";

export interface Brand {
  key: BrandKey;
  name: string;
  logo?: string;
  colors: {
    primary: string;
    background: string;
    foreground: string;
    card: string;
    border: string;
  };
  liveUrl?: string;
}

export const BRANDS: Record<BrandKey, Brand> = {
  sunline: {
    key: "sunline",
    name: "Sunline News",
    logo: "/logos/sunline.png",
    colors: {
      primary: "#f59e0b",
      background: "#0b0b0b",
      foreground: "#fafafa",
      card: "#151515",
      border: "#2a2a2a",
    },
    liveUrl: "https://www.youtube.com/embed/ax1EAGMM5Jg?autoplay=1&mute=1", // The Sun promo/live
  },
  atlas: {
    key: "atlas",
    name: "AtlasLive News",
    logo: "/logos/atlas.png",
    colors: {
      primary: "#2563eb",
      background: "#0a1220",
      foreground: "#e6f0ff",
      card: "#0f1a2b",
      border: "#24324d",
    },
    liveUrl: "https://www.youtube.com/embed/9Auq9mYxFEE?autoplay=1&mute=1", // Sky News Live
  },
  sovereign: {
    key: "sovereign",
    name: "Sovereign Wire News",
    logo: "/logos/sovereign.png",
    colors: {
      primary: "#991b1b",
      background: "#0a0f0a",
      foreground: "#fef2f2",
      card: "#1a1111",
      border: "#332222",
    },
    liveUrl: "https://www.youtube.com/embed/BddP6PYo2gs?autoplay=1&mute=1", // BBC World News
  },
  skyline: {
    key: "skyline",
    name: "Skyline News",
    logo: "/logos/skyline.png",
    colors: {
      primary: "#06b6d4",
      background: "#071216",
      foreground: "#e6fbff",
      card: "#0b1b21",
      border: "#13313a",
    },
    liveUrl: "https://www.youtube.com/embed/yiCmI3K2o9c?autoplay=1&mute=1", // Sky Sports News
  },
  echo: {
    key: "echo",
    name: "EchoLive News",
    logo: "/logos/echo.png",
    colors: {
      primary: "#a855f7",
      background: "#0f0a16",
      foreground: "#f6e8ff",
      card: "#180f24",
      border: "#2b1840",
    },
    liveUrl: "https://www.youtube.com/embed/v6rrLdGJzDI?autoplay=1&mute=1", // Fox News Stream
  },
};

function safeBrand(key: string | null | undefined): Brand {
  const k = (key || "").toLowerCase() as BrandKey;
  return BRANDS[k] ?? BRANDS.sunline;
}

/** Accepts a plain object (NOT the dynamic API) */
export async function getBrand(
  opts?: { brand?: string | string[] | undefined }
): Promise<Brand> {
  // Dev override via ?brand=
  if (process.env.NODE_ENV !== "production" && opts?.brand) {
    const val = Array.isArray(opts.brand) ? opts.brand[0] : opts.brand;
    if (val) return safeBrand(val);
  }

  // Host header or fallback
  const h = await headers();
  const host =
    (h.get("x-forwarded-host") || h.get("host") || process.env.HOST || "").toLowerCase();

  if (host.includes("atlas")) return BRANDS.atlas;
  if (host.includes("sovereign")) return BRANDS.sovereign;
  if (host.includes("skyline")) return BRANDS.skyline;
  if (host.includes("echo")) return BRANDS.echo;

  return BRANDS.sunline;
}
