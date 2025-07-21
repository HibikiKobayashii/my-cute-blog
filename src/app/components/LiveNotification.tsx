"use client";

import { useEffect, useState } from "react";
import Pusher from 'pusher-js';

export function LiveNotification() {
  const [isLive, setIsLive] = useState(false);
  const liveUrl = "https://www.youtube.com/channel/UCb57aTH6T9Ts8NmHEfaol"; 

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe('youtube-channel');

    // ▼▼▼ この行の引数 (_data: any) を削除しました ▼▼▼
    channel.bind('live-started', () => {
      console.log("Live stream started event received!");
      setIsLive(true);
    });

    channel.bind('live-ended', () => {
        setIsLive(false);
    });

    return () => {
      pusher.unsubscribe('youtube-channel');
      pusher.disconnect();
    };
  }, []);

  if (!isLive) {
    return null;
  }

  return (
    <div className="my-8 text-center">
      <a 
        href={liveUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block bg-red-600 text-white font-bold text-lg px-8 py-4 rounded-lg animate-pulse"
      >
        配信中！
      </a>
    </div>
  );
}