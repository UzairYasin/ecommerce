"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import bcrypt from 'bcryptjs'
import { toast } from "sonner"
import { getVerificationTokenByEmail } from "@/lib/verification-token"
import { useState } from "react"

const Page = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {

    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("Please provide all fields.")
    }

    const toastId = toast.loading("Signing up...");

    try {

      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const response = await fetch('http://localhost:3000/api/users', {

        method: 'POST',

        body: JSON.stringify({
          name: name,
          email: email,
          password: hashedPassword,
        }),

        headers: {
          'Content-Type': 'application/json, charset=UTF-8',
        },
      });

      if (!response.ok) {
        toast.error("error ", { id: toastId });
        return 0;
      }

      const responseData = await response.json()

      if (responseData.message === 'Token generated.') {
        console.log(responseData.message)
        try {
          await fetch('http://localhost:3000/api/users', {
            method: 'PUT',
            body: JSON.stringify({
              name: name,
              email: email,
              password: hashedPassword,
            }),
            headers: { 'Content-Type': 'application/json' }
          })
        } catch (error) {
          console.log(error)
        }

        const verificationToken = await getVerificationTokenByEmail(email);

        if(!verificationToken){
          return toast.error("Email not found.", { id: toastId });
        }
  
        try {
          await fetch('http://localhost:3000/api/email', {
            method: 'POST',
            body: JSON.stringify({
              email: email,
              token: verificationToken.token
            }),
            headers: {
              'Content-Type': 'application/json',
            }
  
          })
        } catch (error) {
          console.log(error)
        }

        return toast.success(
          "Confirmation email sent! Please confirm your email",
          { id: toastId })
      }

      toast.success("Sign up successfull, Confirmation email sent! Please confirm your email", { id: toastId })

      setName("");
      setEmail("");
      setPassword("")

    } catch (error: any) {      
      toast.error(error.message || "An unexpected error occurred.", { id: toastId });
    }
  }

  return (
    <div className="my-10">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              {/* <div className="grid grid-cols-2 gap-4"> */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" onChange={(e) => {setName(e.target.value)}} value={name} placeholder="Max" required />
                </div>
                {/* <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div> */}
              {/* </div> */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => {setEmail(e.target.value)}} value={email}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" onChange={(e) => {setPassword(e.target.value)}} value={password} name="password" type="password" />
              </div>
              <Button onClick={handleSubmit} type="submit" className="w-full">
                Create an account
              </Button>
              <Button variant="outline" className="w-full">
                Sign up with Google
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="underline">
              Sign in
            </Link>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default Page