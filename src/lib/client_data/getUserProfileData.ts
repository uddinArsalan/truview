import axios from "axios";
import { GetPostResult, UserProfileDetails } from "@/src/types/definition";
export async function getUserProfileDetails({ userId }: { userId: string }) {
  try {
    const res = await axios.get(`/api/users/${userId}/posts/`);

    if (res.status !== 200) throw new Error("Failed to load User Profile.");
    return res.data.userProfileDetails as UserProfileDetails;
  } catch (error) {
    console.log(error, "Error fetching posts.");
    throw error;
  }
}
