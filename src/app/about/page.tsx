'use client'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Truview
            </h1>
            <p className="text-xl text-white mb-8">
              Capture and share your moments
            </p>
          </div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold">About Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                At Truview, we are passionate about empowering people to capture and share their most cherished moments through exceptional photo sharing experiences.
              </p>
              <p>
                Our cutting-edge platform is designed to provide a seamless and secure way to preserve your memories, while also fostering a vibrant community of photography enthusiasts.
              </p>
              <p>
                With a constantly evolving feature set, Truview stays ahead of the curve, ensuring that you have access to the latest tools and technologies for enhancing and sharing your visual stories.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;