# Module 01: The Local LLM Runtime & OpenAI-Compatible REST Protocol

> **Duration:** 35 Minutes  
> **Core Deliverable:** A decoupled, air-gapped Node.js inference client targeting standard `/v1/chat/completions`.  
> **Capstone Integration:** Subsystem for **Product 1 (Air-Gapped Document Intelligence Engine)**.

---

## 🎯 The Production Failure Mode

Most AI tutorials instruct developers to import third-party cloud SDKs (e.g., `@google/genai`, `@anthropic-ai/sdk`, `openai`) hardcoded to proprietary endpoints.

In enterprise systems, this creates immediate production blockers:
1. **Cloud Vendor Lock-in:** Swapping models requires rewriting internal application logic.
2. **Data Sovereignty Violations:** Internal company data and PII leave the local network boundary.
3. **Runaway Cost:** Token-based pricing makes development, testing, and continuous integration cost-prohibitive.

**The Solution:** Treat the model as a decoupled microservice running behind the industry-standard OpenAI REST specification (`/v1/chat/completions`). Your application code never changes—only the environment variable `LLM_BASE_URL` changes.

---

## 🧠 Mental Model: The Inference Pipeline


```

┌───────────────────────────────────────────────────────────┐
│              TypeScript Application (Node.js 22+)          │
│                                                           │
│  const response = await fetch(`${LLM_BASE_URL}/chat/...`) │
└─────────────────────────────┬─────────────────────────────┘
│ Standard HTTP POST
│ Body: { model, messages, temperature }
▼
┌───────────────────────────────────────────────────────────┐
│           Local OpenAI-Compatible Inference Server        │
│          (Ollama / vLLM / llama.cpp / NVIDIA NIM)         │
│                                                           │
│  1. Tokenizes input text into token IDs                   │
│  2. Evaluates probabilities across vocabulary             │
│  3. Samples next token based on temperature / top_p       │
│  4. Returns standardized OpenAI JSON envelope             │
└───────────────────────────────────────────────────────────┘

```

---

## 🛠 Prerequisites

Ensure your local inference engine is running and has pulled a base model:

```bash
# Verify Ollama is running
ollama list

# Pull a lightweight base model for development
ollama pull llama3.2:3b   # or qwen2.5:7b

```

---

## ⏱ 35-Minute Execution Plan

* **00:00 – 05:00:** The Failure Mode: Inspecting vendor lock-in and inspecting raw HTTP `/v1` payloads.
* **05:00 – 12:00:** Mental Model: Deconstructing the OpenAI REST envelope, token sampling parameters (`temperature`, `top_p`), and latency drivers.
* **12:00 – 28:00:** Hands-on Build: Implementing the decoupled inference client in `starter/src/index.ts`.
* **28:00 – 35:00:** Enterprise Hardening: Defensive parameter validation, error timeouts, and running `npm test`.

---

## 🧪 Definition of Done

Run the automated test suite in the module directory:

```bash
npm test

```

All assertions must pass:

* [x] Environment variable fallback defaults to `http://localhost:11434/v1`.
* [x] Client validates message payload structure before sending.
* [x] Raw HTTP response is unpacked from the OpenAI JSON envelope.
* [x] AbortController timeout triggers if the local server does not respond within the SLA threshold.

```

---

### 2. Common Configuration: `package.json` & `tsconfig.json`

*(Identical for both `starter/` and `solution/`)*

#### `package.json`
```json
{
  "name": "@masterclass/01-local-runtime-protocol",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "tsx src/index.ts",
    "test": "vitest run"
  },
  "dependencies": {
    "dotenv": "^16.4.7",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^22.13.0",
    "tsx": "^4.19.2",
    "typescript": "^5.7.3",
    "vitest": "^3.0.5"
  }
}

```

#### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}

```

---

### 3. `starter/src/index.ts`

