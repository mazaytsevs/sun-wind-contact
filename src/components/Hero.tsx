
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-gradient min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Энергия будущего уже сегодня
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Мы создаём доступные и экологичные решения на основе солнца и ветра
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-eco-green rounded-md text-white font-medium shadow-lg hover:bg-eco-green-dark transition-colors"
            >
              Связаться с нами
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
          <div className="hidden lg:block animate-slide-up">
            <img
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1504&q=80"
              alt="Возобновляемая энергия"
              className="rounded-lg shadow-2xl max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
