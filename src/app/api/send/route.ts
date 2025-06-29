import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// 環境変数からAPIキーを読み込む
const resend = new Resend(process.env.RESEND_API_KEY);
// 環境変数から送信先のメールアドレスを読み込む
const toEmail = process.env.TO_EMAIL_ADDRESS;

// POSTリクエストを処理する関数
export async function POST(request: Request) {
  try {
    // フォームのデータを取得
    const { name, email, subject, message } = await request.json();

    if (!toEmail) {
      throw new Error('送信先のメールアドレスが設定されていません。');
    }

    // Resendを使ってメールを送信
    const { data, error } = await resend.emails.send({
      from: 'C1NOM3_ Blog <onboarding@resend.dev>', // 送信元として表示される名前とメールアドレス
      to: [toEmail],
      subject: `【ブログお問い合わせ】 ${subject}`,
      reply_to: email, // 返信先として、フォームに入力されたメールアドレスを設定
      // メール本文
      html: `<p><strong>お名前:</strong> ${name}</p><p><strong>メールアドレス:</strong> ${email}</p><hr><div>${message.replace(/\n/g, '<br>')}</div>`,
    });

    // エラーがあればエラーレスポンスを返す
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 成功したら成功レスポンスを返す
    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
