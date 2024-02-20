import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TruView",
  description: "Experience the true view of Digital world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ,
  return (
    <html lang="en">
      <UserProvider>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
      </UserProvider>
    </html>
  );
}
