import { UserInfo } from './profile';

export interface Conversation {
  id: string;
  name?: string;
  participants: Participant[];
  messages: Message[];
}

export interface Message {
  id: string;
  content: string;
  isRead: boolean;
  conversationId?: string;
  sender: UserInfo;
  lstAttachments: Array<MessageAttachment>;
  createdAt: string;
}

export interface Participant {
  id: string;
  conversation?: Conversation;
  user: UserInfo;
}

export interface MessageAttachment {
  id: string;
  fileUrl: string;
  fileId: string;
  fileName: string;
  fileType: MessageAttachmentFileType;
}

export enum MessageAttachmentFileType {
  PNG = 'PNG',
  JPG = 'JPG',
  JPEG = 'JPEG',
  GIF = 'GIF',
  MP4 = 'MP4',
  MOV = 'MOV',
  PDF = 'PDF',
  DOC = 'DOC',
  DOCX = 'DOCX',
  XLS = 'XLS',
  XLSX = 'XLSX',
  PPT = 'PPT',
  PPTX = 'PPTX',
  TXT = 'TXT',
  ZIP = 'ZIP',
  RAR = 'RAR',
}
