import { db, users } from "@/lib/schema";
import { getVerificationTokenByToken } from "@/lib/verification-token";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  try {
    const body = await req.json()
    const token = body.token;
    const generatedToken = await getVerificationTokenByToken(token);

    if (!generatedToken) {
      return new Response('token not found', { status: 401 });
    }

    const email = generatedToken.email;

    const user = await db.select().from(users).where(eq(users.email, email));

    if (user.length === 0) {
      return NextResponse.json({ status: 400, message: 'user not found' });
    }

    if (token !== generatedToken.token) {
      return NextResponse.json({ status: 402, message: 'Invalid Token' });
    }

    await db.update(users).set({ isVerified: true }).where(eq(users.id, user[0].id));

    return NextResponse.json({ status: 200, message: 'Email verified' });

  } catch (error) {

    return NextResponse.json({ status: 400, message: error })
  }

}