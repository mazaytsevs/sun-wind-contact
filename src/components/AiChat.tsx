import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const LOCAL_STORAGE_KEY = 'ai_chat_history';
const LOCAL_LIMIT = 10;
const LOCAL_COUNT_KEY = 'ai_chat_count';

const systemMessage = {
  role: 'system',
  content: `Ты AI-консультант по возобновляемой энергетике. Помогай пользователю разбираться в технологиях, продуктах и услугах компании. Не отвечай на вопросы, связанные с насилием, угрозами, дискриминацией, нарушением законов, личными данными других людей, нецензурной лексикой и оскорблениями. Если пользователь задаёт подобные вопросы — вежливо откажись отвечать. Отвечай по делу, лаконично, но если нужно — можешь писать развёрнутые ответы.`
};

const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const [localCount, setLocalCount] = useState<number>(0);

  // Загрузка истории из localStorage при первом рендере
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Восстанавливаем даты
      setMessages((parsed as Message[]).map((msg) => ({ ...msg, timestamp: new Date(msg.timestamp) })));
    } else {
      // Если истории нет — приветственное сообщение от бота
      setMessages([
        {
          id: '1',
          text: 'Здравствуйте! Я AI-консультант ЭкоЭнергии. Спрашивайте меня о наших решениях для возобновляемой энергии!',
          isBot: true,
          timestamp: new Date()
        }
      ]);
    }
    // Загружаем локальный счетчик
    const count = Number(localStorage.getItem(LOCAL_COUNT_KEY) || '0');
    setLocalCount(count);
  }, []);

  // Сохраняем историю в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    // Скроллим вниз при новом сообщении
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(LOCAL_COUNT_KEY, String(localCount));
  }, [localCount]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    if (localCount >= LOCAL_LIMIT) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + '-limit',
          text: 'Вы достигли лимита отправления сообщений виртуальному помощнику. Для экономии токенов Маша поставила это ограничение. А если вам нравится все, что здесь сделано и вы хотите сотрудничать - пишите ей в ТГ: @mazay_tseva или в linkedin: https://www.linkedin.com/in/mazaytsevs/',
          isBot: true,
          timestamp: new Date()
        }
      ]);
      setInputMessage('');
      return;
    }
    setLocalCount((c) => c + 1);

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Формируем историю для API (system + вся переписка)
      const apiMessages = [
        systemMessage,
        ...updatedMessages.map((msg) => ({
          role: msg.isBot ? 'assistant' : 'user',
          content: msg.text
        }))
      ];
      const apiUrl = import.meta.env.VITE_API_URL || '';

      const res = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });
      const data = await res.json();

      if (data.response) {
        const newBotMessage: Message = {
          id: Date.now().toString() + '-bot',
          text: data.response,
          isBot: true,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, newBotMessage]);
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Не удалось получить ответ от бота',
          variant: 'destructive',
        });
      }
    } catch (error: unknown) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Не удалось отправить сообщение. Попробуйте позже.',
        variant: 'destructive',
      });
    } finally {
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
            <div ref={chatRef} className="h-80 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-md">
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
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
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
