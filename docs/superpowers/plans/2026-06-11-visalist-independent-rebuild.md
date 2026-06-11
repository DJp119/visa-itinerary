# Astro VisaList-Core Independent Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an Astro-first, SEO-first travel visa discovery platform that preserves VisaList's core structure, interaction model, page hierarchy, responsive behavior, and product functionality while using original code, original brand assets, original copy, and licensed/open data.

**Architecture:** Use Astro as the primary framework for static-first, content-first rendering. Render all public content routes as Astro pages and layouts with build-time data wherever possible. Use React islands only for interactive UI that actually needs client state: comboboxes, filters, drawers, tabs, modals, toasts, load-more controls, widget builder, auth/account surfaces, and charts. Use server islands or SSR endpoints only for personalized/account data and data that must be fresh at request time.

**Tech Stack:** Astro latest stable via `npm create astro@latest`, TypeScript strictest, Tailwind CSS, Astro Content Collections, Astro Assets, `@astrojs/react`, `@astrojs/sitemap`, MDX, React, Radix/shadcn-style React islands, Framer Motion for hydrated islands only, Zod, React Hook Form, Fuse.js or MiniSearch for client-side search, Playwright, Vitest, Testing Library, axe-core, Cloudflare Pages/Workers adapter, optional Drizzle plus PostgreSQL/Neon for production data.

---

## 1. Source Evidence and Product Boundary

### 1.1 Evidence inspected

- Local screenshots:
  - `D:\Clones\Visa\visalist-homepage-final.png`, 1283 x 6366.
  - `D:\Clones\Visa\visalist-viewport-final.png`, 1295 x 809.
- Live public homepage HTML/CSS and client bundle metadata.
- Public Nuxt route manifest.
- Representative public pages for home, hubs, directories, rankings, country details, visa details, passport details, travel guide, embassies, customs, visa policy, integrate, widget, pricing, login, and open metrics.
- Official Astro documentation consulted for:
  - content collections,
  - sitemap generation,
  - server islands,
  - view transitions.

### 1.2 Non-negotiable independence rules

- Do not copy VisaList source code, Nuxt bundle code, brand name, logo, photos, testimonials, text, or protected data.
- Recreate the core product structure and UX principles with new implementation and new assets.
- Use original product naming and original content voice.
- Use open/licensed data with attribution and `verifiedAt` timestamps.
- Include legal disclaimers. The product is a planning aid, not official immigration advice.
- Build route and interaction parity, not intellectual-property parity.

### 1.3 Why Astro is the chosen upgrade

- Visa/passport/travel data pages are content-heavy and search-index-driven.
- Astro ships static HTML by default and hydrates only chosen islands.
- Content collections provide schema-validated, build-time content and data.
- Static route generation plus `@astrojs/sitemap` is a stronger SEO fit than a fully hydrated SPA.
- Server islands allow account/personalized pieces without turning public pages into dynamic app pages.

---

## 2. Full Observed Route Parity

Implement all route families below. Use target routes that are clean and original. Add redirects from alternate/singular paths only when useful for SEO.

### 2.1 Public marketing and product routes

| Observed route | Target route | Template | Required features |
|---|---|---|---|
| `/` | `/` | Homepage | Search hero, metrics, press strip, rails, testimonials, CTA, FAQ |
| `/about` | `/about` | Utility page | Brand story, mission, trust, footer |
| `/contact` | `/contact` | Utility/contact | Contact copy, feedback form, support links |
| `/pricing` | `/pricing` | Pricing | Plan cards, FAQ, account CTA |
| `/login` | `/login` | Auth | Google/Facebook/Microsoft buttons, redirect handling |
| `/open` | `/open` | Open metrics | Users/views/revenue/distribution charts |
| `/integrate` | `/integrate` | Integration | API pitch, widget pitch, widget builder, iframe code |
| `/widget` | `/widget` | Embeddable widget | Origin/destination selectors, requirement result, powered-by link |
| `/preview/visa` | `/preview/visa` | Preview/embed | Minimal SEO/social preview layout |

### 2.2 Visa routes

