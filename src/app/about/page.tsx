"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MotionDiv } from '../components/MotionDiv';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';

const AboutUs = () => {

  const { ref, inView } = useInView();

  return (
    <>
      <div className="container mx-auto p-8">
        {/* Our Story Section */}
        <div>
          <h1 className="text-5xl font-bold my-6 text-center">About Us</h1>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 my-12 lg:justify-evenly justify-center lg:items-start items-center lg:gap-8">
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .5 }}
          >
            <Image
              src="/story.jpg"
              alt="Team"
              className="rounded-lg shadow-lg mb-4"
              width={500}
              height={500}
              layout="responsive"
            />
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className='text-4xl font-bold my-6 text-start'>Our Story</h2>
            <p className="text-lg text-justify">
              Welcome to Cartlon, where passion meets precision. Our journey began in 2020
              with a simple vision: to create timeless pieces that blend elegance and functionality.
              Inspired by the art of horology, our founders set out to craft watches that
              reflect individuality and excellence. Every watch we design tells a story of dedication,
              innovation, and a relentless pursuit of perfection. From our humble beginnings in a small
              workshop to becoming a trusted name in the watch industry, our commitment to quality and
              style has remained unwavering.
            </p>
          </MotionDiv>
        </div>

        {/* Our Craftsmanship Section */}
        <div ref={ref} className="grid lg:grid-cols-2 grid-cols-1 my-12 lg:justify-evenly justify-center lg:items-start items-center lg:gap-8">

          {inView ? (
            <>
              <MotionDiv
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: .5 }}
              >
                <h2 className='text-4xl font-bold my-6 text-start'>Our Craftsmanship</h2>
                <p className="text-lg text-justify">
                  At Cartlon, craftsmanship is at the heart of everything we do. Our
                  skilled artisans and watchmakers bring decades of experience and a meticulous eye for
                  detail to each timepiece. We source only the finest materials, from premium leather straps to
                  sapphire crystal glass, ensuring durability and elegance. Each component is carefully selected and
                  assembled with precision, resulting in a watch that is not only a timekeeper but a work of art. Our
                  commitment to craftsmanship extends beyond aesthetics. We rigorously test each watch to meet the
                  highest standards of performance and reliability, so you can wear your watch with
                  pride and confidence.
                </p>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <Image
                  src="/craftsmanship.jpg"
                  alt="Team"
                  className="rounded-lg shadow-lg mb-4"
                  width={500}
                  height={500}
                  layout="responsive"
                />
              </MotionDiv>
            </>
          )
            : ''}


        </div>
      </div>
      <section className='bg-[url("/aboutBanner.png")] relative text-white text-center justify-center items-center py-20 my-5'>
        <h3 className='text-5xl font-extrabold'>
          Explore Our Diverse Catalog
        </h3>
        <Button className='mt-7' variant={'greenBtn'} size={'lg'}>
          <Link href='/products' >
            Explore Now
          </Link>
        </Button>
      </section>
    </>
  );
};

export default AboutUs;
