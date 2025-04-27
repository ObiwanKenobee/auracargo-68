
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { SupportConversation, SupportMessage } from "@/types/chat";
import { 
  fetchRecentConversation, 
  fetchMessages, 
  sendSupportMessage,
  createNewConversation,
  markMessagesAsRead 
} from "@/api/chat";

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [recentMessages, setRecentMessages] = useState<SupportMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeConversation, setActiveConversation] = useState<SupportConversation | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && user) {
      fetchRecentConversation(user.id).then(conversation => {
        if (conversation) {
          setActiveConversation(conversation);
          getMessages(conversation.id);
        } else {
          setRecentMessages([]);
        }
        setIsLoading(false);
      });
    }
  }, [isOpen, user]);

  useEffect(() => {
    scrollToBottom();
  }, [recentMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getMessages = async (conversationId: string) => {
    setIsLoading(true);
    try {
      const messages = await fetchMessages(conversationId);
      setRecentMessages(messages);
      await markMessagesAsRead(conversationId, false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load messages",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !user) return;
    
    if (!activeConversation) {
      await handleCreateNewConversation();
      return;
    }
    
    setIsSending(true);
    
    try {
      await sendSupportMessage(activeConversation.id, user.id, message);
      setMessage("");
      
      // Refresh messages
      await getMessages(activeConversation.id);
      
      toast({
        variant: "success",
        title: "Message sent",
        description: "Your message has been delivered",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error sending message",
        description: error.message,
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleCreateNewConversation = async () => {
    if (!user || !message.trim()) return;
    
    setIsSending(true);
    
    try {
      const newConversation = await createNewConversation(user.id, message);
      
      if (newConversation) {
        setActiveConversation(newConversation);
        setMessage("");
        await getMessages(newConversation.id);
        
        toast({
          variant: "info",
          title: "Conversation started",
          description: "We'll respond to your message soon",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error creating conversation",
        description: error.message,
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleNavigateToSupport = () => {
    setIsOpen(false);
    navigate('/support');
  };

  if (!user) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-kargon-red text-white rounded-full p-4 shadow-lg hover:bg-kargon-red/90 transition-colors"
          aria-label="Open support chat"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageSquare className="h-6 w-6" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 shadow-xl transition-all animate-scale-in">
          <Card className="w-full border border-gray-200 backdrop-blur-sm bg-white/90 rounded-xl">
            <CardHeader className="bg-kargon-red text-white rounded-t-xl p-4 flex flex-row justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Customer Support
              </CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-kargon-red/80" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            <CardContent className="p-0">
              <ScrollArea className="h-64 p-4">
                {isLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-kargon-red" />
                  </div>
                ) : recentMessages.length > 0 ? (
                  <div className="space-y-4">
                    {recentMessages.map((msg) => {
                      const isCustomer = !msg.is_admin;
                      return (
                        <div 
                          key={msg.id} 
                          className={`flex ${isCustomer ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-3 ${
                              isCustomer 
                                ? 'bg-kargon-red text-white' 
                                : 'bg-gray-100/90 backdrop-blur-sm text-gray-800'
                            }`}
                          >
                            <div className="break-words text-sm">
                              {msg.content}
                            </div>
                            <div className="text-xs mt-1 opacity-70">
                              {format(new Date(msg.created_at), 'h:mm a')}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <p className="text-muted-foreground text-sm mb-2">
                      Welcome to customer support!
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Send a message to start a conversation with our team.
                    </p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
            
            <CardFooter className="border-t p-3">
              <form onSubmit={handleSendMessage} className="w-full flex flex-col gap-2">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    disabled={isSending}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    disabled={!message.trim() || isSending}
                    className="bg-kargon-red hover:bg-kargon-red/90"
                  >
                    {isSending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  type="button" 
                  size="sm" 
                  className="text-xs"
                  onClick={handleNavigateToSupport}
                >
                  View all support tickets
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBubble;
