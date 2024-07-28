"use client";
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { ProductProps } from './ProductCard';

const Filtering = ({ products, onFilterChange }: any) => {

    const [itemPrice, setItemPrice] = useState('');

    const handleSelectChange = (value: string) => {
        const price = parseInt(value, 10);
        const newProducts = products.filter((product: ProductProps) => product.price <= price);
        onFilterChange(newProducts);
        setItemPrice(value);
    };

    return (
        <>
            <Select value={itemPrice} onValueChange={handleSelectChange} >
                <SelectTrigger className="lg:w-[380px] md:w-[320px] w-[150px] bg-white border border-gray-300 text-gray-700 shadow-sm rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Filter By Price">
                        {itemPrice === '50000' ? 'All' : `Under $${itemPrice}`}
                        </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 rounded shadow-lg">
                    <SelectGroup className='select_group'>
                        <SelectItem className="cursor-pointer" value="50000">All</SelectItem>
                        <SelectItem className="cursor-pointer" value="1000">Under $1000</SelectItem>
                        <SelectItem className="cursor-pointer" value="2000">Under $2000</SelectItem>
                        <SelectItem className="cursor-pointer" value="3000">Under $3000</SelectItem>
                        <SelectItem className="cursor-pointer" value="5000">Under $5000</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

        </>
    );
};

export default Filtering;