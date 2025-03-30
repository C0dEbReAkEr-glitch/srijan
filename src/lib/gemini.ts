import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export class GeminiError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = 'GeminiError';
  }
}

const SYSTEM_PROMPT = `You are a helpful AI assistant focused on women's rights and respect. Your role is to:
- Provide accurate, factual information about women's rights
- Promote respect, equality, and understanding
- Offer supportive and empowering responses
- Maintain appropriate boundaries
- Use inclusive and respectful language
- Cite sources when appropriate
- Avoid harmful stereotypes or biases

Keep responses clear, concise, and focused on promoting positive change.`;

export async function getChatResponse(message: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: SYSTEM_PROMPT,
        },
        {
          role: "model",
          parts: "I understand my role and will provide helpful, respectful, and accurate information about women's rights while maintaining appropriate boundaries.",
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error('Gemini API Error:', error);

    if (error?.status === 429) {
      throw new GeminiError(
        'Too many requests. Please wait a moment before trying again.',
        'rate_limit',
        429
      );
    }

    throw new GeminiError(
      error?.message || 'An unexpected error occurred while processing your request.',
      error?.error?.type,
      error?.status
    );
  }
}