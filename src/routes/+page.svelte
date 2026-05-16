<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import AiSummarizer from '$lib/components/AiSummarizer.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<!-- Accessibility: skip-to-content link for keyboard/screen reader users -->
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:no-underline"
>
	Skip to content
</a>

<Navbar />

<main id="main-content">
	<Hero />
	<Projects />
	<Skills />
	<AiSummarizer />
	<Contact />
</main>

<Footer />
