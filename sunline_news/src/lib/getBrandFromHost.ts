export function getBrandFromHost(hostname: string): string {
  const mapping: Record<string, string> = {
    'sunline.news': 'sunline',
    'skyline.news': 'skyline',
    'atlas.news': 'atlas',
    'echo.news': 'echo',
    'sovereign.news': 'sovereign',
  };

  for (const domain in mapping) {
    if (hostname.includes(domain)) {
      return mapping[domain];
    }
  }

  return 'sunline'; // fallback
}
