import Image from 'next/image'
import React from 'react'

const OurBrands = () => {
    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
                    <h2 className="mb-8 lg:mb-16 lg:text-5xl font-bold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl text-3xl">Our Brands</h2>
                    <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-6 dark:text-gray-400">
                      
                        <a href="#" className="flex justify-center items-center">
                            <Image src="https://logowik.com/content/uploads/images/275_rolex.jpg" className='hover:transition-transform hover:scale-105 transition-all' width={400} height={200} alt='rolex' />
                        </a>
                      
                        <a href="#" className="flex justify-center items-center">
                            <Image src="https://logowik.com/content/uploads/images/timely4302.logowik.com.webp" className='hover:transition-transform hover:scale-105 transition-all' width={400} height={200} alt='timely' />
                        </a>
                      
                        <a href="#" className="flex justify-center items-center">
                            <Image src="https://logowik.com/content/uploads/images/434_omega.jpg" className='hover:transition-transform hover:scale-105 transition-all' width={400} height={200} alt='omega' />
                        </a>
                      
                        <a href="#" className="flex justify-center items-center">
                            <Image src="https://logowik.com/content/uploads/images/seiko5430.logowik.com.webp" className='hover:transition-transform hover:scale-105 transition-all' width={400} height={200} alt='seiko' />
                        </a>
                      
                        <a href="#" className="flex justify-center items-center">
                            <Image src="https://logowik.com/content/uploads/images/520_casio.jpg" className='hover:transition-transform hover:scale-105 transition-all' width={400} height={200} alt='casio' />
                        </a>
                      
                        <a href="#" className="flex justify-center items-center">
                            <Image src="/zerolifestyle-logo.webp" className='hover:transition-transform hover:scale-105 transition-all' width={400} height={200} alt='zerolifestyle' />
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OurBrands
