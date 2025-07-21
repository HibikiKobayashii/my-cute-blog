"use client";

import { useEffect, useState } from "react";
import Pusher from 'pusher-js';

export function LiveNotification() {
  const [isLive, setIsLive] = useState(false);
  const [liveUrl, setLiveUrl] = useState("#"); // 実際の配信URLを後で設定

  useEffect(() => {
    // Pusherに接続
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe('youtube-channel');

    // 'live-started' イベントを待ち受ける
    channel.bind('live-started', (data: any) => {
      console.log("Live stream started event received!");
      setIsLive(true);
      // ここでdataから実際の配信URLを取得してsetLiveUrlすると、より良いです
    });

    // 配信終了を検知するイベントもここに追加できます (例: 'live-ended')
    channel.bind('live-ended', () => {
        setIsLive(false);
    });

    // コンポーネントが不要になったら接続を解除
    return () => {
      pusher.unsubscribe('youtube-channel');
      pusher.disconnect();
    };
  }, []); // 最初の1回だけ実行

  if (!isLive) {
    return null; // 配信中でなければ何も表示しない
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