"use client"
import ProductCard, { ProductProps } from "./ProductCard";
import ProductData from "./ProductData";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { ProductSkeleton } from "./productSkeleton";
import Filtering from "./Filtering";
import { SearchFilter } from "./Search";

export interface ProductComponentProps {
  categorySlug?: string;
  limit?: number;
}

const Products: React.FC<ProductComponentProps> = ({ categorySlug, limit }) => {

  //State Handling
  const [isLoading, setIsLoading] = useState(true);
  const [product, setproduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  //Price Filter Handler
  const handleFilterChange = (newProducts: any) => {
    setFilteredProducts(newProducts);
  };

  //Search Filter function
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);

    const filteredProducts = product.filter((product: ProductProps) =>
      product.name.toLowerCase().includes(value.toLowerCase()) ||
      product.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  //Hook for product data fetching
  useEffect(() => {

    async function fetchData(limit: number | undefined) {

      let productData = await ProductData();

      if (categorySlug) {
        productData = productData.filter((product: ProductProps) => product.categorySlug === categorySlug);
      }

      if (limit !== undefined) {
        productData = productData.slice(0, limit);
      }

      setproduct(productData);
      setFilteredProducts(productData);
      setIsLoading(false);
    }
    fetchData(limit)
  }, [categorySlug, limit])

  return (
    <>
      <section className=" bg-cover bg-no-repeat py-5">
      
        <div className="container">
          <div className="filters">
            <div className="price_filter" >
              <Filtering products={product} onFilterChange={handleFilterChange} />
            </div>
            <div className="search_filter">
              <SearchFilter placeholder="Search products" type="text" value={search} onChange={handleChange} />
            </div>
          </div>

          {/* <Filtering prod ucts={products} /> */}
          {isLoading ? (
            <div className="grid lg:grid-cols-4 gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
              {Array(8).fill(0).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : (
            filteredProducts.length === 0 ? (
              <h2 className="text-4xl text-center mx-auto w-full my-9 text-dark font-bold">No Products Found</h2>
            ) : (
              <div className="grid lg:grid-cols-4 gap-6 md:grid-cols-3 sm:grid-cols-2 items-center justify-center ">
                {filteredProducts.map((product: any, i: number) =>
                (<Suspense
                  fallback={<ProductSkeleton />} key={product._id}>
                  <ProductCard
                    _id={product._id}
                    slug={product.slug}
                    description={product.description}
                    name={product.name}
                    price={product.price}
                    colorVariations={product.colorVariations}
                    PriceId={product.PriceId}
                  />
                </Suspense>)
                )}
              </div>
            )
          )}
        </div>

      </section>
    </>
  )
}

export default Products
