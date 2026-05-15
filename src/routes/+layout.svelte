<script lang="ts">
	/**
	 * +layout.svelte
	 *
	 * Root layout. Responsibilities:
	 * 1. Import global styles
	 * 2. Initialize theme store (onMount = browser only, safe from SSR)
	 * 3. Render child pages
	 */
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme.svelte';

	let { children } = $props();

	onMount(() => {
		theme.init();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-background text-text-primary">
	{@render children()}
</div>
