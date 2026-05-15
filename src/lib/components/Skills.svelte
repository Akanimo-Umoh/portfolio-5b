<script lang="ts">
	import { onMount } from 'svelte';

	let sectionEl = $state<HTMLElement | null>(null);
	let revealed = $state(false);

	const skillGroups = [
		{
			id: 'languages',
			category: 'Languages & Markup',
			skills: [
				{ id: 'html5', name: 'HTML5', level: 95 },
				{ id: 'css3', name: 'CSS3', level: 92 },
				{ id: 'javascript', name: 'JavaScript', level: 90 },
				{ id: 'typescript', name: 'TypeScript', level: 85 }
			]
		},
		{
			id: 'frameworks',
			category: 'Frameworks & Libraries',
			skills: [
				{ id: 'react', name: 'React.js', level: 90 },
				{ id: 'nextjs', name: 'Next.js', level: 85 },
				{ id: 'svelte', name: 'Svelte', level: 80 },
				{ id: 'framer', name: 'Framer Motion', level: 75 }
			]
		},
		{
			id: 'styling',
			category: 'Styling',
			skills: [
				{ id: 'tailwind', name: 'Tailwind CSS', level: 95 },
				{ id: 'sass', name: 'Sass / SCSS', level: 85 },
				{ id: 'responsive', name: 'Responsive Design', level: 92 }
			]
		},
		{
			id: 'tools',
			category: 'Tools & State',
			skills: [
				{ id: 'git', name: 'Git & GitHub', level: 88 },
				{ id: 'axios', name: 'Axios', level: 85 },
				{ id: 'zustand', name: 'Zustand', level: 80 },
				{ id: 'mongodb', name: 'MongoDB', level: 70 }
			]
		}
	];

	const extraTags = [
		'REST APIs',
		'Socket.IO',
		'Playwright',
		'Vitest',
		'Vite',
		'ESLint',
		'Prettier',
		'Figma',
		'Vercel',
		'Netlify'
	];

	onMount(() => {
		if (!sectionEl) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					revealed = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.05 }
		);
		observer.observe(sectionEl);
		return () => observer.disconnect();
	});
</script>

<section
	bind:this={sectionEl}
	id="skills"
	class="w-full py-24 md:py-32"
	style="background: var(--color-surface);"
	aria-label="Skills"
>
	<div class="mx-auto w-full max-w-7xl px-6 md:px-10">
		<!-- Header -->
		<div
			class="mb-12 transition-all duration-700 {revealed
				? 'translate-y-0 opacity-100'
				: 'translate-y-8 opacity-0'}"
		>
			<p class="section-label">// Skills</p>
			<h2 class="mb-4 font-display text-4xl leading-tight font-bold text-text-primary md:text-5xl">
				What I Work With
			</h2>
			<p class="max-w-xl font-body text-text-secondary">
				Technologies and tools I reach for when building production-grade web applications.
			</p>
		</div>

		<!-- Skill groups -->
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each skillGroups as group, gi (group.id)}
				<div
					class="rounded-2xl border border-border bg-background p-6 transition-all duration-700 {revealed
						? 'translate-y-0 opacity-100'
						: 'translate-y-10 opacity-0'}"
					style="transition-delay: {revealed ? gi * 100 : 0}ms;"
				>
					<h3
						class="mb-5 font-display text-xs font-semibold tracking-widest text-text-muted uppercase"
					>
						{group.category}
					</h3>
					<div class="flex flex-col gap-4">
						{#each group.skills as skill, si (skill.id)}
							<div
								class="transition-all duration-500 {revealed
									? 'translate-x-0 opacity-100'
									: '-translate-x-4 opacity-0'}"
								style="transition-delay: {revealed ? gi * 100 + si * 60 : 0}ms;"
							>
								<div class="mb-1.5 flex items-center justify-between">
									<span class="font-body text-sm text-text-primary">{skill.name}</span>
									<span class="font-body text-xs text-text-muted">{skill.level}%</span>
								</div>
								<div class="h-1.5 w-full overflow-hidden rounded-full bg-surface-raised">
									<div
										class="h-full rounded-full transition-all duration-1000"
										style="
                      width: {revealed ? skill.level : 0}%;
                      background: linear-gradient(90deg, var(--color-accent), var(--color-accent-hover));
                      transition-delay: {revealed ? gi * 100 + si * 60 + 200 : 0}ms;
                    "
										role="progressbar"
										aria-valuenow={skill.level}
										aria-valuemin={0}
										aria-valuemax={100}
										aria-label="{skill.name} proficiency: {skill.level}%"
									></div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Extra tags -->
		<div
			class="mt-12 transition-all delay-300 duration-700 {revealed
				? 'translate-y-0 opacity-100'
				: 'translate-y-8 opacity-0'}"
		>
			<p class="mb-4 font-body text-sm text-text-muted">Also comfortable with:</p>
			<div class="flex flex-wrap gap-2">
				{#each extraTags as tag (tag)}
					<span
						class="rounded-full border border-border px-3 py-1 font-body text-sm text-text-secondary transition-colors duration-200 hover:border-accent hover:text-accent"
					>
						{tag}
					</span>
				{/each}
			</div>
		</div>
	</div>
</section>
