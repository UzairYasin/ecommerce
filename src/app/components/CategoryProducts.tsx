"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { client } from '../../../sanity/lib/client';
import { ProductSkeleton } from './productSkeleton';
import ProductCard, { ProductProps } from './ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link';


const CategoryProducts = ({ category, categoryName }: { category: string, categoryName: string }) => {

  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchCategoryProducts = async () => {

      const query = `
          *[_type == "product" && categories[0]->slug.current == "${category}"] | order(_createdAt desc) {
            _id,
            name,
            slug,
            description,
            price,
            colorVariations[]{
              color,
              colorCode,
              "imageUrl": image.asset->url,
              stock
            },
            "categorySlug": categories[0]->slug.current,
            PriceId
          }
        `;
      try {
        const products: ProductProps[] = await client.fetch(query, {}, { next: { revalidate: 3600 } });
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts()

  }, [category]);

  return (
    <>
      <div className="container my-10">

        <h2 className='text-start text-4xl text-black font-bold my-2' >
          {categoryName}
          <span className='text-sm font-normal ml-2 hover:underline' >
            <Link href={`/categories/${category}`}>View All </Link>
          </span>
        </h2>
        {loading ? (
          <div className="grid lg:grid-cols-4 gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {Array(4).fill(0).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) :
          (
            products.length !== 0 ? (
                  <div className="flex overflow-x-auto py-5 px-2 carousel-container">
                    {products.map((product) => (
                      <div key={product._id} className="flex-shrink-0 lg:w-1/4 md:w-1/3 sm:w-1/2  px-2">
                        <Suspense fallback={<ProductSkeleton />}>
                          <ProductCard
                            _id={product._id}
                            slug={product.slug}
                            description={product.description}
                            name={product.name}
                            price={product.price}
                            colorVariations={product.colorVariations}
                            PriceId={product.PriceId}
                          />
                        </Suspense>
                      </div>
                    ))}
                  </div>
              
            ) : (
              <h2 className="text-4xl text-center mx-auto w-full my-20 text-dark font-bold">No Products Found</h2>
            )

          )
        }

      </div>
    </>
  )
}

export default CategoryProducts
