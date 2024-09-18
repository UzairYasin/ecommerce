import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { auth, signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation";
import { getVerificationTokenByToken } from "@/lib/verification-token";
import { CredentialsSignin } from "next-auth";
import { db, users } from "@/lib/schema";
import { toast } from "sonner";
import LoginForm from "@/app/components/LoginForm";
import { eq } from "drizzle-orm";

export default async function Page({ searchParams }: { searchParams: { token?: string, error?: string } }) {

  const session = await auth();
  const user = session?.user;
  
  if (user?.role === 'admin') {
   return redirect('/admin')
  }else if(user?.role === 'user'){
    return redirect('/account')
  }

  if (searchParams.token) {

    const generatedToken = await getVerificationTokenByToken(searchParams.token)

    if (!generatedToken) {
      throw new CredentialsSignin({
        cause: 'invalid token'
      })
    }
    const user = await db.select().from(users).where(eq(users.email, generatedToken.email))

    await db.update(users).set({ isVerified: true }).where(eq(users.id, user[0].id));


    // return toast.success("Email Verified")
    console.log("verified")

  }
  
  return (
    <div className="my-10">

      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <form action={async() => {
            "use server"
            await signIn('google', {redirect: true, redirectTo: '/admin'})
          }}>
            <Button variant="outline" className="w-full mt-5">
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link> 
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
