import { UserInfo } from './profile';

export interface Post {
  id: string;
  content: string;
  user: UserInfo;
  lstMedia: Array<PostMedia>;
  lstLikes: Array<PostLike>;
  lstComments: Array<PostComment>;
  createdAt: Date;
}

export interface PostMedia {
  id: string;
  mediaUrl: string;
  mediaId: string;
  isVideo: boolean;
}

export interface PostLike {
  id: string;
  user: UserInfo;
}

export interface PostComment {
  id: string;
  content: string;
  postId: string;
  user: UserInfo;
  lstReplyComments: Array<ReplyComment>;
  createdAt: Date;
}

export interface ReplyComment {
  id: string;
  content: string;
  postCommentId: string;
  user: UserInfo;
  createdAt: Date;
}