| Observed route | Target route | Template | Required features |
|---|---|---|---|
| `/visa` | `/visa` | Hub | Visa types, common visas, powerful visas, issuing methods, FAQ |
| `/visa/tourist` | `/visa/tourist` | Directory | Search, filters, country cards, load more |
| `/visa/transit` | `/visa/transit` | Directory | Search, filters, country cards, load more |
| `/visa/digital-nomad` | `/visa/digital-nomad` | Directory | Search, filters, nomad visa cards, FAQ |
| `/visa/exemption` | `/visa/exemptions` | Directory | Exemption cards, powerful visa relationships |
| `/visa/policies` | `/visa/policies` | Directory | Country visa policy cards |
| `/visa/powerful` | `/visa/powerful` | Directory | Powerful visa cards and benefits copy |
| `/visa/ranking/:filter?` | `/visa/rankings/:filter?` | Ranking | Openness ranks, methodology, filters |
| `/visa/travel/:visa/:filter?` | `/visa/travel/:visaSlug/:filter?` | Powerful visa destinations | Search, sort, eligible countries, FAQ |
| `/visa/questions` | `/visa/questions` | Q&A | Searchable Q&A/FAQ, ask-question gate |

### 2.3 Passport routes

| Observed route | Target route | Template | Required features |
|---|---|---|---|
| `/passport` | `/passport` | Hub | Passport types, features, details, freedom, FAQ |
| `/passport/ranking/:filter?` | `/passport/rankings/:filter?` | Ranking | Passport rank cards, methodology |
| `/passport/freedom` | `/passport/freedom` | Finder | Destination cards by passport and visa type |

### 2.4 Travel routes

| Observed route | Target route | Template | Required features |
|---|---|---|---|
| `/travel` | `/travel` | Travel hub/home alias | Same discovery homepage or travel hub CTA |
| `/travel/advice` | `/travel/advice` | Directory | Advice cards, risk filter, search |
| `/travel/embassies` | `/travel/embassies` | Directory | Embassy country cards, search |
| `/travel/information` | `/travel/information` | Directory | Travel information cards, search |

### 2.5 Country routes

Use `src/pages/[country]/...` in Astro. `country` is the country slug.

| Observed route | Target route | Template | Required features |
|---|---|---|---|
| `/:country/tourist` | `/:country/tourist` | Passport destination list | All visas filter, distance sort, details buttons |
| `/:country/transit` | `/:country/transit` | Passport transit list | Transit requirements, distance sort |
| `/:country/digital-nomad` | `/:country/digital-nomad` | Passport nomad list | Available visas, distance sort |
| `/:country/tourist-visa/:origin?` | `/:country/tourist-visa/:origin?` | Visa detail | Variant tabs, conditions, documents, apply CTA |
| `/:country/transit-visa/:origin?` | `/:country/transit-visa/:origin?` | Transit detail | Conditions, documents, travel details |
| `/:country/digital-nomad-visa/:origin?` | `/:country/digital-nomad-visa/:origin?` | Nomad detail | Eligibility, requirements, process |
| `/:country/tourist-visa/questions` | `/:country/tourist-visa/questions` | Country Q&A | Visa-specific questions |
| `/:country/tourist-visa/visa-exemption` | `/:country/tourist-visa/visa-exemption` | Exemption detail | Powerful visa exemptions, conditions |
| `/:country/tourist-visa/visa-policy` | `/:country/tourist-visa/visa-policy` | Policy alias | Redirect/canonical to `/:country/visa-policy` |
| `/:country/passport` | `/:country/passport` | Passport detail | Passport details, ranking, how to apply |
| `/:country/visa` | `/:country/visa` | Visa guide | Visa details, ranking, advice, travel cards |
| `/:country/visa-policy/:filter?` | `/:country/visa-policy/:filter?` | Policy result list | Visa policy by destination |
| `/:country/visa-requirements/:origin?/:filter?` | `/:country/visa-requirements/:origin?/:filter?` | Requirement alias | Canonical to visa detail when possible |
| `/:country/travel` | `/:country/travel` | Travel guide | Advice, weather, essentials, money, internet, driving, map |
| `/:country/travel/advice/:filter?` | `/:country/travel/advice/:filter?` | Travel guide section | Canonical to travel guide with section state |
| `/:country/travel/alert/:filter?` | `/:country/travel/alert/:filter?` | Travel guide section | Alert/risk section |
| `/:country/travel/open/:filter?` | `/:country/travel/open/:filter?` | Travel guide section | Entry/open status section |
| `/:country/travel/restrictions/:filter?` | `/:country/travel/restrictions/:filter?` | Travel guide section | Restrictions section |
| `/:country/embassy/:filter?` | `/:country/embassy/:filter?` | Embassy detail/list | Embassy/consulate list and details |
| `/:country/customs/:filter?` | `/:country/customs/:filter?` | Customs detail | Import/export, free/prohibited/restricted items |
| `/:country/health` | `/:country/health` | Health/travel health | Health risks, vaccines, emergency info |

---

## 3. Astro Project Structure

