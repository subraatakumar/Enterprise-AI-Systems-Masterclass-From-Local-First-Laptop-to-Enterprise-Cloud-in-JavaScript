# Agent Instructions

This repository contains the source of truth for the Enterprise AI Systems Masterclass. Follow these instructions whenever you inspect, modify, or extend the project.

## Read first

Before making changes, read:

1. `COURSE_STRATEGY.md`
2. `docs/COURSE_OPERATING_RULES.md`
3. `docs/MODULE_TEMPLATE.md`
4. `docs/CONTENT_PRODUCTION.md`
5. `README.md`

Treat those files as the current course decisions. If they conflict with one another, report the conflict and prefer the most specific operating rule until the user resolves it.

## Repository truthfulness

- Do not claim that a module, source file, test, command, dependency, runtime, or deployment configuration exists unless it exists in the repository or has been verified externally.
- Do not invent Modules 02–20, starter projects, solution projects, package files, CI workflows, Dockerfiles, or cloud configuration.
- The current repository is documentation-first. Module 01 is currently described in its README; do not represent its embedded examples as runnable files.
- Distinguish clearly between planned, documented, implemented, and verified functionality.
- Do not report tests as passing unless they were actually run and passed.
- Do not report a cloud provider integration, security guarantee, compliance status, or air-gapped deployment as implemented unless there is evidence in the repository.

## Course constraints

- Audience: fullstack developers with little or no AI experience.
- Do not teach TypeScript or fullstack fundamentals unless explicitly requested.
- Introduce AI concepts incrementally through practical software.
- Keep each lesson within 30–45 minutes.
- Every module should teach one primary concept and add one capstone capability.
- The course builds one evolving, private, containerized enterprise AI assistant.
- Prefer local-first, vendor-neutral, OpenAI-compatible interfaces.
- Use lightweight local models as the default learning path.
- Treat Ollama as the teaching runtime, not the application abstraction. Keep provider-specific URL, model name, API version, and authentication differences behind configuration or a small adapter.
- Do not claim that an endpoint is universally compatible; verify its request/response contract or document the required adapter.
- Treat YouTube, Udemy, LMSs, and downloadable materials as delivery formats; never make the technical curriculum depend on one platform.

## Change workflow

1. Inspect the repository before editing.
2. Preserve existing user work and unrelated changes.
3. Use `apply_patch` for manual file edits.
4. Keep documentation aligned with the actual repository state.
5. Add or update tests when implementing executable behavior.
6. Run the narrowest relevant verification available.
7. Report changed files, verification performed, and any remaining limitations.

## Naming and structure

- Use stable numbered module directories such as `modules/01-local-runtime-protocol/`.
- Use `starter/` for learner implementation and `solution/` for the reference implementation.
- Keep platform-specific publishing metadata separate from canonical lesson content.
- Reuse `docs/MODULE_TEMPLATE.md` when creating a module.

## Safety and scope

- Do not delete files unless they are clearly redundant, unused, and safe to remove.
- Ask before making destructive or materially scope-expanding changes.
- Do not add secrets, personal tokens, private URLs, or account-specific configuration.
- Use precise language: say “supports” or “is designed for” instead of making absolute security or compliance guarantees.
