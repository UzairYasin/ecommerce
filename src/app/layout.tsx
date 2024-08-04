import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import { ContextApi } from "./components/context";
import TopLoader from "./components/TopLoader";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { ClerkProvider } from "@clerk/nextjs";
import CartProvider from "./components/Providers/CartProvider";
import BackToTopButton from "./components/BackToTop";
// import ShoppingCartModal from "./components/ShoppingCartModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cartlon",
  description: "Ecommerce website for watches",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>   
        <html lang="en" suppressHydrationWarning>
          <body className={inter.className}>
            {/* <TopLoader /> */}

            <CartProvider>
            <Navbar signIn={
              <>
                  <SignInButton />
              </>
            }
              signUp={
                <>
                    <SignUpButton />
                </>
              }
            />         
            
              {children}
            </CartProvider>

            <Footer />
            <BackToTopButton />
          </body>
        </html>
        </ClerkProvider>
    
  );
}
