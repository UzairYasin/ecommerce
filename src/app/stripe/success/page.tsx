import { Button } from '@/components/ui/button'
import { CheckIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <>
    <div className="my-20 text-center">
    <CheckIcon className='text-center mx-auto h-20 w-20 text-green-500' />
      <h1 className=' text-5xl font-bold'>        
        Payment Successful
      </h1><br />
      <h3 className='text-2xl'>
        Thanks for your purchase, we hope you love it <br />
        Have a great day.! 
      </h3>

      <Button className='my-5'>
        <Link href='/'>Go to Home</Link>
      </Button>
    </div>
    
          
      </>
  )
}

export default Page
