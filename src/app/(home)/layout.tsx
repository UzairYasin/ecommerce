import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopLoader from "../components/TopLoader";
import CartProvider from "../components/Providers/CartProvider";
import BackToTopButton from "../components/BackToTop";
import AuthWrapper from "../components/Providers/SessionProvider";
import { Toaster } from "sonner";

// const inter = Inter({ subsets: ["latin"] });

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
        <html lang="en" suppressHydrationWarning>
          <body>
            <AuthWrapper>
            <CartProvider>
              <Navbar  />                  
              {children}
            </CartProvider>
            <Toaster richColors />
            <Footer />
            <BackToTopButton />
            </AuthWrapper>
          </body>
        </html>
    
  );
}
