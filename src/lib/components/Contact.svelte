<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';

	type Status = 'idle' | 'loading' | 'success' | 'error';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let status = $state<Status>('idle');

	let nameTouched = $state(false);
	let emailTouched = $state(false);
	let messageTouched = $state(false);

	let nameError = $derived(nameTouched && name.trim().length < 2 ? 'Please enter your name.' : '');
	let emailError = $derived(
		emailTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
			? 'Please enter a valid email address.'
			: ''
	);
	let messageError = $derived(
		messageTouched && message.trim().length < 10 ? 'Message must be at least 10 characters.' : ''
	);
	let isValid = $derived(
		name.trim().length >= 2 &&
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
			message.trim().length >= 10
	);

	let sectionEl = $state<HTMLElement | null>(null);
	let revealed = $state(false);

	onMount(() => {
		if (!sectionEl) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					revealed = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);
		observer.observe(sectionEl);
		return () => observer.disconnect();
	});

	async function handleSubmit() {
		nameTouched = true;
		emailTouched = true;
		messageTouched = true;

		if (!isValid) return;

		status = 'loading';

		try {
			// Replace with a real fetch to /api/contact when you have email sending set up:
			// const res = await fetch('/api/contact', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify({ name, email, message })
			// });
			// if (!res.ok) throw new Error('Failed to send');

			await new Promise((resolve) => setTimeout(resolve, 1500));

			status = 'success';
			name = '';
			email = '';
			message = '';
			nameTouched = false;
			emailTouched = false;
			messageTouched = false;
		} catch {
			status = 'error';
		}
	}

	const contactDetails = [
		{
			id: 'email-detail',
			icon: 'email',
			label: 'Email',
			value: 'tommy@example.com',
			href: 'mailto:tommy@example.com'
		},
		{ id: 'location-detail', icon: 'location', label: 'Location', value: 'Nigeria 🇳🇬', href: null },
		{
			id: 'availability-detail',
			icon: 'calendar',
			label: 'Availability',
			value: 'Open to opportunities',
			href: null
		}
	] as const;
</script>

