import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const apiUrl = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {

      const res = await fetch(`${apiUrl}/send-contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json();
      if (data.ok) {
        toast({
          title: "Сообщение отправлено!",
          description: "Спасибо за обращение. Мы свяжемся с вами в ближайшее время.",
        });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast({
          title: "Ошибка",
          description: data.error || 'Не удалось отправить сообщение',
          variant: 'destructive',
        });
      }
    } catch (error: unknown) {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : 'Не удалось отправить сообщение',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-white"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="section-reveal text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Связаться с нами
          </h2>
          <p className="text-lg text-gray-700">
            Оставьте свои контактные данные, они придут на почту zaytseva.m.v@yandex.ru - делитесь вашим мнением о моем пет-проекте Эко-энергия.
          </p>
        </div>

        <div className="section-reveal bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Имя
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                placeholder="Введите ваше имя"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                placeholder="example@mail.ru"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Сообщение
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent h-32 resize-none"
                placeholder="Опишите ваш запрос или вопрос"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-eco-green text-white font-medium rounded-md shadow-md hover:bg-eco-green-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green disabled:opacity-70"
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
          </form>
          
          <p className="text-sm text-gray-600 mt-4 text-center">
            Мы ответим вам в течение 1 рабочего дня
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