```text
.
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── playwright.config.ts
├── vitest.config.ts
├── tailwind.config.ts
├── src/
│   ├── content.config.ts
│   ├── env.d.ts
│   ├── middleware.ts
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── pricing.astro
│   │   ├── login.astro
│   │   ├── open.astro
│   │   ├── integrate.astro
│   │   ├── widget.astro
│   │   ├── preview/
│   │   │   └── visa.astro
│   │   ├── visa/
│   │   ├── passport/
│   │   ├── travel/
│   │   ├── user/
│   │   └── [country]/
│   ├── layouts/
│   │   ├── SiteLayout.astro
│   │   ├── DirectoryLayout.astro
│   │   ├── DetailLayout.astro
│   │   ├── EmbedLayout.astro
│   │   └── AccountLayout.astro
│   ├── components/
│   │   ├── astro/
│   │   ├── shell/
│   │   ├── home/
│   │   ├── directory/
│   │   ├── detail/
│   │   ├── product/
│   │   ├── widget/
│   │   ├── account/
│   │   ├── islands/
│   │   └── ui/
│   ├── content/
│   │   ├── editorial/
│   │   ├── faq/
│   │   ├── legal/
│   │   └── pricing/
│   ├── data/
│   │   ├── fixtures/
│   │   └── repositories/
│   ├── lib/
│   │   ├── analytics/
│   │   ├── auth/
│   │   ├── config/
│   │   ├── geo/
│   │   ├── seo/
│   │   ├── search/
│   │   ├── schemas/
│   │   ├── urls/
│   │   └── utils/
│   └── styles/
│       ├── globals.css
│       └── tokens.css
├── public/
│   ├── brand/
│   ├── countries/
│   ├── passports/
│   ├── press/
│   └── widget/
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── accessibility/
│   └── e2e/
└── docs/
    ├── architecture.md
    ├── data-sources.md
    ├── seo.md
    ├── accessibility.md
    └── deployment.md
```

---

## 4. Modern Upgraded Tech Stack Decisions

### 4.1 Core framework

- Astro latest stable, installed with `npm create astro@latest`.
- TypeScript strictest Astro config.
- `output: "hybrid"` so public pages prerender and protected/account/API/widget dynamic routes can SSR.
- Cloudflare adapter for SSR/server islands and edge delivery.
- `@astrojs/sitemap` with configured `site`.
- `@astrojs/react` for hydrated islands.
- `@astrojs/mdx` for editorial content.
- `astro:assets` for optimized local assets.

### 4.2 UI and styling

- Tailwind CSS.
- CSS tokens in `src/styles/tokens.css`.
- Astro components for static layout/card/prose pieces.
- React + Radix/shadcn-style islands for:
  - combobox,
  - dialog,
  - drawer,
  - popover,
  - tabs,
  - accordion,
  - toast,
  - select,
  - tooltip,
  - command palette/search.
- Lucide icons.
- Framer Motion only inside client islands.

### 4.3 Data and content

- Astro Content Collections for editorial pages, FAQs, pricing copy, legal copy, country profiles, and static data bundles.
- Zod schemas shared between collections, repositories, and form/API validation.
- Local JSON fixtures for first release.
- Optional production adapter:
  - Drizzle ORM,
  - Neon/PostgreSQL,
  - Cloudflare D1 for smaller relational deployment,
  - Cloudflare KV/R2 for cached JSON/index assets.
- Search:
  - build-time MiniSearch/Fuse index JSON for static country/visa search,
  - server endpoint only when query complexity exceeds static index needs.

### 4.4 Auth, account, and payments

- Auth.js or Lucia-style provider abstraction with OAuth providers: Google, Facebook, Microsoft.
- Keep provider-specific code behind `src/lib/auth/provider.ts`.
- Payments/subscriptions behind `src/lib/billing/provider.ts`.
- Use Stripe or Lemon Squeezy only when actual account billing is required. Until then, pricing is static and subscription status is fixture/dev.

### 4.5 Monitoring and analytics

- Privacy-first analytics adapter:
  - Cloudflare Web Analytics, Plausible, or Vercel Analytics equivalent.
- Error reporting adapter:
  - Sentry or console/no-op in dev.
- All analytics events typed and scrubbed of passport number, precise location, email, or sensitive immigration details.

---

## 5. Design System Specification

### 5.1 Reference feel to preserve

- Dark, soft, rounded, travel-discovery feel.
- Sticky translucent header.
- Big centered search hero.
- Pill-shaped controls.
- Horizontal card rails.
- Card imagery with dark hover overlay.
- Blue primary, amber CTA, green apply/load-more.
- Dense directory cards with travel facts.
- Long-form detail pages with anchors and FAQ.
- Rounded blue footer.

