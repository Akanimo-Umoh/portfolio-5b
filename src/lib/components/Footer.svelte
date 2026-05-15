<script lang="ts">
	/**
	 * Footer.svelte
	 *
	 * Minimal footer with brand, nav links, social icons, copyright.
	 * No {@html} — social icons use the <Icon> component.
	 */
	import Icon from '$lib/components/Icon.svelte';

	const currentYear = new Date().getFullYear();

	const socials = [
		{ id: 'github', label: 'GitHub', href: 'https://github.com/Akanimo-Umoh' },
		{ id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
		{ id: 'twitter', label: 'Twitter / X', href: 'https://twitter.com/umoh____' }
	] as const;

	const footerLinks = [
		{ id: 'projects-footer', label: 'Projects', href: '#projects' },
		{ id: 'skills-footer', label: 'Skills', href: '#skills' },
		{ id: 'ai-footer', label: 'AI Tool', href: '#ai-summarizer' },
		{ id: 'contact-footer', label: 'Contact', href: '#contact' }
	];

	function scrollToSection(e: MouseEvent, href: string) {
		e.preventDefault();
		const target = document.querySelector(href);
		if (target) {
			window.scrollTo({
				top: (target as HTMLElement).offsetTop - 80,
				behavior: 'smooth'
			});
		}
	}
</script>

<footer class="border-t border-border" aria-label="Footer">
	<div class="container py-12">
		<div class="flex flex-col items-center gap-8 md:flex-row md:justify-between">
			<!-- Brand -->
			<div class="text-center md:text-left">
				<p class="font-display text-lg font-bold text-text-primary">Tommy Shelby</p>
				<p class="mt-1 font-body text-sm text-text-muted">Frontend Developer</p>
			</div>

			<!-- Nav links -->
			<nav aria-label="Footer navigation">
				<ul class="flex flex-wrap justify-center gap-x-6 gap-y-2" role="list">
					{#each footerLinks as link (link.id)}
						<li>
							<a
								// eslint-disable-next-line svelte/no-navigation-without-resolve
								href={link.href}
								onclick={(e) => scrollToSection(e, link.href)}
								class="font-body text-sm text-text-secondary no-underline transition-colors hover:text-accent"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- Social icons -->
			<div class="flex items-center gap-3">
				{#each socials as social (social.id)}
					<a
						// eslint-disable-next-line svelte/no-navigation-without-resolve
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={social.label}
						class="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary no-underline transition-all duration-200 hover:border-accent hover:text-accent"
					>
						<Icon name={social.id} size={18} />
					</a>
				{/each}
			</div>
		</div>

		<!-- Bottom bar -->
		<div class="mt-8 border-t border-border pt-6 text-center">
			<p class="font-body text-xs text-text-muted">
				© {currentYear} Tommy Shelby. Built with SvelteKit + Tailwind CSS v4.
			</p>
		</div>
	</div>
</footer>
