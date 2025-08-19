// src/components/LocalNews.tsx

'use client';

import { useEffect, useState } from 'react';

export interface NewsItem {
  title: string;
  url: string;
  published: string;
}

export default function LocalNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const res = await fetch(`/api/local-news?lat=${coords.latitude}&lon=${coords.longitude}`);
      const data = await res.json();
      setNews(data.news || []);
      setLoading(false);
    }, () => setLoading(false));
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Local News</h3>
      {loading ? (
        <p className="text-sm text-muted">Loading headlines…</p>
      ) : news.length ? (
        <ul className="space-y-2 text-sm">
          {news.map((item, idx) => (
            <li key={idx}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">No local headlines found.</p>
      )}
    </div>
  );
}
