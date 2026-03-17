# Veritas Global Intelligence Terminal — Session Notes

---

## Session 1: 2026-03-17 — Project Initialization

### Goals
- Read all project documentation (scope, checklist, playbook, white paper, roadmap)
- Inspect World Monitor repo architecture before making structural decisions
- Clone repo, pull upstream source, establish project structure
- Set workflow rules

### Completed
- Read all 8 files in VG_World Monitor Project folder
- Deep inspection of koala73/worldmonitor repo (39.8k stars, AGPL v3)
- Cloned Rans-tech/VG-Intelligence-Terminal
- Pulled upstream World Monitor main branch into repo
- Created `veritas/` directory (briefs, risk-data, config, admin) for Veritas-specific code
- Created `.veritas/` directory for project management files (session notes, decisions, checklist)

### Decisions Made
1. **No frontend/backend split** — World Monitor is a monorepo with deeply interleaved concerns. Vite expects `src/` at root, Vercel requires `api/` at root, proto codegen targets `src/generated/`. Forcing a split would break hundreds of import paths.
2. **`veritas/` folder for custom code** — Keeps our additions identifiable and separate from upstream, critical for future syncs.
3. **`.veritas/` folder for docs/notes** — Keeps project management files out of the code tree.
4. **Repo is Rans-tech/VG-Intelligence-Terminal** — NOT veritasglobal/intelligence-platform as scope doc references.
5. **Work on main branch** for now, commit after meaningful milestones.
6. **Execute and report** workflow — C2 executes, reports results. Rans reviews.

### Architecture Notes (from code inspection)
- 28 proto-based service domains (up from 22 in scope doc), ~143 proto files
- Dual API pattern: legacy flat JS edge functions + proto-based TypeScript RPC (mid-migration)
- Variant system deeply embedded across 8+ file locations (config, panels, feeds, OG metadata, middleware, vite plugins, CSP)
- Frontend is Preact (not React), uses deck.gl + MapLibre GL + globe.gl
- 480+ RSS feeds, 40+ env vars, 50+ seed scripts, 21 languages
- Custom sebuf framework for proto codegen (not standard gRPC)

### Next Session
- Install dependencies (`npm install`)
- Verify local dev server runs (`npm run dev` or `vercel dev`)
- Begin Phase 2 work: Veritas branding, variant cleanup
