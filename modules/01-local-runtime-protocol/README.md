# Module 01: Configurable AI Inference with the OpenAI Node.js SDK

> **Duration:** 35–45 minutes
> **Primary concept:** A provider-neutral AI client configured by endpoint and credentials
> **Capstone increment:** A validated inference boundary

## Learner outcome

Use the OpenAI Node.js package to call Ollama or another compatible inference service by changing configuration rather than application code.

## Start Ollama locally

```bash
ollama list
```

If Ollama is not installed or running, install it for your operating system and start the Ollama application or service first. Docker Compose is optional and is included only for a later containerized deployment variation.

Review the [official Ollama Llama 3.2 model page](https://ollama.com/library/llama3.2) before choosing a model. It lists 1B and 3B variants. The `B` means billion parameters, or learned values in the model. We use 3B because it balances local hardware requirements with enough capability for instruction-following and basic tool-use demonstrations. Exact sizes and availability can change, so the official page is the current reference.

Download the selected model and verify it is available:

```bash
ollama pull llama3.2:3b
ollama list
```

## Endpoint selection

| Node.js client | Ollama | `LLM_BASE_URL` |
| --- | --- | --- |
| Host machine | Host machine | `http://localhost:11434/v1` |
| Docker container | Host machine | `http://host.docker.internal:11434/v1` |
| Docker container | Same Compose network | `http://inference:11434/v1` |

Inside a container, `localhost` means that container. `host.docker.internal` reaches the host, while `inference` is the Compose service name. The primary lesson runs both the Node.js client and Ollama directly on the host, so it uses `localhost`.

## Run the solution

```bash
cd solution
npm install
npm start
npm test
npm run build
```

`npm start` makes one live request to the configured endpoint and prints the assistant response and token count. Tests mock the network and do not require Ollama.

## Configuration

```env
LLM_BASE_URL=http://localhost:11434/v1
LLM_API_KEY=local-dev-key
LLM_MODEL=llama3.2:3b
```

For a compatible provider, change the URL, key, and deployed model name. The implementation reads `LLM_MODEL` when `model` is not supplied in code. A provider with a different API contract needs an adapter at the inference boundary.

## Exercise

Implement the numbered TODOs in `starter/src/index.ts` in two phases. First make the simplest successful request work and run `npm start`. Then complete the safety TODOs and compare with `solution/src/index.ts`.

## Build → Break → Harden → Verify → Integrate

- **Build:** create an OpenAI SDK client with configurable endpoint and credentials.
- **Break:** submit invalid messages and simulate a hanging request.
- **Harden:** add Zod validation, response checks, errors, and timeout handling.
- **Verify:** run deterministic tests and the TypeScript build.
- **Integrate:** use this client for later RAG and agent modules.

The Compose file starts the Ollama runtime but does not download a model automatically. This is intentional so learners can see that the runtime and model are separate resources. For a published course release, pin the tested Ollama image version instead of relying on `latest`.
