"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
// import { convertImgUrl } from "@/utils";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Upload, LogIn, LogOut } from "lucide-react";

const ProfileUpdateForm = () => {
  const [selectedFile, setSelectedFile] = useState<Blob>();
  const { user } = useUser();

  const handleImageChange = async (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget && e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0];
      setSelectedFile(file);
    }
  };
  const updateProfilePic = async () => {
    const user_Id = user?.sub;
    const formData = new FormData();
    if (!selectedFile) return;
    formData.append("profile-image", selectedFile);
    try {
      const res = await axios.patch(
        `/api/users/${user_Id}/profile/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Profile pic updated", res.data);
    } catch (error) {
      console.log("Error updating profile picture", error);
    }
  };
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={
                    selectedFile ? URL.createObjectURL(selectedFile) : undefined
                  }
                />
                <AvatarFallback>
                  <Avatar className="w-full h-full text-gray-400" />
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="picture"
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
              </label>
              <Input
                id="picture"
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <p className="text-sm text-gray-500">
              Select a new profile picture
            </p>
            <Button onClick={updateProfilePic} className="w-full">
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center space-x-4">
        <Button variant="default" asChild>
          <a href="/api/auth/login" className="inline-flex items-center">
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href="/api/auth/logout" className="inline-flex items-center">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ProfileUpdateForm;
