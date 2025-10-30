import React, { useState } from 'react';
import type { Diagnosis, Language } from '../types';
import { t } from '../utils/translations';
import { SolutionViewer } from './SolutionViewer';

interface DiagnosisResultProps {
  diagnosis: Diagnosis;
  language: Language;
  onReset: () => void;
  imagePreview: string;
}

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);


export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ diagnosis, language, onReset, imagePreview }) => {
  const confidencePercent = Math.round(diagnosis.confidence_score * 100);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg animate-fade-in-up">
      <div className="flex items-center justify-between pb-3 border-b-2 border-gray-100 mb-4">
        <div className="flex items-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-3">
              <CheckCircleIcon />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{t('diagnosisResult', language)}</h2>
              <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
            </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full">
            <img src={imagePreview} alt="Uploaded plant leaf" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <p className="text-center text-xs text-gray-500 mt-2">Your Uploaded Image</p>
        </div>
        <div>
            <div className="mb-4">
              <p className="text-lg font-semibold text-red-600">{diagnosis.disease_name[language]}</p>
              <p className="text-sm text-gray-500">{t('detectedCrop', language)}: <span className="font-medium text-gray-700">{diagnosis.crop_detected}</span></p>
            </div>
            
            <div className="mb-4">
                <p className="text-sm font-semibold text-gray-600 mb-1">{t('confidence', language)}: {confidencePercent}%</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                    className="bg-green-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${confidencePercent}%` }}
                    ></div>
                </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-bold text-md mb-1">{t('diseaseInfo', language)}</h3>
                <p className="text-sm text-gray-700">{diagnosis.description[language]}</p>
            </div>

            <div className="mt-4">
                <h3 className="font-bold text-md mb-2">{t('referenceImage', language)}</h3>
                <img 
                    src={`https://source.unsplash.com/500x500/?${diagnosis.disease_name.en.replace(/\s+/g, ',')},plant,disease`} 
                    alt={`Reference image for ${diagnosis.disease_name.en}`} 
                    className="w-full h-auto object-cover rounded-lg shadow-md" 
                />
            </div>
        </div>
      </div>

      <SolutionViewer diagnosis={diagnosis} language={language} />

      <div className="mt-6 text-center">
        <button
          onClick={onReset}
          className="bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-transform transform hover:scale-105 duration-300"
        >
          {t('startOver', language)}
        </button>
      </div>
    </div>
  );
};