<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { resolve } from '$app/paths';
	import { theme } from '$lib/stores/theme.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let scrolled = $state(false);
	let menuOpen = $state(false);

	const navLinks = [
		{ id: 'projects', label: 'Projects', href: '#projects' },
		{ id: 'skills', label: 'Skills', href: '#skills' },
		{ id: 'ai-summarizer', label: 'AI Tool', href: '#ai-summarizer' },
		{ id: 'contact', label: 'Contact', href: '#contact' }
	];

	function handleScroll() {
		scrolled = window.scrollY > 20;
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
	});
	onDestroy(() => {
		window.removeEventListener('scroll', handleScroll);
		document.body.style.overflow = '';
	});

	function toggleMenu() {
		menuOpen = !menuOpen;
		document.body.style.overflow = menuOpen ? 'hidden' : '';
	}

	function scrollToSection(e: MouseEvent, href: string) {
		e.preventDefault();
		menuOpen = false;
		document.body.style.overflow = '';
		const target = document.querySelector(href);
		if (target)
			window.scrollTo({ top: (target as HTMLElement).offsetTop - 80, behavior: 'smooth' });
	}
</script>

<nav
	class="fixed top-0 right-0 left-0 z-50 transition-all duration-300 {scrolled
		? 'border-b border-border bg-background/80 shadow-lg backdrop-blur-md'
		: 'bg-transparent'}"
	aria-label="Main navigation"
>
	<div class="mx-auto w-full max-w-7xl px-6 md:px-10">
		<div class="flex h-16 items-center justify-between md:h-20">
			<a
				href={resolve('/')}
				class="group flex items-center gap-2 no-underline"
				aria-label="Tommy Shelby — home"
			>
				<div
					class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent font-display text-sm font-bold text-white transition-transform duration-200 group-hover:scale-110"
				>
					TS
				</div>
				<span class="hidden font-display text-sm font-semibold text-text-primary sm:block"
					>Tommy Shelby</span
				>
			</a>

			<!-- Desktop -->
			<div class="hidden items-center gap-1 md:flex">
				{#each navLinks as link (link.id)}
					<a
						href={link.href}
						onclick={(e) => scrollToSection(e, link.href)}
						class="rounded-lg px-4 py-2 font-body text-sm text-text-secondary no-underline transition-colors duration-200 hover:bg-surface-raised hover:text-text-primary"
						>{link.label}</a
					>
				{/each}
				<div class="mx-2 h-5 w-px bg-border"></div>
				<button
					type="button"
					onclick={() => theme.toggle()}
					class="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary"
					aria-label={theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
				>
					{#if theme.isDark}<Icon name="sun" size={18} />{:else}<Icon name="moon" size={18} />{/if}
				</button>
			</div>

			<!-- Mobile -->
			<div class="flex items-center gap-2 md:hidden">
				<button
					type="button"
					onclick={() => theme.toggle()}
					class="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-raised"
					aria-label={theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
				>
					{#if theme.isDark}<Icon name="sun" size={18} />{:else}<Icon name="moon" size={18} />{/if}
				</button>
				<button
					type="button"
					onclick={toggleMenu}
					class="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg text-text-secondary transition-colors hover:bg-surface-raised"
					aria-label={menuOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={menuOpen}
					aria-controls="mobile-menu"
				>
					<span
						class="block h-0.5 w-5 rounded-full bg-current transition-all duration-300 {menuOpen
							? 'translate-y-2 rotate-45'
							: ''}"
					></span>
					<span
						class="block h-0.5 w-5 rounded-full bg-current transition-all duration-300 {menuOpen
							? 'opacity-0'
							: ''}"
					></span>
					<span
						class="block h-0.5 w-5 rounded-full bg-current transition-all duration-300 {menuOpen
							? '-translate-y-2 -rotate-45'
							: ''}"
					></span>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile drawer -->
	<div
		id="mobile-menu"
		class="overflow-hidden border-t border-border bg-background/95 backdrop-blur-md transition-all duration-300 md:hidden {menuOpen
			? 'max-h-96 opacity-100'
			: 'max-h-0 opacity-0'}"
		aria-hidden={!menuOpen}
	>
		<div class="mx-auto w-full max-w-7xl px-6 py-4">
			<div class="flex flex-col gap-1">
				{#each navLinks as link (link.id)}
					<a
						href={link.href}
						onclick={(e) => scrollToSection(e, link.href)}
						class="rounded-lg px-4 py-3 font-body text-base text-text-secondary no-underline transition-colors hover:bg-surface-raised hover:text-text-primary"
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	</div>
</nav>
