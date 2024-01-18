import { UserInfo } from './profile';

export interface Notification {
  id: string;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  sender: UserInfo;
}
