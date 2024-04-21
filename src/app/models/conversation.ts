import { UserInfo } from './profile';

export interface Conversation {
  id: string;
  name?: string;
  messages: Message[];
}

export interface Message {
  id: string;
  content: string;
  isRead: boolean;
  conversation?: Conversation;
  sender: UserInfo;
  createdAt: string;
}
