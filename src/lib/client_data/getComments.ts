import axios from "axios";
import { CommentsResponse } from "@/src/types/definition";
import { COMMENTS_PER_REQ } from "@/src/constants";

export async function getPostComments(context: {
  pageParam?: string | null,
  postId : string
}) {
  try {
    const res = await axios.get(
      `/api/posts/${context.postId}/comments?limit=${COMMENTS_PER_REQ}&cursor=${context.pageParam || ''}`
    );

    if (res.status !== 200) throw new Error("Failed to load comments.");
    return res.data.comments as CommentsResponse[];
  } catch (error) {
    console.log(error, "Error fetching comments.");
    throw error;
  }
}