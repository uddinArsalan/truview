export interface CreatedPost {
  id: string;
  content: string;
  imageUrl: string;
  author: { username: string };
}

export interface GetPostResult extends CreatedPost {
  _count: {
    likes: number;
    comments: number;
  };
}

export type Directory =  'profile_images' | 'posts'