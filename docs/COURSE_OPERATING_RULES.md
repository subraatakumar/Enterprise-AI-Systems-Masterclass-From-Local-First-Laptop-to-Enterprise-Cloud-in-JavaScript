# Course Operating Rules

This file is the continuity contract for all future contributors, assistants, instructors, and content producers.

## Non-negotiable decisions

- Audience: fullstack developers with zero AI background.
- Existing TypeScript/fullstack knowledge is assumed; do not teach it from scratch.
- AI concepts are taught incrementally through code.
- Maximum lesson duration: 45 minutes; target approximately 35 minutes.
- The course builds one evolving enterprise assistant.
- Local-first and containerized are default design constraints.
- Cloud deployment is a later infrastructure choice, not a rewrite of the application.
- The core course must be platform-neutral.
- No lesson may require paid cloud inference or a proprietary vendor SDK.
- Ollama is the default teaching runtime, never a hardcoded application dependency.
- Keep provider-specific URLs, model/deployment names, API versions, and authentication behind configuration or a small adapter.
- Distinguish OpenAI-compatible portability from universal API compatibility; document an adapter when a provider differs.
- Every completed module needs runnable code and automated verification.
- Every module must be independently understandable and runnable from its own directory.
- Every module must include lecture notes, source code, tests, and a module-local Docker Compose workflow.
- Every core module must use the Build → Break → Harden → Verify → Integrate teaching loop.
- Every module must have one observable learner outcome and one named artifact or tested behavior.
- Essential technical instructions must be available in the repository, not only in a video or platform activity.
- Lecture scripts must explain unfamiliar AI, infrastructure, and security terminology at first use; never assume that a fullstack developer knows terms such as inference, embeddings, tokens, schemas, or runtimes.

## Definition of a complete module

A module is complete only when it has:

- `README.md` with objectives, failure mode, explanation, exercise, and recap.
- `LECTURE.md` containing the complete instructor/learner lecture notes, including timing, explanations, commands, and recap.
- `starter/` with intentionally incomplete but runnable code.
- `solution/` with the reference implementation.
- Tests for the solution and, where useful, tests that define the learner task.
- `docker-compose.yml` or an explicitly documented equivalent that runs the module's required services.
- A module-local `.env.example` with safe placeholder values when configuration is needed.
- A container or shared workspace path that works consistently.
- A diagram or equivalent explanation of the main flow.
- A capstone integration note.
- A lightweight-model path or documented hardware fallback.

## Required lesson quality gates

Before publishing a module, verify:

- The learner can complete the core path within 45 minutes.
- The intended failure can be reproduced or simulated.
- The hardening step addresses that failure directly.
- The solution tests pass from a clean checkout.
- The lesson works with the default lightweight model or documents its limitation.
- The capstone still runs after the new capability is integrated.
- The written repository content is sufficient without the hosting platform.

## New-chat handoff protocol

Before making changes, inspect the repository and read the five continuity files listed in `COURSE_STRATEGY.md`. Report any conflict between existing documentation and these rules before choosing a new direction.

## Language and claims

Prefer precise claims such as “supports air-gapped deployment” over absolute claims such as “guarantees zero leakage.” Explain that compliance depends on the complete deployment, organization, and operating controls.

Use plain language first. Introduce terminology only when it helps learners build or debug the system.
