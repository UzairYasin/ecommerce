import AdminSidebar from '@/app/components/AdminSidebar';
import { Inter } from 'next/font/google';
import "../globals.css";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <AdminSidebar main={children} />
          <Toaster richColors />
        </body>
    </html>
  );
}
