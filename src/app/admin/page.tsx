"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogoutButton } from "@/app/components/LogoutButton";
import Pusher from 'pusher-js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 表示するデータの型に likeCount を追加
type AnalyticsData = {
  articleSlug: string;
  viewCount: number;
  likeCount: number;
};

type RealtimeData = {
  time: string;
  views: number;
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [liveCount, setLiveCount] = useState(0);
  const [realtimeData, setRealtimeData] = useState<RealtimeData[]>([]);

  // --- データの取得処理 ---
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login');
    }

    if (status === "authenticated") {
      const fetchData = async () => {
        try {
          const [viewsRes, likesRes] = await Promise.all([
            fetch('http://localhost:5053/api/views'),
            fetch('http://localhost:5053/api/likes')
          ]);

          const viewsData = await viewsRes.json();
          const likesData = await likesRes.json();

          const combinedData = viewsData.map((view: { articleSlug: string, viewCount: number }) => {
            const like = likesData.find((l: { articleSlug: string }) => l.articleSlug === view.articleSlug);
            return {
              ...view,
              likeCount: like ? like.likeCount : 0,
            };
          });

          setAnalyticsData(combinedData);
        } catch (error) {
          console.error("Failed to fetch analytics data:", error);
        }
      };

      fetchData();

      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      });
      const channel = pusher.subscribe('analytics-channel');
      channel.bind('new-view', (data: { articleSlug: string }) => {
        setLiveCount(prevCount => prevCount + 1);
        const now = new Date();
        const newEntry: RealtimeData = {
          time: `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`,
          views: 1,
        };
        setRealtimeData(prevData => {
          const updatedData = [...prevData, newEntry];
          if (updatedData.length > 10) return updatedData.slice(1);
          return updatedData;
        });
        setAnalyticsData(prevData => {
            const existing = prevData.find(d => d.articleSlug === data.articleSlug);
            if(existing) {
                return prevData.map(d => d.articleSlug === data.articleSlug ? { ...d, viewCount: d.viewCount + 1 } : d);
            }
            return [...prevData, { articleSlug: data.articleSlug, viewCount: 1, likeCount: 0 }];
        });
      });
      return () => {
        pusher.unsubscribe('analytics-channel');
        pusher.disconnect();
      };
    }
  }, [status, router]);

  // --- ページの表示部分 ---
  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-[60vh]"><p>分析データを読み込んでいます...</p></div>;
  }

  if (session) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">管理者ページ</h1>
            <p className="text-subtle">ようこそ、{session.user?.name || session.user?.email}さん</p>
          </div>
          <LogoutButton />
        </header>

        <div className="space-y-8">
          {/* ▼▼▼ liveCountを表示する部分を追加しました ▼▼▼ */}
          <div className="bg-white border border-gray-300 rounded-lg p-4">
            <h3 className="font-bold mb-2">現在のリアルタイム接続数</h3>
            <p className="text-4xl font-bold text-blue-500">{liveCount}</p>
          </div>

          {/* リアルタイムグラフ */}
          <div className="bg-white border border-gray-300 rounded-lg p-4 h-80">
            <h3 className="font-bold mb-4">リアルタイム閲覧（直近10イベント）</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={realtimeData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="time" /><YAxis allowDecimals={false} /><Tooltip /><Legend /><Line type="monotone" dataKey="views" name="閲覧イベント" stroke="#8884d8" strokeWidth={2} /></LineChart>
            </ResponsiveContainer>
          </div>

          {/* 総閲覧数テーブル */}
          <div className="bg-white border border-gray-300 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">記事ごとの総閲覧数・いいね数</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="border-b">
                  <tr>
                    <th className="p-2">記事スラッグ</th>
                    <th className="p-2">総閲覧数</th>
                    <th className="p-2">いいね数</th>
                  </tr>
                </thead>
                <tbody>
                  {[...analyticsData].sort((a,b) => b.viewCount - a.viewCount).map((data) => (
                    <tr key={data.articleSlug} className="border-b">
                      <td className="p-2 font-mono">{data.articleSlug}</td>
                      <td className="p-2 text-xl font-bold">{data.viewCount}</td>
                      <td className="p-2 text-xl font-bold text-pink-500">{data.likeCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}