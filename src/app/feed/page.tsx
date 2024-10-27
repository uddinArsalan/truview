"use client";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/src/lib/client_data/getPosts";
import { POSTS_PER_PAGE } from "@/src/constants";
import FeedPost from "@/src/components/FeedPost";
import FeedSkeleton from "@/src/components/FeedSkeleton";
import WelcomeMessage from "@/src/components/WelcomeMessage";
import CreatePostDialog from "@/src/components/CreatePostDialog";

const FeedPage = () => {
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
    queryKey: ["posts"] as const,
    queryFn: getPosts,
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < POSTS_PER_PAGE) {
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
      <CreatePostDialog />
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

export default FeedPage;
