"use client";
import React from "react";
import Link from "next/link";
import UserMenu from "./UserMenu";
import MobileNavigation from "./MobileNavigation";
import { Button } from "@/src/components/ui/button";
import { useApp } from "../contexts/AppProvider";
import { navigationItems } from "@/data";

const Navbar = () => {
  const { isLoggedIn, userData } = useApp();

  return (
    <nav className="bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl">
            TRUVIEW
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground/10 transition-colors flex items-center space-x-1"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <UserMenu userData={userData!} />
            ) : (
              <div className="flex space-x-2">
                <a href="/api/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </a>
                <a href="/api/auth/signup">
                  <Button variant="default">Sign Up</Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileNavigation />
    </nav>
  );
};

export default Navbar;
