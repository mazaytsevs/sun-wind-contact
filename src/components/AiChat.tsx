
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Здравствуйте! Я AI-консультант ЭкоЭнергии. Спрашивайте меня о наших решениях для возобновляемой энергии!',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Симуляция отправки на сервер
      await fetch('https://example.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage })
      });
      
      // Симуляция ответа от бота
      setTimeout(() => {
        const botResponses = [
          'Наши солнечные панели имеют эффективность до 22% и срок службы 25 лет.',
          'Микро-ветровые турбины отлично подойдут для частного дома в вашей местности.',
          'Умные системы накопления энергии позволяют сохранить до 90% произведенной энергии.',
          'Мария Зайцева, один из авторов проекта, может подробнее рассказать вам о наших технологиях на консультации.',
          'Подключение к "зеленой" сети возможно в большинстве регионов России.'
        ];
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        
        const newBotMessage: Message = {
          id: Date.now().toString(),
          text: randomResponse,
          isBot: true,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, newBotMessage]);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте позже.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-chat" className="py-16 bg-eco-green-light">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Задайте вопрос нашему AI-консультанту</h2>
          <p className="text-center text-gray-600 mb-10">Получите мгновенный ответ на вопросы о наших технологиях и продуктах</p>
          
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
            <div className="h-80 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-md">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`mb-4 p-3 rounded-lg max-w-[80%] ${
                    msg.isBot 
                      ? 'bg-eco-green-light text-gray-800 mr-auto' 
                      : 'bg-eco-green text-white ml-auto'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-xs opacity-70 block mt-2">
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex space-x-2 items-center mb-4">
                  <div className="w-2 h-2 rounded-full bg-eco-green-dark animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-eco-green-dark animate-pulse delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-eco-green-dark animate-pulse delay-200"></div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Введите ваш вопрос..."
                className="flex-grow"
                disabled={isLoading}
              />
              <Button onClick={handleSendMessage} disabled={isLoading} className="bg-eco-green hover:bg-eco-green-dark">
                <MessageCircle className="mr-2 h-4 w-4" />
                Отправить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiChat;
