// Simple message storage utility using localStorage
export interface Message {
  id: string;
  propertyId: string;
  propertyTitle: string;
  subject: string;
  message: string;
  sender: string;
  timestamp: string;
  status: 'unread' | 'read';
  type: 'inquiry' | 'viewing' | 'info' | 'offer';
}

const MESSAGES_KEY = 'homeleasing_messages';

export const getMessages = (): Message[] => {
  try {
    const stored = localStorage.getItem(MESSAGES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveMessage = (message: Omit<Message, 'id' | 'timestamp' | 'status'>): Message => {
  const messages = getMessages();
  const newMessage: Message = {
    ...message,
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    status: 'unread',
  };

  messages.unshift(newMessage); // Add to beginning
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  return newMessage;
};

export const updateMessageStatus = (messageId: string, status: 'read' | 'unread'): void => {
  const messages = getMessages();
  const updatedMessages = messages.map(msg =>
    msg.id === messageId ? { ...msg, status } : msg
  );
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(updatedMessages));
};

export const deleteMessage = (messageId: string): void => {
  const messages = getMessages();
  const filteredMessages = messages.filter(msg => msg.id !== messageId);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(filteredMessages));
};
