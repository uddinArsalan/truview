import { GetPostResult } from "@/src/types/definition";
import {
  useQueryClient,
  useMutation,
  InfiniteData,
} from "@tanstack/react-query";
import axios from "axios";
export function usePostLikesMutations({ postId }: { postId: string }) {
  const qc = useQueryClient();
  // const session = await getSession();
  const queryKey = ["posts", postId];
  const feedQueryKey = ["posts"];
  const likeMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post(`/api/posts/${postId}/like`);
        if (response.status !== 200) {
          /**
           * No need to throw an error when there is a 409 conflict.
           * Why? Trying to like an already liked post should not
           * roll back the optimistic LIKE mutation.
           */
          if (response.status === 409) return true;
          throw Error("Error liking post.");
        }
        console.log("Successfully created Like", response.data);
        return true;
      } catch (error) {
        console.error("Error liking post:", error);
        throw error;
      }
    },
    onMutate: async () => {
      await qc.cancelQueries({ queryKey });
      await qc.cancelQueries({ queryKey: feedQueryKey });

      const previousPost = qc.getQueryData(queryKey);
      const previousFeed = qc.getQueryData(feedQueryKey);

      qc.setQueryData<GetPostResult>(queryKey, (oldPost) => {
        if (!oldPost) return oldPost;
        return {
          ...oldPost,
          _count: {
            ...oldPost._count,
            likes: oldPost._count.likes + 1,
          },
          isUserLiked: true,
        };
      });

      qc.setQueriesData<InfiniteData<GetPostResult[]>>(
        { queryKey: feedQueryKey },
        (oldPosts) => {
          if (!oldPosts) return oldPosts;
          const updatedPages = oldPosts.pages.map((arrOfPages) => {
            return arrOfPages.map((post) => {
              if (post.id == postId) {
                return {
                  ...post,
                  _count: {
                    ...post._count,
                    likes: post._count.likes + 1,
                  },
                  isUserLiked: true,
                };
              }
              return post;
            });
          });
          return {
            pageParams: oldPosts.pageParams,
            pages: updatedPages,
          };
        }
      );

      return { previousPost, previousFeed };
    },
    onError: (err, variables, context) => {
      qc.setQueryData(queryKey, context?.previousPost);
      qc.setQueriesData({ queryKey: feedQueryKey }, context?.previousFeed);
    },
  });

  return { likeMutation };
}
