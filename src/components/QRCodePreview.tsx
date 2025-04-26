import React, { forwardRef, useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { saveAs } from 'file-saver';
import { Download, Share } from 'lucide-react';
import { QRCodeSettings } from '../types/qrcode';

interface QRCodePreviewProps {
  settings: QRCodeSettings;
}

const QRCodePreview = forwardRef<HTMLDivElement, QRCodePreviewProps>(
  ({ settings }, ref) => {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // When logo file changes, create object URL
    useEffect(() => {
      if (settings.logoFile) {
        const url = URL.createObjectURL(settings.logoFile);
        setLogoUrl(url);
        return () => URL.revokeObjectURL(url);
      } else {
        setLogoUrl(null);
      }
    }, [settings.logoFile]);

    const handleDownload = () => {
      setIsGenerating(true);
      
      const canvas = document.querySelector('canvas');
      if (!canvas) {
        setIsGenerating(false);
        return;
      }
      
      try {
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, 'qrcode.png');
          }
          setIsGenerating(false);
        });
      } catch (error) {
        console.error('Error generating QR code:', error);
        setIsGenerating(false);
      }
    };

    const copyToClipboard = () => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return;
      
      canvas.toBlob(async (blob) => {
        try {
          if (blob && navigator.clipboard && navigator.clipboard.write) {
            const item = new ClipboardItem({ 'image/png': blob });
            await navigator.clipboard.write([item]);
            alert('QR Code copied to clipboard!');
          } else {
            throw new Error('Clipboard API not supported');
          }
        } catch (error) {
          console.error('Failed to copy:', error);
          alert('Failed to copy QR Code. Please download instead.');
        }
      });
    };

    // Prepare logo image if provided
    const logoImage = logoUrl ? new Image() : null;
    if (logoImage) {
      logoImage.src = logoUrl;
    }

    return (
      <div className="flex flex-col items-center flex-1" ref={ref}>
        <div className="mb-6 p-6 bg-gray-50 rounded-lg shadow-inner flex justify-center items-center animate-fade-in" style={{ width: '400px', height: '400px' }}>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <QRCodeCanvas
              value={settings.text || 'https://example.com'}
              size={settings.size}
              fgColor={settings.fgColor}
              bgColor={settings.bgColor}
              level={settings.level}
              includeMargin={settings.includeMargin}
              imageSettings={
                logoUrl
                  ? {
                      src: logoUrl,
                      excavate: true,
                      width: settings.logoSize,
                      height: settings.logoSize,
                    }
                  : undefined
              }
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto'
              }}
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="btn btn-primary flex-1 flex items-center justify-center gap-2"
          >
            <Download size={16} />
            {isGenerating ? 'Generating...' : 'Download PNG'}
          </button>
          
          <button
            onClick={copyToClipboard}
            className="btn btn-secondary flex-1 flex items-center justify-center gap-2"
          >
            <Share size={16} />
            Copy to Clipboard
          </button>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p className="mb-2 font-medium">QR Code Details:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Size: {settings.size}x{settings.size}px</li>
            <li>Error Correction: {
              {
                'L': 'Low (7%)',
                'M': 'Medium (15%)',
                'Q': 'Quartile (25%)',
                'H': 'High (30%)'
              }[settings.level]
            }</li>
            <li>Content: {settings.text.length > 30 ? `${settings.text.substring(0, 30)}...` : settings.text}</li>
          </ul>
        </div>
      </div>
    );
  }
);

export default QRCodePreview;