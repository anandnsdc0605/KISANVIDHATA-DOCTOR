import React from 'react';
import type { Language } from '../types';
import { t } from '../utils/translations';

interface HeaderProps {
  language: Language;
  onLanguageToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ language, onLanguageToggle }) => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-md">
      <div className="max-w-2xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-700">{t('appTitle', language)}</h1>
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${language === 'en' ? 'text-green-700' : 'text-gray-500'}`}>EN</span>
          <button
            onClick={onLanguageToggle}
            className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 bg-green-600"
            role="switch"
            aria-checked={language === 'hi'}
          >
            <span
              className={`${
                language === 'hi' ? 'translate-x-5' : 'translate-x-0'
              } inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
            ></span>
          </button>
          <span className={`text-sm font-medium ${language === 'hi' ? 'text-green-700' : 'text-gray-500'}`}>HI</span>
        </div>
      </div>
    </header>
  );
};
