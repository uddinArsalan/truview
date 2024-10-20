import axios from "axios";
import { GetPostResult } from "@/src/types/definition";
import { POSTS_PER_PAGE } from "@/src/constants";
import { QueryFunctionContext } from "@tanstack/react-query";

export async function getPosts({ queryKey, pageParam }: QueryFunctionContext) {
  const cursor = pageParam as string | undefined;
  try {
    const res = await axios.get(
      `/api/posts?limit=${POSTS_PER_PAGE}&cursor=${cursor}`
    );

    if (res.statusText !== "OK") throw new Error("Failed to load posts.");
    return res.data.posts as GetPostResult[];
  } catch (error) {
    console.log(error,"Error fetching posts.");
    throw error;
  }
}
