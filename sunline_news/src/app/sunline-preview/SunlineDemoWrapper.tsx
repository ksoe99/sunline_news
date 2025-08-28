"use client";

import { SunlinePreviewClient } from "@/sunline";
import { brand } from "@/sunline/brand";
import { PagePreview } from "./PagePreview";

export default function SunlineDemoWrapper() {
  return (
    <SunlinePreviewClient brand={brand}>
      <PagePreview />
    </SunlinePreviewClient>
  );
}
