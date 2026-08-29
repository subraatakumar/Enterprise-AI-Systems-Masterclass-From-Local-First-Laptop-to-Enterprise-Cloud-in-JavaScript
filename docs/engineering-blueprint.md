# Engineering Blueprint: The Enterprise AI Agent Curriculum

## Mission & Intent

To transform experienced fullstack JavaScript/TypeScript engineers into **enterprise-grade AI Systems Architects**.

Rather than teaching generic prompt engineering or tying students to proprietary, closed-source cloud APIs, this curriculum builds core engineering competency from first principles:

* **Zero Cloud Lock-in:** All systems use standardized, OpenAI-compatible REST endpoints (`/v1`) and open protocols (Model Context Protocol). Code runs identically against local developer runtimes or enterprise GPU clusters.
* **Air-Gapped & Local-First:** 100% runnable offline on standard developer hardware (Apple Silicon / Mac M-series) and portable to enterprise Linux/NVIDIA servers via Docker.
* **Deterministic & Production-Hardened:** LLMs are treated as non-deterministic probabilistic microservices. The curriculum emphasizes strict boundaries: Zod schema enforcement, sliding-window memory management, recursion circuit breakers, human-in-the-loop gates, and regression testing.

---

## Architectural Principles

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Portable Agent Container                        │
│                 (TypeScript / Node.js / LangGraph.js)                  │
│                                                                        │
│   • Typed Schemas (Zod)         • State Graphs & ReAct Loops           │
│   • Embedded Vectors (LanceDB)  • MCP Client / Tool Dispatcher         │
│   • Human-in-the-Loop Hooks     • OpenTelemetry Distributed Traces     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    │ Standard OpenAI Protocol
                                    │ HTTP / SSE (/v1/chat/completions)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Interchangeable Inference Runtime                    │
│                                                                        │
│   [Development]                        [Enterprise Production]         │
│   • Mac M-Series (Apple Metal)         • Linux / NVIDIA GPU Servers    │
│   • Ollama / llama.cpp                 • NVIDIA NIM / vLLM (CUDA)      │
└────────────────────────────────────────────────────────────────────────┘

