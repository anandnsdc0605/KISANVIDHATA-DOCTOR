import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { Loader } from './components/Loader';
import { DiagnosisResult } from './components/DiagnosisResult';
import { diagnosePlant } from './services/geminiService';
import type { Language, Diagnosis, AppState } from './types';
import { compressImage } from './utils/imageCompressor';

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [appState, setAppState] = useState<AppState>('idle');
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleLanguageToggle = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  }, []);

  const handleDiagnose = useCallback(async (imageFile: File) => {
    setAppState('analyzing');
    setError(null);
    setImagePreview(URL.createObjectURL(imageFile));

    try {
      const compressedFile = await compressImage(imageFile, 0.7, 1024);
      const result = await diagnosePlant(compressedFile);
      
      // The API is prompted to return a JSON with translated fields.
      // We directly set this as our diagnosis object.
      setDiagnosis(result);
      setAppState('result');
    } catch (err) {
      console.error(err);
      const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred.';
      
      if (errorMessage.includes('429')) {
         setError('Too many requests. Please wait a moment before trying again.');
      } else if (errorMessage.includes('JSON')) {
         setError('AI model returned an unexpected format. Please try a clearer image.');
      }
      else {
         setError('Failed to analyze image. Please check your connection and try again.');
      }
      setAppState('idle');
    }
  }, []);

  const handleReset = useCallback(() => {
    setAppState('idle');
    setDiagnosis(null);
    setError(null);
    setImagePreview(null);
  }, []);

  return (
    <div className="min-h-screen bg-green-50 font-sans text-gray-800">
      <Header language={language} onLanguageToggle={handleLanguageToggle} />
      <main className="p-4 md:p-6 max-w-2xl mx-auto">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {appState === 'idle' && <ImageUploader onDiagnose={handleDiagnose} language={language} />}
        
        {appState === 'analyzing' && <Loader language={language} imagePreview={imagePreview} />}
        
        {appState === 'result' && diagnosis && (
          <DiagnosisResult 
            diagnosis={diagnosis} 
            language={language} 
            onReset={handleReset}
            imagePreview={imagePreview || 'https://picsum.photos/500/500'} 
          />
        )}
      </main>
    </div>
  );
}

export default App;