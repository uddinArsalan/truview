"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  User,
  LogOut,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { useApp } from "../contexts/AppProvider";
import { navigationItems } from "@/data";

const MobileNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };
  const { isLoggedIn, userData } = useApp();

  return (
    <Sheet
      open={mobileMenuOpen}
      onOpenChange={() => setMobileMenuOpen(!mobileMenuOpen)}
    >
      <div className="md:hidden">
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
      </div>
      
      <SheetContent side="right" className="w-[280px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col space-y-4">
          {isLoggedIn && (
            <div className="flex items-center space-x-3 px-3 py-2 border-b">
              <Avatar>
                <AvatarImage
                  src={userData?.profile_picture || ""}
                  alt={userData?.username || "User"}
                />
                <AvatarFallback>
                  {userData?.username?.[0] || "UN"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{userData?.username}</span>
                <span className="text-sm text-muted-foreground">
                  {userData?.email}
                </span>
              </div>
            </div>
          )}

          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/10 transition-colors"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}

          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/10 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/10 transition-colors text-red-600 w-full"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="space-y-2 pt-2 border-t">
              <a
                href="/api/auth/login"
                className="flex w-full items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/10 transition-colors"
              >
                Sign In
              </a>
              <a
                href="/api/auth/signup"
                className="flex w-full items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </a>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
