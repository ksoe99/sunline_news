import dynamic from "next/dynamic";
import { safeBrand, themes } from "./SunlineClient";

type Brand = {
  name: string;
  colors: {
    background: string;
    foreground: string;
  };
};

const SunlineKit = ({ brand, children }: { brand: any; children?: React.ReactNode }) => {
  return (
    <div style={{ backgroundColor: brand.colors.background, color: brand.colors.foreground }}>
      <h1>{brand.name}</h1>
      {children}
    </div>
  );
};


export default SunlineKit;
