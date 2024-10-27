"use client"
import React from "react";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-gray-800">Welcome to Truview</CardTitle>
      </CardHeader>
      <CardContent>
        <ProfileUpdateForm />
      </CardContent>
    </Card>
  </div>
  );
};

export default SignInPage;
