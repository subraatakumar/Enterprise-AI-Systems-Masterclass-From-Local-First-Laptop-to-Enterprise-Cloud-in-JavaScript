# Enterprise AI Systems Masterclass
### *From Local-First Laptop to Enterprise Cloud in JavaScript*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Runtime: Node.js](https://img.shields.io/badge/Node.js-22%2B-green.svg)](https://nodejs.org/)
[![Protocol: OpenAI /v1](https://img.shields.io/badge/Protocol-OpenAI%20REST-orange.svg)](#)
[![Architecture: Local--First](https://img.shields.io/badge/Architecture-Local--First%20to%20Enterprise-purple.svg)](#)

A 20-module, hands-on masterclass engineering resilient, sovereign AI systems and autonomous agents using pure JavaScript/TypeScript. 

Zero third-party cloud API dependencies. Zero vendor lock-in. 100% runnable offline on developer hardware (Apple Silicon / standard laptops) and architected to deploy directly onto enterprise NVIDIA clusters or private VPCs via Docker.

---

## 🎯 What You Will Build

Most AI tutorials teach unconstrained prompt engineering against paid SaaS APIs that fail in enterprise environments. This masterclass treats LLMs as non-deterministic probabilistic microservices and focuses on **systems engineering, reliability, and security**:

- **Local Inference & Zero Lock-in:** Run open-weight models (Llama, Mistral, Qwen) locally over standardized `/v1` endpoints with zero API bills.
- **Deterministic Type Safety:** Eliminate hallucinations at runtime using strict Zod schemas and programmatic self-healing retry loops.
- **Enterprise Retrieval (RAG):** Ingestion pipelines, recursive chunking, embedded vector stores (LanceDB), and cross-encoder re-ranking.
- **Open Standards:** Implement the Model Context Protocol (MCP) to standardize internal tools and database access.
- **Agent Orchestration:** Construct framework-free ReAct loops, cyclic state graphs (LangGraph.js), and Human-in-the-Loop (HITL) approval gates.
- **Production Observability & Hardening:** Instrument OpenTelemetry/Langfuse distributed tracing, CI/CD evaluation harnesses, and recursion circuit breakers.
- **Universal Deployment:** Multi-architecture Docker containers (`arm64`/`amd64`) ready for Apple Metal dev or enterprise NVIDIA NIM/vLLM production.

---

## 🛠 Tech Stack

- **Language & Runtime:** TypeScript / Node.js
- **Model Runtimes:** Ollama, vLLM, llama.cpp, NVIDIA NIM (OpenAI-compatible `/v1`)
- **Agent & Graph State:** LangGraph.js, Custom ReAct State Machines
- **Validation & Tooling:** Zod, Model Context Protocol (MCP) SDK
- **Data & Vectors:** LanceDB, SQLite-VSS, Transformers.js
- **Observability & Testing:** OpenTelemetry, Langfuse, Prompt Eval Harnesses
- **Infrastructure:** Docker, Docker Compose (Apple Metal & NVIDIA CUDA)
