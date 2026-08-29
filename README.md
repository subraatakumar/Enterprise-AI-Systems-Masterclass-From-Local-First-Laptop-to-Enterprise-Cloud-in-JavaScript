# Enterprise AI Systems Masterclass
### *From Local-First Laptop to Enterprise Cloud in JavaScript*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Runtime: Node.js](https://img.shields.io/badge/Node.js-22%2B-green.svg)](https://nodejs.org/)
[![TypeScript: 5.x](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Protocol: OpenAI REST /v1](https://img.shields.io/badge/Protocol-OpenAI%20REST%20%2Fv1-orange.svg)](#)
[![Deployment: Docker Multi--Arch](https://img.shields.io/badge/Deploy-Docker%20arm64%20%7C%20amd64-purple.svg)](#)

A comprehensive, code-complete masterclass designed for senior JavaScript/TypeScript engineers. Build air-gapped, local-first autonomous agents and resilient AI systems on your personal machine (Apple Silicon / standard laptop), then deploy them directly onto enterprise NVIDIA clusters or private VPCs with zero code changes.

> **Core Philosophy:** Zero cloud vendor lock-in. Zero third-party API bills. Every model runs locally over standardized OpenAI-compliant REST endpoints (`/v1`) and the open Model Context Protocol (MCP).

---

## 🏗 System Architecture


```

┌────────────────────────────────────────────────────────────────────────┐
│                        Portable Agent Container                        │
│                 (TypeScript / Node.js / LangGraph.js)                  │
│                                                                        │
│   • Typed Contracts (Zod)       • State Graphs & ReAct Loops           │
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
│   [Development: Local Mac]             [Production: Enterprise Cloud]  │
│   • Apple Metal (Unified RAM)          • Linux / NVIDIA GPU Clusters   │
│   • Ollama / llama.cpp                 • NVIDIA NIM / vLLM (CUDA)      │
└────────────────────────────────────────────────────────────────────────┘

```

---

## 📦 What You Build: 4 Flagship Production Products

Rather than isolated toy snippets, every lesson builds a subsystem that integrates into four deployable enterprise products:

| # | Product | Description | Core Modules |
| :--- | :--- | :--- | :--- |
| **P1** | **Air-Gapped Document Intelligence Engine** | Private RAG system that ingests corporate PDFs/spreadsheets, re-ranks retrieved chunks, and guarantees strict source citations with zero cloud leakage. | Modules 01–08 |
| **P2** | **Autonomous Operations & SQL Agent** | Safe database and file system operator built on pure ReAct state machines with token-bounded memory and recursion circuit breakers. | Modules 09–12 |
| **P3** | **Workflow Orchestrator with HITL** | Directed cyclic multi-agent graph (LangGraph.js) that decomposes tasks, processes UI visual layouts, and halts execution for human cryptographic approval on sensitive operations. | Modules 13–16 |
| **P4** | **Enterprise Voice & Telemetry Platform** | Low-latency voice-to-action pipeline equipped with OpenTelemetry tracing, an automated CI/CD evaluation harness, and dual Apple Silicon / NVIDIA Docker manifests. | Modules 17–20 |

---

## 🗺 Curriculum Roadmap (20 Micro-Courses)

Each module is an intensive 30- to 45-minute lesson with starter code, exercises, and an enterprise hardening checklist.

### Phase 1: Zero-Lock-in Runtimes & Fundamental Mechanics
- [ ] [`01-local-runtime-protocol`](./modules/01-local-runtime-protocol) — The Local LLM Runtime & OpenAI-Compatible REST Protocol
- [ ] [`02-token-economics-vectors`](./modules/02-token-economics-vectors) — Token Economics, Context Budgets & Vector Space Math
- [ ] [`03-streaming-backpressure-sse`](./modules/03-streaming-backpressure-sse) — Streaming Backpressure & Non-Blocking SSE Protocols
- [ ] [`04-deterministic-payloads-zod`](./modules/04-deterministic-payloads-zod) — Deterministic Payloads & Schema Guarantees with Zod

### Phase 2: Enterprise Knowledge Retrieval (RAG) & Vector Boundaries
- [ ] [`05-ingestion-chunking`](./modules/05-ingestion-chunking) — Enterprise Document Ingestion & Deterministic Chunking
- [ ] [`06-embedded-vector-stores`](./modules/06-embedded-vector-stores) — Embedded Vector Engines & Zero-Cloud Indexing (LanceDB)
- [ ] [`07-two-stage-retrieval`](./modules/07-two-stage-retrieval) — Two-Stage Retrieval: Cross-Encoder Re-Ranking & Grounding
- [ ] [`08-mcp-architecture`](./modules/08-mcp-architecture) — The Model Context Protocol (MCP) Architecture in TypeScript

### Phase 3: Single-Agent Core, Memory & Operational Safety
- [ ] [`09-deterministic-tool-calling`](./modules/09-deterministic-tool-calling) — Deterministic Tool Calling & Sandboxed Execution
- [ ] [`10-multi-tool-circuit-breakers`](./modules/10-multi-tool-circuit-breakers) — Multi-Tool Orchestration & Recursion Circuit Breakers
- [ ] [`11-stateful-memory-compaction`](./modules/11-stateful-memory-compaction) — Stateful Memory: Sliding Windows & Context Compaction
- [ ] [`12-react-loop-scratch`](./modules/12-react-loop-scratch) — Building a ReAct (Reason + Act) Loop from Scratch

### Phase 4: Production Workflows, Multi-Agent & Multimodality
- [ ] [`13-declarative-cyclic-graphs`](./modules/13-declarative-cyclic-graphs) — Declarative Cyclic State Graphs with LangGraph.js
- [ ] [`14-hitl-approval-gates`](./modules/14-hitl-approval-gates) — Human-in-the-Loop (HITL) Checkpoints & Approval Hooks
- [ ] [`15-multi-agent-swarms`](./modules/15-multi-agent-swarms) — Hierarchical Multi-Agent Systems: Supervisor & Worker Swarms
- [ ] [`16-multimodal-vision-agents`](./modules/16-multimodal-vision-agents) — Local Multimodal Vision Agents for Document Intelligence

### Phase 5: Enterprise Governance, Security & Deployment
- [ ] [`17-local-voice-pipelines`](./modules/17-local-voice-pipelines) — Local Audio & Real-Time Voice-to-Action Pipelines
- [ ] [`18-eval-harness-cicd`](./modules/18-eval-harness-cicd) — Programmatic Agent Evaluation & Regression CI/CD
- [ ] [`19-enterprise-observability`](./modules/19-enterprise-observability) — Enterprise Observability: Distributed Tracing & OpenTelemetry
- [ ] [`20-universal-containers`](./modules/20-universal-containers) — Shipping Universal Containers: From Mac M-Series to NVIDIA NIM

---

## ⚡ 2-Minute Quickstart

### Prerequisites
- Node.js 22+ (LTS)
- Docker Desktop or OrbStack
- [Ollama](https://ollama.com/) (for native Apple Silicon GPU acceleration)

### 1. Pull the Base Model
```bash
# Pull an open-weight instruction model and embedding model
ollama pull llama3.3:70b   # Or llama3.2:3b / qwen2.5:7b for lighter machines
ollama pull nomic-embed-text

```

### 2. Verify Your Environment

```bash
git clone [https://github.com/subraatakumar/Enterprise-AI-Systems-Masterclass-From-Local-First-Laptop-to-Enterprise-Cloud-in-JavaScript.git](https://github.com/subraatakumar/Enterprise-AI-Systems-Masterclass-From-Local-First-Laptop-to-Enterprise-Cloud-in-JavaScript.git)
cd Enterprise-AI-Systems-Masterclass-From-Local-First-Laptop-to-Enterprise-Cloud-in-JavaScript

# Install monorepo dependencies
npm install

# Test connection to your local OpenAI-compatible endpoint
npm run verify:env

```

---

## 🛡 Enterprise Compliance & Safety Guarantees

This curriculum is explicitly designed around enterprise InfoSec standards:

* **SOC 2 & GDPR Aligned:** Zero external telemetry or prompt logging to third parties.
* **OWASP Top 10 for LLMs Defended:** Dedicated patterns mitigating Prompt Injection (LLM01), Insecure Output Handling (LLM02), and Excessive Agency (LLM08).
* **Deterministic Execution:** No unbounded agent loops; all operations enforce hard SLA limits and schema contracts.

---

## 📄 License

This repository is licensed under the [MIT License](https://www.google.com/search?q=LICENSE).

```

<FollowUp label="Shall we create the folder structure and `npm run verify:env` script for Module 01?" query="Provide the starter directory layout and the `verify:env` Node.js script to test the local Ollama connection for Module 01."/>

```
