"use client"
import React, { useEffect, useState } from 'react'
import ProductDetailData from '@/app/components/ProductDetailData';
import { VariationType } from '@/app/components/ProductCard';
import ProductDetailSkeleton from '@/app/components/ProductDetailSkeleton';
import CheckoutNow from '@/app/components/CheckoutNow';
import AddToBag from '@/app/components/AddToBag';
import Image from 'next/image';
import { MotionDiv } from '@/app/components/MotionDiv';

interface ProductPageProps {
  params: {
    product: string;
  }
}

export interface ProductDetailProps {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  colorVariations: VariationType[],
  categorySlug: string;
  category: string;
  PriceId: string;
}

const Page = ({ params }: ProductPageProps) => {

  const [product, setProduct] = useState<ProductDetailProps | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<VariationType | null>(null);

  const productSlug = params.product;

  useEffect(() => {

    const fetchProduct = async () => {
      let productDetail = await ProductDetailData(productSlug);

      setProduct(productDetail);
      if (productDetail && productDetail.colorVariations.length > 0) {
        setSelectedVariation(productDetail.colorVariations[0]);
      }

    }

    fetchProduct();
  }, [productSlug])

  if (!product) {
    console.log('Product not found for slug:', productSlug); // Debug statement
    return (
      <ProductDetailSkeleton />
    );
  }

  const handleColor = (variation: VariationType) => {
    setSelectedVariation(variation);

  }
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-14 mx-auto">

          {
            (selectedVariation && product == null) ? <ProductDetailSkeleton /> :
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <MotionDiv
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    delay: 0.1,
                    ease: 'easeInOut',
                    duration: 0.5
                  }}
                  viewport={{ amount: 0 }}
                  className="lg:w-1/2 w-full flex flex-col items-center">
                  <Image
                    src={selectedVariation?.imageUrl || ''}
                    alt={`${product?.name}-${selectedVariation?.color}`}
                    width={400}
                    height={500}
                    className="w-full lg:h-[500px] bg-gray-100 p-16 md:object-contain object-cover
                    object-center rounded"
                  />
                  <div className="mt-4 flex space-x-2">
                    {product?.colorVariations.map((variation, index) => (
                      <Image
                        key={index}
                        alt={`${product?.name}-${variation.color}`}
                        width={64}
                        height={64}
                        className="h-16 w-16 object-contain rounded cursor-pointer bg-gray-100 p-2"
                        src={variation.imageUrl}
                        onClick={() => handleColor(variation)}
                      />
                    ))}
                  </div>
                </MotionDiv>

                <MotionDiv
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    delay: 0.2,
                    ease: 'easeInOut',
                    duration: 0.5
                  }}
                  viewport={{ amount: 0 }}
                  className="lg:w-1/2 w-full lg:pl-16 lg:py-6 mt-6 lg:mt-0">
                  {/* <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2> */}
                  <h1 className="text-gray-900 text-5xl title-font font-semibold mb-5">
                    {product.name}
                  </h1>

                  <div className="rating mb-5">
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      defaultChecked />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  </div> 10 ratings

                  {/* <div className="flex mb-4">
                <span className="flex items-center">
                  
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-blue-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-blue-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-blue-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-blue-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  </a>
                </span>
              </div> */}
                  <p className="leading-relaxed mb-5">
                    {product.description}
                  </p>

                  <p><span className='font-semibold'>Available</span>: {selectedVariation?.stock}</p>
                  <p className='mb-2'><span className='font-semibold'>Color</span>: {selectedVariation?.color}</p>
                  <div className="product-colors mb-5">
                    <ul>
                      {product.colorVariations.map((variation, index) => (
                        <li
                          key={index}
                          className={`color-circle bg-[${variation.colorCode}]
                          ${selectedVariation === variation ? ' border-red-500 border-8' : ''
                            }`}
                          onClick={() => handleColor(variation)}
                          style={
                            variation.color !== 'black' && variation.color !== 'white'
                              ? { backgroundColor: variation.color, opacity: 0.6 }
                              : { backgroundColor: variation.color }
                          }
                        ></li>
                      ))}
                    </ul>
                  </div>
                  <span className="title-font font-bold text-3xl text-gray-900 ">
                    ${product.price}
                  </span>
                  <p>
                    Including VAT and Shipping
                  </p>
                  <div className="flex gap-5 mt-5">
                    <AddToBag
                      color={selectedVariation?.color || ''}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      price_id={product.PriceId}
                      currency="USD"
                      image={selectedVariation?.imageUrl || ''}
                      key={product._id}
                      quantity={1} />

                    <CheckoutNow
                      color={selectedVariation?.color || ''}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      price_id={product.PriceId}
                      currency="USD"
                      image={selectedVariation?.imageUrl || ''}
                      key={product._id}
                      quantity={1} />

                  </div>
                </MotionDiv>
              </div>
          }
        </div>
      </section>

    </>
  );
}

export default Page
