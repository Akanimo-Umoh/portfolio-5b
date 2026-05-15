<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';

	type Status = 'idle' | 'loading' | 'success' | 'error';

	let resumeText = $state('');
	let summary = $state('');
	let status = $state<Status>('idle');
	let errorMessage = $state('');
	let sectionEl = $state<HTMLElement | null>(null);
	let revealed = $state(false);
	let copied = $state(false);

	let charCount = $derived(resumeText.length);
	let isOverLimit = $derived(charCount > 8000);

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

	async function handleSummarize() {
		if (!resumeText.trim() || isOverLimit) return;
		status = 'loading';
		summary = '';
		errorMessage = '';
		try {
			const res = await fetch('/api/summarize', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ text: resumeText })
			});
			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.message ?? 'Something went wrong. Please try again.');
			}
			const data = await res.json();
			summary = data.summary;
			status = 'success';
		} catch (err) {
			status = 'error';
			errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
		}
	}

	function handleReset() {
		resumeText = '';
		summary = '';
		status = 'idle';
		errorMessage = '';
		copied = false;
	}

	async function handleCopy() {
		await navigator.clipboard.writeText(summary);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<section
	bind:this={sectionEl}
	id="ai-summarizer"
	class="w-full py-24 md:py-32"
	aria-label="AI Resume Summarizer"
>
	<div class="mx-auto w-full max-w-7xl px-6 md:px-10">
		<!-- Header -->
		<div
			class="mb-12 transition-all duration-700 {revealed
				? 'translate-y-0 opacity-100'
				: 'translate-y-8 opacity-0'}"
		>
			<p class="section-label">// AI Tool</p>
			<h2 class="mb-4 font-display text-4xl leading-tight font-bold text-text-primary md:text-5xl">
				Resume Summarizer
			</h2>
			<p class="max-w-xl font-body text-text-secondary">
				Paste your resume below and let Gemini Flash distill it into a sharp, recruiter-friendly
				summary in seconds.
			</p>
		</div>

		<div
			class="mx-auto max-w-3xl transition-all delay-100 duration-700 {revealed
				? 'translate-y-0 opacity-100'
				: 'translate-y-10 opacity-0'}"
		>
			<div class="rounded-2xl border border-border bg-surface p-6 md:p-8">
				<!-- Powered by -->
				<div
					class="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-3 py-1.5"
				>
					<Icon name="layers" size={14} class="text-accent" />
					<span class="font-body text-xs text-text-muted">Powered by Gemini Flash</span>
				</div>

				<!-- Input state -->
				{#if status !== 'success'}
					<div class="flex flex-col gap-4">
						<div>
							<label
								for="resume-input"
								class="mb-2 block font-body text-sm font-medium text-text-primary"
							>
								Paste your resume text
							</label>
							<textarea
								id="resume-input"
								bind:value={resumeText}
								placeholder="Paste your full resume content here — work experience, skills, education, projects..."
								rows={10}
								disabled={status === 'loading'}
								aria-describedby="char-count"
								class="w-full resize-none rounded-xl border bg-background px-4 py-3 font-body text-sm leading-relaxed text-text-primary placeholder:text-text-muted focus:ring-2 focus:outline-none
                  {isOverLimit
									? 'border-red-500 focus:ring-red-500/20'
									: 'border-border focus:border-accent focus:ring-accent/20'}"
							></textarea>
							<div id="char-count" class="mt-1.5 flex justify-end">
								<span class="font-body text-xs {isOverLimit ? 'text-red-500' : 'text-text-muted'}">
									{charCount.toLocaleString()} / 8,000
								</span>
							</div>
						</div>

						{#if status === 'error'}
							<div
								class="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4"
								role="alert"
							>
								<Icon name="alert" size={18} class="mt-0.5 shrink-0 text-red-400" />
								<p class="font-body text-sm text-red-400">{errorMessage}</p>
							</div>
						{/if}

						<button
							type="button"
							onclick={handleSummarize}
							disabled={!resumeText.trim() || isOverLimit || status === 'loading'}
							aria-busy={status === 'loading'}
							class="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-display text-sm font-semibold text-white transition-all duration-200
                {!resumeText.trim() || isOverLimit || status === 'loading'
								? 'cursor-not-allowed opacity-50'
								: 'hover:scale-[1.01] hover:shadow-lg cursor-pointer'}"
							style="background: var(--color-accent);"
						>
							{#if status === 'loading'}
								<Icon name="spinner" size={16} /> Summarizing...
							{:else}
								<Icon name="layers" size={16} /> Summarize with AI
							{/if}
						</button>
					</div>
				{/if}

				<!-- Success state -->
				{#if status === 'success'}
					<div class="flex flex-col gap-5">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-2">
								<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
									<Icon name="check" size={16} class="text-accent" />
								</div>
								<span class="font-display text-sm font-semibold text-text-primary"
									>Summary Generated</span
								>
							</div>
							<button
								type="button"
								onclick={handleReset}
								class="rounded-lg px-3 py-1.5 font-body text-xs text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary"
							>
								Try another
							</button>
						</div>

						<div class="rounded-xl border border-border bg-background p-5">
							<p class="font-body text-sm leading-relaxed whitespace-pre-wrap text-text-primary">
								{summary}
							</p>
						</div>

						<button
							type="button"
							onclick={handleCopy}
							class="flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 font-body text-sm transition-all duration-200
                {copied
								? 'border-green-500 text-green-500'
								: 'text-text-secondary hover:border-accent hover:text-accent'}"
						>
							<Icon name={copied ? 'check' : 'copy'} size={15} />
							{copied ? 'Copied!' : 'Copy to clipboard'}
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
