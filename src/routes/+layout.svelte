<script>
	// @ts-nocheck

	/* ------------ Page Data ----------- */

	/* ------------- Imports ------------ */

	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import P5 from 'p5-svelte';
	import BackgroundSplash from '@components/BackgroundSplash.svelte';

	/* -------- Component Imports ------- */

	/* -------------- Icons ------------- */

	import FaRegMoon from 'svelte-icons/fa/FaRegMoon.svelte';
	import FaSun from 'svelte-icons/fa/FaSun.svelte';
	import FaAdjust from 'svelte-icons/fa/FaAdjust.svelte';
	import FaFire from 'svelte-icons/fa/FaFire.svelte';
	import IoMdArrowRoundBack from 'svelte-icons/io/IoMdArrowRoundBack.svelte';

	/* --------- Store Variables -------- */

	import { darkMode } from '../store.js';
	import { _isDarkMode } from '../store.js';
	import { animation } from '../store.js';

	/* ----- Component Subscriptions ---- */

	/* ------------ Variables ----------- */

	let systemDarkMode;
	let removeP5 = false;
	const backButtonRoutes = ['/imprint', '/project/'];

	/* ----------- Life Cycles ---------- */

	onMount(() => {
		const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		systemDarkMode = darkModeQuery.matches;
		darkModeQuery.addListener((e) => {
			systemDarkMode = e.matches;
			updateTheme();
		});

		darkMode.subscribe((value) => {
			_isDarkMode.update((v) => isDarkMode());
			updateTheme();
		});
		animation.subscribe((value) => {});

		initVariables();
	});

	onDestroy(() => {
		removeP5 = true;
	});

	/* ------------ Functions ----------- */

	function initVariables() {
		const _darkMode = localStorage.getItem('darkMode') || $darkMode;
		darkMode.update((v) => _darkMode);
		const _animation = (localStorage.getItem('animation') || $animation) === 'true';
		animation.update((v) => _animation);
	}

	function isTouchDevice() {
		if (typeof window === 'undefined') return false;
		return (
			'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
		);
	}

	/* ---------------------------------- */
	/*              DARKMODE              */
	/* ---------------------------------- */

	function isDarkMode() {
		return $darkMode == 'dark' || ($darkMode == 'auto' && systemDarkMode);
	}

	function cycleDarkMode() {
		const states = ['auto', 'dark', 'light'];
		const index = states.indexOf($darkMode);
		const nextIndex = (index + 1) % states.length;
		darkMode.update((v) => states[nextIndex]);

		localStorage.setItem('darkMode', $darkMode);
		updateTheme();
	}

	function updateTheme() {
		const root = document.querySelector(':root');

		if (root) {
			const rootStyle = getComputedStyle(root);
			const lightForeground = rootStyle.getPropertyValue('--lightForeground');
			const lightBackground = rootStyle.getPropertyValue('--lightBackground');
			const darkForeground = rootStyle.getPropertyValue('--darkForeground');
			const darkBackground = rootStyle.getPropertyValue('--darkBackground');

			if (isDarkMode()) {
				root.style.setProperty('--foreground', darkForeground);
				root.style.setProperty('--background', darkBackground);
				root.style.setProperty('--backgroundCounter', lightBackground);
			} else {
				root.style.setProperty('--foreground', lightForeground);
				root.style.setProperty('--background', lightBackground);
				root.style.setProperty('--backgroundCounter', darkBackground);
			}
		}
	}

	/* ---------------------------------- */
	/*              ANIMATION             */
	/* ---------------------------------- */

	function toggleAnimation() {
		animation.update((v) => !v);
		localStorage.setItem('animation', $animation);
	}
</script>

