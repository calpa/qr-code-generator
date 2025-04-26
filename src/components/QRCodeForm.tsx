import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { HexColorPicker } from 'react-colorful';
import { ImageIcon, Sliders, QrCode, Layers, Shield } from 'lucide-react';
import { QRCodeSettings } from '../types/qrcode';

interface QRCodeFormProps {
  settings: QRCodeSettings;
  onSettingsChange: (settings: Partial<QRCodeSettings>) => void;
}

const QRCodeForm: React.FC<QRCodeFormProps> = ({ settings, onSettingsChange }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onSettingsChange({ text: e.target.value });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ size: parseInt(e.target.value, 10) });
  };

  const handleErrorCorrectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSettingsChange({ level: e.target.value as 'L' | 'M' | 'Q' | 'H' });
  };

  const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ includeMargin: e.target.checked });
  };

  const handleLogoSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ logoSize: parseInt(e.target.value, 10) });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onSettingsChange({ logoFile: acceptedFiles[0] });
    }
  }, [onSettingsChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg']
    },
    maxFiles: 1
  });

  const handleRemoveLogo = () => {
    onSettingsChange({ logoFile: null });
  };

  const [showFgColorPicker, setShowFgColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);

  return (
    <form className="space-y-6">
      <div>
        <label htmlFor="text" className="form-label flex items-center gap-2">
          <QrCode size={16} />
          <span>Text or URL</span>
        </label>
        <textarea
          id="text"
          className="form-control min-h-[80px]"
          value={settings.text}
          onChange={handleTextChange}
          placeholder="Enter URL or text..."
        />
      </div>

      <div>
        <label htmlFor="size" className="form-label flex items-center gap-2">
          <Sliders size={16} />
          <span>Size: {settings.size}x{settings.size} px</span>
        </label>
        <input
          id="size"
          type="range"
          min="100"
          max="1000"
          step="10"
          value={settings.size}
          onChange={handleSizeChange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>100px</span>
          <span>1000px</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <label className="form-label flex items-center gap-2">
            <span className="h-3 w-3 bg-black rounded-full mr-1"></span>
            <span>Foreground Color</span>
          </label>
          <div className="flex items-center">
            <button
              type="button"
              className="w-10 h-10 rounded border border-gray-300"
              style={{ backgroundColor: settings.fgColor }}
              onClick={() => setShowFgColorPicker(!showFgColorPicker)}
            ></button>
            <input
              type="text"
              value={settings.fgColor}
              onChange={(e) => onSettingsChange({ fgColor: e.target.value })}
              className="form-control ml-2"
            />
          </div>
          {showFgColorPicker && (
            <div className="absolute z-10 mt-2">
              <div 
                className="fixed inset-0" 
                onClick={() => setShowFgColorPicker(false)}
              ></div>
              <div className="relative">
                <HexColorPicker
                  color={settings.fgColor}
                  onChange={(color) => onSettingsChange({ fgColor: color })}
                />
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <label className="form-label flex items-center gap-2">
            <span className="h-3 w-3 bg-white border border-gray-300 rounded-full mr-1"></span>
            <span>Background Color</span>
          </label>
          <div className="flex items-center">
            <button
              type="button"
              className="w-10 h-10 rounded border border-gray-300"
              style={{ backgroundColor: settings.bgColor }}
              onClick={() => setShowBgColorPicker(!showBgColorPicker)}
            ></button>
            <input
              type="text"
              value={settings.bgColor}
              onChange={(e) => onSettingsChange({ bgColor: e.target.value })}
              className="form-control ml-2"
            />
          </div>
          {showBgColorPicker && (
            <div className="absolute z-10 mt-2">
              <div 
                className="fixed inset-0" 
                onClick={() => setShowBgColorPicker(false)}
              ></div>
              <div className="relative">
                <HexColorPicker
                  color={settings.bgColor}
                  onChange={(color) => onSettingsChange({ bgColor: color })}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="level" className="form-label flex items-center gap-2">
          <Shield size={16} />
          <span>Error Correction Level</span>
        </label>
        <select
          id="level"
          className="form-control"
          value={settings.level}
          onChange={handleErrorCorrectionChange}
        >
          <option value="L">Low (7%)</option>
          <option value="M">Medium (15%)</option>
          <option value="Q">Quartile (25%)</option>
          <option value="H">High (30% - Recommended)</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Higher levels allow QR code to remain scannable even if partially damaged.
        </p>
      </div>

      <div className="flex items-center">
        <input
          id="includeMargin"
          type="checkbox"
          checked={settings.includeMargin}
          onChange={handleMarginChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="includeMargin" className="ml-2 block text-sm text-gray-700">
          Include white margin around QR code
        </label>
      </div>

      <div>
        <label className="form-label flex items-center gap-2">
          <ImageIcon size={16} />
          <span>Logo (Optional)</span>
        </label>
        {settings.logoFile ? (
          <div className="mt-2">
            <div className="flex items-center">
              <div className="w-16 h-16 border border-gray-300 rounded p-1 mr-3">
                <img
                  src={URL.createObjectURL(settings.logoFile)}
                  alt="Logo preview"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 truncate mb-1">
                  {settings.logoFile.name}
                </p>
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="logoSize" className="form-label">
                Logo Size: {settings.logoSize}px
              </label>
              <input
                id="logoSize"
                type="range"
                min="20"
                max="150"
                value={settings.logoSize}
                onChange={handleLogoSizeChange}
                className="w-full"
              />
            </div>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'
            }`}
          >
            <div className="space-y-1 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-500"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" {...getInputProps()} className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, SVG up to 5MB</p>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default QRCodeForm;