```typescript
import { z } from "zod";

// Schema for chat messages
export const ChatMessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string().min(1),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export interface InferenceConfig {
  baseUrl?: string;
  model: string;
  temperature?: number;
  timeoutMs?: number;
}

export interface InferenceResponse {
  content: string;
  totalTokens: number;
  promptTokens: number;
  completionTokens: number;
}

/**
 * Executes a decoupled chat completion request against any OpenAI-compatible endpoint.
 */
export async function runChatCompletion(
  messages: ChatMessage[],
  config: InferenceConfig
): Promise<InferenceResponse> {
  // TODO 1: Resolve the base URL using config.baseUrl or fallback to process.env.LLM_BASE_URL,
  // defaulting to "http://localhost:11434/v1" if neither is set.
  const baseUrl = "";

  // TODO 2: Validate that the messages array is non-empty and every item satisfies ChatMessageSchema.

  // TODO 3: Construct an AbortController with a configurable timeout (default: 30000ms).

  // TODO 4: Execute native fetch to `${baseUrl}/chat/completions` with method POST,
  // headers for Content-Type, and a payload containing { model, messages, temperature, stream: false }.

  // TODO 5: Check response.ok. If false, parse the error payload and throw a descriptive Error.

  // TODO 6: Extract choices[0].message.content and usage metrics (total_tokens, etc.)
  // Return an InferenceResponse object.

  throw new Error("Not implemented yet");
}

```

---

### 4. `solution/src/index.ts`

```typescript
import { z } from "zod";

export const ChatMessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string().min(1, "Message content cannot be empty"),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export interface InferenceConfig {
  baseUrl?: string;
  model: string;
  temperature?: number;
  timeoutMs?: number;
}

export interface InferenceResponse {
  content: string;
  totalTokens: number;
  promptTokens: number;
  completionTokens: number;
}

export async function runChatCompletion(
  messages: ChatMessage[],
  config: InferenceConfig
): Promise<InferenceResponse> {
  const baseUrl = (
    config.baseUrl ||
    process.env.LLM_BASE_URL ||
    "http://localhost:11434/v1"
  ).replace(/\/+$/, "");

  // 1. Parameter Validation
  if (!messages || messages.length === 0) {
    throw new Error("Messages array cannot be empty");
  }

  messages.forEach((msg) => ChatMessageSchema.parse(msg));

  // 2. Timeout & Abort Control
  const timeoutMs = config.timeoutMs ?? 30000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // 3. HTTP Request
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LLM_API_KEY || "local-dev-key"}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages,
        temperature: config.temperature ?? 0.2,
        stream: false,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Inference API error [HTTP ${response.status}]: ${errorText}`);
    }

    const data = await response.json();

    // 4. Validate and unpack OpenAI envelope
    if (!data.choices || data.choices.length === 0) {
      throw new Error("Invalid response format: choices array is missing or empty");
    }

    return {
      content: data.choices[0].message.content,
      totalTokens: data.usage?.total_tokens ?? 0,
      promptTokens: data.usage?.prompt_tokens ?? 0,
      completionTokens: data.usage?.completion_tokens ?? 0,
    };
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error(`Inference request timed out after ${timeoutMs}ms`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

```

---

### 5. `solution/src/index.test.ts`

*(This same test suite works in `starter/` and `solution/`)*

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { runChatCompletion, ChatMessage } from "./index.js";

describe("Module 01: Local LLM Runtime & Protocol", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    delete process.env.LLM_BASE_URL;
  });

  it("should successfully unpack an OpenAI standard response envelope", async () => {
    const mockPayload = {
      choices: [
        {
          message: { role: "assistant", content: "Architecture decoupled." },
        },
      ],
      usage: {
        total_tokens: 42,
        prompt_tokens: 30,
        completion_tokens: 12,
      },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPayload,
    } as Response);

    const messages: ChatMessage[] = [
      { role: "user", content: "Verify system architecture status." },
    ];

    const result = await runChatCompletion(messages, {
      model: "llama3.2:3b",
    });

    expect(result.content).toBe("Architecture decoupled.");
    expect(result.totalTokens).toBe(42);
    expect(result.promptTokens).toBe(30);
    expect(result.completionTokens).toBe(12);
  });

  it("should reject empty messages array before making any network call", async () => {
    const fetchSpy = vi.fn();
    global.fetch = fetchSpy;

    await expect(
      runChatCompletion([], { model: "llama3.2:3b" })
    ).rejects.toThrow("Messages array cannot be empty");

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("should enforce SLA timeout when server hangs", async () => {
    global.fetch = vi.fn().mockImplementation((_url, options) => {
      return new Promise((_resolve, reject) => {
        options.signal.addEventListener("abort", () => {
          const err = new Error("The operation was aborted");
          err.name = "AbortError";
          reject(err);
        });
      });
    });

    const messages: ChatMessage[] = [
      { role: "user", content: "Will this time out?" },
    ];

    await expect(
      runChatCompletion(messages, {
        model: "llama3.2:3b",
        timeoutMs: 50,
      })
    ).rejects.toThrow(/timed out after 50ms/);
  });
});

```
