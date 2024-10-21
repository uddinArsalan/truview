"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Share2, MessageCircle, Heart, WavesIcon, Loader } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { useInfiniteQuery,InfiniteData, QueryKey, } from "@tanstack/react-query";
import { getPosts } from "../lib/client_data/getPosts";
import { GetPostResult } from "@/src/types/definition";
import { POSTS_PER_PAGE } from "../constants";
import FeedSkeleton from "./FeedSkeleton";

const FeedPost = ({ post }: { post: GetPostResult }) => {
  const { _count, author, content, imageUrl } = post;
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleComment = () => {
    setComments(comments + 1);
  };

  const handleShare = () => {
    setShares(shares + 1);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-4 flex flex-row items-center space-x-4">
        <Avatar>
          <AvatarImage
            src={`https://i.pravatar.cc/150?u=${author.username}`}
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
            // className="hover:bg-red-50"
          >
            <Heart
              className={`h-5 w-5 mr-1 ${
                liked ? "fill-red-500 text-red-500" : "text-gray-500"
              }`}
            />
            <span className="text-sm">{likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleComment}
            // className="hover:bg-blue-50"
          >
            <MessageCircle className="h-5 w-5 mr-1 text-gray-500" />
            <Badge variant="secondary">{comments}</Badge>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const WelcomeMessage = () => {
  const { user } = useUser();
  const userName = user?.nickname?.split(" ")[0] || "User";

  return (
    <div className="w-full max-w-2xl mx-auto p-6 mb-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-primary flex items-center mb-3">
          <Heart className="mr-2 h-8 w-8 text-red-600" />
          Welcome, {userName}!
        </h1>
        <p className="text-gray-600 text-center">
          Share your amazing moments with the world and connect with friends.
        </p>
      </div>
    </div>
  );
};

const SocialMediaFeed = () => {
  const lastElementDiv = useRef<HTMLDivElement>(null);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['posts'] as const,
    queryFn: getPosts,
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < POSTS_PER_PAGE) {
        return null;
      }
      return lastPage[lastPage.length - 1]?.id ?? null;
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (hasNextPage && entries[0].isIntersecting && !isFetching) {
          fetchNextPage({ cancelRefetch: false });
        }
      },
      { threshold: 1 }
    );

    if (lastElementDiv.current) {
      observer.observe(lastElementDiv.current);
    }

    return () => {
      if (lastElementDiv.current) {
        observer.unobserve(lastElementDiv.current);
      }
    };
  }, [hasNextPage, isFetching,fetchNextPage]);

  if (error) {
    return (
      <div className="flex justify-center p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Error loading posts. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <WelcomeMessage />
      <div className="space-y-6">
        {isLoading ? (
          <FeedSkeleton />
        ) : (
          data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.map((post) => (
                <FeedPost key={post.id} post={post} />
              ))}
            </React.Fragment>
          ))
        )}
      </div>
      <div ref={lastElementDiv} className="py-4 flex justify-center">
        {isFetchingNextPage && (
          <div className="text-gray-500">Loading more posts...</div>
        )}
      </div>
    </div>
  </div>
  );
};

export default SocialMediaFeed;
