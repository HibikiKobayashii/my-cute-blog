'use client';

import { useState, FormEvent } from 'react';

// 送信ステータスの型定義
type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  // フォームの各入力値を管理
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  // 送信状態を管理
  const [status, setStatus] = useState<Status>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // フォーム送信時の処理
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // フォームのデフォルトの送信動作をキャンセル
    setStatus('submitting');
    setStatusMessage('送信中...');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        throw new Error('サーバーでエラーが発生しました。');
      }
      
      setStatus('success');
      setStatusMessage('送信ありがとうございました。');
      // 送信成功後、フォームをリセット
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      setStatus('error');
      const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました。';
      setStatusMessage(`送信に失敗しました。時間をおいて再度お試しください。(${errorMessage})`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
          <h1 className="text-3xl font-bold mb-4 tracking-wider">CONTACT</h1>
          <p className="text-subtle">
            お問い合わせは、<br />
            こちらのフォームより<br />
            お願いいたします。
          </p>
        </div>

        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-accent mb-1">お名前</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border border-subtle rounded-md bg-base-light" />
            </div>
            {/* メールアドレス入力欄を追加 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-accent mb-1">メールアドレス</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border border-subtle rounded-md bg-base-light" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-accent mb-1">題名</label>
              <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required className="w-full p-2 border border-subtle rounded-md bg-base-light" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-accent mb-1">メッセージ</label>
              <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={6} required className="w-full p-2 border border-subtle rounded-md bg-base-light"></textarea>
            </div>
            <div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-block bg-base-dark text-base-light py-2 px-6 rounded-md hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? '送信中...' : '送信する'}
              </button>
            </div>
            {/* 送信ステータスを表示するメッセージ */}
            {status !== 'idle' && (
              <p className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {statusMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}