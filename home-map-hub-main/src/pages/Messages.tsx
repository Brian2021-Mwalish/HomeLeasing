import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Clock, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { getMessages, updateMessageStatus, deleteMessage, Message } from '@/utils/messageStorage';

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  useEffect(() => {
    // Load messages from storage on component mount
    setMessages(getMessages());
  }, []);

  const markAsRead = (messageId: string) => {
    updateMessageStatus(messageId, 'read');
    setMessages(prev => prev.map(msg =>
      msg.id === messageId ? { ...msg, status: 'read' as const } : msg
    ));
  };

  const handleDeleteMessage = (messageId: string) => {
    deleteMessage(messageId);
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    if (selectedMessage === messageId) {
      setSelectedMessage(null);
    }
  };

  const toggleReadStatus = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      const newStatus = message.status === 'read' ? 'unread' : 'read';
      updateMessageStatus(messageId, newStatus);
      setMessages(prev => prev.map(msg =>
        msg.id === messageId ? { ...msg, status: newStatus } : msg
      ));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'read':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'inquiry':
        return 'bg-blue-100 text-blue-800';
      case 'viewing':
        return 'bg-green-100 text-green-800';
      case 'info':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const unreadCount = messages.filter(msg => msg.status === 'unread').length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Messages
          </h1>
          <p className="text-muted-foreground">
            Manage your property inquiries and communications
            {unreadCount > 0 && (
              <span className="ml-2 text-orange-600 font-medium">
                ({unreadCount} unread)
              </span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Inbox ({messages.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedMessage === message.id ? 'bg-muted' : ''
                      } ${message.status === 'unread' ? 'bg-orange-50' : ''}`}
                      onClick={() => {
                        setSelectedMessage(message.id);
                        if (message.status === 'unread') {
                          markAsRead(message.id);
                        }
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusIcon(message.status)}
                            <span className="font-medium text-sm truncate">
                              {message.sender}
                            </span>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${getTypeColor(message.type)}`}
                            >
                              {message.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate mb-1">
                            {message.propertyTitle}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No messages yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Details */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">
                        {messages.find(m => m.id === selectedMessage)?.subject}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>From: {messages.find(m => m.id === selectedMessage)?.sender}</span>
                        <span>
                          {new Date(messages.find(m => m.id === selectedMessage)?.timestamp || '').toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteMessage(selectedMessage)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Property</h3>
                      <p className="text-muted-foreground">
                        {messages.find(m => m.id === selectedMessage)?.propertyTitle}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Message</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {messages.find(m => m.id === selectedMessage)?.message}
                      </p>
                    </div>

                    <Separator />

                    <div className="flex gap-3">
                      <Button>
                        Reply to {messages.find(m => m.id === selectedMessage)?.sender}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => toggleReadStatus(selectedMessage)}
                      >
                        Mark as {messages.find(m => m.id === selectedMessage)?.status === 'read' ? 'Unread' : 'Read'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Select a message</h3>
                  <p>Choose a message from the list to view its details</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Messages;
