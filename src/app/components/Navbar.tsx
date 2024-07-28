"use client"
import { Button } from "@/components/ui/button"
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link"
import ShoppingCartModal from "./ShoppingCartModal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Navbar = ({ signUp, signIn }: { signUp: any, signIn: any }) => {

  const { isLoaded, userId } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();
  const searchParams = useSearchParams();

  function handleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    }

    handleRouteChange();

    return () => {
      handleRouteChange();
    }
  }, [pathName, searchParams]);



  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    // return null;
  }

  return (
    <>

      <nav className="bg-white dark:bg-gray-900 min-h-[30px] max-h-[75px] items-center shadow-sm sticky top-0 z-50 transition-all">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between my-auto mx-auto p-4">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="/watch-logo1.png" alt="Logo" width={150} height={100} />
            {/* <span className="self-center text-2xl ffont-semibold whitespace-nowrap dark:text-white">PhoneMall</span> */}
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-3">

            {!userId ?
              
                <div className="md:flex hidden items-center gap-3">
                  <a className="rounded bg-gradient-to-r from-blue-500 to-blue-400
                   text-white px-5 py-2" >
                    {signUp ?? 'Sign up'}
                  </a>

                  <a className="rounded bg-black
                   text-white px-5 py-2" >
                    {signIn ?? 'Sign in'}
                  </a>
                </div>
              
              :
              <UserButton />
            }

            <ShoppingCartModal />

            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg 
              md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200
            dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded={isMenuOpen}
              onClick={handleMenu}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
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
                xmlns="http://www.w3.org/2000/svg"
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
              <li>
                <Link href="/about" className="navbar-link">About</Link>
              </li>
              <li>
                <Link href="/contact" className="navbar-link">Contact</Link>
              </li>
              <li className=" md:hidden">
                {!userId ?
                  (
                    <div className="flex flex-col items-center gap-3">
                      <a className="rounded bg-gradient-to-r from-blue-500 to-blue-400 text-white px-5 py-2">
                        {signUp ?? 'Sign Up'}
                      </a>

                      <a className="rounded bg-black text-white px-5 py-2" >{signIn ?? 'Sign In'}</a>
                    </div>
                  )
                  :
                  ''
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar
