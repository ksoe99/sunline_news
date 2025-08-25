export const themes = {
  sunline: {
    name: "Sunline News",
    colors: { primary: "#B01919", accent: "#F6C026" },
    fonts: { headline: "Merriweather, serif", body: "Inter, system-ui, sans-serif" },
    hostnames: ["sunlinenews.com", "www.sunlinenews.com"]
  },
  atlas: {
    name: "Atlas Live News",
    colors: { primary: "#1E5AA8", accent: "#A7C8F2" },
    fonts: { headline: "Inter, system-ui, sans-serif", body: "Inter, system-ui, sans-serif" },
    hostnames: ["atlaslivenews.com", "www.atlaslivenews.com"]
  },
  sovereign: {
    name: "Sovereign Wire News",
    colors: { primary: "#0B2147", accent: "#C8A94B" },
    fonts: { headline: "Merriweather, serif", body: "Source Serif Pro, serif" },
    hostnames: ["sovereignwirenews.com", "www.sovereignwirenews.com"]
  },
  skyline: {
    name: "The Skyline News",
    colors: { primary: "#344556", accent: "#8FA6BF" },
    fonts: { headline: "Inter, system-ui, sans-serif", body: "Inter, system-ui, sans-serif" },
    hostnames: ["theskylinenews.com", "www.theskylinenews.com"]
  },
  echo: {
    name: "Echo Live News",
    colors: { primary: "#FF3B30", accent: "#00C7BE" },
    fonts: { headline: "Archivo Black, sans-serif", body: "Inter, system-ui, sans-serif" },
    hostnames: ["echolivenews.com", "www.echolivenews.com"]
  }
} as const;

export type BrandKey = keyof typeof themes;
export type ThemeTokens = (typeof themes)[BrandKey];
export const defaultBrand: BrandKey = "sunline";

// Optional simplified Brand type for components that only use minimal fields
export type Brand = {
  name: string;
  logo?: string;
  key?: string;
  colors: {
    primary?: string;
    background: string;
    foreground: string;
    card?: string;
    border?: string;
  };
};

export function safeBrand(value?: string | null): BrandKey {
  const v = (value ?? "").toLowerCase();
  return (Object.keys(themes) as BrandKey[]).includes(v as BrandKey) ? (v as BrandKey) : defaultBrand;
}

export function getBrandFromHost(host: string): BrandKey | null {
  const h = (host || "").toLowerCase();
  for (const key of Object.keys(themes) as BrandKey[]) {
    if ((themes[key].hostnames as readonly string[]).includes(h)) return key;
  }
  if (h.startsWith("www.")) {
    const noWww = h.slice(4);
    for (const key of Object.keys(themes) as BrandKey[]) {
      if ((themes[key].hostnames as readonly string[]).includes(noWww)) return key;
    }
  }
  return null;
}

/**
 * Resolve brand for both prod and dev:
 * - Prod: from Host header
 * - Dev: if Host is localhost, try process.env.HOST,
 *        else allow a `brand` search param (handled in server component)
 */
export function resolveBrandFromHostOrEnv(host: string, searchBrand?: string | null): BrandKey {
  const hostBrand = getBrandFromHost(host);
  if (hostBrand) return hostBrand;

  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  if (isLocal) {
    const envHost = process.env.HOST ?? "";
    const envBrand = getBrandFromHost(envHost);
    if (envBrand) return envBrand;
    if (searchBrand) return safeBrand(searchBrand);
  }

  return defaultBrand;
}
