
import { supabase } from "@/integrations/supabase/client";
import { SupportConversation, SupportMessage } from "@/types/chat";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

// Since we don't have the actual tables, we'll use messages table as a proxy
// and store structured data in the content field to simulate our chat system

export async function fetchRecentConversation(userId: string) {
  try {
    // We'll use the messages table to store conversations
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('sender_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (error) throw error;
    
    // Convert to our expected format
    if (data && data.length > 0) {
      // Use message thread_id as our conversation ID
      const conversation: SupportConversation = {
        id: data[0].thread_id,
        title: 'Quick Support Chat',
        user_id: userId,
        status: 'open',
        created_at: data[0].created_at,
        updated_at: data[0].created_at
      };
      
      return conversation;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return null;
  }
}

export async function fetchMessages(conversationId: string) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:sender_id(
          id,
          name
        )
      `)
      .eq('thread_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    
    // Convert to our expected format
    const messages: SupportMessage[] = data?.map(msg => ({
      id: msg.id,
      conversation_id: msg.thread_id,
      sender_id: msg.sender_id,
      content: msg.content,
      created_at: msg.created_at,
      is_admin: msg.sender?.role === 'admin',
      read: msg.read || false,
      sender: {
        id: msg.sender?.id,
        first_name: msg.sender?.name?.split(' ')[0],
        last_name: msg.sender?.name?.split(' ')[1] || '',
        role: msg.sender?.role
      }
    })) || [];
    
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

export async function sendSupportMessage(conversationId: string, userId: string, content: string) {
  try {
    const { error } = await supabase
      .from('messages')
      .insert({
        thread_id: conversationId,
        sender_id: userId,
        content: content
      });
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
}

export async function createNewConversation(userId: string, message: string) {
  try {
    const conversationId = uuidv4();
    
    const { error } = await supabase
      .from('messages')
      .insert({
        thread_id: conversationId,
        sender_id: userId,
        content: message
      });
      
    if (error) throw error;
    
    const conversation: SupportConversation = {
      id: conversationId,
      title: 'Quick Support Chat',
      user_id: userId,
      status: 'open',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    return conversation;
  } catch (error) {
    console.error('Error creating conversation:', error);
    return null;
  }
}

export async function markMessagesAsRead(conversationId: string, isAdmin: boolean) {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('thread_id', conversationId)
      .eq('read', false);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return false;
  }
}
