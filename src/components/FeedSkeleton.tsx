import React from 'react';
import { Skeleton } from "@/src/components/ui/skeleton"
import { Card,CardHeader,CardContent,CardFooter } from '@/src/components/ui/card';

export default function FeedSkeleton() {
  return (
    <div className="space-y-6">
    {[1, 2].map((i) => (
      <Card key={i} className="w-full max-w-2xl mx-auto">
        <CardHeader className="p-4 flex flex-row items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Skeleton className="w-full aspect-video" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-8 ml-2" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-8 ml-2" />
            </div>
          </div>
        </CardFooter>
      </Card>
    ))}
  </div>
  )
}