### 5.2 Tokens

```css
:root {
  --header-height: 4rem;
  --container-max: 80rem;
  --content-max: 64rem;
  --reading-max: 48rem;
  --rail-card-w: 15.625rem;
  --rail-card-h: 15.625rem;
  --passport-card-h: 21.875rem;

  --color-gray-50: 250 250 250;
  --color-gray-100: 245 245 245;
  --color-gray-200: 229 229 229;
  --color-gray-300: 212 212 212;
  --color-gray-400: 163 163 163;
  --color-gray-500: 115 115 115;
  --color-gray-600: 82 82 82;
  --color-gray-700: 64 64 64;
  --color-gray-800: 38 38 38;
  --color-gray-900: 23 23 23;
  --color-gray-950: 10 10 10;

  --color-primary-50: 240 248 255;
  --color-primary-100: 224 240 254;
  --color-primary-200: 185 226 254;
  --color-primary-300: 124 203 253;
  --color-primary-400: 54 178 250;
  --color-primary-500: 12 153 235;
  --color-primary-600: 0 113 188;
  --color-primary-700: 1 95 163;
  --color-primary-800: 6 81 134;
  --color-primary-900: 11 68 111;
  --color-primary-950: 7 43 74;

  --background: 10 10 10;
  --foreground: 229 229 229;
  --surface: 23 23 23;
  --surface-muted: 38 38 38;
  --border: 38 38 38;
  --footer: 2 46 79;
  --accent: 245 158 11;
  --success: 34 197 94;
  --danger: 239 68 68;
  --warning: 245 158 11;
}
```

### 5.3 Layout

- Main container: `max-width: 80rem`, centered.
- Page padding: 16px mobile, 24px tablet, 32px desktop.
- Header height: 64px.
- Header z-index: 50.
- Drawer z-index: 55.
- Popover z-index: 60.
- Modal z-index: 70.
- Toast z-index: 80.
- Rail cards: 250px x 250px.
- Passport cards: 250px x 350px.
- Detail prose: max 768px.
- Detail supporting sections: max 1024px.

### 5.4 Typography

- Font: Nunito for product parity. Use `@fontsource/nunito` or Astro-integrated font loading to avoid runtime font CSS fetch if desired.
- Body: 16px/24px.
- Small text: 14px/20px.
- Card titles: 20px/28px, 600/700.
- Directory title: 24px/32px.
- Detail title: 30px/36px mobile, 36px/40px desktop.
- Hero title: 32px mobile, 40px desktop where viewport allows.

### 5.5 Motion

- `shine`: 3s ease-in-out infinite alternate.
- `fadein`: 2s ease.
- `infinitescroll`: 45s linear infinite.
- `pulse`: 2s cubic-bezier(.4, 0, .6, 1) infinite.
- `spin`: 1s linear infinite.
- Common UI transition: 150-200ms.
- Card overlay transition: 500ms.
- Respect `prefers-reduced-motion`; disable marquee, shine, view transitions, and transform animations.

---

## 6. Component Inventory

### 6.1 Static Astro components

- `SiteHeader.astro`
- `SiteFooter.astro`
- `BrandMark.astro`
- `Breadcrumbs.astro`
- `Container.astro`
- `SectionHeader.astro`
- `Rail.astro`
- `RailCard.astro`
- `PassportCard.astro`
- `MetricStrip.astro`
- `PressStrip.astro`
- `TestimonialCard.astro`
- `MembershipBanner.astro`
- `DirectoryCard.astro`
- `RankingCard.astro`
- `PolicyCard.astro`
- `EmbassyCard.astro`
- `DetailHero.astro`
- `SectionNavStatic.astro`
- `RequirementChecklist.astro`
- `TravelDetailsGrid.astro`
- `CustomsRules.astro`
- `HealthPanel.astro`
- `NearbyRail.astro`
- `PricingCard.astro`
- `OpenMetricPanel.astro`
- `SeoJsonLd.astro`

### 6.2 React islands

- `MobileNavDrawer.tsx`
- `ShareMenu.tsx`
- `ThemeSelector.tsx`
- `LocaleSelector.tsx`
- `CountryCombobox.tsx`
- `DiscoveryForm.tsx`
- `SearchAndFilters.tsx`
- `LoadMoreResults.tsx`
- `Tabs.tsx`
- `Accordion.tsx`
- `AskQuestionDialog.tsx`
- `ContactForm.tsx`
- `LoginProviders.tsx`
- `AccountProfileForm.tsx`
- `SubscriptionManager.tsx`
- `WidgetBuilder.tsx`
- `EmbeddableChecker.tsx`
- `OpenMetricsChart.tsx`
- `ToastProvider.tsx`

