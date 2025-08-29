import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  brand: {
    key: string;
    colors: {
      primary: string;
      accent: string;
    };
  };
}

export function SunlinePreviewClient({ children, brand }: Props) {
  return (
    <div className="sunline-preview">
      {/* You can add brand styling logic here if needed */}
      {children}
    </div>
  );
}


