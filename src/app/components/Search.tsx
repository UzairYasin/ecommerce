import React, { ChangeEventHandler, useState } from 'react';
import { ProductProps } from './ProductCard';
import { Input } from '@/components/ui/input';

interface InputProps {
    type: "text" | "password" | "email" | "number"; // restricts prop type to specific values
    placeholder: string;
    value: string;
    onChange:  ChangeEventHandler<HTMLInputElement> //(value: string) => void;
}

export function SearchFilter({ type, placeholder, value, onChange }: InputProps) {

    // const [search, setSearch] = useState('');
    // const [searchResults, setSearchResults] = useState<ProductProps[]>(products);


    return (
        <Input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="bg-white rounded h-10 border border-gray-300 focus-visible:ring"
        />
    );
}
