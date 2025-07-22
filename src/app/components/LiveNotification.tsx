"use client";

import { useEffect, useState } from "react";
import Pusher from 'pusher-js';

export function LiveNotification() {
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を追加
  const channelUrl = "https://www.youtube.com/channel/UCb57aTH6T9Ts8NmHEfaoUAw"; 

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    const channel = pusher.subscribe('youtube-channel');

    // (今回は不要ですが、将来的に手動更新などのために残しておきます)
    const fetchInitialStatus = async () => {
        // ここでAPIから現在の状態を取得するロジックを実装可能
        setIsLoading(false);
    };
    fetchInitialStatus();

    channel.bind('live-started', () => setIsLive(true));
    channel.bind('live-ended', () => setIsLive(false));

    return () => {
      pusher.unsubscribe('youtube-channel');
      pusher.disconnect();
    };
  }, []);

  if (isLoading) {
      return <div>Loading...</div>; // 読み込み中の表示
  }

  return (
    <div className="my-8 text-center">
      {isLive ? (
        // 配信中の表示
        <a 
          href={channelUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-red-600 text-white font-bold text-lg px-8 py-4 rounded-lg animate-pulse"
        >
          🔴 配信中！
        </a>
      ) : (
        // 配信していない時の表示
        <div className="inline-block bg-gray-200 text-gray-700 font-bold text-lg px-8 py-4 rounded-lg">
          <p>現在は配信していません...</p>
          <a href={channelUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
            チャンネルはこちら
          </a>
        </div>
      )}
    </div>
  );
}