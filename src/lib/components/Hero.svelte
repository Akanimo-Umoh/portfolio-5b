<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';

	let heroEl = $state<HTMLElement | null>(null);
	let ctx: { revert: () => void } | null = null;

	const socialLinks = [
		{ id: 'github', label: 'GitHub', href: 'https://github.com' },
		{ id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
		{ id: 'twitter', label: 'Twitter / X', href: 'https://twitter.com' },
		{ id: 'email', label: 'Email', href: 'mailto:tommy@example.com' }
	] as const;

	onMount(async () => {
		if (!heroEl) return;
		const { gsap } = await import('gsap');
		ctx = gsap.context(() => {
			const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
			tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6 })
				.from('.hero-label', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
				.from('.hero-name', { y: 40, opacity: 0, duration: 0.8 }, '-=0.4')
				.from('.hero-accent-line', { scaleX: 0, duration: 0.6, transformOrigin: 'left' }, '-=0.4')
				.from('.hero-bio', { y: 20, opacity: 0, duration: 0.7 }, '-=0.4')
				.from('.hero-cta', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
				.from('.hero-socials', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
				.from('.hero-portrait', { x: 50, opacity: 0, duration: 0.9, ease: 'power2.out' }, '-=0.9');
		}, heroEl);
	});

	onDestroy(() => {
		ctx?.revert();
	});

	function scrollToProjects(e: MouseEvent) {
		e.preventDefault();
		const el = document.querySelector('#projects');
		if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: 'smooth' });
	}
</script>

<section
	bind:this={heroEl}
	id="hero"
	class="relative flex min-h-screen items-center overflow-hidden pt-16 md:pt-20"
	aria-label="Hero section"
>
	<!-- Glow blobs -->
	<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
		<div
			class="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-10 blur-[120px]"
			style="background: var(--color-accent);"
		></div>
		<div
			class="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full opacity-5 blur-[100px]"
			style="background: var(--color-accent-hover);"
		></div>
	</div>

	<div class="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
		<div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
			<!-- Text -->
			<div class="order-2 lg:order-1">
				<!-- Available badge -->
				<div
					class="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2"
				>
					<span class="relative flex h-2 w-2" aria-hidden="true">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
							style="background:#22c55e;"
						></span>
						<span class="relative inline-flex h-2 w-2 rounded-full" style="background:#22c55e;"
						></span>
					</span>
					<span class="font-body text-sm text-text-secondary">Available for new opportunities</span>
				</div>

				<!-- Label -->
				<p
					class="hero-label mb-3 font-display text-xs font-semibold tracking-[0.15em] text-accent uppercase"
				>
					Frontend Developer
				</p>

				<!-- Name -->
				<h1
					class="hero-name mb-2 font-display leading-[1.05] font-extrabold tracking-tight"
					style="font-size: clamp(3rem, 8vw, 5.5rem);"
				>
					<span class="gradient-text">Tommy</span><br />
					<span class="text-text-primary">Shelby.</span>
				</h1>

				<!-- Accent line -->
				<div
					class="hero-accent-line mb-8 h-0.5 w-16 rounded-full"
					style="background: var(--color-accent);"
				></div>

				<!-- Bio -->
				<p class="hero-bio mb-8 max-w-md font-body text-lg leading-relaxed text-text-secondary">
					I craft fast, accessible, and visually precise web experiences. Passionate about clean
					architecture, smooth interactions, and turning complex problems into elegant interfaces.
				</p>

				<!-- CTA buttons -->
				<div class="hero-cta mb-6 flex flex-wrap gap-3">
					<a
						href="#projects"
						onclick={scrollToProjects}
						class="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-display text-sm font-semibold text-white no-underline transition-all duration-200 hover:scale-105 hover:shadow-lg"
						style="background: var(--color-accent);"
					>
						View Projects
						<Icon name="arrow-right" size={16} />
					</a>
					<a
						// eslint-disable-next-line svelte/no-navigation-without-resolve
						href="/resume.pdf"
						download
						class="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 font-display text-sm font-semibold text-text-primary no-underline transition-all duration-200 hover:border-accent hover:text-accent"
					>
						Download CV
						<Icon name="download" size={16} />
					</a>
				</div>

				<!-- Social icons -->
				<div class="hero-socials flex items-center gap-3">
					{#each socialLinks as link (link.id)}
						<a
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={link.label}
							class="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-secondary no-underline transition-all duration-200 hover:border-accent hover:text-accent"
						>
							<Icon name={link.id} size={18} />
						</a>
					{/each}
				</div>
			</div>

			<!-- Portrait -->
			<div class="hero-portrait order-1 flex justify-center lg:order-2 lg:justify-end">
				<div class="relative">
					<!-- Glow ring -->
					<div
						class="absolute -inset-3 rounded-2xl opacity-20 blur-md"
						style="background: linear-gradient(135deg, var(--color-accent), transparent);"
						aria-hidden="true"
					></div>

					<!-- Image container -->
					<div
						class="relative overflow-hidden rounded-2xl border border-border shadow-2xl"
						style="width: min(360px, 80vw); aspect-ratio: 3/4;"
					>
						<img
							src="/images/tommy.jpg"
							alt="Tommy Shelby — Frontend Developer"
							class="h-full w-full object-cover object-top grayscale transition-all duration-500 hover:grayscale-0"
							loading="eager"
						/>
						<div
							class="absolute inset-x-0 bottom-0 h-28 opacity-70"
							style="background: linear-gradient(to top, var(--color-background), transparent);"
							aria-hidden="true"
						></div>
					</div>

					<!-- Stat card -->
					<div
						class="absolute -bottom-4 -left-4 rounded-xl border border-border bg-surface px-4 py-3 shadow-xl"
						aria-hidden="true"
					>
						<p class="font-display text-2xl font-bold text-text-primary">3+</p>
						<p class="font-body text-xs text-text-secondary">Years building</p>
					</div>

					<!-- Tech badge -->
					<div
						class="absolute -top-3 -right-3 rounded-xl border border-border bg-surface px-3 py-2 shadow-xl"
						aria-hidden="true"
					>
						<p class="font-body text-xs font-medium text-accent">⚡ React · Next.js · Svelte</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Scroll indicator -->
		<div class="mt-20 flex justify-center" aria-hidden="true">
			<div class="flex flex-col items-center gap-2 text-text-muted">
				<span class="font-body text-xs tracking-widest uppercase">Scroll</span>
				<div class="flex h-8 w-5 items-start justify-center rounded-full border border-border p-1">
					<div class="h-2 w-0.5 animate-bounce rounded-full bg-text-muted"></div>
				</div>
			</div>
		</div>
	</div>
</section>
