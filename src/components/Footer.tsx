
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold mb-4">ЭкоЭнергия</h3>
            <p className="text-gray-400 text-center md:text-left mb-4">
              Создаём экологичное будущее вместе с вами
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <p className="text-gray-400 mb-2">info@ecoenergo.ru</p>
            <p className="text-gray-400">+7 (800) 123-45-67</p>
          </div>
          
          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4">Социальные сети</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            © {currentYear} ЭкоЭнергия. Все права защищены. Автор проекта: Мария Зайцева
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
