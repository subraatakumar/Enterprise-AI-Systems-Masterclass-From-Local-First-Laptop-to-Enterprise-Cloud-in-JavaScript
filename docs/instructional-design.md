
# Instructional Architecture & Pedagogical Design

This document details the teaching framework, lesson blueprints, monorepo conventions, and assessment standards governing the **Enterprise AI Systems Masterclass**.

---

## 1. Pedagogical Philosophy

This curriculum is engineered specifically for **senior fullstack JavaScript/TypeScript engineers** with zero prior background in machine learning. 

Traditional ML tutorials often introduce cognitive overload by mixing advanced Python syntax, heavy linear algebra, and proprietary cloud vendor SDKs. This masterclass bridges that gap using three instructional principles:

1. **Cognitive Anchoring (Software Primitives First):**
   Every AI concept is anchored to an existing software engineering equivalent:
   - An *LLM* is modeled as a non-deterministic, probabilistic microservice over HTTP.
   - An *Embedding* is an array of floating-point numbers representing semantic coordinates.
   - An *Agent Tool Call* is a remote procedure call (RPC) validated against a JSON Schema.
   - A *ReAct Loop* is a state machine with recursive feedback edges.

2. **Gradual Release of Responsibility (I Do → We Do → You Do):**
   Each lesson begins with visual architecture and code dissection, transitions into paired implementation in a scaffolded template, and concludes with an enterprise edge-case challenge solved independently.

3. **Test-Driven Definition of Done:**
   A module is only complete when all programmatic assertions pass (`npm test`). Learners never rely on manual "eyeball testing" to verify whether an AI feature works.

---

## 2. The 35-Minute Lesson Formula

To ensure consistency, depth, and pacing, every module is strictly calibrated to run between **30 and 45 minutes**:


```

00:00 ─── 05:00       05:00 ─── 12:00       12:00 ─── 28:00       28:00 ─── 35:00       35:00 ─── 38:00
┌───────────────┐     ┌───────────────┐     ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ 1. The Hook & │     │ 2. The Mental │     │ 3. Scaffolded │     │ 4. Enterprise │     │ 5. Milestone  │
│ Failure Mode  │ ──► │     Model     │ ──► │  Build (Code) │ ──► │   Hardening   │ ──► │  Verification │
└───────────────┘     └───────────────┘     └───────────────┘     └───────────────┘     └───────────────┘

```

### Stage 1: The Hook & Production Failure Mode (00:00 – 05:00)
- **Objective:** Establish immediate relevance and context.
- **Delivery:** Run a fragile or naive implementation that causes a production issue (e.g., an unconstrained model generating invalid JSON that crashes a database query, or an agent entering an infinite tool execution loop).
- **Takeaway:** Define the exact engineering risk addressed by the module.

### Stage 2: The Core Mental Model (05:00 – 12:00)
- **Objective:** Demystify the concept using architectural diagrams and TypeScript primitives.
- **Delivery:** Explain how the mechanism functions under the hood (e.g., how the `text/event-stream` parser processes chunk buffers or how cosine similarity evaluates array dot products).
- **Rule:** No proprietary vendor jargon; focus strictly on network protocols, data structures, and mathematical intuition.

### Stage 3: The Scaffolded Build (12:00 – 28:00)
- **Objective:** Implement the core business logic.
- **Delivery:** Work inside the pre-scaffolded `starter/` workspace. Students implement 30–50 lines of critical path logic guided by structured `// TODO` markers.
- **Focus:** Interface with local inference endpoints via the standard OpenAI `/v1` REST schema or execute native vector/tool operations.

### Stage 4: Enterprise Hardening (28:00 – 35:00)
- **Objective:** Guard against non-deterministic edge cases and security vectors.
- **Delivery:** Introduce an adversarial prompt, simulated network drop, or schema anomaly. Implement defensive guardrails:
  - Zod validation and automated self-correction loops.
  - Recursion step counters and execution timeouts.
  - AbortController signals to stop GPU compute when requests disconnect.

### Stage 5: Milestone Verification (35:00 – 38:00)
- **Objective:** Validate functionality and verify completion.
- **Delivery:** Run `npm test` across the module suite to ensure deterministic assertions pass. Review the subsystem's integration into the broader capstone product.

---

## 3. Monorepo Structure & Module Conventions

Every lesson resides in an isolated workspace under the `/modules` directory with an identical directory layout:

```text
modules/
└── XX-module-slug/
    ├── README.md              # Lesson guide, failure mode breakdown, and instructions
    ├── ARCHITECTURE.png       # Visual flow / sequence diagram
    ├── starter/               # Student workspace
    │   ├── package.json       # Pre-configured package dependencies
    │   ├── tsconfig.json      # Pre-configured TypeScript configuration
    │   └── src/
    │       ├── index.ts       # Main implementation with numbered // TODO targets
    │       └── index.test.ts  # Automated test suite (Jest/Vitest)
    └── solution/              # Complete, production-grade reference code
        ├── package.json
        ├── tsconfig.json
        └── src/
            ├── index.ts
            └── index.test.ts

```

### Monorepo Invariants

1. **Zero Configuration Overhead:** Root workspace tooling (`pnpm`/`npm`) manages shared dependencies so students never waste time debugging build configurations.
2. **Deterministic TODO Annotations:** The `starter/src/index.ts` file must contain explicit, numbered checkpoints:
```typescript
// TODO 1: Initialize the OpenAI-compatible client pointing to process.env.LLM_BASE_URL
// TODO 2: Define the Zod schema for structured invoice extraction
// TODO 3: Implement the self-healing retry loop with exponential backoff

```


3. **Reference Parity:** The `solution/` directory must contain the exact code required to pass all automated test suites and enterprise hardening standards.

---

## 4. Assessment & Test-Driven Verification

Because LLM outputs are non-deterministic, testing requires a two-tiered verification strategy:

```
┌─────────────────────────────────────────────────────────┐
│                  Verification Strategy                  │
├────────────────────────────┬────────────────────────────┤
│  1. Deterministic Checks   │  2. Behavioral Bounds      │
│  • Zod schema validation   │  • Recursion caps reached  │
│  • HTTP status & SSE parsing│  • Abort signal propagation│
│  • Vector dimensions & math│  • Tool call signatures    │
└────────────────────────────┴────────────────────────────┘

```

1. **Deterministic Functional Tests:**
Validate traditional software boundaries:
* Does the response match the expected Zod schema?
* Does the vector have an exact length of $1536$ or $768$?
* Did the circuit breaker trigger when `steps >= 10`?


2. **Behavioral Bounded Tests:**
Validate agent behavior under non-deterministic conditions using deterministic assertions:
* Verify that the tool dispatcher was called with typed arguments.
* Verify that fallback logic triggers when the model outputs invalid formatting.
* Verify that human approval hooks interrupt execution before database writes occur.



---

## 5. Authoring & Contribution Standards

Instructors and contributors adding new modules must adhere to the following checklist:

* [ ] **Timing:** Scripted walkthrough fits within a 30- to 45-minute recording window.
* [ ] **Air-Gapped:** Zero external SaaS dependencies; operates 100% locally with Ollama/vLLM.
* [ ] **Scaffolding:** `starter/` and `solution/` workspaces include working `package.json` configurations.
* [ ] **Tests:** Running `npm test` in the `solution/` workspace exits with code `0` (all tests pass).
* [ ] **Architecture:** Includes a sequence or architecture diagram explaining the mental model.
* [ ] **Capstone Mapping:** Clearly specifies which of the 4 flagship products receives the resulting code.

