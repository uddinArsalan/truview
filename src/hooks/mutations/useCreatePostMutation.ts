import { CreatedPost, GetPostResult } from "@/src/types/definition";
import {
  useQueryClient,
  useMutation,
  InfiniteData,
} from "@tanstack/react-query";
import { chunk } from "lodash";
import { POSTS_PER_PAGE } from "@/src/constants";
import toast from "react-hot-toast";
import axios from "axios";

export function useCreatePostMutation({
  formData,
  closeModal,
}: {
  formData: FormData;
  closeModal: () => void;
}) {
  const qc = useQueryClient();
  const queryKey = ["posts"];
  const createPostMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await toast.promise(
          axios.post("/api/posts", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          }),
          { loading: "creating post...", success: "", error: "" }
        );
        if (response.status !== 200) throw new Error(response.statusText);
        return response.data.post as CreatedPost;
      } catch (error) {
        console.error("Error posting", error);
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
            likes: undefined,
            isUserLiked: false,
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
      closeModal();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error creating post");
      closeModal();
    },
  });

  return { createPostMutation };
}
