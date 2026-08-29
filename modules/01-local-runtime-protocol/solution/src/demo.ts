import { runChatCompletion } from "./index.js";

const result = await runChatCompletion(
  [
    { role: "system", content: "Answer clearly and briefly." },
    { role: "user", content: "Explain what an API endpoint is in one sentence." },
  ],
  { model: process.env.LLM_MODEL },
);

console.log("Assistant:", result.content);
console.log("Tokens:", result.totalTokens);
