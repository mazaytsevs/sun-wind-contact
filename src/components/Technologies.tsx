
import { useEffect, useRef } from 'react';
import { Sun, Wind, Battery, Plug } from 'lucide-react';

const techCards = [
  {
    icon: <Sun className="h-12 w-12 text-eco-green mb-4" />,
    title: 'Солнечные панели нового поколения',
    description: 'Высокоэффективные панели с КПД до 25%, работающие даже при низкой освещённости'
  },
  {
    icon: <Wind className="h-12 w-12 text-eco-green mb-4" />,
    title: 'Микро-ветровые турбины',
    description: 'Компактные решения для городской среды с минимальным уровнем шума'
  },
  {
    icon: <Battery className="h-12 w-12 text-eco-green mb-4" />,
    title: 'Умные системы накопления энергии',
    description: 'Интеллектуальные батареи с длительным сроком службы и функцией оптимизации потребления'
  },
  {
    icon: <Plug className="h-12 w-12 text-eco-green mb-4" />,
    title: 'Подключение к "зелёной" сети',
    description: 'Интеграция с общей сетью для обмена излишками произведённой энергии'
  }
];

const Technologies = () => {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section 
      id="technologies" 
      className="py-20 bg-eco-green-light"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="section-reveal text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Наши технологии
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Мы разрабатываем инновационные решения, которые меняют подход к 
            производству и потреблению энергии
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techCards.map((card, index) => (
            <div 
              key={index} 
              className="section-reveal bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:transform hover:scale-105"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                {card.icon}
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{card.title}</h3>
                <p className="text-gray-700">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
