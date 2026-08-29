import "dotenv/config";
import OpenAI from "openai";
import { z } from "zod";

// --- Validations and Types ---

export const ChatRoleSchema = z.enum(['system', 'user', 'assistant']);

export const ChatMessageSchema = z.object({
  role: ChatRoleSchema,
  content: z.string(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export interface ChatCompletionRequest {
  messages: ChatMessage[];
  temperature?: number;
  model: string;
}

// Updated to accurately mirror the raw properties mockCreate uses in your test
export interface ChatCompletionResponse {
  choices: {
    message: ChatMessage;
  }[];
  usage?: {
    total_tokens: number;
    prompt_tokens: number;
    completion_tokens: number;
  };
}

// Explicit return structure expected by your assertions
export interface ChatCompletionResult {
  content: string | null;
  totalTokens: number;
}

// --- Initialization ---

export const client = new OpenAI({
  apiKey: process.env.LLM_API_KEY || "mock-key",
  baseURL: process.env.LLM_BASE_URL,
  timeout: process.env.LLM_TIMEOUT ? parseInt(process.env.LLM_TIMEOUT) : 30000,
  maxRetries: process.env.LLM_MAX_RETRIES ? parseInt(process.env.LLM_MAX_RETRIES) : 3,
});

// --- Exported Runner Function ---

/**
 * Runs a chat completion via the OpenAI client wrapper.
 * @param messages Array of ChatMessage items to process.
 * @param options Configurations overriding process.env defaults.
 */
export async function runChatCompletion(
  messages: ChatMessage[],
  options?: { model?: string; temperature?: number }
): Promise<ChatCompletionResult> {
  // Pre-network validation checking array length
  if (!messages || messages.length === 0) {
    throw new Error("Messages array cannot be empty");
  }

  const requestPayload: ChatCompletionRequest = {
    messages,
    temperature: options?.temperature ?? (process.env.LLM_TEMPERATURE ? parseFloat(process.env.LLM_TEMPERATURE) : 0.7),
    model: options?.model ?? process.env.LLM_MODEL ?? "gpt-4o",
  };

  // Perform API call and cast to target format
  const response = (await client.chat.completions.create(
    requestPayload as any
  )) as unknown as ChatCompletionResponse;

  // Extract variables with safe default mappings to prevent runtime errors
  const content = response.choices?.[0]?.message?.content ?? "";
  const totalTokens = response.usage?.total_tokens ?? 0;

  return {
    content,
    totalTokens,
  };
}
