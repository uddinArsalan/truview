import axios from "axios";
import { GetPostResult } from "@/src/types/definition";
import { POSTS_PER_PAGE } from "@/src/constants";

export async function getPosts(context: {
  pageParam?: string | null
}) {
  try {
    const res = await axios.get(
      `/api/posts?limit=${POSTS_PER_PAGE}&cursor=${context.pageParam || ''}`
    );

    if (res.status !== 200) throw new Error("Failed to load posts.");
    return res.data.posts as GetPostResult[];
  } catch (error) {
    console.log(error, "Error fetching posts.");
    throw error;
  }
}