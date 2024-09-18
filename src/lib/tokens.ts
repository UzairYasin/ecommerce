"use server"
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "./verification-token";
import { db, VerificationToken } from "./schema";
import { eq } from "drizzle-orm";

export const generateVerificationToken = async (email: string) => {

  const token = uuidv4();
  const expires = new Date(Date.now() + 3600 * 1000) as Date;
  const existingToken:any = await getVerificationTokenByEmail(email);

  if (existingToken) {
      await db.delete(VerificationToken).where(eq(VerificationToken.id, existingToken.id))
  }

    const res =  await db.insert(VerificationToken).values({
      email: email,
      token: token,
      expires: expires,
    })  

    return res
}