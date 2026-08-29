# Enterprise AI Systems Masterclass — Course Strategy

## Purpose

This repository defines and implements a practical AI engineering course for fullstack developers who can already build web applications but have little or no AI experience.

The course teaches learners to build useful AI-enabled products efficiently in a containerized environment and deploy the same application to local, private, or public cloud infrastructure later. Ollama is the default learning runtime; it is not an application dependency.

This is an AI engineering course, not a TypeScript or fullstack programming course. Existing fullstack skills are assumed; AI concepts are introduced incrementally through working software.

## Audience

- Fullstack developers with professional web-development experience.
- Comfortable reading and modifying JavaScript or TypeScript.
- New to LLMs, embeddings, RAG, agents, evaluation, and AI operations.
- Interested in production software rather than prompt-only demonstrations.

Do not assume prior knowledge of machine learning, linear algebra, model training, or AI vendor SDKs.

## Course promise

By the end, a learner can:

1. Explain the essential mechanics of modern AI applications.
2. Connect an application to a local or remote OpenAI-compatible model runtime.
3. Build structured, validated, testable AI features.
4. Add private knowledge using retrieval-augmented generation.
5. Give models bounded access to application tools.
6. Build resumable workflows with human approval for risky actions.
7. Evaluate, observe, secure, containerize, and deploy an AI product.

## Teaching approach

AI concepts are introduced through familiar software-engineering analogies:

| AI concept | Familiar engineering model |
| --- | --- |
| LLM | Probabilistic HTTP microservice |
| Prompt | Structured request payload |
| Token | Input/output processing unit |
| Embedding | Numeric representation for semantic search |
| Tool call | Validated RPC or function invocation |
| Agent | Stateful workflow loop |
| RAG | Search pipeline followed by generation |
| Memory | Application state and persistence |
| Evaluation | Automated integration and regression testing |

Every lesson follows: explain one concept, build the smallest useful feature, add one production safeguard, and verify it with tests.

Lecture scripts must define unfamiliar AI and infrastructure terms in plain language at first use, connect them to a familiar software concept where possible, and only then use the technical term repeatedly.

## Industry teaching loop

Each lesson uses the same production-oriented loop:

1. **Build:** create the smallest useful version of the capability.
2. **Break:** demonstrate a realistic AI or systems failure.
3. **Harden:** add validation, limits, fallbacks, security, or recovery behavior.
4. **Verify:** prove the behavior with automated tests and observable output.
5. **Integrate:** connect the capability to the evolving capstone.

This loop is mandatory for core modules. A lesson should teach learners that AI engineering includes controlling failure, not only making a successful demo.

## Learner-outcome standard

Every module must state one observable outcome using an action verb, such as:

> The learner can validate a model-generated invoice object and retry safely when the response is invalid.

Avoid outcomes expressed only as “understand,” “learn,” or “be familiar with.” The learner must finish with a working artifact or tested behavior.

## Capstone strategy

Learners build one evolving product throughout the course:

> A private, containerized enterprise AI assistant.

The assistant progressively gains document search, citations, business tools, safe database access, human approval, multi-agent workflows, evaluation, observability, and deployment support.

The four flagship products in the existing architecture are milestones within this capstone, not four unrelated applications. The learner should experience the course as one continuous product journey.

## Module contract

Every module must:

- Fit within 30–45 minutes.
- Include its own lecture notes so the lesson is complete without a video platform.
- Teach one primary AI concept.
- Produce one visible capstone improvement.
- Start with a realistic failure mode.
- Include runnable starter and reference implementations.
- Include deterministic automated tests.
- Include module-local source code, configuration, and a Docker Compose workflow.
- Add one reliability, security, or operational safeguard.
- State prerequisites and expected learner output.
- Work with a lightweight local model where possible.
- Be complete from the repository materials without requiring the video, platform quiz, or private discussion.
- Include a measurable learner outcome and a clear completed artifact.

## Technology policy

Use a small, replaceable technology surface:

- Node.js and TypeScript for application code.
- Native HTTP/fetch and OpenAI-compatible `/v1` protocols.
- Zod for runtime validation.
- Vitest for tests.
- Docker for reproducible environments.
- Ollama as the default beginner-friendly local runtime.
- LanceDB or another embedded store for local retrieval.
- MCP and graph orchestration only after the underlying concepts are understood.

The application must target a provider-neutral inference contract. Ollama is used for teaching and local verification; vLLM, NVIDIA NIM, Azure Foundry, or another OpenAI-compatible endpoint are deployment variants. Provider-specific differences in URL shape, deployment/model naming, authentication, API version, or headers must be isolated in configuration or a small adapter.

Container networking is part of deployment configuration: use a Compose service name for a runtime in the same network, `host.docker.internal` when a container calls a host runtime, and `localhost` only when caller and runtime share the host network context.

“Any endpoint” means an endpoint that implements the supported request/response contract or has a documented adapter. The course must not imply that every AI API is automatically interchangeable.

Vendor-specific services may be shown as optional deployment variants, but no core lesson may require a particular cloud vendor, paid API, marketplace, or course platform.

## Platform neutrality

The repository is the canonical source of truth. Video, text, slides, exercises, captions, downloadable archives, and platform-specific descriptions are delivery formats derived from the repository.

Course content must not depend on:

- YouTube links or playlist ordering.
- Udemy-specific quizzes, coupons, or navigation.
- A proprietary learning-management-system API.
- A platform account, hidden attachment, or private comment thread.
- Content that is only available in a video.

Every lesson must remain understandable from its repository README, code, tests, and diagrams. Platform packaging belongs in separate, optional metadata and must never change the technical curriculum.

## Versioning and continuity

When starting work in a new chat, read these files first:

1. `COURSE_STRATEGY.md`
2. `docs/COURSE_OPERATING_RULES.md`
3. `docs/MODULE_TEMPLATE.md`
4. `docs/CONTENT_PRODUCTION.md`
5. `README.md`

Changes to audience, promise, pacing, capstone, or technology policy must update this file and the relevant operating rules before new modules are created.
