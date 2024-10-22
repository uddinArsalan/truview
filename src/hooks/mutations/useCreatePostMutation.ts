import { CreatedPost, GetPostResult } from "@/src/types/definition";
import {
  useQueryClient,
  useMutation,
  InfiniteData,
} from "@tanstack/react-query";
// import { getSession } from "@auth0/nextjs-auth0";
import { chunk } from "lodash";
import { POSTS_PER_PAGE } from "@/src/constants";
import axios from "axios";
export function useCreatePostMutation({
  formData,
}: {
  formData: FormData;
}) {
  const qc = useQueryClient();
  // const session = await getSession();
  const queryKey = ["posts"];
  const createPostMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post(
          "/api/posts",
            formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (!(response.statusText === "OK"))
          throw new Error(response.statusText);
        console.log("Successfully posted data to database:", response.data);
        return response.data.post as CreatedPost;
      } catch (error) {
        console.error("Error posting to database:", error);
        throw error;
      }
    },
    onSuccess: (createdPost) => {
      qc.setQueryData(["posts", createdPost.id], createdPost);
      qc.setQueriesData<InfiniteData<GetPostResult[]>>(
        { queryKey },
        (oldPosts) => {
          if (!oldPosts) return oldPosts;

          const newPost = {
            ...createdPost,
            _count: {
              likes: 0,
              comments: 0,
            },
          };

          const newPosts = [newPost, ...oldPosts.pages.flat()];
          const newPages = chunk(newPosts, POSTS_PER_PAGE);
          const newParams = [
            undefined,
            ...newPages.slice(0, -1).map((page) => page.at(-1)?.id),
          ];

          return {
            pages: newPages,
            pageParams: newParams,
          };
        }
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { createPostMutation };
}
