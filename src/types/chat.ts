
export interface SupportConversation {
  id: string;
  title: string;
  user_id: string;
  status: 'open' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface SupportMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_admin: boolean;
  read: boolean;
  sender?: {
    id: string;
    first_name?: string;
    last_name?: string;
    role?: string;
  };
}

export interface ChatBubbleProps {}
