import { client } from '../../../sanity/lib/client';

const ProductDetailData = async (productSlug: string) => {
    
    const query = `*[_type == "product" && slug.current == $productSlug]{
        _id,
        name,
        slug,
        description,
        price,
        colorVariations[]{
          color,
          "imageUrl": image.asset->url,
          stock
        },
        "categorySlug": categories[0]->slug.current,
        "category": categories[0]->name,
        PriceId
      }`;
    
      const params = { productSlug };
    
    
      const productDetail = await client.fetch(query, params, {next:{revalidate:86400}});
    
      return productDetail.length > 0 ? productDetail[0] : null;

}

export default ProductDetailData
