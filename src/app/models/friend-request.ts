import { UserInfo } from './profile';

export interface FriendRequest {
  id: string;
  sender: UserInfo;
  createdAt: Date;
}
