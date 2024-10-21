import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/src/components/Navbar";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import AppProvider from "@/src/contexts/AppProvider";
import ReactQueryProvider from "@/src/contexts/ReactQueryProvider";

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
  return (
    <html lang="en">
    <body className={inter.className}>
      <UserProvider>
        <ReactQueryProvider>
          <AppProvider>
            <Navbar />
            {children}
          </AppProvider>
        </ReactQueryProvider>
      </UserProvider>
    </body>
  </html>
  );
}
