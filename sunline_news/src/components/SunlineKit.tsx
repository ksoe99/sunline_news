import dynamic from "next/dynamic";
import { safeBrand, themes } from "./SunlineClient";

const SunlineClient = dynamic(() => import("./SunlineClient"), { ssr: false });

export function SunlineKit({ brand, children }: { brand?: string; children?: React.ReactNode }) {
  return <SunlineClient brand={brand}>{children}</SunlineClient>;
}

export { themes, safeBrand };
