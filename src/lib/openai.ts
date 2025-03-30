import { OpenAIError } from './types';

export async function getChatResponse(message: string) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant focused on women's rights and respect. Provide informative, supportive responses while maintaining appropriate boundaries and promoting equality."
          },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new OpenAIError(
        error.error?.message || 'An error occurred',
        error.error?.type,
        response.status
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error: any) {
    if (error?.error?.type === 'insufficient_quota') {
      throw new OpenAIError(
        'The AI service is currently unavailable due to quota limits. Please try again later.',
        'insufficient_quota',
        429
      );
    }
    
    if (error?.status === 429) {
      throw new OpenAIError(
        'Too many requests. Please wait a moment before trying again.',
        'rate_limit',
        429
      );
    }

    throw new OpenAIError(
      'An unexpected error occurred while processing your request.',
      error?.error?.type,
      error?.status
    );
  }
}