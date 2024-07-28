import React from 'react';

export const ProductSkeleton = () => (

  <div className="p-4">
    <div className="skeleton h-[220px] product-img"></div>

    <div className="p-5 text-dark product-body">
      <div className="skeleton w-full h-5 product-title mb-3"></div>
      <div className="skeleton w-2/3 h-5 product-title mb-3"></div>

      <div className="skeleton product-spec border-none"></div>

      <div className="product-colors border-none">
        <ul>
          <li className='skeleton h-5 w-full'></li>
          <li className='skeleton h-5 w-full'></li>
        </ul>
      </div>

      <div className="product-price-box">
        <div className="product-price skeleton w-12 h-8"></div>
        <div className="product-cart skeleton w-16 h-8"></div>
      </div>

    </div>
  </div>
);
