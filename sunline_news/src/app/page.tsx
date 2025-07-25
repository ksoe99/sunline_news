import { headers } from 'next/headers';
import { getBrandFromHost } from '../../lib/branding';

export default function Home() {
  const host = headers().get('host');
  const brand = getBrandFromHost(host || '');

  return (
    <main className="p-4">
      {brand === 'skyline' && <h1>Tech & Future — Skyline News</h1>}
      {brand === 'atlas' && <h1>Global Affairs — Atlas Live</h1>}
      {brand === 'echo' && <h1>Policy & Society — Echo Live</h1>}
      {brand === 'sovereign' && <h1>Investigations — Sovereign Wire</h1>}
      {brand === 'sunline' && <h1>Top Headlines — Sunline News</h1>}
    </main>
  );
}
