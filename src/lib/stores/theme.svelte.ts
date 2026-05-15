/**
 * theme.svelte.ts
 *
 * SSR-SAFE Svelte 5 rune-based theme store.
 *
 * THE SSR PROBLEM:
 * SvelteKit renders pages on the server first. The server has no
 * `window`, `localStorage`, or `document`. Any code that touches
 * these at module evaluation time (outside onMount/$effect) will
 * crash with "window is not defined".
 *
 * THE FIX:
 * - The store defaults to 'dark' (safe static value for SSR)
 * - theme.init() reads localStorage + matchMedia — called only in
 *   +layout.svelte's onMount, which is browser-only
 * - applyTheme() guards with typeof document check just in case
 * - NO window/document access at module level or in getters
 */

type Theme = 'dark' | 'light';

function createThemeStore() {
	// Safe default for SSR — no browser APIs touched here
	let current = $state<Theme>('dark');

	/**
	 * Call this inside onMount in +layout.svelte.
	 * Reads the saved preference or falls back to OS setting.
	 */
	function init() {
		const saved = localStorage.getItem('theme') as Theme | null;

		if (saved === 'dark' || saved === 'light') {
			current = saved;
		} else {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			current = prefersDark ? 'dark' : 'light';
		}

		applyTheme(current);
	}

	/**
	 * Toggle between dark and light, persist to localStorage.
	 * Only call client-side (e.g. in button onclick handlers).
	 */
	function toggle() {
		current = current === 'dark' ? 'light' : 'dark';
		localStorage.setItem('theme', current);
		applyTheme(current);
	}

	/**
	 * Set data-theme on <html>. Guarded so it's safe to call
	 * from anywhere without worrying about SSR context.
	 */
	function applyTheme(t: Theme) {
		if (typeof document === 'undefined') return;
		document.documentElement.setAttribute('data-theme', t);
	}

	return {
		// Getters are pure — no browser APIs, safe for SSR reads
		get current() {
			return current;
		},
		get isDark() {
			return current === 'dark';
		},
		init,
		toggle
	};
}

export const theme = createThemeStore();
