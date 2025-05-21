
import { useEffect, useRef, useState } from 'react';
import { Sun } from 'lucide-react';

const SunGame = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [sunPosition, setSunPosition] = useState({ x: 50, y: 100 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("Управляйте солнцем с помощью мыши");
  const [score, setScore] = useState(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current || !isPlaying) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = 100 - Math.min(90, Math.max(10, ((e.clientY - rect.top) / rect.height) * 100));
    
    setSunPosition({ x, y });
    
    // Increase score when the sun is high in the sky (y > 70)
    if (y > 70 && isPlaying) {
      setScore(prev => prev + 1);
    }
  };
  
  const startGame = () => {
    setIsPlaying(true);
    setMessage("Поднимите солнце высоко в небо!");
    setScore(0);
    setSunPosition({ x: 50, y: 20 });
    
    // End game after 30 seconds
    setTimeout(() => {
      setIsPlaying(false);
      setMessage(`Игра окончена! Ваш результат: ${score} энергии`);
    }, 30000);
  };
  
  return (
    <section id="sun-game" className="py-16 bg-gradient-to-b from-eco-yellow-light to-eco-green-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            Мини-игра "Солнечная Энергия"
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-4">
            {message}
          </p>
          {!isPlaying && (
            <button 
              onClick={startGame}
              className="px-6 py-3 bg-eco-green text-white font-medium rounded-md shadow-md hover:bg-eco-green-dark transition-colors"
            >
              {score > 0 ? "Играть снова" : "Начать игру"}
            </button>
          )}
          {isPlaying && (
            <div className="flex justify-center items-center">
              <div className="bg-eco-green text-white px-4 py-2 rounded-full">
                Собрано энергии: {score}
              </div>
            </div>
          )}
        </div>
        
        <div 
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          className="relative w-full h-64 md:h-80 bg-gradient-to-b from-eco-blue via-eco-blue-light to-eco-green-light rounded-lg overflow-hidden border border-eco-green shadow-xl mx-auto max-w-4xl cursor-pointer"
        >
          {/* Horizon/landscape */}
          <div className="absolute bottom-0 w-full h-1/4 bg-eco-green rounded-t-full" style={{
            borderTopLeftRadius: '100%',
            borderTopRightRadius: '100%',
            transform: 'scale(1.5)',
            bottom: '-5%'
          }}></div>
          
          {/* Trees */}
          <div className="absolute bottom-[23%] left-[15%] w-8 h-16 bg-eco-green-dark rounded-full"></div>
          <div className="absolute bottom-[23%] left-[25%] w-6 h-12 bg-eco-green-dark rounded-full"></div>
          <div className="absolute bottom-[23%] right-[20%] w-7 h-14 bg-eco-green-dark rounded-full"></div>
          <div className="absolute bottom-[23%] right-[10%] w-5 h-10 bg-eco-green-dark rounded-full"></div>
          
          {/* Sun */}
          <div 
            className="absolute transition-all duration-100 flex items-center justify-center"
            style={{ 
              left: `${sunPosition.x}%`, 
              bottom: `${sunPosition.y}%`,
              transform: 'translate(-50%, 50%)'
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-eco-yellow rounded-full opacity-30 animate-pulse" style={{
                width: '65px',
                height: '65px',
              }}></div>
              <Sun size={50} className="text-eco-yellow-dark fill-eco-yellow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SunGame;