### 6.3 State matrix

Every interactive component must implement:

- default,
- hover,
- focus-visible,
- active/pressed,
- disabled,
- loading,
- empty,
- error.

Every modal/drawer/popover must implement:

- focus trap,
- Escape close,
- outside click close where safe,
- return focus to trigger,
- body scroll lock,
- accessible title/description.

Every list/search surface must implement:

- initial server-rendered results,
- no results,
- filtered URL state,
- load more,
- skeleton/fallback,
- `aria-live` result update.

---

## 7. Data Model

### 7.1 Core types

```ts
export type Country = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  iso2: string;
  iso3: string;
  region: string;
  subregion: string;
  capital: string;
  population: number;
  currencyCode: string;
  currencyName: string;
  languages: string[];
  coordinates: { lat: number; lng: number };
  heroImage: string;
  passportImage?: string;
};

export type VisaKind = "tourist" | "transit" | "digital-nomad";

export type RequirementKind =
  | "visa-free"
  | "visa-on-arrival"
  | "evisa"
  | "sticker-visa"
  | "visa-refused"
  | "not-available";

export type VisaRequirement = {
  id: string;
  destinationCountryId: string;
  passportCountryId: string;
  kind: VisaKind;
  requirement: RequirementKind;
  stayDays?: number;
  processingDays?: { min: number; max: number };
  fee?: { amount: number; currencyCode: string };
  applicationUrl?: string;
  conditions: string[];
  documents: string[];
  sourceUrls: string[];
  verifiedAt: string;
  confidence: "official" | "partner" | "community-review" | "unknown";
};

export type TravelSafetyStatus =
  | "normal"
  | "stay-alert"
  | "reconsider"
  | "avoid-travel"
  | "unknown";

export type DirectorySearchParams = {
  q?: string;
  passport?: string;
  origin?: string;
  requirement?: RequirementKind;
  region?: string;
  safety?: TravelSafetyStatus;
  sort?: "relevance" | "distance" | "easiest" | "rank" | "alphabetical";
  page?: number;
};
```

### 7.2 Additional domain types

- `PassportRanking`
- `VisaOpennessRanking`
- `PowerfulVisa`
- `Embassy`
- `TravelGuide`
- `CustomsGuide`
- `HealthGuide`
- `VisaPolicyEntry`
- `PricingPlan`
- `OpenMetric`
- `QuestionAnswer`
- `WidgetConfig`
- `GatedContentPolicy`
- `SourceAttribution`

### 7.3 Repository modules

- `countryRepository`
- `visaRepository`
- `passportRepository`
- `travelRepository`
- `embassyRepository`
- `customsRepository`
- `healthRepository`
- `pricingRepository`
- `metricsRepository`
- `questionRepository`
- `widgetRepository`

All repositories must expose a fixture-backed implementation first and accept a future database implementation behind the same interface.

---

## 8. SEO Requirements

### 8.1 Metadata

Every page must define:

- title,
- description,
- canonical,
- robots policy,
- Open Graph title/description/image,
- Twitter card,
- locale alternates when locales are enabled.

### 8.2 Structured data

Use JSON-LD:

- `WebSite` and `SearchAction` on homepage.
- `Organization` globally.
- `BreadcrumbList` on all nested pages.
- `FAQPage` where FAQ content is visible.
- `ItemList` for directories/rankings.
- `Article` for travel/customs/health guides.
- `Product` or `Offer` for pricing only if real plans exist.

### 8.3 Sitemap

- Use `@astrojs/sitemap`.
- Configure `site` in `astro.config.mjs`.
- Generate static paths for all known country/visa/passport/travel routes.
- Exclude empty filtered pages.
- Add custom pages for canonical dynamic search URLs if generated outside normal pages.
- Split sitemap if URL count becomes large.

### 8.4 Canonical and noindex policy

- Canonical country detail pages to the clean route without unnecessary filters.
- Canonical aliases:
  - `/:country/visa-requirements` to the matching visa detail when possible.
  - `/:country/tourist-visa/visa-policy` to `/:country/visa-policy`.
  - travel subsection aliases to `/:country/travel` with hash/section metadata if content is identical.
- `noindex`:
  - empty filter combinations,
  - account pages,
  - widget if embedded-only,
  - preview pages unless used for share previews.

---

## 9. Implementation Tasks

### Task 1: Astro foundation

