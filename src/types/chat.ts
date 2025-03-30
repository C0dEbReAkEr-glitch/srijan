export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  roomId: string;
  isSystem?: boolean;
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  createdBy: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}