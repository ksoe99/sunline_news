export function getBrandFromHost(host?: string) {
  if (!host) return 'sunline';
  if (host.includes('theskylinenews')) return 'skyline';
  if (host.includes('atlaslivenews')) return 'atlas';
  if (host.includes('echolivenews')) return 'echo';
  if (host.includes('sovereignwirenews')) return 'sovereign';
  return 'sunline';
}
