"use server"
import { eq } from "drizzle-orm"
import { db, VerificationToken } from "./schema"

export const getVerificationTokenByToken = async (token: string) => {

    try {

        if (typeof token !== 'string') {
            throw new Error("token is not string")
        }

        const verificationToken = await db.select().from(VerificationToken).where(eq(VerificationToken.token, token))
        
        return verificationToken[0]

    } catch (error) {
        return null
    }


}

export const getVerificationTokenByEmail = async (email: string) => {

    try {

        if (typeof email !== 'string') {
            throw new Error("email is not string")
        }

        const verificationToken = await db.select().from(VerificationToken).where(eq(VerificationToken.email, email))
        return verificationToken[0];

    } catch (error) {
        return null
    }

}