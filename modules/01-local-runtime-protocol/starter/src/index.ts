
  // Phase 1: Make it work.
  // TODO 1: Resolve baseURL, apiKey, and model from configuration, environment, and local defaults.
  // TODO 2: Construct the OpenAI client with baseURL and apiKey.
  // TODO 3: Call client.chat.completions.create with model, messages, and stream: false.
  // TODO 4: Return the assistant content and basic token usage from the response.

  // Phase 2: Make it safe.
  // TODO 5: Validate messages and the response envelope with Zod before using them.
  // TODO 6: Add timeout cancellation and normalized provider-error handling.
