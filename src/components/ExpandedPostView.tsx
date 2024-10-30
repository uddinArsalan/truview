import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/src/components/ui/avatar";
import { Heart,  Send } from "lucide-react";
import { usePostLikesMutations } from "../hooks/mutations/usePostLikesMutations";
import { Input } from "@/src/components/ui/input";
import { GetPostResult } from "../types/definition";
import Image from "next/image";
import CommentSection from "./CommentSection";
import { useCommentPostMutation } from "../hooks/mutations/useCommentMutation";

const ExpandedPostView = ({
  post,
  isOpen,
  onClose,
}: {
  post: GetPostResult;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { likeMutation } = usePostLikesMutations({ postId: post.id });
  const { commentPostMutation } = useCommentPostMutation({ postId: post.id });
  const { _count, author, content, imageUrl, isUserLiked } = post;

  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    likeMutation.mutate();
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      await commentPostMutation.mutateAsync(newComment);
      setNewComment("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="hidden">Post Info</DialogTitle>
      <DialogContent className="max-w-full md:max-w-6xl p-4 md:p-0 h-screen md:h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="relative bg-black flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={`Post by ${author.username}`}
              className="w-full h-auto object-contain"
              width={800}
              height={800}
              priority
            />
          </div>

          <div className="flex flex-col h-full overflow-y-auto bg-white">
            <div className="flex-1 overflow-y-auto">
              <div className="flex gap-3 p-4 border-b">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={author.profile_picture || ""} />
                  <AvatarFallback>{author.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <span className="font-semibold text-sm">
                    {author.username}
                  </span>
                  <p className="text-sm mt-1">{content}</p>
                </div>
              </div>

              <div className="py-1">
                {post._count.comments > 0 ? (
                  <CommentSection postId={post.id} />
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-500">
                    No comments yet
                  </div>
                )}
              </div>
            </div>

            <div className="border-t">
              <div className="p-4">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" onClick={handleLike}>
                    <Heart
                      className={`h-5 w-5 ${
                        isUserLiked
                          ? "fill-red-500 text-red-500"
                          : "text-gray-500"
                      }`}
                    />
                  </Button>
                </div>
                <div className="mt-2">
                  <span className="text-sm font-semibold">
                    {post._count.likes} likes
                  </span>
                </div>
              </div>

              <form
                onSubmit={handleSubmitComment}
                className="px-4 pb-4 flex gap-2"
              >
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!newComment.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpandedPostView;
