import { NextRequest, NextResponse } from 'next/server';

// Define the Groq API request structure
interface GroqRequest {
  model: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
}

// Define the Groq API response structure
interface GroqResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Function to remove <think> sections from text
function removeThinkSections(text: string): string {
  // Match content between <think> and </think> tags, including multiline content
  const thinkPattern = /<think>[\s\S]*?<\/think>/g;
  
  // Remove the thinking sections and trim any extra whitespace
  return text.replace(thinkPattern, '').trim();
}

export async function POST(req: NextRequest) {
  try {
    const { messages, temperature = 0.7, maxTokens = 2048 } = await req.json();
    
    // Get API key from environment variables
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      console.error('GROQ_API_KEY is not defined in environment variables');
      return NextResponse.json(
        { error: "API key not configured. Please add GROQ_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    console.log('Using model: deepseek-r1-distill-qwen-32b');
    
    // Prepare the request for Groq API
    const groqRequest: GroqRequest = {
      model: "deepseek-r1-distill-qwen-32b", // Using the specified model
      messages,
      temperature,
      max_tokens: maxTokens,
      top_p: 0.95,
      stream: false, // Set to false for simplicity
    };

    // Log the outgoing request (excluding sensitive content)
    console.log('Making request to Groq API with model:', groqRequest.model);

    // Make request to Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(groqRequest)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Groq API error (${response.status}):`, errorText);
      
      return NextResponse.json(
        { error: `Groq API error (${response.status}): ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json() as GroqResponse;
    
    // Clean the response by removing thinking sections
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
      // Apply the filtering to remove <think> sections
      const originalContent = data.choices[0].message.content;
      data.choices[0].message.content = removeThinkSections(originalContent);
    }
    
    console.log('Successfully received response from Groq API');
    return NextResponse.json(data);
  } catch (error) {
    // Log the full error for debugging
    console.error('Error processing chat request:', error);
    
    return NextResponse.json(
      { error: 'Error processing your request. Check server logs for details.' },
      { status: 500 }
    );
  }
}