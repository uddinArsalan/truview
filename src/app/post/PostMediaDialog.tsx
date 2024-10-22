"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/src/components/ui/button";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/src/components/ui/dialog";

export default function PostMediaDialog({ formData }: {formData : FormData}) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    formData.append("post-image", selectedFile);

    // try {
      // const imageResponse = await axios.post(
      //   "/api/upload-image/uploads",
      //   formData,
      //   {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   }
      // );

      // const imageUrl = imageResponse.data.url;
      // console.log("Image uploaded successfully:", imageUrl);

      setOpen(false);
    // } catch (error) {
    //   console.error("Error uploading image:", error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  // const postToDatabaseAndShowIt = async (imageUrl: string) => {
  //   try {
  //     const response = await axios.post("/api/createPost", {
  //       imageUrl,
  //       descriptionOfImage: description,
  //     });

  //     console.log("Successfully posted data to database:", response.data);
  //   } catch (error) {
  //     console.error("Error posting to database:", error);
  //   }
  // };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-2xl">
          Add Media
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose your photo or video</DialogTitle>
          <DialogDescription>
            Add a photo or video to share with your post.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-4 p-4 border-2 border-primary rounded-md">
          <Button variant="outline" className="rounded-2xl" asChild>
            <label>
              <Upload className="mr-2 h-4 w-4" />
              Choose Media
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*,video/*"
              />
            </label>
          </Button>
          {selectedFile && selectedFile.type.startsWith("image/") && (
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt="Selected media"
              width={300}
              height={300}
              className="object-cover rounded-lg"
            />
          )}
          {selectedFile && selectedFile.type.startsWith("video/") && (
            <video
              src={URL.createObjectURL(selectedFile)}
              className="w-full max-w-[300px] rounded-lg"
              controls
            />
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleImageUpload}
            disabled={!selectedFile}
          >
            Add Media
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
