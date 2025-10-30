import React, { useRef } from 'react';
import type { Language } from '../types';
import { t } from '../utils/translations';

interface ImageUploaderProps {
  onDiagnose: (file: File) => void;
  language: Language;
}

const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const GalleryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onDiagnose, language }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onDiagnose(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('uploadTitle', language)}</h2>
      <p className="text-gray-600 mb-6">{t('uploadSubtitle', language)}</p>
      
      <div className="space-y-4">
        {/* This input uses the 'capture' attribute to trigger the device camera, which is the standard way to implement this feature. */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={cameraInputRef}
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
        <button onClick={() => cameraInputRef.current?.click()} className="w-full flex items-center justify-center bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 duration-300 shadow-md">
          <CameraIcon />
          {t('takePhoto', language)}
        </button>
        
        {/* This input is for selecting a file from the gallery. */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
        <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center justify-center bg-white text-green-600 border-2 border-green-600 font-bold py-3 px-4 rounded-lg hover:bg-green-50 transition-transform transform hover:scale-105 duration-300 shadow-md">
           <GalleryIcon />
           {t('uploadFromGallery', language)}
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-6">{t('supportedCrops', language)}</p>
    </div>
  );
};