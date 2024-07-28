"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { client } from '../../../sanity/lib/client';
import Link from 'next/link';
import { MotionDiv } from '../components/MotionDiv';

interface CategoryProps {
    _id: string;
    name: string;
    slug: {
        current: string;
    };
    imageUrl: string;
}

const ShowCategories = () => {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function fetchCategories() {

            const params: any = ''
            const categories = await client.fetch(`*[_type == "category"] {
                _id,
                slug,
                name,
                "imageUrl":image.asset->url,
              }`, params, { next: { revalidate: 604800 } });

            setCategories(categories);
            setIsLoading(false);
        }

        fetchCategories()

    }, [])

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <>
            {isLoading ?
                (
                    <div className="container sm:w-2/3 w-4/5 justify-center flex gap-10 mt-5 lg:overflow-visible overflow-x-auto no-scrollbar h-28">
                        {Array(9).fill(0).map((_, index) => (
                            <div className='items-center justify-center' key={index}>
                                <div className="skeleton w-20 h-20 rounded-[49%] mb-2"  ></div>
                                <div className="skeleton w-20 h-4 rounded"></div>
                            </div>
                        ))}
                    </div>
                )
                :
                (
                    <div className="container sm:w-2/3 w-4/5 justify-center flex gap-7 mt-5 lg:overflow-visible overflow-x-auto no-scrollbar"
                    >
                        {categories.map((category: CategoryProps, index:number) => (
                            <Link href={`/categories/${category.slug.current}`} key={category._id} >
                                <MotionDiv
                                    variants={variants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{
                                        delay: 0.05 * index,
                                        ease: 'easeInOut',
                                        duration: 0.5
                                    }}
                                    viewport={{ amount: 0 }}
                                     className="category_box">
                                    <div className="category_image hover:scale-105 transition duration-500">
                                        <Image width={100} height={100} className='md:min-w-[100px] min-w-[80px]' src={category.imageUrl} alt={category.name} />
                                    </div>
                                    <div className="category_name text-center">
                                        {category.name}
                                    </div>
                                </MotionDiv>
                            </Link>
                        ))}
                    </div>
                )}
        </>
    )
}

export default ShowCategories
