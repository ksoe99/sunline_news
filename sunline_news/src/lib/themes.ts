// src/lib/themes.ts
const themes: Record<string, { name: string; color: string; bg: string; text: string }> = {
  sunline: { name: 'Sunline News', color: '#ffffff', bg: 'bg-white', text: 'text-black' },
  skyline: { name: 'Skyline News', color: '#000000', bg: 'bg-black', text: 'text-white' },
  atlas: { name: 'Atlas Live', color: '#eff6ff', bg: 'bg-blue-50', text: 'text-blue-900' },
  echo: { name: 'Echo Live', color: '#f3f4f6', bg: 'bg-gray-100', text: 'text-gray-900' },
  sovereign: { name: 'Sovereign Wire', color: '#f4f4f5', bg: 'bg-zinc-100', text: 'text-zinc-900' },
};

export default themes;
