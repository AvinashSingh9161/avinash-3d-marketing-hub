import { useState, useEffect, useRef } from 'react';
import { Send, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface BotChatProps {
  onClose: () => void;
}

const FAQ_RESPONSES = {
  'hello': 'Hello! Welcome to our website! How can I help you today?',
  'hi': 'Hi there! Great to see you! What can I do for you?',
  'help': 'I\'m here to help! You can ask me about our services, contact information, or any general questions.',
  'services': 'We offer web development, design services, and digital solutions. Would you like to know more about any specific service?',
  'contact': 'You can reach us through our contact form on the website, or feel free to ask me any questions directly!',
  'about': 'We are a creative digital agency focused on delivering exceptional web experiences and innovative solutions.',
  'pricing': 'Our pricing varies based on project requirements. Please contact us for a custom quote tailored to your needs.',
  'portfolio': 'You can check out our amazing portfolio showcasing our recent projects and creative work!',
  'how are you': 'I\'m doing great, thank you for asking! I\'m excited to help you today.',
  'thank you': 'You\'re very welcome! Is there anything else I can help you with?',
  'thanks': 'My pleasure! Feel free to ask if you need anything else.',
  'bye': 'Goodbye! It was great talking with you. Have a wonderful day!',
  'goodbye': 'Take care! Don\'t hesitate to come back if you have more questions.',
};

const getResponse = (input: string): string => {
  const lowercaseInput = input.toLowerCase().trim();
  
  // Check for exact matches first
  if (FAQ_RESPONSES[lowercaseInput as keyof typeof FAQ_RESPONSES]) {
    return FAQ_RESPONSES[lowercaseInput as keyof typeof FAQ_RESPONSES];
  }
  
  // Check for partial matches
  for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
    if (lowercaseInput.includes(key)) {
      return response;
    }
  }
  
  // Default response
  return 'That\'s an interesting question! While I focus on helping with our services and general information, feel free to contact us directly for more detailed assistance.';
};

// Simple text-to-speech function (fallback)
const speakText = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    speechSynthesis.speak(utterance);
  }
};

export const BotChat = ({ onClose }: BotChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    const welcomeMessage: Message = {
      id: '1',
      text: 'Hello! 👋 Welcome! I\'m your AI assistant. I can help you with questions about our services, contact info, and general inquiries. How can I help you today?',
      isBot: true,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    
    // Speak welcome message
    if (voiceEnabled) {
      setTimeout(() => speakText(welcomeMessage.text.replace(/👋|🎉|✨/g, '')), 500);
    }
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate thinking time
    setTimeout(() => {
      const response = getResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Speak response
      if (voiceEnabled) {
        speakText(response);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const suggestedQuestions = [
    'Tell me about your services',
    'How can I contact you?',
    'Show me your portfolio',
    'What are your prices?',
  ];

  return (
    <div className="flex flex-col h-96">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className="flex items-center gap-1"
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            Voice {voiceEnabled ? 'On' : 'Off'}
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <Card className={`max-w-[80%] p-3 ${
                message.isBot 
                  ? 'bg-muted text-muted-foreground' 
                  : 'bg-primary text-primary-foreground'
              }`}>
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </Card>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <Card className="bg-muted text-muted-foreground p-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {messages.length === 1 && (
        <div className="my-4">
          <p className="text-sm text-muted-foreground mb-2">Try asking:</p>
          <div className="grid grid-cols-1 gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start text-left h-auto py-2 px-3"
                onClick={() => setInput(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          disabled={isTyping}
        />
        <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};