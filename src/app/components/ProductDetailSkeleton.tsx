import React from 'react'

const ProductDetailSkeleton = () => {
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-20 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2  w-full lg:h-[500px] h-80 object-cover object-center rounded skeleton"></div>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <div className=" mb-1 skeleton h-20 w-3/4"></div>
        <div className="leading-relaxed mt-7 skeleton h-7 w-1/3"></div>
        <div className="leading-relaxed mt-10 skeleton h-7 w-full"></div>
        <br />
        <div className="skeleton h-6 w-1/4"></div>
        <div className="product-colors mt-4">
          <ul className="flex space-x-2">
            {Array(4).fill(0).map((_, index) => (
              <li key={index} className="color-circle skeleton h-8 w-8 rounded-full"></li>
            ))}
          </ul>
        </div>
        <div className="flex mt-6 gap-5">
          <div className="skeleton h-10 w-1/4 rounded"></div>
          <div className="skeleton h-10 w-1/4 rounded"></div>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default ProductDetailSkeleton
