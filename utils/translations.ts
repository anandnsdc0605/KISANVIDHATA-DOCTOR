import type { Language } from '../types';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const translations: Translations = {
  appTitle: {
    en: "KisanVidhata",
    hi: "किसानविधाता"
  },
  uploadTitle: {
    en: "Snap & Diagnose Your Crop",
    hi: "अपनी फसल की तस्वीर लें और निदान करें"
  },
  uploadSubtitle: {
    en: "Upload a photo of the plant leaf for an instant AI diagnosis.",
    hi: "तत्काल एआई निदान के लिए पौधे की पत्ती की एक तस्वीर अपलोड करें।"
  },
  takePhoto: {
    en: "Take Photo",
    hi: "फोटो लें"
  },
  uploadFromGallery: {
    en: "Upload from Gallery",
    hi: "गैलरी से अपलोड करें"
  },
  supportedCrops: {
    en: "Currently supporting: Rice, Wheat, Cotton, Sugarcane, Tomato.",
    hi: "वर्तमान में समर्थित: चावल, गेहूं, कपास, गन्ना, टमाटर।"
  },
  analyzing: {
    en: "Analyzing Image...",
    hi: "छवि का विश्लेषण हो रहा है..."
  },
  analyzingSubtext: {
    en: "Our AI is scanning for diseases. Please wait a moment.",
    hi: "हमारा एआई रोगों के लिए स्कैन कर रहा है। कृपया कुछ क्षण प्रतीक्षा करें।"
  },
  diagnosisResult: {
    en: "Diagnosis Result",
    hi: "निदान परिणाम"
  },
  confidence: {
    en: "Confidence",
    hi: "आत्मविश्वास"
  },
  detectedCrop: {
    en: "Detected Crop",
    hi: "पहचानी गई फसल"
  },
  diseaseInfo: {
    en: "About this disease",
    hi: "इस रोग के बारे में"
  },
  getSolution: {
    en: "Get Solution",
    hi: "समाधान प्राप्त करें"
  },
  naturalSolution: {
    en: "🌿 Natural Solution",
    hi: "🌿 जैविक समाधान"
  },
  chemicalSolution: {
    en: "🧪 Chemical Solution",
    hi: "🧪 रासायनिक समाधान"
  },
  activeIngredient: {
    en: "Active Ingredient",
    hi: "सक्रिय संघटक"
  },
  recommendedProducts: {
    en: "Recommended Products",
    hi: "अनुशंसित उत्पाद"
  },
  dosage: {
    en: "Dosage",
    hi: "खुराक"
  },
  bookDrone: {
    en: "Book Drone Spraying",
    hi: "ड्रोन स्प्रे बुक करें"
  },
  startOver: {
    en: "Diagnose Another Plant",
    hi: "दूसरे पौधे का निदान करें"
  },
  referenceImage: {
    en: "Reference Image",
    hi: "संदर्भ छवि"
  },
};

export const t = (key: keyof typeof translations, lang: Language): string => {
  return translations[key][lang];
};