**Files:**
- Create: `astro.config.mjs`
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `src/styles/globals.css`
- Create: `src/styles/tokens.css`
- Create: `src/env.d.ts`

- [ ] Scaffold Astro with strict TypeScript.
- [ ] Add integrations: React, Tailwind, MDX, Sitemap, Cloudflare adapter.
- [ ] Add scripts: `dev`, `build`, `preview`, `check`, `test`, `test:e2e`, `verify`.
- [ ] Configure `output: "hybrid"`.
- [ ] Configure site URL from `PUBLIC_SITE_URL`.
- [ ] Add global CSS reset, dark theme variables, and token classes.
- [ ] Run `npm run check` and `npm run build`; both must pass.

### Task 2: Content collections and schemas

**Files:**
- Create: `src/content.config.ts`
- Create: `src/lib/schemas/*.ts`
- Create: `src/content/editorial/*`
- Create: `src/content/faq/*`
- Create: `src/content/legal/*`
- Create: `src/data/fixtures/*`

- [ ] Define Zod schemas for all domain entities.
- [ ] Create collections for editorial, FAQ, legal, pricing, countries, visas, passports, travel, customs, health, embassies.
- [ ] Add original fixture data covering at least 30 countries and all route templates.
- [ ] Add source attribution and `verifiedAt` to every travel/visa/customs/health data record.
- [ ] Add unit tests for schema success/failure cases.

### Task 3: Repositories and route path generation

**Files:**
- Create: `src/data/repositories/*.ts`
- Create: `src/lib/urls/routes.ts`
- Create: `src/lib/urls/static-paths.ts`
- Create: `tests/unit/static-paths.test.ts`

- [ ] Implement repository interfaces.
- [ ] Implement filtering, sorting, pagination, and distance calculation.
- [ ] Implement `getStaticPaths` helpers for country, visa, passport, powerful visa, and filter routes.
- [ ] Add canonical URL builders for every route family.
- [ ] Test all observed route families generate expected paths.

### Task 4: Shell, navigation, footer

**Files:**
- Create: `src/layouts/SiteLayout.astro`
- Create: `src/components/shell/*`
- Create: `src/components/islands/MobileNavDrawer.tsx`
- Create: `src/components/islands/ThemeSelector.tsx`
- Create: `src/components/islands/LocaleSelector.tsx`
- Create: `src/components/islands/ShareMenu.tsx`

- [ ] Implement sticky translucent 64px header.
- [ ] Implement mobile drawer with full keyboard support.
- [ ] Implement share menu.
- [ ] Implement theme and locale selectors.
- [ ] Implement footer with Visa, Passport, Travel groups, brand statement, social labels, copyright.
- [ ] Add skip link.
- [ ] E2E test at 320, 768, 1280 widths.

### Task 5: SEO helpers

**Files:**
- Create: `src/lib/seo/meta.ts`
- Create: `src/lib/seo/jsonLd.ts`
- Create: `src/components/astro/SeoJsonLd.astro`
- Modify: `astro.config.mjs`

- [ ] Build metadata helper.
- [ ] Build JSON-LD helpers.
- [ ] Configure sitemap.
- [ ] Add tests for canonical, ItemList, FAQPage, BreadcrumbList, and noindex behavior.

