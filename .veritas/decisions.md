# Architecture Decisions Log

## ADR-001: Preserve World Monitor monorepo structure
**Date:** 2026-03-17
**Decision:** Keep the original World Monitor directory layout intact. No frontend/backend folder split.
**Rationale:** The codebase has deep structural dependencies — Vite expects `src/` at root, Vercel requires `api/` at root, proto codegen outputs to `src/generated/`, server handlers import across boundaries. A split would break 200+ import paths and all build tooling.
**Consequence:** Our custom code lives in `veritas/` to maintain clean separation from upstream for future syncs.

## ADR-002: Veritas custom code in `veritas/` directory
**Date:** 2026-03-17
**Decision:** All Veritas-specific code (briefs API, risk data, config, admin panel) goes in `veritas/` at repo root.
**Rationale:** Clean separation from upstream World Monitor code. When syncing with upstream updates, our changes are identifiable. Merge conflicts are minimized.

## ADR-003: Project management files in `.veritas/` directory
**Date:** 2026-03-17
**Decision:** Session notes, decisions log, and checklist live in `.veritas/` (dot-prefixed, hidden).
**Rationale:** Keeps documentation out of the code tree. Clean code folders per Rans's requirement.
