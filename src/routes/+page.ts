/**
 * +page.ts
 *
 * WHY WE DISABLE SSR:
 * This portfolio is a fully client-side application. It has no
 * server-rendered data requirements — no database queries, no
 * auth checks, nothing that benefits from SSR.
 *
 * Several of our dependencies (GSAP, IntersectionObserver, and
 * browser APIs like window/localStorage) are browser-only. While
 * we've guarded most of them, SvelteKit's dev-mode SSR can still
 * trip over them in the module evaluation phase.
 *
 * Setting ssr: false tells SvelteKit:
 * "Don't render this page on the server — send the HTML shell
 * and let the browser handle everything."
 *
 * This is the correct approach for:
 * - Portfolio sites
 * - Dashboards
 * - Any app with no SEO-critical dynamic server data
 *
 * prerender: true means SvelteKit will generate a static HTML
 * file at build time — perfect for deployment to Vercel/Netlify.
 * This gives us the best of both worlds: fast initial load from
 * a static file, then full interactivity once JS hydrates.
 */
export const ssr = false;
export const prerender = true;
