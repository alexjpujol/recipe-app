export interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string;
  usedItems: string[];
}

export interface ReceiptAnalysis {
  items: string[];
  recipes: Recipe[];
  rawResponse?: string;
  error?: string;
}

export interface ImagePickerResult {
  uri: string;
  type: string;
  name?: string;
  base64?: string;
}