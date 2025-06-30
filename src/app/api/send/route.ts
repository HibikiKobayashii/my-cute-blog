import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.TO_EMAIL_ADDRESS;

if (!resendApiKey) {
  throw new Error('RESEND_API_KEY is not defined in environment variables.');
}

const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  if (!toEmail) {
    return NextResponse.json({ error: '送信先のメールアドレスが設定されていません。' }, { status: 500 });
  }

  try {
    const { name, email, subject, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'C1NOM3_ Blog <onboarding@resend.dev>',
      to: [toEmail],
      subject: `【ブログお問い合わせ】 ${subject}`,
      // ▼▼▼ この行の「reply_to」を「replyTo」に修正しました ▼▼▼
      replyTo: email,
      html: `
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <hr>
        <div>${message.replace(/\n/g, '<br>')}</div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'メールの送信に失敗しました。' }, { status: 500 });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('API Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました。';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}