
import { useEffect, useRef } from 'react';

const Mission = () => {
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
      id="mission" 
      className="py-20 bg-white"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="section-reveal grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1473773508845-188df298d2d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
              alt="Природа и экология"
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Наша миссия
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Наша цель — обеспечить устойчивое будущее, снижая зависимость от ископаемых ресурсов 
              и внедряя технологии чистой энергии в повседневную жизнь. Мы верим, что каждый дом и 
              бизнес может стать частью экологичного мира.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Разрабатывая инновационные технологии, мы стремимся сделать возобновляемые источники 
              энергии более доступными и эффективными для всех. Наша команда экспертов работает над 
              созданием решений, которые помогут сохранить планету для будущих поколений.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
