"use client";
import React, { useState } from "react";
import PostMediaDialog from "./PostMediaDialog";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { useCreatePostMutation } from "@/src/hooks/mutations/useCreatePostMutation";

const Post = () => {
  const [content, setContent] = useState<string>("");

  const formData = new FormData();
  const {createPostMutation} = useCreatePostMutation({formData})
  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleSubmit =() => {
    formData.append('content',content);
    createPostMutation.mutate()
  }
  
  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-background text-foreground gap-4">
      <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-center">
        Create a New Post
      </h1>
      <div className="w-full max-w-2xl px-4">
        <Textarea
          className="min-h-[150px] rounded-2xl bg-white focus:ring-0 focus:border-transparent hover:border-transparent"
          placeholder="What's on your mind?"
          value={content}
          onChange={handleContentChange}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <Button
          className="rounded-2xl"
          onClick={handleSubmit}
          disabled={createPostMutation.isPending}
        >
          Post
        </Button>
        <PostMediaDialog formData={formData} />
      </div>
    </div>
  );
};

export default Post;
