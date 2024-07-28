"use client"
import Image from "next/image"
import Link from "next/link";
import { useState } from "react"
import AddToBag from "./AddToBag";
import { MotionDiv } from "./MotionDiv";
import { delay } from "framer-motion";

export interface ProductProps {
    _id: string;
    name: string;
    slug: {
        current: string;
    };
    description: string;
    price: number;
    categorySlug?: string;
    colorVariations: VariationType[];
    PriceId: string;
}

export interface VariationType {
    imageUrl: string;
    color: string;
    colorCode: string;
    stock: number;
}


const ProductCard = ({ _id, name, slug, description, price, colorVariations, PriceId }: ProductProps) => {

    //state management for changing product color
    const [color, setColor] = useState<VariationType>(colorVariations[0]);


    //function for updating product color
    const handleColor = (variation: VariationType) => {
        setColor(variation)
    }

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <>
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
                className={`product-box`}>

                <div className="product-img  ">
                    <Link href={`/products/${slug.current}`} >
                        <Image
                            className="justify-center text-center mx-auto rounded-t-lg"
                            src={color.imageUrl}
                            alt={name}
                            width={200}
                            height={400}
                            loading="lazy"
                            style={{ objectFit: "scale-down" }}
                        />
                    </Link>
                </div>

                <div className="p-5 text-dark product-body">
                    <div className="product-title">
                        <h3 className="mb-2 text-[22px] font-bold tracking-tight dark:text-dark line-clamp-1">
                            {/* <span>{categoryId ? categoryId : "No category"}</span> */}
                            <Link href={`/products/${slug.current}`} >{name}</Link>
                        </h3>
                    </div>

                    <div className="product-spec">
                        <p className="mb-3 font-normal text-sm dark:text-gray-400 line-clamp-1">{description}</p>
                    </div>

                    <div className="product-colors">
                        <ul>
                            {colorVariations.map((variation, index) => (
                                <li
                                    key={index}
                                    className={`color-circle bg-[${variation.colorCode}] ${color.colorCode === variation.colorCode ? 'border-4 border-red-700' : ''} `}
                                    onClick={() => handleColor(variation)}
                                    style={{ backgroundColor: variation.colorCode }}
                                ></li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-md" >Color: {color.color}</p>

                    <div className="product-price-box">
                        <div className="product-price">
                            <p className="text-xl font-semibold dark:text-gray-400">${price}</p>
                        </div>
                        <div className="product-cart">
                            <AddToBag color={color.color} name={name}
                                description={description} price={price} price_id={PriceId}
                                currency="USD" image={color.imageUrl} key={_id} quantity={1} />
                        </div>
                    </div>

                </div>
            </MotionDiv>
        </>
    )
}

export default ProductCard
