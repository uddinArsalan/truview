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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="p-0">
        <Image
          src={imageUrl}
          width={400}
          height={400}
          alt={`post-${author.username}`}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600 line-clamp-3">
          {content ||
            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          repellendus voluptate cumque laboriosam fugit iste qui necessitatibus
          natus vero facere, saepe temporibus nemo.`}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className="p-0"
          >
            <Heart
              className={`h-5 w-5 ${
                liked ? "fill-red-500 text-red-500" : "text-gray-500"
              }`}
            />
            <span className="ml-1 text-xs">{_count.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleComment}
            className="p-0"
          >
            <MessageCircle className="h-5 w-5 text-gray-500" />
            <Badge variant="secondary" className="ml-1">
              {_count.comments}
            </Badge>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="p-0"
          >
            <Share2 className="h-5 w-5 text-gray-500" />
            <Badge variant="secondary" className="ml-1">
              {shares}
            </Badge>
          </Button>
        </div>
        <Avatar>
          <AvatarImage
            src={`https://i.pravatar.cc/150?u=${author.username}`}
            alt={author.username || "User"}
          />
          <AvatarFallback>{author.username || "U"}</AvatarFallback>
        </Avatar>
      </CardFooter>
    </Card>
  );
};

const WelcomeMessage = () => {
  const { user } = useUser();
  const userName = user?.nickname?.split(" ")[0] || "User";

  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <h1 className="text-3xl font-bold text-primary flex items-center mb-2">
        <WavesIcon className="mr-2" />
        Welcome, {userName}!
      </h1>
      <p className="text-gray-600 text-center max-w-md">
        Share your amazing moments with the world and connect with friends.
      </p>
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

  if (error) return <div>Error loading posts</div>;

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <WelcomeMessage />
      {isLoading && <Loader />}
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {page &&
              page.map((post, index) => <FeedPost key={post.id} post={post} />)}
          </div>
        </React.Fragment>
      ))}
      <div ref={lastElementDiv}>{isFetchingNextPage && "Loading"}</div>
    </div>
  );
};

export default SocialMediaFeed;
