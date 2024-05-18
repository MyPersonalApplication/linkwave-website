import { UserInfo } from './profile';

export interface Notification {
  id: string;
  notificationType: string;
  message: string;
  isRead: boolean;
  sender: UserInfo;
  receiverId: string;
  createdAt: Date;
}

export enum NotificationType {
  FRIEND_REQUEST = 'FRIEND_REQUEST',
  FRIEND_REQUEST_ACCEPTED = 'FRIEND_REQUEST_ACCEPTED',
  NEW_POST = 'NEW_POST',
  POST_LIKE = 'POST_LIKE',
  POST_COMMENT = 'POST_COMMENT',
  POST_COMMENT_LIKE = 'POST_COMMENT_LIKE',
  POST_COMMENT_REPLY = 'POST_COMMENT_REPLY',
}
