import { User } from "@prisma/client";
export type Directory = "profile_images" | "posts";

export interface AuthorDetails {
  username: string;
  profile_picture: string | null;
}

export interface PostCounts {
  likes: number;
  comments: number;
}

export interface CreatedPost {
  id: string;
  content: string;
  imageUrl: string;
  author: AuthorDetails;
}

export interface GetPostResult extends CreatedPost {
  isUserLiked: boolean;
  likes?: undefined;
  _count: PostCounts;
}

export interface UserProfileDetails extends User {
  noOfPosts?: number;
  _count?: undefined;
  posts: GetPostResult[] | undefined;
}

export interface AppInterface {
  userData: User | undefined;
  isLoggedIn: boolean;
  startLoader: () => string;
  markLoadingComplete: (loaderId: string) => void;
  isLoading: boolean;
}

export interface CommentsResponse {
  id : string;
  user: AuthorDetails;
  content: string;
  createdAt : Date;
}

export interface PostWithComments {
  imageUrl: string;
  content: string;
  comments: CommentsResponse[];
  author: AuthorDetails
  _count: PostCounts;
}
