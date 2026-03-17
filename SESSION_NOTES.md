# Session Notes — Veritas Global Intelligence Terminal

## Last Updated: 2026-03-17

## Current Phase: Phase 2 — Branding & Terminal Identity

---

## COMPLETED THIS SESSION

### 1. Logo Integration
- Wired `veritas-symbol-gold.png` into header as icon mark
- Desktop: 26px gold icon + stacked "VERITAS GLOBAL" / "INTELLIGENCE TERMINAL" text
- Mobile: 20px gold icon + "Veritas Global" text
- New CSS classes: `.logo-container`, `.logo-icon`, `.logo-text-group`, `.logo-icon-mobile`
- Files changed: `src/app/panel-layout.ts`, `src/styles/main.css`

### 2. Full Codebase Reference Sweep (100+ files)
- All "World Monitor" → "Veritas Global Intelligence Terminal" (or "Veritas Intel" where tight)
- All "worldmonitor.app" URLs → "intel.veritasglobal.co"
- localStorage keys: `worldmonitor-*` → `veritas-*`
- Author: "Elie Habib" → "Veritas Global, LLC" (except LICENSE/attribution)
- Twitter: "@worldmonitorai" → "@veritasglobal"
- GitHub links (for this repo): "koala73/worldmonitor" → "Rans-tech/VG-Intelligence-Terminal"
- Updated: src/, api/, public/, docs/, blog-site/, docker/, scripts/, tests/, e2e/, .github/, src-tauri/, pro-test/, all 18 locale files

### 3. Favicon & OG Images
- Generated all new favicon sizes from gold eagle symbol on #0B0F14 background
  - favicon.ico (16+32 multi-size), favicon-16x16.png, favicon-32x32.png
  - apple-touch-icon.png (180x180), android-chrome-192x192.png, android-chrome-512x512.png
- New og-image.png (1200x630) — dark navy bg, gold eagle, "VERITAS GLOBAL" / "INTELLIGENCE TERMINAL" text with decorative gold lines
- Deleted old `worldmonitor-icon-1024.png`
- Deleted variant subdirectories (finance/, happy/, tech/) from public/favico/
- Root favicon.ico also updated
- Used `sharp` package (added as devDep) via temp script

### 4. UI Component Rebranding
- **Pro Banner** (`src/components/ProBanner.ts`):
  - Was: "PRO — Pro is coming... Reserve your spot →"
  - Now: "PUBLIC — You are viewing the public monitoring layer. Request access for full analytical capabilities, intelligence briefs, and risk assessments." → "Request Access →" (links to veritasglobal.co/contact)
  - Re-enabled dismiss functionality with `veritas-tier-banner-dismissed` localStorage key
- **Community Widget** (`src/components/CommunityWidget.ts`):
  - Was: "Join the Discussion / Open Discussion" → GitHub Discussions
  - Now: "Need deeper intelligence coverage?" → "Request Access" (links to veritasglobal.co/contact)
  - Dismiss key updated to `veritas-access-widget-dismissed`
- **Footer** (`src/app/panel-layout.ts`):
  - Was: "WORLD MONITOR / by Someone.ceo" with Pro, Blog, Veritas Global, Contact, Source Code links
  - Now: Gold eagle icon + "VERITAS GLOBAL / Intelligence Terminal" with About Veritas, Request Access, Source Code links
  - AGPL attribution to original World Monitor preserved
- **Desktop Header Nav** (`src/app/panel-layout.ts` + `src/styles/main.css`):
  - Added `<nav class="header-nav">` with: Dashboard (active) | Theaters (region select dropdown) | About Veritas
  - Added gold "Request Access" button (`.header-access-btn`) on far right
  - Removed: download button, copy link button, TV mode button
  - New CSS: `.header-nav`, `.header-nav-item`, `.header-nav-divider`, `.header-access-btn`
  - Hidden on mobile via `@media (max-width: 768px)` — mobile uses hamburger menu instead
- **Mobile Menu** (`src/app/panel-layout.ts`):
  - Title: "WORLD MONITOR" → "VERITAS GLOBAL"
  - Removed variant switcher (World/Tech/Finance/Commodity/Good News)
  - Removed @eliehabib X link
  - Added: Dashboard, Theaters (region selector), Settings, Theme, About Veritas, Request Access
  - Footer links: Veritas Global, Contact (removed Pro, Blog, Docs, Status)

### 5. Previously Completed (before this session)
- `index.html` — meta tags, OG/Twitter cards, JSON-LD, CSP, fonts
- `middleware.ts` — stripped variant subdomains, single Veritas OG
- `src/config/variant-meta.ts` — collapsed to single Veritas variant
- `src/styles/main.css` — dark navy palette, gold accent, brand CSS vars, font stacks
- Branding assets: `public/veritas-logo-white.png`, `veritas-symbol-gold.png`, `veritas-symbol-white.png`, `Branding/` folder

---

## NOT YET COMMITTED
**All changes are unstaged.** Nothing has been committed yet. Run `git status` to see full list.

---

## REMAINING TODO (Phase 2)

### Next Up:
1. **settings.html** — Verify branding is complete on the settings page
2. **live-channels.html** — Verify branding is complete on live channels page
3. **Full browser review** — Visual check at localhost:3000
4. **Commit all changes** — Stage and commit the full rebrand

### Preserved Intentionally:
- LICENSE (original AGPL attribution to Elie Habib)
- Footer attribution link to original World Monitor (AGPL compliance)
- CHANGELOG.md (historical record)
- Proto/RPC paths: `server/worldmonitor/`, `rpc/worldmonitor.*`
- Generated files in `src/generated/`
- `package.json` "name" field

---

## REMAINING PHASES (after Phase 2)

### Phase 3: Auth & Premium Tier
- Clerk integration (public / client / admin tiers)
- Supabase schema for user data
- Role-based panel access

### Phase 4: Intelligence Layer & Briefs
- Briefs API, GRI (Global Risk Index), risk overlay
- Chokepoint analysis, escalation tracker
- Theater selector: GLOBAL / LATAM / MENA / SUB-SAHARAN AFRICA

### Phase 5: Hardening & Launch
- Security audit, AGPL compliance final check
- WordPress site update, launch at intel.veritasglobal.co

---

## KEY PATHS
- Project: `C:\Users\mrcoo\VG-Intelligence-Terminal\`
- Project docs: `C:\Users\mrcoo\VG_World Monitor Project\`
- Brand guide: `Branding/Veritas Global_Brand Guide_Final.pdf`
- Logos: `Branding/Logos/`, `public/veritas-*.png`
- Favicons: `public/favico/` (all regenerated with Veritas branding)
- Dev server: `npx vite --host` (usually port 3000)

## BRAND SPECS
- Gold: #CCA55A | Dark gold: #7C5B2E | Light gold: #E6D39C
- Background: #0B0F14 | Surface: #141924
- Blue light: #AED6E9 | Teal: #457580
- Fonts: Inter (UI), IBM Plex Sans (body), JetBrains Mono (mono)
- Domain: intel.veritasglobal.co
- Repo: Rans-tech/VG-Intelligence-Terminal
