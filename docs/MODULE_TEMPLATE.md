# Module [NN]: [Title]

> **Duration:** 30–45 minutes  
> **Primary concept:** [one AI concept]  
> **Capstone increment:** [what the learner adds]

## Module contents

This module directory should contain:

```text
[module-slug]/
├── README.md                 # Overview and learner instructions
├── LECTURE.md               # Complete lecture notes and timing
├── docker-compose.yml       # Module-local reproducible environment
├── .env.example             # Safe configuration placeholders, if needed
├── starter/                 # Learner implementation
└── solution/                # Reference implementation and tests
```

The module must remain understandable and runnable from its own directory. Shared root tooling may reduce duplication, but it must not hide essential setup or lesson content.

## Learner outcome

By the end of this module, the learner can [observable action].

The outcome must describe something the learner can build, test, inspect, or operate. Do not use “understand” as the only outcome.

## Prerequisites

- [Earlier module or concept]
- [Required local setup]

## Production failure mode

Describe a realistic failure caused by not understanding or controlling this concept.

The failure should be demonstrated or deterministically simulated during the lesson.

## Mental model

Explain the concept using a familiar fullstack analogy. Define only the AI terminology needed for this lesson.

The lecture script must define each unfamiliar term at first use in plain language before relying on the technical term.

## Lesson flow

- **00:00–05:00 — Hook:** demonstrate the failure mode.
- **05:00–12:00 — Mental model:** explain the minimum theory.
- **12:00–28:00 — Build:** implement the core feature in `starter/`.
- **28:00–35:00 — Hardening:** add one boundary, fallback, or safety control.
- **35:00–40:00 — Verification:** run tests and inspect the result.
- **40:00–45:00 — Recap:** connect the work to the capstone.

## Build target

State the exact behavior that should work at the end.

## Build → Break → Harden → Verify → Integrate

- **Build:** [smallest useful implementation]
- **Break:** [failure demonstration or simulation]
- **Harden:** [specific control added]
- **Verify:** [test, assertion, or observable evidence]
- **Integrate:** [capstone component that consumes this capability]

## Enterprise safeguard

State the single reliability, security, privacy, or operational control added in this module.

## Verification

Document the command and the deterministic assertions that prove completion.

The verification must be runnable from the repository and must not depend on a course-platform quiz or instructor judgment.

## Platform-neutral delivery

The lesson must be complete using repository text, code, tests, and diagrams. Videos may improve explanation but may not contain essential instructions or code unavailable here.

## Capstone integration

Explain what later modules consume from this module and what persistent artifact is created.

## Optional challenge

Provide one bounded extension for learners who finish early. It must not be required for the main outcome.
