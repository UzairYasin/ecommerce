"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import LoginCredentials from '../actions/login';

const LoginForm = () => {

  const params = useSearchParams();
  const error = params.get('error')
  if (error) {
   toast.error("Please login with credentials or signup with google to login with google.")
  }

  const router = useRouter()

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email && !password) { return toast.error("Please provide all fields") }
    else if (!email) { return toast.error("Please provide email") }
    else if (!password) { return toast.error("Please provide password") }

    const toastId = toast.loading("Logging in")
    const error = await LoginCredentials(email, password);

    if (!error) {
      toast.success("Login Successful", {
        id: toastId,
      });

      router.push('/admin')
      
    } else {
      toast.error(String(error), { id: toastId });
    }

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>

        </div>
      </form>
    </>
  )
}

export default LoginForm
