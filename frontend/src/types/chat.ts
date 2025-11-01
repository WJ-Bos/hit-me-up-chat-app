export interface Message {
    id: number;
    content: string;
    senderId: number;
    recipientId: number;
    timestamp: string;
    read: boolean;
}

export interface Conversation {
    id: number;
    userId: number;
    username: string;
    firstName?: string;
    lastName?: string;
    lastMessage?: string;
    lastMessageTime?: string;
    unreadCount: number;
    online: boolean;
}

export interface ChatUser {
    id: number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    online: boolean;
}