<slot />

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<main class:animation={$animation}>
	{#if backButtonRoutes.some((route) => $page.route.id.startsWith(route))}
		<a id="backButton" href="/">
			<IoMdArrowRoundBack />
		</a>
	{:else}
		<BackgroundSplash
			width={400}
			height={400}
			rotation={270}
			top="10%"
			left="10%"
			gradientColors={[
				{ stop: 0, color: 'hsla(339, 100%, 55%, 0.8)' },
				{ stop: 0.47, color: 'hsla(33, 94%, 57%, 0.8)' },
				{ stop: 1, color: 'hsla(197, 100%, 64%, 0.8)' }
			]}
		/>
		<BackgroundSplash
			width={250}
			height={650}
			rotation={-135}
			bottom="8%"
			right="12%"
			gradientColors={[
				{ stop: 0, color: 'hsla(225, 100%, 68%, 0.8)' },
				{ stop: 0.3, color: 'hsla(57, 100%, 71%, 0.8)' },
				{ stop: 0.5, color: 'hsla(57, 100%, 71%, 0.8)' },
				{ stop: 1, color: 'hsla(339, 100%, 55%, 0.8)' }
			]}
		/>
	{/if}

	<div id="styleButtons">
		{#if !$page.route.id.startsWith('/project')}
			<div id="darkModeButton" class="no-select styleButton" on:click={() => cycleDarkMode()}>
				{#if $darkMode == 'auto'}
					<FaAdjust />
				{:else if $darkMode == 'dark'}
					<FaRegMoon />
				{:else if $darkMode == 'light'}
					<FaSun />
				{/if}
			</div>

			<div id="animationButton" class="no-select styleButton" on:click={() => toggleAnimation()}>
				<FaFire />
			</div>
		{/if}
	</div>
</main>

<style is:global>
	:root {
		/* -------------- Misc ------------- */

		--globalWidth: 80ch;
		--animationButtonOpacity: 0.5;

		/* ------------- Colors ------------- */

		--accent: 33, 150, 243;
		/* ---------------- - --------------- */
		--lightForeground: 68, 68, 68;
		--lightBackground: 250, 250, 250;
		--darkForeground: 255, 255, 255;
		--darkBackground: 40, 44, 52;
		/* ---------------- - --------------- */
		--foreground: var(--darkForeground);
		--background: var(--darkBackground);
		--backgroundCounter: var(--lightBackground);

		/* ------------- Socials ------------ */

		--github-counter: 22, 27, 34;
		--github: 120, 120, 120;
		--instagram-counter: 244, 181, 84;
		--instagram: 193, 53, 132;
		--tiktok-counter: 37, 244, 238;
		--tiktok: 254, 44, 85;
		--youtube-counter: 200, 200, 200;
		--youtube: 223, 32, 22;
		--twitch-counter: 200, 200, 200;
		--twitch: 138, 68, 240;
		--steam-counter: 200, 200, 200;
		--steam: 57, 113, 152;
		--twitter-counter: 200, 200, 200;
		--twitter: 9, 155, 240;
		--linkedin-counter: 200, 200, 200;
		--linkedin: 10, 102, 194;
	}

	/* ------------- Global ------------- */

	:global(html) {
		font-family: Poppins;
		background-color: rgba(var(--background), 1);
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}

	:global(.no-select) {
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(*::selection) {
		background: #e57a9b;
		color: rgba(var(--lightBackground), 1);
	}

	/* ----------- Back Button ---------- */

	#backButton {
		position: fixed;
		bottom: 35px;
		left: 35px;
		width: 2rem;
		height: 2rem;
		padding: 0.5rem;
		border-radius: 10px;
		border-top-left-radius: 50%;
		border-bottom-left-radius: 50%;
		cursor: pointer;
		border: 2px solid;
		background-color: rgba(var(--background));
		color: rgba(var(--foreground), 0.8);
		border-color: rgba(var(--foreground), 0.8);
		transition: background-color 0.2s ease-in-out;
	}
	#backButton:hover {
		background-color: rgba(var(--foreground));
		color: rgba(var(--background), 0.8);
		border-color: rgba(var(--background), 0.8);
		box-shadow: 0 0 20px 0 rgba(var(--foreground), 0.5);
		/* transform: scale(0.95); */
	}

	/* ---------- Style Buttons --------- */

	#styleButtons div:first-child {
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
	}
	#styleButtons div:last-child {
		border-bottom-left-radius: 15px;
		border-bottom-right-radius: 15px;
	}

	.styleButton {
		position: fixed;
		width: 28px;
		height: 28px;
		cursor: pointer;
		padding: 0.22rem;
		background-color: rgba(var(--foreground), 0.1);
		color: rgba(var(--foreground), 0.8);
		box-shadow: inset 0 0 2px 1px rgba(var(--foreground), 0.2);
		padding: 10px;
		right: 15px;
	}

	.styleButton:hover {
		filter: brightness(0.8);
	}

	#darkModeButton {
		bottom: 58px;
	}

	#animationButton {
		bottom: 10px;
		color: rgba(255, 255, 255, 0.6);
		transition: background-color 0.5s ease-in-out;
		will-change: background-position;
	}
	.animation #animationButton {
		background-size: 800%;
		background-position: 0%;
		background-image: linear-gradient(
			45deg,
			rgba(255, 0, 0, var(--animationButtonOpacity)) 0%,
			rgba(255, 154, 0, var(--animationButtonOpacity)) 5%,
			rgba(208, 222, 33, var(--animationButtonOpacity)) 10%,
			rgba(79, 220, 74, var(--animationButtonOpacity)) 15%,
			rgba(63, 218, 216, var(--animationButtonOpacity)) 20%,
			rgba(47, 201, 226, var(--animationButtonOpacity)) 25%,
			rgba(28, 127, 238, var(--animationButtonOpacity)) 30%,
			rgba(95, 21, 242, var(--animationButtonOpacity)) 35%,
			rgba(186, 12, 248, var(--animationButtonOpacity)) 40%,
			rgba(251, 7, 217, var(--animationButtonOpacity)) 45%,
			rgba(255, 0, 0, var(--animationButtonOpacity)) 50%,
			rgba(255, 154, 0, var(--animationButtonOpacity)) 55%,
			rgba(208, 222, 33, var(--animationButtonOpacity)) 60%,
			rgba(79, 220, 74, var(--animationButtonOpacity)) 65%,
			rgba(63, 218, 216, var(--animationButtonOpacity)) 70%,
			rgba(47, 201, 226, var(--animationButtonOpacity)) 75%,
			rgba(28, 127, 238, var(--animationButtonOpacity)) 80%,
			rgba(95, 21, 242, var(--animationButtonOpacity)) 85%,
			rgba(186, 12, 248, var(--animationButtonOpacity)) 90%,
			rgba(251, 7, 217, var(--animationButtonOpacity)) 95%,
			rgba(255, 0, 0, var(--animationButtonOpacity)) 100%
		);
		animation: scrolling 5s infinite;
		animation-timing-function: linear;
	}
	:not(.animation) #animationButton {
		color: rgba(var(--foreground), 0.8);
	}

	/* ------------ Keyframes ----------- */

	@keyframes scrolling {
		0% {
			background-position: 0%;
		}
		99.9% {
			background-position: 65%;
		}
		100% {
			background-position: 0%;
		}
	}
</style>
