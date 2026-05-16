# Tommy Shelby — Developer Portfolio

A highly interactive, production-grade developer portfolio built as the Stage 5b assessment for the Frontend Wizards program.

Live demo: [your-deployed-url-here]

---

## Tech Stack

- **SvelteKit** (Svelte 5, App Router, runes mode)
- **TypeScript**
- **Tailwind CSS v4** (CSS-first, no config file)
- **GSAP** — hero entrance animations
- **Gemini Flash API** — AI resume summarizer
- **`@sveltejs/adapter-auto`** — deploys to Vercel/Netlify

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- pnpm

### Install dependencies

```bash
pnpm install
```

### Environment variables

Create a `.env` file in the project root:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

Get a free API key at [aistudio.google.com](https://aistudio.google.com).

> `.env` is gitignored by default — never commit your API key.

### Run development server

```bash
pnpm dev
```

### Build for production

```bash
pnpm build
pnpm preview
```

---

## Project Structure

```
src/
├── routes/
│   ├── +layout.svelte        # Root layout, theme initialization
│   ├── +layout.css           # Global styles, Tailwind v4 design tokens
│   ├── +page.svelte          # Main portfolio page
│   ├── +page.ts              # SSR disabled, prerender enabled
│   └── api/
│       └── summarize/
│           └── +server.ts    # Gemini API server route (key stays server-side)
└── lib/
    ├── components/
    │   ├── Icon.svelte        # Reusable inline SVG icon component
    │   ├── Navbar.svelte      # Sticky nav with scroll behavior + mobile menu
    │   ├── Hero.svelte        # GSAP-animated hero section
    │   ├── ProjectCard.svelte # Individual project card
    │   ├── Projects.svelte    # Project grid with tag filtering
    │   ├── Skills.svelte      # Skill groups with animated progress bars
    │   ├── AiSummarizer.svelte # AI resume summarizer UI
    │   ├── Contact.svelte     # Contact form with validation
    │   └── Footer.svelte      # Footer with nav and social links
    ├── data/
    │   └── projects.ts        # Project data with TypeScript interface
    └── stores/
        └── theme.svelte.ts    # Svelte 5 rune-based theme store
```

---

## Architecture Decisions

### Svelte 5 Runes Mode

The project uses Svelte 5 with runes mode enforced globally via `svelte.config.js`. All reactive state uses explicit rune primitives:

- `$state()` — reactive variables (replaces plain `let`)
- `$derived()` — computed values (replaces `$:` reactive statements)
- `$effect()` — side effects (replaces `$:` blocks with DOM access)
- `$props()` — component inputs (replaces `export let`)

This makes reactivity explicit and predictable, avoids the "magic variable" confusion of Svelte 4, and works identically inside `.svelte.ts` store files.

### Theme System

The theme store (`theme.svelte.ts`) is a Svelte 5 rune-based singleton. It reads the user's OS preference on first visit via `window.matchMedia('(prefers-color-scheme: dark)')`, persists the choice to `localStorage`, and applies a `data-theme` attribute to `<html>`.

Tailwind v4's `@theme` block defines CSS custom properties for both themes. The `[data-theme="light"]` selector overrides the same tokens — no component changes needed when switching themes.

### GSAP — Dynamic Import

GSAP accesses `window` at module evaluation time, which crashes SvelteKit's SSR. The fix is a dynamic `import()` inside `onMount`:

```ts
onMount(async () => {
  const { gsap } = await import('gsap');
  // animate...
});
```

`onMount` only runs in the browser, so GSAP never reaches the server.

### SSR Disabled

The portfolio is a pure client-side application — no server-fetched data, no SEO-critical dynamic content. Setting `ssr: false` and `prerender: true` in `+page.ts` tells SvelteKit to generate a static HTML file at build time and skip server rendering entirely. This is the architecturally correct choice for a portfolio and eliminates any remaining browser-API SSR conflicts.

### AI Resume Summarizer — Server Route

The Gemini API key is handled exclusively in `src/routes/api/summarize/+server.ts`. The browser never sees the key — it POSTs resume text to `/api/summarize`, the server calls Gemini, and returns only the summary. This is the professional standard for third-party API key management in SvelteKit.

### Scroll Animations

Scroll-triggered reveal animations use the native `IntersectionObserver` API rather than a library like GSAP ScrollTrigger. `IntersectionObserver` is zero-cost, browser-native, and perfect for "animate when element enters viewport" use cases. GSAP is reserved for the hero section where timeline control and staggering matter.

---

## Animation Decisions

| Section       | Technique                              | Reason                                           |
| ------------- | -------------------------------------- | ------------------------------------------------ |
| Hero          | GSAP timeline                          | Fine-grained sequencing, stagger, easing control |
| Projects      | CSS transitions + IntersectionObserver | Simple reveal, no library overhead               |
| Skills        | CSS transitions + IntersectionObserver | Progress bars need CSS transition-delay          |
| AI Summarizer | CSS transitions + IntersectionObserver | Simple reveal                                    |
| Contact       | CSS transitions + IntersectionObserver | Simple reveal                                    |

All animations respect `prefers-reduced-motion` via a global CSS rule in `layout.css`.

---

## Performance Optimizations

- `prerender: true` — portfolio is served as a static file, no server compute on each request
- GSAP loaded via dynamic `import()` — not included in the initial bundle, only fetched when the hero mounts
- Images use `loading="lazy"` except the hero portrait (`loading="eager"`)
- Tailwind v4 CSS-first approach — no JavaScript config, smaller build toolchain
- `IntersectionObserver` with `observer.disconnect()` after first trigger — observers are cleaned up immediately after use
- `passive: true` on scroll event listeners — tells the browser the handler won't call `preventDefault()`, allowing scroll optimizations

---

## Accessibility

- Skip-to-content link at the top of every page
- All interactive elements have visible `:focus-visible` rings
- `aria-label` on all icon-only buttons and links
- `aria-pressed` on filter toggle buttons
- `aria-expanded` + `aria-controls` on the mobile hamburger button
- `aria-hidden="true"` on decorative elements
- `role="progressbar"` with `aria-valuenow/min/max` on skill bars
- `role="alert"` on form error messages
- Semantic HTML throughout (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- `prefers-reduced-motion` respected globally

---

## Trade-offs

**SSR disabled** — Disabling SSR means search engines get a mostly-empty HTML shell. For a portfolio, this is acceptable because the primary audience is recruiters who visit directly via link, not Google search.

**No email sending** — The contact form simulates submission. Wiring up real email delivery requires a third-party service (Resend, Nodemailer + SMTP) and a `/api/contact` server route. The component is architected to support this as a drop-in addition.
