import { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import ProductCard, { ProductProps } from "./ProductCard";
import {ProductSkeleton} from "./productSkeleton";

const RelatedProducts = ({ categorySlug, currentProductId }: { categorySlug: string, currentProductId: string }) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const query = `
        *[_type == "product" && categories[0]->slug.current == "${categorySlug}"] | order(_createdAt desc) {
          _id,
          name,
          slug,
          description,
          price,
          colorVariations[] {
            color,
            colorCode,
            "imageUrl": image.asset->url,
            stock
          },
          "categorySlug": categories[0]->slug.current,
          PriceId
        }
      `;
      const products: ProductProps[] = await client.fetch(query);
      const filteredProducts = products.filter(product => product._id !== currentProductId)
      setProducts(filteredProducts);
      setLoading(false);
    };

    fetchCategoryProducts();
  }, [categorySlug, currentProductId]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Display a few skeleton cards while loading */}
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="text-center text-3xl font-bold">No related products found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          _id={product._id}
          slug={product.slug}
          description={product.description}
          name={product.name}
          price={product.price}
          colorVariations={product.colorVariations}
          PriceId={product.PriceId}
        />
      ))}
    </div>
  );
};

export default RelatedProducts;
