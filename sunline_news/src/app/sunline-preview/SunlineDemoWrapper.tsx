"use client";

import SunlinePreviewClient from "@/app/sunline-preview/SunlinePreviewClient";
import { brand } from "@/sunline/brand";
import PagePreview from "./PagePreview";

export default function SunlineDemoWrapper() {
  return (
    <SunlinePreviewClient brand={brand}>
      <PagePreview />
    </SunlinePreviewClient>
  );
}
