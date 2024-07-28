import { Button } from '@/components/ui/button';
// import { SignIn, SignUp } from '@clerk/clerk-react';
import { UserButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import React from 'react'

const LoginLogout = async (signUp:any , signIn:any) => {

    const { userId } = auth();

    if (userId) {
        
    }

    const user = await currentUser();

  return (
    <>
    {!user ?
            (
              <div className="flex items-center gap-3">
                <Button className="rounded" variant='greenBtn' size="md" >{signUp}</Button>

                <Button className="rounded" variant='default' size="md" >{signIn}</Button>
              </div>
            )
            :
            // <ClerkProvider>
              <UserButton />
            // </ClerkProvider>
          }
  </>
  )
}

export default LoginLogout