### Task 6: Homepage

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/components/home/*`
- Create: `src/components/islands/DiscoveryForm.tsx`
- Create: `src/components/islands/CountryCombobox.tsx`

- [ ] Implement hero with animated gradient title and pointer glow on desktop.
- [ ] Implement intent and passport comboboxes.
- [ ] Implement search routing.
- [ ] Implement metrics, press strip, rails, testimonials, membership CTA, FAQ.
- [ ] Ensure static HTML renders meaningful content before hydration.
- [ ] Test search, reduced motion, rails, FAQ, and mobile layout.

### Task 7: Hub pages

**Files:**
- Create: `src/pages/visa/index.astro`
- Create: `src/pages/passport/index.astro`
- Create: `src/pages/travel/index.astro`
- Create: `src/components/astro/EditorialHub.astro`

- [ ] Build reusable hub layout.
- [ ] Add original explanatory copy.
- [ ] Add topic cards and FAQ.
- [ ] Add internal links to all directories and rankings.
- [ ] Test headings, metadata, and link validity.

### Task 8: Directory and ranking engine

**Files:**
- Create: `src/layouts/DirectoryLayout.astro`
- Create: `src/components/directory/*`
- Create: `src/components/islands/SearchAndFilters.tsx`
- Create: `src/components/islands/LoadMoreResults.tsx`
- Create: `src/lib/search/index.ts`

- [ ] Implement server-rendered initial results.
- [ ] Implement URL search params.
- [ ] Implement filter chips, sort, search, no-results, skeletons, load more.
- [ ] Implement card variants for destination, ranking, embassy, policy, powerful visa, customs, health.
- [ ] Test directory behavior with and without JavaScript.

### Task 9: Public directories and rankings

**Files:**
- Create all `src/pages/visa/*`, `src/pages/passport/*`, and `src/pages/travel/*` directory pages.

- [ ] Wire tourist/transit/digital-nomad visa directories.
- [ ] Wire visa exemptions, policies, powerful visas, visa rankings.
- [ ] Wire passport rankings and freedom finder.
- [ ] Wire travel advice, embassies, information.
- [ ] Add methodology/editorial sections below results.
- [ ] Add ItemList JSON-LD.

### Task 10: Country result pages

**Files:**
- Create: `src/pages/[country]/tourist.astro`
- Create: `src/pages/[country]/transit.astro`
- Create: `src/pages/[country]/digital-nomad.astro`
- Create: `src/pages/[country]/visa-policy/[filter].astro`

- [ ] Build passport-specific destination lists.
- [ ] Include all visas/available visa filters and distance sort.
- [ ] Include rich travel facts in cards: capital, region, development tag, population, language, currency conversion, safety, flight estimate, weather, time offset.
- [ ] Add Details actions linking to detail pages.
- [ ] Add Load More and SEO metadata.

### Task 11: Rich detail engine

**Files:**
- Create: `src/layouts/DetailLayout.astro`
- Create: `src/components/detail/*`
- Create: `src/components/islands/Tabs.tsx`
- Create: `src/components/islands/Accordion.tsx`
- Create: `src/components/islands/AskQuestionDialog.tsx`

- [ ] Implement centered title, breadcrumb, last-updated line, disclaimer.
- [ ] Implement sticky desktop section nav and mobile "In this page" drawer.
- [ ] Implement tabs for visa variants.
- [ ] Implement conditions, documents, application steps, travel details, advice, FAQ, nearby rail.
- [ ] Implement gated content overlay.
- [ ] Test anchor offsets, keyboard tabs, accordion, and dialog.

### Task 12: Country detail routes

**Files:**
- Create all `src/pages/[country]/*` detail route files.

- [ ] Tourist visa detail.
- [ ] Transit visa detail.
- [ ] Digital nomad visa detail.
- [ ] Tourist visa questions.
- [ ] Visa exemption detail.
- [ ] Passport detail.
- [ ] Visa guide.
- [ ] Travel guide.
- [ ] Embassy detail/list.
- [ ] Customs guide.
- [ ] Health guide.
- [ ] Travel advice/alert/open/restrictions aliases with canonical policy.

### Task 13: Widget and integration surfaces

**Files:**
- Create: `src/pages/integrate.astro`
- Create: `src/pages/widget.astro`
- Create: `src/pages/preview/visa.astro`
- Create: `src/components/widget/*`
- Create: `src/components/islands/WidgetBuilder.tsx`
- Create: `src/components/islands/EmbeddableChecker.tsx`

- [ ] Implement API marketing section.
- [ ] Implement widget builder with origin, destination, show header, dark mode, theme color, generated iframe.
- [ ] Implement embeddable checker with minimal CSS and fixed-height safe layout.
- [ ] Implement powered-by link.
- [ ] Ensure widget works in iframe and does not depend on parent CSS.

### Task 14: Pricing, auth, account, membership

**Files:**
- Create: `src/pages/pricing.astro`
- Create: `src/pages/login.astro`
- Create: `src/pages/user/profile.astro`
- Create: `src/pages/user/subscription.astro`
- Create: `src/layouts/AccountLayout.astro`
- Create: `src/lib/auth/*`
- Create: `src/lib/billing/*`
- Create: `src/components/account/*`
- Create: `src/components/islands/LoginProviders.tsx`

- [ ] Implement pricing cards and FAQ.
- [ ] Implement OAuth provider buttons.
- [ ] Implement protected account layout.
- [ ] Implement profile and subscription surfaces.
- [ ] Implement membership gate for supplemental content.
- [ ] Keep essential visa safety information public.

### Task 15: Open metrics

**Files:**
- Create: `src/pages/open.astro`
- Create: `src/components/product/OpenMetricPanel.astro`
- Create: `src/components/islands/OpenMetricsChart.tsx`
- Create: `src/data/repositories/metricsRepository.ts`

- [ ] Implement users, views, revenue, distribution metric sections.
- [ ] Render static metric summaries in HTML.
- [ ] Hydrate charts with `client:visible`.
- [ ] Add source labels for analytics/payment/uptime providers as original equivalents.

### Task 16: Forms, Q&A, errors, toasts

**Files:**
- Create: `src/pages/contact.astro`
- Create: `src/pages/visa/questions.astro`
- Create: `src/components/islands/ContactForm.tsx`
- Create: `src/components/islands/AskQuestionDialog.tsx`
- Create: `src/components/islands/ToastProvider.tsx`
- Create: `src/pages/404.astro`
- Create: `src/pages/500.astro`

- [ ] Implement contact form.
- [ ] Implement Q&A search and ask-question flow.
- [ ] Implement validation and rate-limit adapter.
- [ ] Implement toast, alert, empty, error, skeleton states.
- [ ] Test validation, focus, and announcements.

### Task 17: Accessibility, visual, and performance verification

**Files:**
- Create: `tests/accessibility/*.spec.ts`
- Create: `tests/e2e/*.spec.ts`
- Create: `tests/unit/*.test.ts`

- [ ] Add axe tests for every template family.
- [ ] Add keyboard tests for drawer, combobox, tabs, accordion, popover, modal, widget, filters.
- [ ] Add visual tests at 320, 360, 768, 1024, 1280, 1536.
- [ ] Add performance budget checks for JS per route.
- [ ] Add no-JS smoke tests for public static pages.

### Task 18: Documentation and deployment

**Files:**
- Create: `README.md`
- Create: `docs/architecture.md`
- Create: `docs/data-sources.md`
- Create: `docs/seo.md`
- Create: `docs/accessibility.md`
- Create: `docs/deployment.md`
- Create: `.env.example`

- [ ] Document setup and scripts.
- [ ] Document route templates.
- [ ] Document data sourcing and attribution.
- [ ] Document SEO rules.
- [ ] Document Cloudflare deployment.
- [ ] Document IP/content replacement rules.
- [ ] Run final verification.

```powershell
npm run check
npm run test
npm run build
npm run test:e2e
```

---

## 10. Acceptance Criteria

### 10.1 Functional

- Every route family in Section 2 exists or redirects canonically.
- Homepage search routes to correct directory/result pages.
- Directories support search, filters, sort, empty state, and load more.
- Detail pages support anchors, tabs, FAQ, gated content, related content.
- Widget works as standalone iframe.
- Login/account routes are protected where needed.
- Pricing and open metrics are present.

### 10.2 SEO

- Static HTML contains meaningful content on all public pages.
- Every page has title, description, canonical, and structured data where relevant.
- Sitemap contains all generated static country/visa/passport/travel pages.
- Duplicate aliases have canonical or redirect policy.
- Thin filter pages are noindex.

### 10.3 Accessibility

- WCAG 2.2 AA target.
- No critical or serious axe violations.
- Full keyboard support for all interactive islands.
- Touch targets at least 44px.
- Focus is visible.
- Reduced motion is respected.

### 10.4 Performance

- Public pages ship near-zero JavaScript unless interactive islands are visible/needed.
- Below-fold islands use `client:visible` or `client:idle`.
- Images are optimized and sized to avoid layout shift.
- Homepage LCP target: under 2.5s at p75.
- CLS target: under 0.1.
- INP target: under 200ms.

### 10.5 Independence

- No copied VisaList brand, copy, photos, testimonials, or proprietary data.
- Original assets are stored under `public/`.
- Source attribution exists for all travel/visa/legal-sensitive data.
- Legal disclaimer appears on visa/travel/customs/health pages.

---

## 11. Execution Order

1. Astro foundation.
2. Tokens and shell.
3. Schemas, content collections, repositories.
4. SEO helpers.
5. Homepage.
6. Directory engine.
7. Public hubs/directories.
8. Country result pages.
9. Detail engine and country detail routes.
10. Widget/integration.
11. Pricing/auth/account/membership.
12. Open metrics.
13. Forms/Q&A/errors.
14. Accessibility, SEO, performance hardening.
15. Documentation and deployment.

This sequence keeps the public SEO surface useful early while delaying client-heavy account/widget/chart functionality until the static content core is stable.

---

## 12. Implementation Assumptions

- Astro is the primary framework.
- React is allowed only as hydrated islands.
- Tailwind remains the styling foundation.
- Framer Motion is allowed only inside client islands.
- Cloudflare Pages/Workers is the default deployment target.
- Fixture data ships first; production data adapters come after templates pass.
- "Every feature" means every observed route family and UX pattern, implemented with original content and data.
- The product must preserve core structure and interaction quality, not protected implementation details.

