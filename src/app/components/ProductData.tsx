import React, { cache } from 'react'
import { client } from "../../../sanity/lib/client";


const ProductData = async () => {

        const params:any = '';
        const fetchData = await client.fetch('*[ _type == "product"] | order(_createdAt desc){_id,name, slug, description,price,colorVariations[]{color,colorCode,"imageUrl": image.asset -> url, stock}, "categorySlug": categories[0]->slug.current, PriceId}', params, {next:{revalidate:3600}});

        return fetchData;

}

export default ProductData
