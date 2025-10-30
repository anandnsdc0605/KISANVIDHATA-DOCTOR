import React, { useState } from 'react';
import type { Diagnosis, Language } from '../types';
import { t } from '../utils/translations';

interface SolutionViewerProps {
  diagnosis: Diagnosis;
  language: Language;
}

type SolutionType = 'natural' | 'chemical';

export const SolutionViewer: React.FC<SolutionViewerProps> = ({ diagnosis, language }) => {
  const [activeSolution, setActiveSolution] = useState<SolutionType | null>(null);

  const handleSolutionClick = (type: SolutionType) => {
    setActiveSolution(type);
  };

  const handleBookDrone = () => {
    const chemicalInfo = diagnosis.solutions.chemical[language];
    console.log("Booking drone with the following details:");
    console.log("Disease:", diagnosis.disease_name[language]);
    console.log("Active Ingredient:", chemicalInfo.activeIngredient);
    alert(`Drone booking form pre-filled for ${diagnosis.disease_name[language]} with ${chemicalInfo.activeIngredient}. (See console for details)`);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-center mb-4">{t('getSolution', language)}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => handleSolutionClick('natural')}
          className={`p-4 rounded-lg text-center font-bold text-lg transition-all duration-300 ${activeSolution === 'natural' ? 'bg-green-600 text-white shadow-lg scale-105' : 'bg-green-100 text-green-800'}`}
        >
          {t('naturalSolution', language)}
        </button>
        <button
          onClick={() => handleSolutionClick('chemical')}
          className={`p-4 rounded-lg text-center font-bold text-lg transition-all duration-300 ${activeSolution === 'chemical' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-blue-100 text-blue-800'}`}
        >
          {t('chemicalSolution', language)}
        </button>
      </div>

      {activeSolution && (
        <div className="bg-white p-4 rounded-lg border animate-fade-in">
          {activeSolution === 'natural' && (
            <div>
              <h4 className="text-xl font-bold text-green-700 mb-3">{t('naturalSolution', language)}</h4>
              <ul className="space-y-3">
                {diagnosis.solutions.natural[language].map((step) => (
                  <li key={step.step} className="flex items-start">
                    <span className="flex-shrink-0 bg-green-600 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm mr-3">{step.step}</span>
                    <span className="text-gray-700">{step.instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeSolution === 'chemical' && (
            <div>
              <h4 className="text-xl font-bold text-blue-700 mb-3">{t('chemicalSolution', language)}</h4>
              <div className="space-y-4 text-sm">
                <p><strong>{t('activeIngredient', language)}:</strong> <span className="text-gray-700">{diagnosis.solutions.chemical[language].activeIngredient}</span></p>
                <p><strong>{t('recommendedProducts', language)}:</strong> <span className="text-gray-700">{diagnosis.solutions.chemical[language].products.join(', ')}</span></p>
                <p><strong>{t('dosage', language)}:</strong> <span className="text-gray-700">{diagnosis.solutions.chemical[language].dosage}</span></p>
              </div>
              <div className="mt-6 text-center">
                <button 
                  onClick={handleBookDrone}
                  className="w-full sm:w-auto bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105 duration-300 shadow-lg animate-pulse"
                >
                  {t('bookDrone', language)}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
