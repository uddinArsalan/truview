"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Textarea } from "@/src/components/ui/textarea";
import { Camera } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileDetails } from "@/src/lib/client_data/getUserProfileData";
import { useRouter } from "next/navigation";
import FeedSkeleton from "@/src/components/FeedSkeleton";
import FeedPost from "@/src/components/FeedPost";
import { useApp } from "@/src/contexts/AppProvider";
import { useProfileUpdateMutation } from "@/src/hooks/mutations/useProfileUpdateMutation";
import CreatePostDialog from "@/src/components/CreatePostDialog";

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const router = useRouter();
  const { isLoggedIn, userData } = useApp();
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<{
    userProfileFile: File | null;
    bio: string;
  }>({
    userProfileFile: null,
    bio: "",
  });

  const { updateProfile } = useProfileUpdateMutation({ userId: userData?.id! });
  useEffect(() => {
    if (!isLoggedIn || !userData) {
      router.push("/");
    }
  }, [isLoggedIn, userData, router]);
  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  const { data: profileDetails, isLoading } = useQuery({
    queryKey: ["user", "posts", userData?.id],
    queryFn: () => getUserProfileDetails({ userId: userData?.id! }),
    enabled: !!userData,
    staleTime : 5000 * 60
  });

  const handleProfileChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget && e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0];
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }

      setProfileData((prev) => ({
        ...prev,
        userProfileFile: file,
      }));
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const updateProfileData = async () => {
    
      if (
        editing &&
        (profileData.bio !== profileDetails?.bio || profileData.userProfileFile)
      ) {
        const formData = new FormData();
        formData.append("bio", profileData.bio);
        if (profileData.userProfileFile) {
          formData.append("profile-image", profileData.userProfileFile);
        }

        await updateProfile.mutateAsync(formData);
        setProfileData((prev) => ({
          ...prev,
          userProfileFile: null,
        }));

        if (previewURL) {
          URL.revokeObjectURL(previewURL);
          setPreviewURL(null);
        }
      }
      setEditing(false);
    
  };

  const cancelEditing = () => {
    setEditing(false);
    setProfileData((prev) => ({
      ...prev,
      bio: profileDetails?.bio || "",
      userProfileFile: null,
    }));
    if (previewURL) {
      URL.revokeObjectURL(previewURL);
      setPreviewURL(null);
    }
  };

  // const updateProfileData = async () => {
  //   if (editing && (profileData.bio || profileData.userProfileFile)) {
  //     const formData = new FormData();
  //     formData.append("bio", profileData.bio);
  //     formData.append("profile-image", profileData.userProfileFile || "");
  //     const updatedProfile = await updateProfile.mutateAsync(formData);
  //     setUserData(updatedProfile);
  //     setProfileData((prevProfileData) => ({
  //       ...prevProfileData,
  //       userProfileFile: null,
  //     }));
  //   }
  //   setEditing(!editing);
  // };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <CreatePostDialog />
      <div className="flex items-center gap-8 p-4 bg-white rounded-lg shadow-sm">
        <div className="relative">
          <Avatar className="w-24 h-24 border-2 border-white shadow">
            <input
              type="file"
              id="userProfileFile"
              hidden
              onChange={handleProfileChange}
              accept="image/*"
              disabled={!editing}
            />
            <label
              htmlFor="userProfileFile"
              className={editing ? "cursor-pointer" : "cursor-default"}
            >
              <AvatarImage
                src={previewURL || profileDetails?.profile_picture || ""}
                alt={userData?.username || "Profile"}
              />
              <AvatarFallback className="text-xl">
                {userData?.username?.slice(0, 2).toUpperCase() || ""}
              </AvatarFallback>
            </label>
          </Avatar>
          {editing && (
            <label
              htmlFor="userProfileFile"
              className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full cursor-pointer shadow hover:bg-primary/90"
            >
              <Camera className="w-4 h-4" />
            </label>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">{userData?.username}</h1>
              <p className="text-sm text-gray-500">@{userData?.username}</p>
            </div>
            <div className="flex gap-3">
              {editing ? (
                <>
                  <Button
                    variant="default"
                    onClick={updateProfileData}
                    size="sm"
                    disabled={
                      updateProfile.isPending ||
                      (profileData.bio === profileDetails?.bio &&
                        !profileData.userProfileFile)
                    }
                  >
                    {updateProfile.isPending ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={cancelEditing}
                    size="sm"
                    disabled={updateProfile.isPending}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setEditing(true)}
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Share
                  </Button>
                </>
              )}
            </div>
          </div>

          {editing ? (
            <Textarea
              className="mt-2"
              placeholder="Write something about yourself..."
              value={profileData.bio}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  bio: e.target.value,
                }))
              }
              rows={2}
              disabled={updateProfile.isPending}
            />
          ) : (
            <p className="text-sm text-gray-600">
              {profileDetails?.bio || "No Bio"}
            </p>
          )}

          <div className="flex gap-6 pt-2">
            <div className="text-center">
              <p className="font-semibold">{profileDetails?.noOfPosts ?? 0}</p>
              <p className="text-xs text-gray-500">Posts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {isLoading ? (
          <FeedSkeleton />
        ) : profileDetails?.posts?.length ? (
          profileDetails.posts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center text-gray-500">No posts yet</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
