import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Send, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { saveMessage } from '@/utils/messageStorage';

interface MessageModalProps {
  propertyId: string;
  propertyTitle: string;
  landlordName?: string;
  trigger?: React.ReactNode;
}

const messageTemplates = {
  interest: "Hi, I'm interested in this property and would like to know more details.",
  viewing: "Hello, I'd like to schedule a viewing for this property. Please let me know the available times.",
  info: "Hi, could you provide more information about this property, such as utilities included or pet policy?",
  offer: "Hello, I'm interested in making an offer on this property. Can we discuss pricing?",
};

const MessageModal = ({ propertyId, propertyTitle, landlordName = "Landlord", trigger }: MessageModalProps) => {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const { toast } = useToast();

  const handleTemplateSelect = (templateKey: string) => {
    setSelectedTemplate(templateKey);
    setSubject(`Regarding: ${propertyTitle}`);
    setMessage(messageTemplates[templateKey as keyof typeof messageTemplates]);
  };

  const handleSendMessage = () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both subject and message.",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending message
    console.log('Sending message:', {
      propertyId,
      propertyTitle,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    toast({
      title: "Message Sent!",
      description: "Your message has been sent to the landlord. They'll get back to you soon.",
    });

    // Reset form
    setSubject('');
    setMessage('');
    setSelectedTemplate('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="lg" className="w-full">
            <MessageSquare className="h-4 w-4 mr-2" />
            Message Landlord
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Message {landlordName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Unique Feature: Quick Templates */}
          <div>
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-primary" />
              Quick Message Templates (Unique Feature)
            </Label>
            <Select onValueChange={handleTemplateSelect}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Choose a template to get started" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interest">Express Interest</SelectItem>
                <SelectItem value="viewing">Request Viewing</SelectItem>
                <SelectItem value="info">Ask for More Info</SelectItem>
                <SelectItem value="offer">Make an Offer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter message subject"
            />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={4}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Property: {propertyTitle} (ID: {propertyId})
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSendMessage} className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
