
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный email",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Симуляция отправки на сервер
      await fetch('https://example.com/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      toast({
        title: "Успешно!",
        description: "Вы подписались на нашу рассылку",
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось оформить подписку. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-eco-blue-light">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Подпишитесь на нашу рассылку</h2>
          <p className="text-gray-600 mb-8">Получайте новости о инновациях в сфере возобновляемой энергетики и эксклюзивные предложения</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ваш email"
              className="flex-grow"
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-eco-green hover:bg-eco-green-dark"
            >
              <Mail className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Отправка...' : 'Подписаться'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