```

---

## Target Audience & Prerequisites

* **Audience:** Senior Fullstack JavaScript / TypeScript Engineers.
* **Prerequisites Assumed:** Asynchronous JavaScript, Node.js runtime, REST/HTTP protocols, Docker basics, and TypeScript fundamentals.
* **Prerequisites NOT Assumed:** Prior machine learning knowledge, Python proficiency, vector math, or AI framework experience. Everything AI-specific is taught from ground zero.

---

## The 20-Course Curriculum Structure

Each course is designed as a focused **30- to 45-minute** module structured with a 3-part delivery:

1. **Mental Model (10 min):** First-principles AI/ML concepts translated into software engineering terms.
2. **Hands-On Build (20 min):** Implementation in TypeScript against local, open-weight models.
3. **Enterprise Defense (10 min):** Hardening for production failures, security, and edge-case mitigation.

---

### Phase 1: Zero-Lock-in Runtimes & Fundamental Mechanics

* **Course 01: The Local LLM Runtime & OpenAI-Compatible Protocol**
Setting up an air-gapped inference engine (Ollama/vLLM) exposing standard `/v1` endpoints. Inspecting raw HTTP payloads, sampling parameters (`temperature`, `top_p`), context limits, and hardware-agnostic Node.js client configurations.
* **Course 02: Token Economics, Context Budgets & Vector Space Math**
Byte-Pair Encoding (BPE), context limits, and local embedding models (`nomic-embed-text`). Implementing vector similarity math (dot product, cosine similarity) in pure TypeScript without external libraries.
* **Course 03: Streaming Backpressure & Non-Blocking SSE Protocols**
The `text/event-stream` spec in Node.js. Consuming delta streams via the OpenAI JS SDK, building chunk buffers, and using `AbortController` to cancel wasted inference compute when a client disconnects.
* **Course 04: Deterministic Payloads & Schema Guarantees with Zod**
Enforcing structured JSON outputs from open-weight models. Validating output boundaries at runtime with Zod, handling parsing exceptions, and building self-correcting retry loops.

---

### Phase 2: Enterprise Knowledge Retrieval (RAG) & Vector Boundaries

* **Course 05: Document Ingestion & Deterministic Chunking**
Converting complex PDFs and Markdown into searchable segments. Recursive character chunking, boundary splitting, overlap trade-offs, and preserving structural metadata for access control lists (ACLs).
* **Course 06: Embedded Vector Stores & Zero-Cloud Indexing**
Eliminating managed cloud database overhead. Embedding vector storage directly into Node.js processes using LanceDB and SQLite-VSS for local, fast k-NN similarity lookups.
* **Course 07: Two-Stage Retrieval: Cross-Encoder Re-Ranking & Grounding**
Mitigating false positives in vector search. Implementing a secondary local cross-encoder re-ranking pass, writing strict grounding prompts, and enforcing structured refusal when evidence is missing.
* **Course 08: The Model Context Protocol (MCP) Architecture**
Standardizing enterprise integrations with the open Model Context Protocol. Building a TypeScript MCP server over JSON-RPC to expose internal file systems and databases to agents.

---

### Phase 3: Single-Agent Core, Memory & Operational Safety

* **Course 09: Deterministic Tool Calling & Sandboxed Execution**
Mapping TypeScript functions to OpenAI-standard JSON tool schemas. Validating parameters with Zod, executing functions in safe execution contexts, and handling tool exceptions cleanly.
* **Course 10: Multi-Tool Orchestration & Circuit Breakers**
Sequential tool planning and execution. Implementing operational guardrails: recursion limits, execution timeouts, token budgets, and loop detection to prevent runaway executions.
* **Course 11: Stateful Memory: Sliding Windows & Context Compaction**
Overcoming context length boundaries. Designing multi-turn memory buffers using token-bounded sliding windows and background LLM summarization routines to prevent memory exhaustion.
* **Course 12: Building a ReAct (Reason + Act) Loop from Scratch**
Implementing the classic Thought $\to$ Action $\to$ Observation $\to$ Final Answer cycle using pure TypeScript state machines—demystifying agent frameworks by building one without external dependencies.

---

### Phase 4: Production Workflows, Multi-Agent & Multimodal

* **Course 13: Declarative Cyclic State Graphs with LangGraph.js**
Modeling complex workflows as directed cyclic graphs. Defining state channels, execution nodes, dynamic conditional edges, and state rollbacks.
* **Course 14: Human-in-the-Loop (HITL) Checkpoints & Approval Hooks**
Preventing unauthorized side-effects (e.g., payments, database deletions). Building interruptible graphs that pause execution state, wait for external human approval, and resume deterministically.
* **Course 15: Hierarchical Multi-Agent Systems: Supervisor & Worker Swarms**
Role isolation patterns. Implementing a lead supervisor agent that breaks down ambiguous objectives, delegates sub-tasks to specialized domain worker agents, and aggregates results.
* **Course 16: Local Multimodal Vision Agents for Document Intelligence**
Processing unstructured visual inputs (invoices, UI screenshots, architecture diagrams) with local multimodal models (Llama 3.2 Vision / Qwen2.5-VL) and outputting typed JSON schemas.

---

### Phase 5: Enterprise Governance, Security & Deployment

* **Course 17: Local Audio & Real-Time Voice-to-Action Pipelines**
Building private voice interfaces. Running on-premise Whisper transcription to extract user intent, trigger backend tool calls, and stream responses with minimal latency.
* **Course 18: Programmatic Agent Evaluation & Regression CI/CD**
Eliminating manual prompt checks. Building automated assertion suites, semantic distance evaluations, and LLM-as-a-Judge test runners integrated into CI/CD pipelines.
* **Course 19: Enterprise Observability: Distributed Tracing & OpenTelemetry**
Instrumenting agent runs with OpenTelemetry / OpenInference standards and Langfuse. Visualizing parent-child spans, tracking tool latencies, and auditing token consumption per session.
* **Course 20: Shipping Universal Containers: From Mac M-Series to NVIDIA Production**
Building multi-architecture Docker containers (`linux/arm64` and `linux/amd64`). Authoring dual `docker-compose` setups that switch between native Apple Silicon Metal acceleration and enterprise NVIDIA CUDA/NIM environments.

---

## Definition of Done: The Enterprise-Ready Graduate

A developer who finishes this curriculum can:

1. **Architect** end-to-end agentic workflows without third-party SaaS dependencies.
2. **Guarantee** data security and privacy compliance by deploying inside VPC/on-prem environments.
3. **Prevent** security vulnerabilities (OWASP Top 10 for LLMs: prompt injection, excessive agency, insecure output handling).
4. **Deliver** containerized, observable, and benchmarked software that drops cleanly into any corporate infrastructure.
