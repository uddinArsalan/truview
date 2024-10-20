export interface GetPostResult {
  id: string;
  content: string;
  imageUrl: string;
  // isLiked: boolean;
  author: { username: string };
  _count: {
    likes: number;
    comments: number;
  };
}