<section bind:this={sectionEl} id="contact" class="section" aria-label="Contact">
	<div class="container">
		<div class="grid grid-cols-1 gap-16 lg:grid-cols-2">
			<!-- Left: heading + contact details -->
			<div
				class="transition-all duration-700 {revealed
					? 'translate-y-0 opacity-100'
					: 'translate-y-8 opacity-0'}"
			>
				<p class="section-label">// Contact</p>
				<h2 class="section-title">Let's Work Together</h2>
				<p class="mb-8 font-body leading-relaxed text-text-secondary">
					I'm open to frontend engineering roles, freelance projects, and interesting
					collaborations. If you have something in mind, I'd love to hear about it.
				</p>

				<div class="flex flex-col gap-4">
					{#each contactDetails as item (item.id)}
						<div class="flex items-center gap-3">
							<div
								class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-accent"
							>
								<Icon name={item.icon} size={18} />
							</div>
							<div>
								<p class="font-body text-xs text-text-muted">{item.label}</p>
								{#if item.href}
									<a
										// eslint-disable-next-line svelte/no-navigation-without-resolve
										href={item.href}
										class="font-body text-sm text-text-primary no-underline transition-colors hover:text-accent"
									>
										{item.value}
									</a>
								{:else}
									<p class="font-body text-sm text-text-primary">{item.value}</p>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Right: form -->
			<div
				class="transition-all delay-150 duration-700 {revealed
					? 'translate-y-0 opacity-100'
					: 'translate-y-8 opacity-0'}"
			>
				{#if status === 'success'}
					<!-- Success state -->
					<div
						class="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-surface p-10 text-center"
					>
						<div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
							<Icon name="check" size={28} class="text-accent" />
						</div>
						<h3 class="mb-2 font-display text-xl font-bold text-text-primary">Message Received!</h3>
						<p class="mb-6 font-body text-text-secondary">
							I'll get back to you as soon as possible.
						</p>
						<button
							type="button"
							onclick={() => (status = 'idle')}
							class="cursor-pointer rounded-xl border border-border px-6 py-2.5 font-body text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent"
						>
							Send another
						</button>
					</div>
				{:else}
					<!-- Form -->
					<div class="rounded-2xl border border-border bg-surface p-6 md:p-8">
						<div class="flex flex-col gap-5">
							<!-- Name -->
							<div>
								<label
									for="contact-name"
									class="mb-1.5 block font-body text-sm font-medium text-text-primary"
								>
									Name <span class="text-accent" aria-hidden="true">*</span>
								</label>
								<input
									id="contact-name"
									type="text"
									bind:value={name}
									onblur={() => (nameTouched = true)}
									placeholder="Your name"
									autocomplete="name"
									aria-describedby={nameError ? 'name-error' : undefined}
									aria-invalid={!!nameError}
									class="w-full rounded-xl border bg-background px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-muted focus:ring-2 focus:outline-none
                    {nameError
										? 'border-red-500 focus:ring-red-500/20'
										: 'border-border focus:border-accent focus:ring-accent/20'}"
								/>
								{#if nameError}
									<p id="name-error" class="mt-1 font-body text-xs text-red-500" role="alert">
										{nameError}
									</p>
								{/if}
							</div>

							<!-- Email -->
							<div>
								<label
									for="contact-email"
									class="mb-1.5 block font-body text-sm font-medium text-text-primary"
								>
									Email <span class="text-accent" aria-hidden="true">*</span>
								</label>
								<input
									id="contact-email"
									type="email"
									bind:value={email}
									onblur={() => (emailTouched = true)}
									placeholder="your@email.com"
									autocomplete="email"
									aria-describedby={emailError ? 'email-error' : undefined}
									aria-invalid={!!emailError}
									class="w-full rounded-xl border bg-background px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-muted focus:ring-2 focus:outline-none
                    {emailError
										? 'border-red-500 focus:ring-red-500/20'
										: 'border-border focus:border-accent focus:ring-accent/20'}"
								/>
								{#if emailError}
									<p id="email-error" class="mt-1 font-body text-xs text-red-500" role="alert">
										{emailError}
									</p>
								{/if}
							</div>

							<!-- Message -->
							<div>
								<label
									for="contact-message"
									class="mb-1.5 block font-body text-sm font-medium text-text-primary"
								>
									Message <span class="text-accent" aria-hidden="true">*</span>
								</label>
								<textarea
									id="contact-message"
									bind:value={message}
									onblur={() => (messageTouched = true)}
									placeholder="Tell me about your project or opportunity..."
									rows={5}
									aria-describedby={messageError ? 'message-error' : undefined}
									aria-invalid={!!messageError}
									class="w-full resize-none rounded-xl border bg-background px-4 py-3 font-body text-sm leading-relaxed text-text-primary placeholder:text-text-muted focus:ring-2 focus:outline-none
                    {messageError
										? 'border-red-500 focus:ring-red-500/20'
										: 'border-border focus:border-accent focus:ring-accent/20'}"
								></textarea>
								{#if messageError}
									<p id="message-error" class="mt-1 font-body text-xs text-red-500" role="alert">
										{messageError}
									</p>
								{/if}
							</div>

							<!-- Submission error banner -->
							{#if status === 'error'}
								<div
									class="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3"
									role="alert"
								>
									<Icon name="alert" size={16} class="shrink-0 text-red-400" />
									<p class="font-body text-sm text-red-400">Failed to send. Please try again.</p>
								</div>
							{/if}

							<!-- Submit -->
							<button
								type="button"
								onclick={handleSubmit}
								disabled={status === 'loading'}
								aria-busy={status === 'loading'}
								class="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-display text-sm font-semibold text-white transition-all duration-200
                  {status === 'loading'
									? 'cursor-not-allowed opacity-70'
									: 'cursor-pointer hover:scale-[1.01] hover:shadow-lg'}"
								style="background: var(--color-accent);"
							>
								{#if status === 'loading'}
									<Icon name="spinner" size={16} />
									Sending...
								{:else}
									Send Message
									<Icon name="send" size={16} />
								{/if}
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
