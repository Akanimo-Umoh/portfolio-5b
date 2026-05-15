<script lang="ts">
	import { onMount } from 'svelte';
	import { projects, allTags } from '$lib/data/projects';
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	let activeTag = $state('All');
	let sectionEl = $state<HTMLElement | null>(null);
	let revealed = $state(false);

	let filtered = $derived(
		activeTag === 'All' ? projects : projects.filter((p) => p.tags.includes(activeTag))
	);

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

<section bind:this={sectionEl} id="projects" class="w-full py-24 md:py-32" aria-label="Projects">
	<div class="mx-auto w-full max-w-7xl px-6 md:px-10">
		<!-- Header -->
		<div
			class="mb-12 transition-all duration-700 {revealed
				? 'translate-y-0 opacity-100'
				: 'translate-y-8 opacity-0'}"
		>
			<p class="section-label">// Projects</p>
			<h2 class="mb-4 font-display text-4xl leading-tight font-bold text-text-primary md:text-5xl">
				Things I've Built
			</h2>
			<p class="max-w-xl font-body text-text-secondary">
				A selection of projects across different domains — from real-time applications to
				progressive web apps and interactive experiences.
			</p>
		</div>

		<!-- Filter tabs -->
		<div
			class="mb-10 flex flex-wrap gap-2 transition-all delay-100 duration-700 {revealed
				? 'translate-y-0 opacity-100'
				: 'translate-y-8 opacity-0'}"
			role="group"
			aria-label="Filter projects by technology"
		>
			{#each allTags as tag (tag)}
				<button
					type="button"
					onclick={() => (activeTag = tag)}
					aria-pressed={activeTag === tag}
					class="rounded-full border px-4 py-1.5 font-body text-sm transition-all duration-200
            {activeTag === tag
						? 'border-accent bg-accent text-white'
						: 'border-border text-text-secondary hover:border-accent/50 hover:text-text-primary'}"
					>{tag}</button
				>
			{/each}
		</div>

		<!-- Grid -->
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each filtered as project, i (project.id)}
				<div
					class="transition-all duration-700 {revealed
						? 'translate-y-0 opacity-100'
						: 'translate-y-12 opacity-0'}"
					style="transition-delay: {revealed ? i * 100 : 0}ms;"
				>
					<ProjectCard {project} />
				</div>
			{/each}
		</div>

		{#if filtered.length === 0}
			<div class="py-20 text-center">
				<p class="font-body text-text-muted">No projects found for this filter.</p>
			</div>
		{/if}
	</div>
</section>
