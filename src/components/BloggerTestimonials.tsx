
import { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Алексей Климов",
    role: "Эко-блогер, 500K+ подписчиков",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&auto=format&fit=crop",
    quote: "ЭкоЭнергия — один из самых перспективных стартапов, который я видел за последние годы. Их подход к возобновляемым источникам энергии действительно может изменить рынок.",
    stars: 5
  },
  {
    name: "Мария Зайцева",
    role: "Создательница проекта «Зелёный дом»",
    image: "https://sun9-51.userapi.com/impg/GHBN32-kd2hrMnUAOche8Uvklrkh72FwgNiH6g/N1CKxtuVrVY.jpg?size=1440x2160&quality=95&sign=63f54785248efbfe530d64e95c95f397&type=album",
    quote: "Как вы поняли, Эко-энергия - это мой pet-проект. Давайте знакомиться, я backend-разработчик и делаю всякие крутые штуки от парсеров до AI-интеграций! Не стесняйтесь писать мне в tg: @mazay_tseva",
    stars: 5
  },
  {
    name: "Дмитрий Волков",
    role: "Техноблогер, автор канала «Технологии будущего»",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
    quote: "Протестировал их солнечные панели на своём доме — эффективность превзошла все мои ожидания. Действительно работают даже в пасмурную погоду.",
    stars: 4
  }
];

const BloggerTestimonials = () => {
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

  const renderStars = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-eco-yellow text-eco-yellow-dark" />
      ));
  };

  return (
    <section 
      id="testimonials" 
      className="py-20 bg-white"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="section-reveal text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Что говорят о нас блогеры
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Известные эксперты в области экологии и технологий делятся своими впечатлениями о наших решениях
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="section-reveal bg-white rounded-lg shadow-lg p-6 border border-gray-100 transition-transform duration-300 hover:transform hover:scale-105"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-eco-green"
                />
                <div className="flex mb-3">
                  {renderStars(testimonial.stars)}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BloggerTestimonials;
