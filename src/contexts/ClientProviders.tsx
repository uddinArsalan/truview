"use client";
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import AppProvider from "@/src/contexts/AppProvider";
import ReactQueryProvider from "@/src/contexts/ReactQueryProvider";
import Navbar from "@/src/components/Navbar";

const ClientProviders = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <UserProvider>
      <ReactQueryProvider>
        <AppProvider>
          <Navbar />
          {children}
        </AppProvider>
      </ReactQueryProvider>
    </UserProvider>
  );
};

export default ClientProviders;
