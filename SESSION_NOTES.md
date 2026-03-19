# Session Notes — Veritas Global Intelligence Terminal

## Last Updated: 2026-03-18

## Current Phase: Phase 2 COMPLETE — Domain Live + Infrastructure Hardening

---

## COMPLETED THIS SESSION (2026-03-17)

### 1. Logo Integration
- Wired `veritas-symbol-gold.png` into header as icon mark
- Desktop: 26px gold icon + stacked "VERITAS GLOBAL" / "INTELLIGENCE TERMINAL" text
- Mobile: 20px gold icon + "Veritas Global" text
- New CSS classes: `.logo-container`, `.logo-icon`, `.logo-text-group`, `.logo-icon-mobile`

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
- New og-image.png (1200x630) — dark navy bg, gold eagle, title text with decorative gold lines
- Deleted old variant subdirectories (finance/, happy/, tech/) and worldmonitor-icon-1024.png
- Used `sharp` package (added as devDep) via temp script

### 4. UI Component Rebranding
- **Pro Banner** → "PUBLIC — You are viewing the public monitoring layer. Request access..." with "Request Access →" CTA
- **Community Widget** → "Need deeper intelligence coverage?" with "Request Access" button
- **Footer** → Gold eagle + "VERITAS GLOBAL / Intelligence Terminal" with About Veritas, Request Access, Source Code links
- **Desktop Header Nav** → Dashboard | Theaters (region selector) | About Veritas nav + gold "Request Access" button
- **Mobile Menu** → "VERITAS GLOBAL" title, Dashboard/Theaters/Settings/Theme/About Veritas/Request Access structure
- Removed: variant switcher, @eliehabib link, download button, copy link, TV mode, Pro/Blog links

### 5. Build Fixes
- Removed unused `BETA_MODE` import from panel-layout.ts
- Removed dead `isAllowedHost`/`normalizeHost`/`ALLOWED_HOSTS`/`VERCEL_PREVIEW_RE` from middleware.ts

### 6. Test Fixes (1690/1690 passing)
- download-handler: updated AppImage asset names to Veritas-Intel
- edge-functions: use pathToFileURL for Windows import() compatibility
- mdx-lint: use fileURLToPath for Windows path resolution
- seed-warm-ping-origin: updated Origin header to intel.veritasglobal.co
- widget-builder: renamed localStorage keys to veritas-panel-spans

### 7. Deployment
- Committed full rebrand (283 files changed)
- Pushed to GitHub: Rans-tech/VG-Intelligence-Terminal
- Linked repo to Vercel project: `randy-cooks-projects/vg-intelligence-terminal`
- Added 9 env vars to Vercel production (ACLED keys skipped — empty/pending)
- **Vercel production deploy succeeded**: https://vg-intelligence-terminal.vercel.app
- GitHub Actions CI should be green (all tests passing)

### 8. Env Vars in Vercel
Configured:
- VITE_VARIANT, GROQ_API_KEY, OPENROUTER_API_KEY, FINNHUB_API_KEY
- AISSTREAM_API_KEY, NASA_FIRMS_API_KEY, CLOUDFLARE_API_TOKEN
- UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN

Not configured (empty/pending):
- ACLED_EMAIL, ACLED_PASSWORD, ACLED_ACCESS_TOKEN

---

## COMPLETED THIS SESSION (2026-03-17 — Session 3: Telegram OSINT Relay)

### 9. Telegram OSINT Relay Setup
- Generated TELEGRAM_SESSION via `scripts/telegram/session-auth.mjs` (GramJS MTProto StringSession)
- Configured Railway relay (`scripts/ais-relay.cjs`) with custom start command: `node scripts/ais-relay.cjs`
- Generated RELAY_SHARED_SECRET for authenticated relay ↔ Vercel communication
- **Railway env vars added:**
  - TELEGRAM_API_ID, TELEGRAM_API_HASH, TELEGRAM_SESSION
  - TELEGRAM_CHANNEL_SET=full (34 OSINT channels)
  - RELAY_SHARED_SECRET
- **Vercel env vars added:**
  - WS_RELAY_URL=https://vg-intelligence-terminal-production.up.railway.app
  - RELAY_SHARED_SECRET (matching Railway)
