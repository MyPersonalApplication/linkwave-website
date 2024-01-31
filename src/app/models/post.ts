import { UserInfo } from './profile';

export interface PostList {
  id: string;
  content: string;
  isLiked: boolean;
  likes: number;
  comments: number;
  shares: number;
  createdAt?: Date;
  user: UserInfo;
  media: Array<PostMedia>;
}

export interface PostMedia {
  id: string;
  url: string;
  caption: string;
  isVideo: boolean;
}
