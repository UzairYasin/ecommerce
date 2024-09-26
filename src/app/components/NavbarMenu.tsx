"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import ShoppingCartModal from "./ShoppingCartModal";
import Image from "next/image";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { CircleUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { client } from '../../../sanity/lib/client';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { CategoryProps } from '../(home)/categories/ShowCategories';
import { cn } from '@/lib/utils';

const NavbarMenu = ({ session, signOut }: { session: any, signOut: any }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function fetchCategories() {

            const params: any = ''
            const categories = await client.fetch(`*[_type == "category"] {
                _id,
                slug,
                name,
                "imageUrl":image.asset->url,
              }`, params, { next: { revalidate: 604800 } });

            setCategories(categories);
            setIsLoading(false);
        }

        fetchCategories()

    }, [])

    function handleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-3">

                <div className="my-auto mx-2">
                    {session?.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="rounded-full">
                                    {session.user.image ? (
                                        <Image src={session.user.image} alt="User Avatar" className="h-5 w-5 rounded-full" />
                                    ) : (
                                        <CircleUser className="h-5 w-5" />
                                    )}
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent >
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href={session.user.role === 'user' ? '/account' : '/admin'}>
                                        Account
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <form action={signOut}>
                                        <button type='submit' className="w-full">
                                            Logout
                                        </button>
                                    </form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button variant="outline">
                            <Link href="/signin">Login</Link>
                        </Button>
                    )}
                </div>
                <ShoppingCartModal />

                <button
                    data-collapse-toggle="navbar-cta"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg 
                    md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-160
                  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-cta"
                    aria-expanded={isMenuOpen}
                    onClick={handleMenu}>
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org-1600/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
            </div>

            <div className={`fixed inset-0 bg-white bg-opacity-90 backdrop-blur-md flex flex-col items-center justify-center md:static md:bg-transparent md:backdrop-blur-none md:flex md:w-auto md:order-1  ${isMenuOpen ? 'block' : 'hidden'}`}
                id="navbar-cta">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={handleMenu}
                >
                    <svg
                        className={`w-10 h-10 mr-2 mt-2 ${isMenuOpen ? '' : 'hidden'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org-1600/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <ul className="navbar-links">
                    <li>
                        <Link href="/" className="navbar-link" aria-current="page">Home</Link>
                    </li>
                    <li>
                        <Link href="/products" className="navbar-link">Products</Link>
                    </li>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="px-3 md:text-lg md:my-0 my-2 text-2xl md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" >
                                    Categories
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className='mt-2 lg:w-[700px]'
                                    >
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:grid-cols-3 lg:w-[700px] ">
                                        {categories.map((category: CategoryProps) => (
                                            <ListItem
                                                key={category._id}
                                                title={category.name}
                                                imageSrc={category.imageUrl}
                                                href={`/categories/${category.slug.current}`}
                                            />
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <li>
                        <Link href="/about" className="navbar-link">About</Link>
                    </li>
                    <li>
                        <Link href="/contact" className="navbar-link">Contact</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { imageSrc?: string }
>(({ className, title, imageSrc, children, ...props }, ref) => {
    return (
        <li className="flex items-center space-x-3">
            <NavigationMenuLink className='w-full' asChild>
                <a
                    ref={ref}
                    className={cn(
                        "flex items-center space-x-3 select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    {imageSrc && (
                        <Image
                            src={imageSrc}
                            width={100}
                            height={100}
                            alt={title || ''}
                            className="w-16 h-16 object-cover rounded-md"
                        />
                    )}
                    <div className="md:text-md font-semibold leading-5">{title}</div>
                    {children && (
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    )}
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";


export default NavbarMenu
