import { Avatar, UserInfo } from './profile';

export interface FriendRequest {
  id: string;
  sender: UserRecommend;
  receiver: UserRecommend;
  createdAt: Date;
}

export interface FriendRecommend {
  user: UserRecommend;
  requestId: string;
  request: FriendRequest;
  friend: boolean;
}

export interface UserRecommend {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: Avatar;
}
