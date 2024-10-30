import { COMMENTS_PER_REQ } from "@/src/constants";
import { CommentsResponse, GetPostResult } from "@/src/types/definition";
import {
  useQueryClient,
  useMutation,
  InfiniteData,
} from "@tanstack/react-query";
import axios from "axios";
import { chunk } from "lodash";
export function useCommentPostMutation({ postId }: { postId: string }) {
  const qc = useQueryClient();
  const queryKey = ["posts", postId, "comments"];
  const feedQueryKey = ["posts"];
  const commentPostMutation = useMutation({
    mutationFn: async (content : string) => {
      try {
        const response = await axios.post(`/api/posts/${postId}/comments`,{content});
        if (response.status !== 200) {
          throw Error("Error commenting on post.");
        }
        console.log("Successfully commented", response.data);
        return response.data.comment as CommentsResponse;
      } catch (error) {
        console.error("Error liking post:", error);
        throw error;
      }
    },
    onMutate: async () => {
      await qc.cancelQueries({ queryKey });
      await qc.cancelQueries({ queryKey: feedQueryKey });

      const previousComments = qc.getQueryData(queryKey);
      const previousFeed = qc.getQueryData(feedQueryKey);

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
                    comments: post._count.comments + 1,
                  },
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

      return { previousComments, previousFeed };
    },
    onSuccess: (createdComment) => {
      qc.setQueryData(
        ["posts", postId, "comments", createdComment.id],
        createdComment
      );
      qc.setQueriesData<InfiniteData<CommentsResponse[]>>(
        { queryKey },
        (oldComments) => {
          if (!oldComments) return oldComments;
          const newComment = {
            ...createdComment,
          };
          const newComments = [newComment, ...oldComments.pages.flat()];
          const newPagesOfComments = chunk(newComments, COMMENTS_PER_REQ);
          const newParams = [
            undefined,
            ...newPagesOfComments.slice(0, -1).map((page) => page.at(-1)?.id),
          ];
          return {
            pages: newPagesOfComments,
            pageParams: newParams,
          };
        }
      );
    },
    onError: (err, variables, context) => {
      qc.setQueryData(queryKey, context?.previousComments);
      qc.setQueriesData({ queryKey: feedQueryKey }, context?.previousFeed);
    },
  });

  return { commentPostMutation };
}
