import { UserProfileDetails } from "@/src/types/definition";
import { User } from "@prisma/client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useProfileUpdateMutation({ userId }: { userId: string }) {
  const qc = useQueryClient();
  const queryKey = ["user", "posts", userId];
  const updateProfile = useMutation({
    mutationFn: async (formData: FormData): Promise<User> => {
      try {
        const res = await toast.promise(
          axios.patch(`/api/users/${userId}/profile/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          }),
          { loading: "Updating User Profile", success: "", error: "" }
        );
        if (!(res.statusText === "OK")) {
          throw new Error(res.statusText);
        }

        console.log("Profile pic updated", res.data);
        return res.data.updatedProfile;
      } catch (error) {
        console.log("Error updating profile picture", error);
        throw error;
      }
    },
    onSuccess: (updatedProfile) => {
      qc.setQueryData<UserProfileDetails | undefined>(queryKey, (oldData) => {
        if (!oldData) return;
        return {
          ...oldData,
          bio: updatedProfile.bio ?? oldData.bio,
          profile_picture:
            updatedProfile.profile_picture ?? oldData.profile_picture,
        };
      });
      const userQueryKey = ["userData", updatedProfile.auth0Id];
      qc.setQueryData<User | null>(userQueryKey, (oldUserData) => {
        if (!oldUserData) return;
        return {
          ...oldUserData,
          bio: updatedProfile.bio ?? oldUserData.bio,
          profile_picture:
            updatedProfile.profile_picture ?? oldUserData.profile_picture,
        };
      });
      toast.success("User Profile Updated successfully");
      return updatedProfile;
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    },
  });

  return { updateProfile };
}
