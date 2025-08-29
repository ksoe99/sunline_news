import React from "react";

type Brand = {
  key: string;
  colors: {
    primary: string;
    accent: string;
  };
};

interface SunlinePreviewClientProps {
  children: React.ReactNode;
  brand: Brand;
}

export const SunlinePreviewClient: React.FC<SunlinePreviewClientProps> = ({ children, brand }) => {
  // Use brand as needed
  return <div>{children}</div>;
};


