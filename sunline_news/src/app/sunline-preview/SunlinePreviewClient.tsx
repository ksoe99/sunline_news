import React, { ReactNode } from "react";

interface SunlinePreviewClientProps {
  brand: {
    key: string;
    colors: {
      primary: string;
      accent: string;
    };
  };
  children: ReactNode;
}

export function SunlinePreviewClient({ brand, children }: SunlinePreviewClientProps) {
  return (
    <div>
      {/* You can use brand properties if needed */}
      {children}
    </div>
  );
}


