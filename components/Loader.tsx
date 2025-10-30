import React from 'react';
import type { Language } from '../types';
import { t } from '../utils/translations';

interface LoaderProps {
    language: Language;
    imagePreview: string | null;
}

export const Loader: React.FC<LoaderProps> = ({ language, imagePreview }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-lg shadow-lg animate-fade-in">
      
      {imagePreview ? (
        <div className="relative mb-6 w-48 h-48">
            <img src={imagePreview} alt="Analyzing plant leaf" className="w-full h-full object-cover rounded-lg shadow-md" />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-green-200 border-opacity-50 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-white rounded-full animate-spin"></div>
                </div>
            </div>
        </div>
      ) : (
        // Fallback for when image preview isn't available
        <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-green-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.636 5.636a9 9 0 0112.728 0M18.364 18.364A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
            </div>
        </div>
      )}

      <h2 className="text-xl font-bold text-gray-800">{t('analyzing', language)}</h2>
      <p className="text-gray-600 mt-2">{t('analyzingSubtext', language)}</p>
    </div>
  );
};