import React from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function page() {
  return (
    <>
    <div className="my-20 text-center">
    <Cross2Icon className='text-center mx-auto h-20 w-20 text-red-500' />
      <h1 className=' text-5xl font-bold'>        
        Oops! Something went wrong 
      </h1><br />
      <h3 className='text-2xl'>
        We are really sorry for inconvinience <br />
        Please try again later
      </h3>

      <Button className='my-5'>
        <Link href='/'>Go to Home</Link>
      </Button>
    </div>
    
          
      </>
  )
}
