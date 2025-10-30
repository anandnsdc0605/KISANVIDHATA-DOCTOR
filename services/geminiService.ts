import { GoogleGenAI } from "@google/genai";
import type { Diagnosis } from '../types';

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        resolve('');
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const diagnosePlant = async (imageFile: File): Promise<Diagnosis> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const imagePart = await fileToGenerativePart(imageFile);

  const prompt = `
    You are an expert agricultural scientist specializing in Indian crop diseases. Analyze the user-provided image of a plant leaf.
    Your task is to identify the disease, determine the crop, and provide a confidence score.
    Only diagnose diseases for the following crops: Rice, Wheat, Cotton, Sugarcane, Tomato. 
    If the image is not one of these crops, is unclear, or does not show a disease, respond with a JSON object containing an "error" key.

    Your response MUST be a single, minified JSON object with no markdown formatting or comments. The JSON object must strictly adhere to this schema:
    {
      "disease_name": { "en": "English Disease Name", "hi": "हिंदी रोग का नाम" },
      "confidence_score": <float between 0.0 and 1.0>,
      "crop_detected": <"Rice", "Wheat", "Cotton", "Sugarcane", or "Tomato">,
      "description": { 
        "en": "A brief, easy-to-understand description of the disease, its symptoms, and impact.", 
        "hi": "रोग, उसके लक्षण और प्रभाव का संक्षिप्त, आसानी से समझ में आने वाला विवरण।" 
      },
      "solutions": {
        "natural": {
          "en": [{ "step": 1, "instruction": "..." }, { "step": 2, "instruction": "..." }],
          "hi": [{ "step": 1, "instruction": "..." }, { "step": 2, "instruction": "..." }]
        },
        "chemical": {
          "en": { "activeIngredient": "e.g., Mancozeb", "products": ["Product Name A", "Product Name B"], "dosage": "e.g., 2 grams per liter of water" },
          "hi": { "activeIngredient": "जैसे, मैनकोज़ेब", "products": ["उत्पाद का नाम ए", "उत्पाद का नाम बी"], "dosage": "जैसे, 2 ग्राम प्रति लीटर पानी" }
        }
      }
    }
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, { text: prompt }] },
    config: {
      temperature: 0.2,
      topP: 0.8,
      topK: 10,
      responseMimeType: "application/json",
    }
  });

  try {
    const text = response.text.trim();
    const result = JSON.parse(text);
    
    if (result.error) {
        throw new Error(result.error);
    }
    
    return result as Diagnosis;
  } catch (e) {
    console.error("Failed to parse Gemini response:", response.text);
    throw new Error("Could not understand the AI's response. The image might be unclear.");
  }
};
