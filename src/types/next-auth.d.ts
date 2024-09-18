import NextAuth from 'next-auth'

declare module "next-auth" {
    interface User {
        role: string;
    }

    interface Session {
        user: {
            role: string;
        } & DefaultSession["user"]
}
}

// Extend the built-in `JWT` type
declare module "next-auth/jwt" {
    interface JWT {
        role: string;  // Add the custom `role` field to the JWT type
    }
}