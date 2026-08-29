
# System Architecture & Technical Specifications

This document outlines the core technical architecture, protocols, runtime abstractions, and deployment mechanics powering the **Enterprise AI Systems Masterclass**.

---

## 1. Core Architectural Tenet: The Decoupled Paradigm

The fundamental design rule of this curriculum is the **complete decoupling of Agent Orchestration from Model Inference**.


```

┌─────────────────────────────────────────────────────────────────────────┐
│                        Agent Application Container                      │
│                  (TypeScript / Node.js 22+ / LangGraph.js)              │
│                                                                         │
│   • Typed Schemas (Zod)              • ReAct State Machines             │
│   • Embedded Vectors (LanceDB)       • MCP Tool Client                  │
│   • Dynamic Prompt Compilation       • OpenTelemetry Distributed Traces │
└────────────────────────────────────┬────────────────────────────────────┘
│
│ Standard OpenAI REST Protocol
│ HTTP / SSE (/v1/chat/completions)
▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    Interchangeable Inference Runtime                    │
│                                                                         │
│   [Development: Local Mac]              [Enterprise Production: Linux]  │
│   • Apple Metal Acceleration            • NVIDIA CUDA Acceleration      │
│   • Ollama / llama.cpp host process     • vLLM / NVIDIA NIM (Container) │
└─────────────────────────────────────────────────────────────────────────┘

```

### Why Decoupling Matters
1. **Zero Cloud Lock-In:** The agent codebase does not import proprietary vendor SDKs. It targets the standard OpenAI `/v1` REST interface.
2. **Zero Code Changes Between Environments:** The exact same TypeScript application runs on a developer laptop (Mac Apple Silicon) and enterprise infrastructure (NVIDIA H100 clusters). Only the `LLM_BASE_URL` environment variable changes.
3. **Data Sovereignty:** Enterprise prompts, user data, and embedding indices never cross multi-tenant cloud borders.

---

## 2. Cross-Platform Runtime Strategy

Docker Desktop on macOS runs a Linux VM that **cannot access Apple Metal GPU acceleration**. If you run local inference models inside a Mac Docker container, inference falls back to CPU emulation, causing a 10x–20x performance drop.

To resolve this, we employ two distinct execution architectures:

### Strategy A: Development on Apple Silicon (Hybrid Container Pattern)
* **Agent Stack:** Runs 100% inside Docker (isolated dependencies, pinned Node.js runtime).
* **Inference Engine:** Runs natively on the macOS host (via Ollama or `llama.cpp`) to leverage Apple Metal unified memory.
* **Network Bridge:** The container accesses the host GPU using Docker's internal DNS routing: `http://host.docker.internal:11434/v1`.

### Strategy B: Production on NVIDIA Enterprise Linux (100% Containerized)
* **Agent Stack:** Runs inside the same Docker image compiled during development.
* **Inference Engine:** Runs inside an adjacent Docker container using the `nvidia-container-toolkit` for native CUDA/TensorRT passthrough.
* **Network Bridge:** Containers communicate across an internal Docker bridge network (`http://inference:8000/v1`).

---

## 3. Communication Protocols & Standards

### A. Model Inference Protocol
All LLM and multimodal interactions strictly implement the OpenAI `/v1` specification:
* **Endpoints:** `/v1/chat/completions`, `/v1/embeddings`, `/v1/models`
* **Streaming:** Server-Sent Events (`text/event-stream`) with deterministic chunk parsing and client-side `AbortController` signal propagation to stop GPU inference on client disconnect.
* **Tool Invocation:** Standardized JSON Schema `tools` arrays adhering to JSON Schema Draft-07.

### B. Tooling Protocol: Model Context Protocol (MCP)
To prevent brittle, custom API glue code, all enterprise integrations (databases, local filesystems, log aggregators) follow the open **Model Context Protocol (MCP)**:
* **Transport:** JSON-RPC 2.0 over standard I/O (`stdio`) or Server-Sent Events (`sse`).
* **Role:** The Node.js agent acts as an MCP Client; tool providers act as isolated MCP Servers.

---

## 4. Storage & Retrieval Architecture (RAG)

To eliminate the operational complexity and cost of external vector database clusters during local development, the architecture relies on **embedded, in-process engines**:

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Vector Storage** | **LanceDB** / **SQLite-VSS** | Zero-infrastructure, serverless vector databases that compile directly into the Node.js process. Data persists to mounted disk volumes. |
| **Embeddings** | `nomic-embed-text` / `bge-small-en` | High-performing, open-weight embedding models running locally via the `/v1/embeddings` endpoint. |
| **Two-Stage Retrieval** | **Cross-Encoder Re-Ranking** | Stage 1 retrieves top-k candidates via cosine vector search. Stage 2 executes a local cross-encoder scoring pass to eliminate false positives before prompt construction. |

---

## 5. Reliability, Security & Guardrails

Enterprise systems must defend against non-deterministic failures and OWASP Top 10 for LLMs vulnerabilities:

* **Strict Payload Boundaries (Zod):** Raw model strings are never passed directly to backend microservices. All structured responses are parsed and validated through runtime Zod schemas. If parsing fails, an automated self-correcting retry loop executes.
* **Recursion Circuit Breakers:** Autonomous ReAct loops are constrained by deterministic boundaries:
  * Maximum step limits (`MAX_STEPS = 10`)
  * Execution timeouts (`TIMEOUT_MS = 30000`)
  * Duplicate tool call detection sets
* **State Checkpointing & HITL:** Graph execution using LangGraph.js supports state persistence and breakpoints. High-risk operations (e.g., database writes, financial transactions) halt state transitions and require cryptographically signed human authorization before proceeding.
* **Distributed Observability:** Every turn, prompt template, tool execution, and token metric is instrumented using OpenTelemetry and OpenInference standards, exporting traces to local collectors (Langfuse/Jaeger).

---

## 6. Flagship Product Assembly

The 20 modules systematically feed into four deployable enterprise products:


```

Modules 01–08 ──► [Product 1: Air-Gapped Document Intelligence Engine]
Modules 09–12 ──► [Product 2: Autonomous Operations & SQL Agent]
Modules 13–16 ──► [Product 3: Workflow Orchestrator with HITL]
Modules 17–20 ──► [Product 4: Enterprise Voice & Telemetry Platform]

```

1. **Air-Gapped Document Intelligence Engine (P1):** Ingests private enterprise files, executes recursive chunking, indexes vectors in LanceDB, and answers queries with strict source citations and zero data leakage.
2. **Autonomous Operations & SQL Agent (P2):** Safe database query and file-system operator built on raw ReAct state machines with token-bounded memory compaction and recursion circuit breakers.
3. **Workflow Orchestrator with HITL (P3):** Directed cyclic multi-agent graph (LangGraph.js) that decomposes tasks, processes UI visual layouts, and halts execution for human cryptographic approval.
4. **Enterprise Voice & Telemetry Platform (P4):** Low-latency local voice-to-action pipeline equipped with OpenTelemetry distributed tracing, automated CI/CD evaluation harnesses, and multi-architecture Docker deployment.

```

---
