import { Anthropic } from '@anthropic-ai/sdk';
import { ReceiptAnalysis } from '../types';

const ANTHROPIC_API_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;

if (!ANTHROPIC_API_KEY) {
  console.warn('ANTHROPIC_API_KEY not found in environment variables');
}

const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});

export const analyzeReceipt = async (imageUri: string, base64Data: string): Promise<ReceiptAnalysis> => {
  try {
    if (!ANTHROPIC_API_KEY) {
      throw new Error('Anthropic API key not configured');
    }

    const mimeType = imageUri.toLowerCase().includes('.png') ? 'image/png' : 'image/jpeg';

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mimeType as any,
                data: base64Data,
              },
            },
            {
              type: 'text',
              text: `Please analyze this receipt and extract all the food items purchased. Then suggest 3-5 simple recipes that can be made using these ingredients. Format your response as JSON with this structure:
              {
                "items": ["item1", "item2", ...],
                "recipes": [
                  {
                    "name": "Recipe Name",
                    "ingredients": ["ingredient1", "ingredient2", ...],
                    "instructions": "Brief cooking instructions",
                    "usedItems": ["item from receipt that matches ingredients"]
                  }
                ]
              }`
            }
          ]
        }
      ]
    });

    const response = message.content[0];
    if (response.type === 'text') {
      try {
        const parsedResponse = JSON.parse(response.text);
        return parsedResponse as ReceiptAnalysis;
      } catch (parseError) {
        return { 
          items: [], 
          recipes: [],
          rawResponse: response.text,
          error: 'Failed to parse Claude response as JSON'
        };
      }
    } else {
      throw new Error('Unexpected response format from Claude');
    }

  } catch (error) {
    console.error('Error analyzing receipt:', error);
    return {
      items: [],
      recipes: [],
      error: error instanceof Error ? error.message : 'Failed to analyze receipt'
    };
  }
};