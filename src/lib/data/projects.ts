/**
 * projects.ts
 *
 * Single source of truth for portfolio projects.
 *
 * TO ADD YOUR REAL PROJECTS:
 * 1. Drop screenshots into static/images/ (e.g. static/images/findahome.jpg)
 * 2. Set image: '/images/findahome.jpg'
 * 3. Replace placeholder URLs with real ones.
 *
 * allTags is derived automatically — add a new tag to any project
 * and the filter buttons update with no other changes needed.
 */

export interface Project {
	id: number;
	title: string;
	description: string;
	longDescription: string;
	image: string;
	tags: string[];
	techStack: string[];
	liveUrl: string;
	githubUrl: string;
	featured: boolean;
	year: string;
}

export const projects: Project[] = [
	{
		id: 1,
		title: 'Invoice App',
		description: 'A fully functional invoice management application.',
		longDescription:
			'A fully functional invoice management application built with React and TypeScript.',
		image: '/images/project1.png',
		tags: ['React', 'TypeScript'],
		techStack: ['React', 'TypeScript', 'Tailwind CSS', 'React Router'],
		liveUrl: 'https://github.com',
		githubUrl: 'https://github.com/Akanimo-Umoh/stage2',
		featured: true,
		year: '2026'
	},
	{
		id: 2,
		title: 'Habit Tracker PWA',
		description: 'A mobile-first Progressive Web App for tracking daily habits.',
		longDescription:
			'A production-grade PWA built with Next.js App Router and TypeScript. Features habit creation, daily check-ins, streak tracking, and offline support via localStorage. End-to-end tested with Playwright and unit-tested with Vitest.',
		image: '/images/project2.png',
		tags: ['Next.js', 'TypeScript'],
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vitest', 'Playwright'],
		liveUrl: 'https://habbit-tracker-ten-chi.vercel.app/',
		githubUrl: 'https://github.com/Akanimo-Umoh/habbit-tracker-PWA',
		featured: true,
		year: '2026'
	},
	{
		id: 3,
		title: 'Dev Portfolio',
		description: 'Immersive developer portfolio with AI resume summarizer.',
		longDescription:
			'This portfolio — built with SvelteKit, Tailwind CSS v4, and GSAP. Features smooth scroll animations, GSAP hero entrance, dark/light theme switching, and an AI-powered resume summarizer using Gemini Flash.',
		image: '/images/project3.png',
		tags: ['Svelte', 'TypeScript'],
		techStack: ['SvelteKit', 'TypeScript', 'Tailwind CSS v4', 'GSAP', 'Gemini API'],
		liveUrl: 'https://github.com',
		githubUrl: 'https://github.com',
		featured: true,
		year: '2026'
	},
	{
		id: 4,
		title: 'Task Manager',
		description: 'Vanilla JS task app with ARIA, edit modal, and overdue detection.',
		longDescription:
			'A Stage 1 assessment project in pure HTML, CSS, and vanilla JavaScript. Features status sync, expand/collapse with ARIA attributes, overdue interval updates, and a full edit modal with focus trapping.',
		image: '/images/project4.png',
		tags: ['JavaScript'],
		techStack: ['HTML5', 'CSS3', 'JavaScript'],
		liveUrl: 'https://stage1a-omega.vercel.app/',
		githubUrl: 'http://github.com/Akanimo-Umoh/stage1a',
		featured: false,
		year: '2026'
	}
];

// Derived from data — stays in sync automatically as you add projects.
export const allTags = ['All', ...new Set(projects.flatMap((p) => p.tags))];
