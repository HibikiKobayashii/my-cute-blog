"use client";

import { useEffect } from 'react';

export function ViewTracker({ slug }: { slug: string }) {
  
  useEffect(() => {
    // ▼▼▼ このURLを、実際に起動しているC#サーバーのものに修正しました ▼▼▼
    const apiUrl = `http://localhost:5053/api/views/${slug}`;

    fetch(apiUrl, { method: 'POST' })
      .catch(error => {
        console.error("View tracking failed:", error); 
      });

  }, [slug]);

  return null;
}