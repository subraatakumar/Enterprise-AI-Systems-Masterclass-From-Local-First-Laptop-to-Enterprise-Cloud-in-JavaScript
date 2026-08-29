import { describe, it, expect, vi, beforeEach } from "vitest";
import { client, runChatCompletion } from "./index.js";

describe("Module 01: Local LLM Runtime & Protocol", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should extract content and token usage from completion", async () => {
    const mockCreate = vi.fn().mockResolvedValue({
      choices: [{ message: { content: "System online." } }],
      usage: { total_tokens: 15, prompt_tokens: 10, completion_tokens: 5 },
    });

    vi.spyOn(client.chat.completions, "create").mockImplementation(mockCreate as any);

    const result = await runChatCompletion(
      [{ role: "user", content: "Status" }],
      { model: "llama3.2:3b" }
    );

    expect(result.content).toBe("System online.");
    expect(result.totalTokens).toBe(15);
  });

  it("should reject empty message arrays before network calls", async () => {
    await expect(
      runChatCompletion([], { model: "llama3.2:3b" })
    ).rejects.toThrow("Messages array cannot be empty");
  });
});
