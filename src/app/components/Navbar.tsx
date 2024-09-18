import Link from "next/link"
import Image from "next/image";
import NavbarMenu from "./NavbarMenu";
import { auth, signOut } from "@/auth";

const Navbar = async() => {

  const session = await auth();

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 min-h-[30px] max-h-[75px] items-center shadow-sm sticky top-0 z-50 transition-all">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between my-auto mx-auto p-4">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="/watch-logo1.png" alt="Logo" width={150} height={100} />
          </Link>

          <NavbarMenu
            session={session}
            signOut={
              async () => {
                'use server'
                await signOut()
                window.location.href='/'
              }
            }
          />

        </div>
      </nav>
    </>
  )
}

export default Navbar
