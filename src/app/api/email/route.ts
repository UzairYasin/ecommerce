import { transporter } from '@/lib/mail';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {  

  const body = await req.json();
  console.log(req.body)

  if (!body.email || !body.token) {
    return NextResponse.json({ error: 'Email and token are required' }, { status: 400 })
  }

  try {
    await transporter.sendMail({
      from: 'muzairbinyasin@gmail.com',
      to: body.email,
      subject: "Email Verification",
      html: `<h1>Verify Your Email</h1>
          <a href="https://cartlonecommerce.vercel.app/signin?token=${body.token}" >
          <button class='px-4 py-2 rounded-xl bg-black text-white' >Verify</button>
          </a>`
    });

    return new Response(JSON.stringify({ message: "email sent" }), { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }

}