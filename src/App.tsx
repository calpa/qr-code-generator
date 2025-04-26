import React from 'react';
import Header from './components/Header';
import QRCodeGenerator from './components/QRCodeGenerator';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 font-inter">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
        <QRCodeGenerator />
      </main>
      <Footer />
    </div>
  );
}

export default App;