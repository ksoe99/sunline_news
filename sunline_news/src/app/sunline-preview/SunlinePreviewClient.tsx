import React, { ReactNode } from "react";

type Brand = {
  key: string;
  colors: {
    primary: string;
    accent: string;
  };
};

interface SunlinePreviewClientProps {
  brand: Brand;
  children: ReactNode;
}

export default function SunlinePreviewClient({ brand, children }: SunlinePreviewClientProps) {
  return <div>{children}</div>;
}
