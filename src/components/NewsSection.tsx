
import { useEffect, useState } from 'react';
import { Newspaper } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  source: string;
}

const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      
      try {
        // В реальном проекте здесь должен быть запрос к настоящему API
        // Создаем имитацию загрузки новостей
        setTimeout(() => {
          const mockNews: NewsItem[] = [
            {
              id: '1',
              title: 'Россия увеличивает инвестиции в возобновляемую энергетику',
              description: 'Новый пакет мер поддержки позволит вдвое увеличить мощности солнечных и ветровых электростанций к 2030 году.',
              publishedAt: '2025-05-14T15:30:00Z',
              url: '#',
              source: 'ЭкоЭнергия News'
            },
            {
              id: '2',
              title: 'Мария Зайцева представила новую технологию солнечных батарей',
              description: 'Инновационное решение повышает эффективность на 35% при снижении стоимости производства.',
              publishedAt: '2025-05-10T09:45:00Z',
              url: '#',
              source: 'Tech Innovations'
            },
            {
              id: '3',
              title: 'Микро-ветровые турбины устанавливают рекорд популярности',
              description: 'Продажи домашних ветрогенераторов выросли на 78% за первый квартал 2025 года.',
              publishedAt: '2025-05-07T14:20:00Z',
              url: '#',
              source: 'Energy Market Report'
            },
            {
              id: '4',
              title: 'Автономное энергоснабжение: новые возможности для удаленных регионов',
              description: 'Комбинированные системы солнечных и ветровых установок с накопителями энергии меняют жизнь в сельской местности.',
              publishedAt: '2025-05-02T11:15:00Z',
              url: '#',
              source: 'Rural Development'
            }
          ];
          
          setNews(mockNews);
          setIsLoading(false);
        }, 1000);
        
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить новости. Попробуйте обновить страницу.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Форматируем дату новости
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  return (
    <section id="news" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-10">
            <Newspaper className="h-8 w-8 text-eco-green mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold">Последние новости</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(index => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {news.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 transform hover:scale-[1.02] transition-transform">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{formatDate(item.publishedAt)} | {item.source}</p>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <a href={item.url} className="text-eco-green hover:text-eco-green-dark font-medium inline-flex items-center">
                    Читать дальше
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
