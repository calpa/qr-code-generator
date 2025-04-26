import React from 'react';
import { QrCode } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <QrCode className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">QR Code Generator</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                GitHub
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Help
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;