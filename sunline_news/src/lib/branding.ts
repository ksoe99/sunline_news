// File: src/lib/branding.ts

export function getBrandFromHost(host: string): string {
  if (host.includes('skyline')) return 'skyline';
  if (host.includes('atlas')) return 'atlas';
  if (host.includes('echo')) return 'echo';
  if (host.includes('sovereign')) return 'sovereign';
  return 'sunline';
}
