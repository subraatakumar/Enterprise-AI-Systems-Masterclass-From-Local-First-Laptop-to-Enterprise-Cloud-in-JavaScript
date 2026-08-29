import OpenAI from "openai";
import "dotenv/config";
import { z } from "zod";

export const ChatMessageSchema = z.object({ role: z.enum(["system", "user", "assistant"]), content: z.string().min(1, "Message content cannot be empty") });
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export interface InferenceConfig { baseUrl?: string; model?: string; apiKey?: string; temperature?: number; timeoutMs?: number; }
export interface InferenceResponse { content: string; totalTokens: number; promptTokens: number; completionTokens: number; }

const ResponseSchema = z.object({ choices: z.array(z.object({ message: z.object({ content: z.string() }) })).min(1), usage: z.object({ total_tokens: z.number().optional(), prompt_tokens: z.number().optional(), completion_tokens: z.number().optional() }).optional() });

export async function runChatCompletion(messages: ChatMessage[], config: InferenceConfig): Promise<InferenceResponse> {
  if (!messages || messages.length === 0) throw new Error("Messages array cannot be empty");
  const validatedMessages = z.array(ChatMessageSchema).nonempty().parse(messages);
  const baseURL = (config.baseUrl || process.env.LLM_BASE_URL || "http://localhost:11434/v1").replace(/\/+$/, "");
  const model = config.model || process.env.LLM_MODEL || "llama3.2:3b";
  const client = new OpenAI({ baseURL, apiKey: config.apiKey || process.env.LLM_API_KEY || "local-dev-key" });
  const timeoutMs = config.timeoutMs ?? 30000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const completion = await client.chat.completions.create({ model, messages: validatedMessages, temperature: config.temperature ?? 0.2, stream: false }, { signal: controller.signal });
    const data = ResponseSchema.parse(completion);
    return { content: data.choices[0].message.content, totalTokens: data.usage?.total_tokens ?? 0, promptTokens: data.usage?.prompt_tokens ?? 0, completionTokens: data.usage?.completion_tokens ?? 0 };
  } catch (error) {
    if (error instanceof Error && (error.name === "AbortError" || error.message.toLowerCase().includes("aborted"))) throw new Error(`Inference request timed out after ${timeoutMs}ms`);
    if (error instanceof Error) throw new Error(`Inference request failed: ${error.message}`, { cause: error });
    throw new Error("Inference request failed with an unknown error");
  } finally { clearTimeout(timeoutId); }
}
