import React, { useEffect, useRef, useState } from "react";
import { CommentsResponse } from "../types/definition";
import { formatDistanceToNow } from "date-fns";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { X, Send, MoreVertical } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostComments } from "../lib/client_data/getComments";
import { COMMENTS_PER_REQ } from "../constants";

const Comment = ({ comment }: { comment: CommentsResponse }) => (
  <div className="flex items-center gap-3 p-4 hover:bg-gray-50">
    <Avatar className="h-8 w-8">
      <AvatarImage src={comment.user?.profile_picture || ""} />
      <AvatarFallback>{comment.user?.username[0]}</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold text-sm">{comment.user.username}</span>
          <span className="text-gray-500 text-xs ml-2">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-sm mt-1">{comment.content}</p>
    </div>
  </div>
);

const CommentSection = ({ postId }: { postId: string }) => {
  const lastElementDiv = useRef<HTMLDivElement>(null);

  const {
    data: commentPages,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["posts", postId, "comments"],
    queryFn: ({ pageParam }) => getPostComments({ pageParam, postId }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < COMMENTS_PER_REQ) {
        return null;
      }
      return lastPage[lastPage.length - 1]?.id ?? null;
    },
    staleTime: 5000 * 60,
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
  }, [hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 ">Loading Comments</div>
        ) : (
          commentPages?.pages.map((comments, index) => (
            <React.Fragment key={index}>
              {comments?.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </React.Fragment>
          ))
        )}
      </div>
      <div ref={lastElementDiv} className="py-4 flex justify-center">
        {isFetchingNextPage && (
          <div className="text-gray-500">Loading more comments...</div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
