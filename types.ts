export type Language = 'en' | 'hi';

export type AppState = 'idle' | 'analyzing' | 'result';

export interface SolutionStep {
  step: number;
  instruction: string;
}

export interface ChemicalSolution {
  activeIngredient: string;
  products: string[];
  dosage: string;
}

export interface Diagnosis {
  disease_name: {
    en: string;
    hi: string;
  };
  confidence_score: number;
  crop_detected: string;
  description: {
    en: string;
    hi: string;
  };
  solutions: {
    natural: {
      en: SolutionStep[];
      hi: SolutionStep[];
    };
    chemical: {
      en: ChemicalSolution;
      hi: ChemicalSolution;
    };
  };
}
