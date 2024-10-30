"use client";
import { useState } from "react";
import Image from "next/image";
import { usePostLikesMutations } from "../hooks/mutations/usePostLikesMutations";
import { GetPostResult } from "../types/definition";
import { MessageCircle, Heart } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import ExpandedPostView from "./ExpandedPostView";

const FeedPost = ({ post }: { post: GetPostResult }) => {
  const { likeMutation } = usePostLikesMutations({ postId: post.id });
  const [isExpanded, setIsExpanded] = useState(false);
  const { _count, author, content, imageUrl, isUserLiked } = post;

  const handleLike = () => {
    likeMutation.mutate();
  };


  return (
    <>
    <Card className="w-full max-w-2xl mx-auto hover:shadow-lg transition-shadow duration-200" onClick={() => setIsExpanded(true)}>
      <CardHeader className="p-4 flex flex-row items-center space-x-4">
        <Avatar>
          <AvatarImage
            src={`${author.profile_picture}`}
            alt={author.username || "User"}
          />
          <AvatarFallback>{author.username?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{author.username}</h3>
          <p className="text-sm text-gray-500">Just now</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Image
          src={imageUrl}
          width={800}
          height={600}
          alt={`post-${author.username}`}
          className="w-full aspect-video object-cover"
        />
        <div className="p-4">
          <p className="text-sm text-gray-600">
            {content ||
              `Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              repellendus voluptate cumque laboriosam fugit iste qui necessitatibus
              natus vero facere, saepe temporibus nemo.`}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
          >
            <Heart
              className={`h-5 w-5 mr-1 ${
                isUserLiked ? "fill-red-500 text-red-500" : "text-gray-500"
              }`}
            />
            <span className="text-sm">{_count.likes}</span>
          </Button>
          <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
              }}
            >
              <MessageCircle className="h-5 w-5 mr-1 text-gray-500" />
              <Badge variant="secondary">{_count.comments}</Badge>
            </Button>
        </div>
      </CardFooter>
    </Card>
    <ExpandedPostView
        post={post}
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
      />
    </>
  );
};

export default FeedPost;
