import { Brand } from "@/lib/branding";

const SunlineKit = ({ brand, children }: { brand: Brand; children?: React.ReactNode }) => {
  return (
    <div style={{ backgroundColor: brand.colors.background, color: brand.colors.foreground }}>
      <h1>{brand.name}</h1>
      {children}
    </div>
  );
};

export default SunlineKit;

