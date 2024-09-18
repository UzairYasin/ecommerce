import NextAuth, { CredentialsSignin } from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import CredentialProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { db, users } from "@/lib/schema"
import bcrypt from 'bcryptjs'
import { getVerificationTokenByEmail } from "./lib/verification-token"
import { eq } from "drizzle-orm"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },

      },
      authorize: async (credentials, req): Promise<any> => {

        const email = credentials.email as string;
        const password = credentials.password as string;

        const generatedToken = await getVerificationTokenByEmail(email);

        const user = await db.select().from(users).where(eq(users.email, email));

        // Check if the token is expired
        if (!user[0].isVerified && generatedToken?.expires) {
          const currentTime = new Date();
          const tokenExpiryTime = new Date(generatedToken?.expires);

          if (currentTime > tokenExpiryTime) {
            throw new CredentialsSignin({
              cause: "Token has expired"
            });
          }
        }

        if (!email) {
          throw new CredentialsSignin({
            cause: "Email not entered"
          })
        }
        if (!password) {
          throw new CredentialsSignin({
            cause: "Password not Entered"
          })
        }

        if (user.length === 0) {
          throw new CredentialsSignin({ cause: "No user found with this email." });
        }

        if (user[0].password === null) {
          throw new CredentialsSignin({
            cause: "You Logged in with google previously, Try to login with google or signup to login with credentials."
          })
        }

        if (!user[0].isVerified) {

          throw new CredentialsSignin({
            cause: "Email not verified. Please go to signup and verify email."
          })

        }


        const isPasswordCorrect = await bcrypt.compare(password, user[0].password)

        if (!isPasswordCorrect) {
          throw new CredentialsSignin({
            cause: "Password incorrect"
          })
        }

        return {
          id: user[0].id,
          email: user[0].email,
          name: user[0].name,
          role: user[0].role
        };

      }
    })
  ],
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    async signIn({ account, profile }): Promise<any> {

      if (account?.provider === 'google') {
        const email = profile?.email as string;

        await db.update(users).set({ isVerified: true }).where(eq(users.email, email))

        return await db.select().from(users).where(eq(users.email, email));
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.role = token.role
      }
      return session
    }
  },
  session: {
    strategy: 'jwt',
  },
})