- Railway URL: `https://vg-intelligence-terminal-production.up.railway.app`
- 34 curated Telegram channels configured across 8 topics: breaking, conflict, alerts, osint, politics, middleeast, cyber, geopolitics
- Channel tiers: 1 Tier-1 (VahidOnline), 12 Tier-2, 21 Tier-3
- Polling: 60s cycle, 15s per-channel timeout, 800ms rate limit, 200-item rolling buffer
- **Status: LIVE AND VERIFIED**
  - Health check confirmed: 34 channels, 200 items buffered, no errors
  - Auth (x-relay-key) verified working between Vercel ↔ Railway
  - Fixed trailing-space bug in RELAY_SHARED_SECRET on Railway (caused 401s)
  - Fixed Railway port mismatch: relay listens on 8080, not 3004
  - Fixed Railway start command: was running Caddy, now `node scripts/ais-relay.cjs`
  - Vercel redeployed with WS_RELAY_URL + RELAY_SHARED_SECRET env vars

---

## COMPLETED THIS SESSION (2026-03-18 — Session 4: Upstash Redis on Railway)

### 10. Upstash Redis Integration on Railway
- Added `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to Railway env vars (matching Vercel)
- Fixed leading-space bug in both env var values (caused `UPSTASH_REDIS_REST_URL must start with https://` error — same class of bug as Session 3's RELAY_SHARED_SECRET trailing-space issue)
- Installed Railway CLI (`@railway/cli@4.31.0`) globally
- **All 16+ seed services now active and writing to Redis:**

| Service | Status | Details |
|---|---|---|
| Weather | OK | 50 alerts |
| Satellites | OK | 97 TLEs |
| Spending | OK | 15 awards ($132.7B) |
| Corridor Risk | OK | 5 corridors |
| PortWatch | OK | 13 chokepoints |
| Transit Summary | OK | 13 + 15 summaries |
| Tech Events | OK | 123 events (21 Techmeme + 100 dev.events) |
| World Bank | OK | 255 countries, 4 progress indicators, 7 renewable regions |
| Market | OK | 28 quotes, 6 commodities, 12 sectors, 14 Gulf, 10 ETFs, 10 crypto, 5 stablecoins |
| Positive Events | OK | 137 events |
| Telegram | OK | 34/34 channels, 556 msgs |
| AIS | OK | 16,600+ vessels, 40k+ messages |

- **Services still disabled (missing env vars/keys):**

| Service | Missing | How to get |
|---|---|---|
| UCDP | `UCDP_ACCESS_TOKEN` | Request API token at https://ucdp.uu.se/apidocs/ |
| Theater Posture | (FIXED) OpenSky anon fallback + Wingbits sub-box splitting deployed | Keys configured, code fix in `cb45bc7f`, awaiting Railway redeploy verification |
| OREF | `OREF_PROXY_AUTH` | Israel OREF alert proxy auth credentials |
| Crypto/Stablecoin | (working via fallback) | CoinGecko rate-limited, falls back to CoinPaprika successfully |
| ACLED | `ACLED_EMAIL`, `ACLED_PASSWORD`, `ACLED_ACCESS_TOKEN` | Pending approval — add to both Vercel + Railway when received |

- Relay stable at 158MB RSS, no memory issues
- Market re-seeds on ~5min interval confirmed working

---

## COMPLETED THIS SESSION (2026-03-18 — Session 5: Domain Launch + Strategic Posture Fix)

### 11. Custom Domain — intel.veritasglobal.co LIVE
- Domain added in Vercel dashboard with SSL cert provisioned
- DNS configured in Kinsta (CNAME record)
- **Site live at https://intel.veritasglobal.co**

### 12. API Keys Obtained & Configured
- **WINGBITS_API_KEY** — Starter tier ($25/mo, 20,000 req/mo, 12 req/min, 150 NM max range)
  - Added to Railway env vars
- **OpenSky Network** — Free account registered (randy.cook@veritasglobal.co)
  - `OPENSKY_CLIENT_ID` = `randy.cook@veritasglobal.co-api-client`
  - `OPENSKY_CLIENT_SECRET` — generated via Reset Credential, added to Railway
  - OPENSKY_API_DEFAULT role (4,000 credits)

