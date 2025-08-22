import dynamic from "next/dynamic";
import { safeBrand, themes } from "./SunlineClient";
import('@/components/SunlineKit')

const SunlineKit = ({ brand }: { brand: any }) => {
  return (
    <div style={{ backgroundColor: brand.colors.background, color: brand.colors.foreground }}>
      <h1>{brand.name}</h1>
    </div>
  );
};

export default SunlineKit;