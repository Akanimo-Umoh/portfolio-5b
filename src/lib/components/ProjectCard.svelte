<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import Icon from '$lib/components/Icon.svelte';

	let { project }: { project: Project } = $props();
</script>

<article
	class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
	aria-label={project.title}
>
	<!-- Image -->
	<div class="relative overflow-hidden" style="aspect-ratio: 16/10;">
		<img
			src={project.image}
			alt="{project.title} screenshot"
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			loading="lazy"
		/>

		<!-- Hover overlay -->
		<div
			class="absolute inset-0 flex items-center justify-center gap-3 bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
			aria-hidden="true"
		>
			<a
				// eslint-disable-next-line svelte/no-navigation-without-resolve
				href={project.liveUrl}
				target="_blank"
				rel="noopener noreferrer"
				tabindex="-1"
				class="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-display text-sm font-semibold text-white no-underline transition-transform hover:scale-105"
			>
				<Icon name="external" size={14} /> Live
			</a>
			<a
				// eslint-disable-next-line svelte/no-navigation-without-resolve
				href={project.githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				tabindex="-1"
				class="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 font-display text-sm font-semibold text-text-primary no-underline transition-transform hover:scale-105"
			>
				<Icon name="github" size={14} /> Code
			</a>
		</div>

		<!-- Year badge -->
		<div
			class="absolute top-3 right-3 rounded-full border border-border bg-background/80 px-2.5 py-1 backdrop-blur-sm"
		>
			<span class="font-body text-xs text-text-muted">{project.year}</span>
		</div>
	</div>

	<!-- Body -->
	<div class="flex flex-1 flex-col gap-3 p-5">
		<div>
			<h3 class="font-display text-lg font-bold text-text-primary">{project.title}</h3>
			<p class="mt-1 font-body text-sm leading-relaxed text-text-secondary">
				{project.description}
			</p>
		</div>

		<!-- Tech pills -->
		<div class="mt-auto flex flex-wrap gap-2 pt-2">
			{#each project.techStack as tech (tech)}
				<span
					class="rounded-full border border-border px-2.5 py-0.5 font-body text-xs text-text-muted"
					>{tech}</span
				>
			{/each}
		</div>

		<!-- Links -->
		<div class="flex items-center gap-3 border-t border-border pt-3">
			<a
				// eslint-disable-next-line svelte/no-navigation-without-resolve
				href={project.liveUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 font-body text-xs text-text-muted no-underline transition-colors hover:text-accent"
				aria-label="View {project.title} live demo"
			>
				<Icon name="external" size={13} /> Live demo
			</a>
			<span class="text-text-muted" aria-hidden="true">·</span>
			<a
				// eslint-disable-next-line svelte/no-navigation-without-resolve
				href={project.githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 font-body text-xs text-text-muted no-underline transition-colors hover:text-accent"
				aria-label="View {project.title} source on GitHub"
			>
				<Icon name="github" size={13} /> Source code
			</a>
		</div>
	</div>
</article>