### 13. AI Strategic Posture Widget — Diagnosed & Fixed
- **Root cause 1: OpenSky OAuth2 TIMEOUT** — `auth.opensky-network.org` unreachable from Railway (all 3 auth attempts timing out every 10-minute seed cycle). No anonymous fallback existed in the relay's `fetchTheaterFlightsFromOpenSky()`.
- **Root cause 2: Wingbits 400 Bad Request** — Theater bounding boxes exceeded Starter tier's 150 NM max range (e.g., Iran theater = 2,100 NM wide). API rejected every request.
- **Fix 1:** Added anonymous OpenSky fallback — when OAuth2 token fails, seed now fetches directly from `opensky-network.org/api/states/all` without auth (lower rate limits but functional)
- **Fix 2:** Added `splitTheaterIntoSubBoxes()` function — splits 9 theater bounding boxes into ≤140 NM sub-boxes (196 total), queries Wingbits in chunks of 10 with 500ms spacing between chunks
- **Commit:** `cb45bc7f` — fix: OpenSky anonymous fallback + Wingbits 150NM box splitting
- **Status: VERIFIED AND LIVE**
  - OpenSky anonymous fallback working: WESTERN 1,297 states, PACIFIC 165 states
  - 37 military flights classified, 9 theaters seeded (1 elevated), redis: OK
  - OpenSky OAuth2 returning `unauthorized_client` (401) — credentials may need regen, but anonymous fallback is functional
  - Wingbits not erroring (OpenSky provided sufficient data before Wingbits needed)

### 14. WordPress Site
- Coworker working on WordPress site update in parallel

---

## COMMITS MADE
1. `b8da9f86` — feat: complete Veritas Global rebrand (283 files)
2. `ebcf4103` — fix: remove unused BETA_MODE import
3. `76aa5453` — fix: remove dead code in middleware
4. `5ba74faa` — fix: update failing tests for Veritas rebrand
5. `cb45bc7f` — fix: OpenSky anonymous fallback + Wingbits 150NM box splitting

---

## TODO NEXT SESSION

### Immediate:
1. **Verify Strategic Posture panel** — Confirm theater posture data renders after Railway redeploy with OpenSky/Wingbits fixes
2. **Verify frontend panels** — Full browser review at intel.veritasglobal.co: market, weather, satellites, cyber, maritime, Telegram OSINT
3. **settings.html / live-channels.html** — Quick visual check on secondary pages
4. **OpenSky auth investigation** — Determine why `auth.opensky-network.org` times out from Railway (possible geo-block or DNS issue); anonymous fallback works but authenticated gives higher rate limits

### API Keys Still Needed:
1. **UCDP_ACCESS_TOKEN** — https://ucdp.uu.se/apidocs/ — enables UCDP conflict event data (add to Railway)
2. **OREF_PROXY_AUTH** — Israel residential proxy (`user:pass@host:port`) — enables real-time OREF siren alerts (add to Railway)
3. **ACLED keys** — `ACLED_EMAIL`, `ACLED_PASSWORD`, `ACLED_ACCESS_TOKEN` — pending approval, add to both Vercel + Railway when received

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
- WordPress site update, launch

---

## KEY PATHS
- Project: `C:\Users\mrcoo\VG-Intelligence-Terminal\`
- Project docs: `C:\Users\mrcoo\VG_World Monitor Project\`
- Brand guide: `Branding/Veritas Global_Brand Guide_Final.pdf`
- Logos: `Branding/Logos/`, `public/veritas-*.png`
- Favicons: `public/favico/` (all regenerated with Veritas branding)
- Vercel project: `randy-cooks-projects/vg-intelligence-terminal`
- Railway relay: `https://vg-intelligence-terminal-production.up.railway.app`
- Live site: https://intel.veritasglobal.co
- Vercel preview: https://vg-intelligence-terminal.vercel.app
- Telegram channels config: `data/telegram-channels.json`
- Telegram session auth: `scripts/telegram/session-auth.mjs`
- Relay entry point: `scripts/ais-relay.cjs`

## BRAND SPECS
- Gold: #CCA55A | Dark gold: #7C5B2E | Light gold: #E6D39C
- Background: #0B0F14 | Surface: #141924
- Blue light: #AED6E9 | Teal: #457580
- Fonts: Inter (UI), IBM Plex Sans (body), JetBrains Mono (mono)
- Domain: intel.veritasglobal.co
- Repo: Rans-tech/VG-Intelligence-Terminal
