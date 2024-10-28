"use client";
import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Image as ImageIcon, X } from "lucide-react";
import { useCreatePostMutation } from "@/src/hooks/mutations/useCreatePostMutation";

const CreatePostDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleClose = () => {
    setIsOpen(false);
    setContent("");
    setSelectedFile(null);
    if (previewURL) {
      URL.revokeObjectURL(previewURL);
      setPreviewURL(null);
    }
  };

  const formData = new FormData();
  const { createPostMutation } = useCreatePostMutation({
    formData,
    closeModal: handleClose,
  });

  const removeMedia = () => {
    setSelectedFile(null);
    if (previewURL) {
      URL.revokeObjectURL(previewURL);
      setPreviewURL(null);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }

      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() && !selectedFile) return;

    formData.append("content", content);
    if (selectedFile) {
      formData.append("post-image", selectedFile);
    }

    try {
      await createPostMutation.mutateAsync();
      handleClose();
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-lg hover:shadow-xl"
          size="icon"
        >
          <span className="text-2xl">+</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="z-50 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={handleContentChange}
            className="min-h-[100px] resize-none"
          />

          {previewURL && (
            <div className="relative">
              {selectedFile?.type.startsWith("image/") ? (
                <div className="relative w-full h-48">
                  <Image
                    src={previewURL}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                    width={56}
                    height={56}
                  />
                </div>
              ) : selectedFile?.type.startsWith("video/") ? (
                <video
                  src={previewURL}
                  controls
                  className="w-full rounded-lg"
                />
              ) : null}

              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 w-8 h-8 rounded-full"
                onClick={removeMedia}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                asChild
              >
                <label className="cursor-pointer">
                  <ImageIcon className="w-5 h-5" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                  />
                </label>
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={createPostMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  createPostMutation.isPending ||
                  (!content.trim() && !selectedFile)
                }
              >
                {createPostMutation.isPending ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
