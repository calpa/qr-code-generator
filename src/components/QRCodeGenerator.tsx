import React, { useState, useRef } from 'react';
import QRCodeForm from './QRCodeForm';
import QRCodePreview from './QRCodePreview';
import { QRCodeSettings } from '../types/qrcode';

const QRCodeGenerator: React.FC = () => {
  const [settings, setSettings] = useState<QRCodeSettings>({
    text: 'https://calpa.me/',
    size: 300,
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    level: 'H',
    includeMargin: true,
    logoFile: null,
    logoSize: 50,
  });

  const qrRef = useRef<HTMLDivElement>(null);

  const handleSettingsChange = (newSettings: Partial<QRCodeSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Customize Your QR Code</h2>
        <QRCodeForm settings={settings} onSettingsChange={handleSettingsChange} />
      </div>
      
      <div className="card flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Preview</h2>
        <QRCodePreview ref={qrRef} settings={settings} />
      </div>
    </div>
  );
};

export default QRCodeGenerator;