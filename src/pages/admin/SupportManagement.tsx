
import { useState, useEffect, useRef } from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Send, 
  Search,
  Loader2,
  User,
  MessageSquare,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { format, formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { api } from "@/api/core"; // Use our api utility
import { mockData } from "@/utils/mockData"; // Import mock data

const SupportManagement = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [filteredConversations, setFilteredConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showConversationList, setShowConversationList] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchConversations();

    // Mock the realtime subscription
    const mockSubscriptionInterval = setInterval(() => {
      console.log('Admin checking for support conversation updates...');
    }, 10000);

    return () => {
      clearInterval(mockSubscriptionInterval);
    };
  }, []);

  useEffect(() => {
    applyFilters();
  }, [conversations, searchQuery, statusFilter]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);

      // Mock the realtime subscription for messages
      const mockMessagesInterval = setInterval(() => {
        console.log(`Admin checking for messages in conversation ${selectedConversation.id}...`);
      }, 5000);

      return () => {
        clearInterval(mockMessagesInterval);
      };
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      setIsLoadingConversations(true);
      
      // Use mock data
      // In a real application, this would be a Supabase call
      setTimeout(() => {
        // Generate 5 mock conversations with random users
        const mockConversations = [];
        for (let i = 0; i < 5; i++) {
          const userId = `user_${Math.random().toString(36).substring(2, 9)}`;
          const mockConvs = mockData.generateMockSupportConversations(userId, 1);
          mockConvs.forEach(conv => {
            // Add user information that would come from a join
            conv.user = {
              id: userId,
              first_name: mockData.getRandomName().split(' ')[0],
              last_name: mockData.getRandomName().split(' ')[1],
              email: `user${Math.floor(Math.random() * 1000)}@example.com`,
            };
          });
          mockConversations.push(...mockConvs);
        }
        
        setConversations(mockConversations);
        
        if (mockConversations?.length && !selectedConversation) {
          setSelectedConversation(mockConversations[0]);
        }
        setIsLoadingConversations(false);
      }, 800);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error loading conversations",
        description: error.message,
      });
      setIsLoadingConversations(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      setIsLoadingMessages(true);
      
      // Use mock data
      setTimeout(() => {
        const mockMessages = mockData.generateMockSupportMessages(
          conversationId, 
          selectedConversation.user_id, 
          5 // Generate 5 mock messages
        );
        
        setMessages(mockMessages);
        setIsLoadingMessages(false);
        
        markMessagesAsRead(conversationId);
      }, 500);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error loading messages",
        description: error.message,
      });
      setIsLoadingMessages(false);
    }
  };

  const markMessagesAsRead = async (conversationId: string) => {
    try {
      // In a real app, we would update the read status in the database
      console.log(`Admin marked messages as read in conversation ${conversationId}`);
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation) return;
    
    try {
      setIsSendingMessage(true);
      
      // Simulate sending a message
      setTimeout(() => {
        const newMsg = {
          id: `msg_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: selectedConversation.id,
          sender_id: user?.id || 'admin_user',
          content: newMessage,
          is_admin: true,
          created_at: new Date().toISOString(),
          sender: {
            id: user?.id || 'admin_user',
            first_name: 'Support',
            last_name: 'Agent',
            email: user?.email || 'admin@example.com',
            role: 'admin'
          }
        };
        
        setMessages(prev => [...prev, newMsg]);
        setNewMessage("");
        setIsSendingMessage(false);
        
        // Simulate updating the conversation's updated_at time
        setConversations(prev => 
          prev.map(conv => 
            conv.id === selectedConversation.id 
              ? {...conv, updated_at: new Date().toISOString()} 
              : conv
          )
        );
        
        toast({
          title: "Message sent",
          description: "Your response has been sent to the customer."
        });
        
        scrollToBottom();
      }, 500);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error sending message",
        description: error.message,
      });
      setIsSendingMessage(false);
    }
  };

  const closeConversation = async () => {
    if (!selectedConversation) return;
    
    try {
      // Simulate closing a conversation
      setSelectedConversation({
        ...selectedConversation,
        status: 'closed'
      });
      
      // Update in the conversations list
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation.id 
            ? {...conv, status: 'closed'} 
            : conv
        )
      );
      
      toast({
        title: "Ticket closed",
        description: "The support ticket has been marked as closed.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error closing ticket",
        description: error.message,
      });
    }
  };

  const reopenConversation = async () => {
    if (!selectedConversation) return;
    
    try {
      // Simulate reopening a conversation
      setSelectedConversation({
        ...selectedConversation,
        status: 'open'
      });
      
      // Update in the conversations list
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation.id 
            ? {...conv, status: 'open'} 
            : conv
        )
      );
      
      toast({
        title: "Ticket reopened",
        description: "The support ticket has been reopened.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error reopening ticket",
        description: error.message,
      });
    }
  };

  const handleSelectConversation = (conversation: any) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setShowConversationList(false);
    }
  };

  const handleBackToList = () => {
    setShowConversationList(true);
  };

  const applyFilters = () => {
    let filtered = [...conversations];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        conversation => 
          conversation.title.toLowerCase().includes(query) ||
          conversation.user?.email?.toLowerCase().includes(query) ||
          `${conversation.user?.first_name || ''} ${conversation.user?.last_name || ''}`.toLowerCase().includes(query)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(conversation => conversation.status === statusFilter);
    }
    
    setFilteredConversations(filtered);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Support Tickets</h1>
        <p className="text-muted-foreground">
          Manage and respond to customer support tickets
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 h-full">
        {(!isMobile || (isMobile && showConversationList)) && (
          <div className="md:col-span-1">
            <Card className="h-full flex flex-col shadow-sm">
              <CardHeader className="p-3 pb-2">
                <CardTitle className="text-lg">Tickets</CardTitle>
                <div className="relative mt-2">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search tickets..." 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Tabs 
                  defaultValue="all" 
                  value={statusFilter}
                  onValueChange={setStatusFilter} 
                  className="mt-2"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="open">Open</TabsTrigger>
                    <TabsTrigger value="closed">Closed</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0">
                {isLoadingConversations ? (
                  <div className="flex justify-center items-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : filteredConversations.length > 0 ? (
                  <ScrollArea className="h-[calc(100vh-350px)] md:h-[calc(100vh-300px)]">
                    <div className="space-y-2 p-3">
                      {filteredConversations.map((conversation) => {
                        const userName = `${conversation.user?.first_name || ''} ${conversation.user?.last_name || ''}`.trim();
                        return (
                          <div 
                            key={conversation.id}
                            onClick={() => handleSelectConversation(conversation)}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedConversation?.id === conversation.id 
                                ? 'border-primary bg-primary/5' 
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1 truncate">
                                <div className="font-medium truncate">{conversation.title}</div>
                                <div className="text-sm text-muted-foreground flex items-center gap-1 truncate">
                                  <User className="h-3 w-3 flex-shrink-0" />
                                  <span className="truncate">{userName || conversation.user?.email || 'Guest User'}</span>
                                </div>
                              </div>
                              <Badge variant={conversation.status === 'open' ? "default" : "secondary"} className="ml-2 flex-shrink-0">
                                {conversation.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                {conversation.message_count?.[0]?.count || 0}
                              </div>
                              <div>
                                {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No tickets found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
        
        {(!isMobile || (isMobile && !showConversationList)) && (
          <div className="md:col-span-2">
            <Card className="h-full flex flex-col shadow-sm">
              {selectedConversation ? (
                <>
                  <CardHeader className="border-b pb-3 p-3">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        {isMobile && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={handleBackToList}
                            className="mr-1"
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </Button>
                        )}
                        <div>
                          <CardTitle className="text-lg">{selectedConversation.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1 flex-wrap">
                            <span>Ticket #{selectedConversation.id.split('-')[0]}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              {selectedConversation.status === 'open' ? (
                                <>
                                  <Clock className="h-3 w-3 text-orange-500" /> Open
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-3 w-3 text-green-500" /> Closed
                                </>
                              )}
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                      <div>
                        {selectedConversation.status === 'open' ? (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={closeConversation}
                          >
                            Close Ticket
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={reopenConversation}
                          >
                            Reopen Ticket
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 p-2 bg-muted rounded-md">
                      <p className="text-sm font-medium">Customer Information</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1 text-sm">
                        <div className="truncate">
                          <span className="text-muted-foreground">Name:</span> {
                            `${selectedConversation.user?.first_name || ''} ${selectedConversation.user?.last_name || ''}`.trim() || 'Guest User'
                          }
                        </div>
                        <div className="truncate">
                          <span className="text-muted-foreground">Email:</span> {selectedConversation.user?.email || selectedConversation.guest_email || 'N/A'}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Created:</span> {
                            format(new Date(selectedConversation.created_at), 'MMM d, yyyy h:mm a')
                          }
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Updated:</span> {
                            format(new Date(selectedConversation.updated_at), 'MMM d, yyyy h:mm a')
                          }
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 overflow-hidden p-0">
                    {isLoadingMessages ? (
                      <div className="flex justify-center items-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : (
                      <ScrollArea className="h-[calc(100vh-380px)] md:h-[calc(100vh-330px)] p-3">
                        {messages.length > 0 ? (
                          <div className="space-y-3">
                            {messages.map((message) => {
                              const isAdmin = message.is_admin;
                              const senderName = isAdmin 
                                ? `Support Agent (${message.sender?.first_name || ''} ${message.sender?.last_name || ''})`
                                : `${message.sender?.first_name || ''} ${message.sender?.last_name || ''}`;
                                
                              return (
                                <div 
                                  key={message.id} 
                                  className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}
                                >
                                  <div 
                                    className={`max-w-[90%] md:max-w-[80%] rounded-lg p-3 ${
                                      isAdmin 
                                        ? 'bg-kargon-red text-white' 
                                        : 'bg-muted'
                                    }`}
                                  >
                                    <div className="text-sm font-medium mb-1">
                                      {message.sender ? senderName : 'Guest User'}
                                    </div>
                                    <div className="break-words">{message.content}</div>
                                    <div className="text-xs mt-1 opacity-70">
                                      {format(new Date(message.created_at), 'MMM d, h:mm a')}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                            <div ref={messagesEndRef} />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-center p-4">
                            <MessageSquare className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-muted-foreground">No messages in this conversation</p>
                          </div>
                        )}
                      </ScrollArea>
                    )}
                  </CardContent>
                  
                  <CardFooter className="border-t p-3">
                    <form onSubmit={sendMessage} className="w-full flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your response..."
                        disabled={isSendingMessage || selectedConversation.status === 'closed'}
                        className="flex-1"
                      />
                      <Button 
                        type="submit" 
                        className="bg-kargon-red hover:bg-kargon-red/90"
                        disabled={!newMessage.trim() || isSendingMessage || selectedConversation.status === 'closed'}
                      >
                        {isSendingMessage ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </form>
                  </CardFooter>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Conversation Selected</h3>
                  <p className="text-muted-foreground max-w-md">
                    Select a conversation from the list to view messages and respond to customer inquiries.
                  </p>
                  {isMobile && (
                    <Button 
                      variant="outline" 
                      className="mt-4" 
                      onClick={handleBackToList}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to ticket list
                    </Button>
                  )}
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportManagement;
