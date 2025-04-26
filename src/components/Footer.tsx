import React from 'react';
import { Github, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              &copy; {year} QR Code Generator. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 text-gray-600">
            <a 
              href="#" 
              className="hover:text-blue-600 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="#" 
              className="hover:text-blue-600 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <div className="flex items-center text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 mx-1" />
              <span>using React</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;