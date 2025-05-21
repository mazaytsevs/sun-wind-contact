
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface QA {
  question: string;
  answer: string;
}

const AiProductSupport = () => {
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qaList, setQaList] = useState<QA[]>([]);
  const [showAllQA, setShowAllQA] = useState(false);
  
  // Предустановленные вопросы-ответы
  const commonQuestions: QA[] = [
    {
      question: 'Сколько служат солнечные панели?',
      answer: 'Наши солнечные панели рассчитаны на срок службы 25-30 лет с постепенным снижением эффективности. Мы предоставляем гарантию производителя на 12 лет и гарантию производительности на 25 лет.'
    },
    {
      question: 'Как установить микро-ветровую турбину?',
      answer: 'Установка микро-ветровой турбины требует анализа вашего участка на предмет розы ветров и выбора оптимального места. Наша команда проводит предварительное обследование, после чего специалисты устанавливают турбину и подключают её к системе энергоснабжения дома.'
    },
    {
      question: 'Можно ли использовать ваши решения в городской квартире?',
      answer: 'Да, для городских квартир мы предлагаем компактные решения, такие как оконные солнечные панели и балконные микро-ветровые турбины. Они не требуют специального разрешения и могут быть установлены без вмешательства в конструкцию здания.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Симуляция отправки на сервер
      await fetch('https://example.com/api/product-support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });

      // Подготовим ответы на основе ключевых слов
      let answer = 'К сожалению, у нас пока нет точной информации по этому вопросу. Пожалуйста, свяжитесь с нами по телефону для получения подробной консультации.';
      
      if (question.toLowerCase().includes('цена') || question.toLowerCase().includes('стоимость') || question.toLowerCase().includes('сколько стоит')) {
        answer = 'Стоимость наших решений зависит от конкретных параметров вашего дома или бизнеса. Солнечные панели стартуют от 15 000 рублей за панель, микро-ветровые турбины от 45 000 рублей, а системы накопления от 60 000 рублей. Для получения точного расчета мы рекомендуем забронировать бесплатную консультацию.';
      } else if (question.toLowerCase().includes('долго') || question.toLowerCase().includes('срок') || question.toLowerCase().includes('время')) {
        answer = 'Установка наших решений занимает от 1 до 3 дней в зависимости от сложности проекта. Срок поставки оборудования составляет 2-4 недели с момента заключения договора.';
      } else if (question.toLowerCase().includes('зима') || question.toLowerCase().includes('мороз') || question.toLowerCase().includes('холод')) {
        answer = 'Наши решения адаптированы для российского климата. Солнечные панели эффективно работают даже в зимний период, а микро-ветровые турбины специально разработаны для низких температур до -40°C.';
      } else if (question.toLowerCase().includes('зайцева') || question.toLowerCase().includes('мария')) {
        answer = 'Мария Зайцева является одним из ключевых разработчиков наших технологий и специалистом по эффективности возобновляемых источников энергии. Она регулярно проводит консультации для клиентов по внедрению инновационных энергетических решений.';
      }
      
      // Добавляем новый вопрос-ответ в список
      setQaList(prev => [...prev, { question: question, answer }]);
      
      // Сбрасываем поле ввода
      setQuestion('');
      
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обработать ваш вопрос. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Определяем, какие вопросы-ответы показывать
  const displayQA = showAllQA 
    ? [...commonQuestions, ...qaList]
    : qaList.length > 0 
      ? qaList 
      : commonQuestions.slice(0, 1);

  return (
    <section id="product-support" className="py-16 bg-eco-yellow-light">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Часто задаваемые вопросы</h2>
          <p className="text-center text-gray-600 mb-10">
            Получите ответы на вопросы о наших продуктах и технологиях от AI-консультанта
          </p>

          <form onSubmit={handleSubmit} className="mb-8 flex flex-col sm:flex-row gap-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Задайте вопрос о наших продуктах..."
              className="flex-grow"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-eco-yellow hover:bg-eco-yellow-dark text-gray-800"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Обработка...' : 'Задать вопрос'}
            </Button>
          </form>

          <div className="space-y-6">
            {displayQA.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>

          {(commonQuestions.length > 1 || qaList.length > 0) && (
            <div className="mt-6 text-center">
              <Button 
                variant="outline" 
                onClick={() => setShowAllQA(!showAllQA)}
                className="text-eco-green hover:text-eco-green-dark border-eco-green hover:border-eco-green-dark"
              >
                {showAllQA ? 'Показать меньше вопросов' : 'Показать больше вопросов'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AiProductSupport;
