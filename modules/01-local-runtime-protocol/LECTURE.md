# Module 01 Lecture Notes

## Outcome

Use the OpenAI Node.js SDK to call a configurable OpenAI-compatible endpoint, validate inputs and outputs, and enforce a timeout.

## Timing

- 00:00–05:00 — Failure: hardcoded providers and incorrect container hostnames
- 05:00–12:00 — Mental model: SDK client versus inference runtime
- 12:00–28:00 — Build: configure and call the OpenAI SDK
- 28:00–36:00 — Break and harden: validation, errors, and timeouts
- 36:00–45:00 — Verify and integrate

## Start the local runtime

The primary learner setup uses Ollama directly on the host:

```bash
ollama list
```

`ollama list` verifies the installation and shows the models already available. Docker Compose is an optional later deployment variation, not a prerequisite for this lesson.

Use the [official Llama 3.2 model page](https://ollama.com/library/llama3.2) to compare variants. The 1B and 3B labels refer approximately to the number of billion learned parameters. The 3B variant is the course default because it balances local hardware requirements with enough capability for the early exercises. Do not make the lesson depend on an exact download size or a changing page layout.

After choosing the 3B variant, download it and verify it:

```bash
ollama pull llama3.2:3b
ollama list
```

## Core concept

The OpenAI Node.js package is an HTTP client. It does not require the model to run on OpenAI. Its `baseURL` can point to Ollama, vLLM, NVIDIA NIM, Azure Foundry, or another service that supports the expected contract.

```ts
const client = new OpenAI({
  baseURL: process.env.LLM_BASE_URL,
  apiKey: process.env.LLM_API_KEY,
});
```

Ollama is the local teaching runtime, not an application dependency. The application owns configuration, validation, timeouts, and error handling; the runtime owns inference.

## Networking

- Host application to host Ollama: `localhost`
- Container application to host Ollama: `host.docker.internal`
- Container application to Compose Ollama: `inference`

These are network addresses, not provider choices.

## Build and harden

Implement `runChatCompletion` with `client.chat.completions.create({ model, messages, temperature, stream: false })`. Validate the request before calling the SDK and the response before returning it. Pass an `AbortSignal` to enforce the request SLA.

Load local configuration with `dotenv/config`. Resolve settings in this order: explicit function configuration, environment variables, then local defaults. This lets the same code use Ollama locally and another compatible endpoint later.

## Verify

```bash
cd solution
npm install
npm start
npm test
npm run build
```

The tests mock `fetch`, so verification is deterministic and does not require a running model.
