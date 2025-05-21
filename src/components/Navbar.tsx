
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-sm shadow-sm py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="text-eco-green-dark font-bold text-xl md:text-2xl">
              ЭкоЭнергия
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#mission" 
              className="text-gray-700 hover:text-eco-green transition-colors"
            >
              О нас
            </a>
            <a 
              href="#technologies" 
              className="text-gray-700 hover:text-eco-green transition-colors"
            >
              Технологии
            </a>
            <a 
              href="#contact" 
              className="px-5 py-2 bg-eco-green text-white rounded-md hover:bg-eco-green-dark transition-colors"
            >
              Связаться
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
            <nav className="flex flex-col space-y-4 px-4">
              <a 
                href="#mission" 
                className="text-gray-700 hover:text-eco-green transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                О нас
              </a>
              <a 
                href="#technologies" 
                className="text-gray-700 hover:text-eco-green transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Технологии
              </a>
              <a 
                href="#contact" 
                className="px-5 py-2 bg-eco-green text-white rounded-md hover:bg-eco-green-dark transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Связаться
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
