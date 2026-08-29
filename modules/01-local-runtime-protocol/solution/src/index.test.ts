import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { runChatCompletion, type ChatMessage } from "./index.js";

describe("Module 01 local runtime protocol", () => {
  beforeEach(() => vi.restoreAllMocks());
  afterEach(() => { delete process.env.LLM_BASE_URL; delete process.env.LLM_MODEL; delete process.env.LLM_API_KEY; });

  it("unpacks an OpenAI-compatible response", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ choices: [{ message: { content: "Architecture decoupled." } }], usage: { total_tokens: 42, prompt_tokens: 30, completion_tokens: 12 } }) } as Response);
    const result = await runChatCompletion([{ role: "user", content: "Verify system architecture status." }], { model: "llama3.2:3b" });
    expect(result).toEqual({ content: "Architecture decoupled.", totalTokens: 42, promptTokens: 30, completionTokens: 12 });
  });

  it("rejects empty messages before networking", async () => {
    const fetchSpy = vi.fn(); global.fetch = fetchSpy;
    await expect(runChatCompletion([], { model: "llama3.2:3b" })).rejects.toThrow("Messages array cannot be empty");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects malformed messages before networking", async () => {
    const fetchSpy = vi.fn(); global.fetch = fetchSpy;
    await expect(runChatCompletion([{ role: "user", content: "" } as ChatMessage], { model: "llama3.2:3b" })).rejects.toThrow();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("uses configured endpoint, API key, and model", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ choices: [{ message: { content: "Configured response" } }] }) } as Response);
    await runChatCompletion([{ role: "user", content: "Test configuration" }], { baseUrl: "http://example.test/v1/", apiKey: "test-key", model: "custom-model" });
    expect(global.fetch).toHaveBeenCalledWith("http://example.test/v1/chat/completions", expect.objectContaining({ headers: expect.objectContaining({ Authorization: "Bearer test-key" }), body: expect.stringContaining('"model":"custom-model"') }));
  });

  it("uses environment values when configuration is omitted", async () => {
    process.env.LLM_BASE_URL = "http://env.test/v1";
    process.env.LLM_API_KEY = "env-key";
    process.env.LLM_MODEL = "env-model";
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ choices: [{ message: { content: "Environment response" } }] }) } as Response);
    await runChatCompletion([{ role: "user", content: "Test environment" }], {});
    expect(global.fetch).toHaveBeenCalledWith("http://env.test/v1/chat/completions", expect.objectContaining({ headers: expect.objectContaining({ Authorization: "Bearer env-key" }), body: expect.stringContaining('"model":"env-model"') }));
  });

  it("rejects an invalid response envelope", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ choices: [] }) } as Response);
    await expect(runChatCompletion([{ role: "user", content: "Invalid response" }], { model: "test-model" })).rejects.toThrow();
  });

  it("enforces the request timeout", async () => {
    global.fetch = vi.fn().mockImplementation((_url, options) => new Promise((_resolve, reject) => options.signal.addEventListener("abort", () => { const error = new Error("aborted"); error.name = "AbortError"; reject(error); })));
    await expect(runChatCompletion([{ role: "user", content: "Will this time out?" }], { model: "llama3.2:3b", timeoutMs: 20 })).rejects.toThrow("timed out after 20ms");
  });
});
