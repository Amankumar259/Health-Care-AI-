import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatBubble({ message, isUser, timestamp }: ChatBubbleProps) {
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8 bg-blue-100">
          <AvatarFallback>
            <Bot className="h-4 w-4 text-blue-600" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
        isUser 
          ? "bg-blue-600 text-white rounded-br-none" 
          : "bg-gray-100 text-gray-900 rounded-bl-none"
      )}>
        <p className="text-sm">{message}</p>
        <p className={cn(
          "text-xs mt-1",
          isUser ? "text-blue-100" : "text-gray-500"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 bg-blue-600">
          <AvatarFallback>
            <User className="h-4 w-4 text-white" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}