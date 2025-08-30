import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ChatBubble from '@/components/ChatBubble';
import { Send, Mic, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI health assistant. How can I help you today? You can ask me about nutrition, exercise, symptoms, or general health advice.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const responses = {
      'headache': "For headaches, try drinking more water, getting adequate rest, and reducing screen time. If headaches persist or are severe, please consult a healthcare professional.",
      'exercise': "I recommend starting with 30 minutes of moderate exercise 5 days a week. This could include brisk walking, swimming, or cycling. Always start slowly and gradually increase intensity.",
      'diet': "A balanced diet should include plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats. Try to limit processed foods and added sugars.",
      'sleep': "Adults should aim for 7-9 hours of quality sleep per night. Maintain a consistent sleep schedule and create a relaxing bedtime routine.",
      'stress': "To manage stress, try deep breathing exercises, meditation, regular physical activity, and maintaining social connections. Consider speaking to a counselor if stress becomes overwhelming.",
      'water': "Aim to drink 8-10 glasses of water daily. You can also get hydration from fruits, vegetables, and other beverages. Listen to your body's thirst cues.",
      'weight': "Healthy weight management involves a balanced diet and regular physical activity. Focus on gradual, sustainable changes rather than quick fixes."
    };

    const lowerMessage = userMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(responses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    const defaultResponses = [
      "That's an interesting health question! While I can provide general guidance, please remember that I'm not a replacement for professional medical advice. Could you be more specific about what you'd like to know?",
      "I'd be happy to help with that health topic! For the most accurate and personalized advice, consider consulting with a healthcare professional. What specific aspect would you like to discuss?",
      "Thanks for your question! I can offer general health information, but it's always best to consult with your doctor for personalized medical advice. How can I assist you further?",
      "That's a great health-related question! Remember that everyone's health needs are different. What particular area of health would you like to explore together?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickActions = [
    "How can I improve my sleep?",
    "What foods are good for heart health?",
    "I have a headache, what should I do?",
    "How much water should I drink daily?"
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="pb-4">
        <h1 className="text-3xl font-bold text-gray-900">AI Health Assistant</h1>
        <p className="text-muted-foreground">Get personalized health advice in your preferred language</p>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            Chat with HealthAI
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-96">
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            
            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Quick questions:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-left justify-start h-auto py-2 px-3"
                  onClick={() => setInputText(action)}
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about your health concerns..."
              className="flex-1"
            />
            <Button
              size="icon"
              variant="outline"
              className="shrink-0"
              onClick={() => {/* Voice input placeholder */}}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground mt-2 text-center">
            This AI assistant provides general health information only. Always consult healthcare professionals for medical advice.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}