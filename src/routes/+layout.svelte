<script>
	// @ts-nocheck

	/* ------------ Page Data ----------- */

	// /** @type {import('./$types').PageData} */
	// export let data;

	/* ------------- Imports ------------ */

	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	/* -------- Component Imports ------- */

	/* -------------- Icons ------------- */

	import FaRegMoon from 'svelte-icons/fa/FaRegMoon.svelte';
	import FaSun from 'svelte-icons/fa/FaSun.svelte';
	import FaAdjust from 'svelte-icons/fa/FaAdjust.svelte';
	import FaFire from 'svelte-icons/fa/FaFire.svelte';

	/* --------- Store Variables -------- */

	import { darkMode } from '../store.js';
	import { glowing } from '../store.js';

	/* ----- Component Subscriptions ---- */

	/* ------------ Variables ----------- */

	let systemDarkMode;

	/* ----------- Life Cycles ---------- */

	onMount(() => {
		console.log(`Window Size: ${window.innerWidth}x${window.innerHeight}`);

		darkMode.subscribe((value) => {
			updateTheme();
		});
		glowing.subscribe((value) => {});

		const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		systemDarkMode = darkModeQuery.matches;
		darkModeQuery.addListener((e) => {
			systemDarkMode = e.matches;
			updateTheme();
		});

		initVariables();
	});

	/* ------------ Functions ----------- */

	function initVariables() {
		const _darkMode = localStorage.getItem('darkMode') || $darkMode;
		darkMode.update((v) => _darkMode);
		const _glowing = (localStorage.getItem('glowing') || $glowing) === 'true';
		glowing.update((v) => _glowing);
	}

	/* ---------------------------------- */
	/*              DARKMODE              */
	/* ---------------------------------- */

	function isDarkMode() {
		return $darkMode == 1 || ($darkMode == 2 && systemDarkMode);
	}

	function cycleDarkMode() {
		if ($darkMode >= 2) {
			darkMode.update((v) => 0);
		} else {
			darkMode.update((v) => v + 1);
		}
		localStorage.setItem('darkMode', `${$darkMode}`);
		updateTheme();
	}

	function updateTheme() {
		const root = document.querySelector(':root');

		if (root) {
			const rootStyle = getComputedStyle(root);
			const lightForeGround = rootStyle.getPropertyValue('--lightForeGround');
			const lightBackGround = rootStyle.getPropertyValue('--lightBackGround');
			const lightBackGround2 = rootStyle.getPropertyValue('--lightBackGround2');
			const darkForeGround = rootStyle.getPropertyValue('--darkForeGround');
			const darkBackGround = rootStyle.getPropertyValue('--darkBackGround');
			const darkBackGround2 = rootStyle.getPropertyValue('--darkBackGround2');

			if (!isDarkMode()) {
				root.style.setProperty('--foreground', lightForeGround);
				root.style.setProperty('--background', lightBackGround);
				root.style.setProperty('--background2', lightBackGround2);
			} else {
				root.style.setProperty('--foreground', darkForeGround);
				root.style.setProperty('--background', darkBackGround);
				root.style.setProperty('--background2', darkBackGround2);
			}
		}
	}

	/* ---------------------------------- */
	/*               GLOWING              */
	/* ---------------------------------- */

	function toggleGlowing() {
		glowing.update((v) => !v);
		localStorage.setItem('glowing', $glowing);
	}
</script>

<slot />

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<main>
	{#if !$page.route.id.startsWith('/project')}
		<div
			role="button"
			id="darkModeButton"
			on:click={() => cycleDarkMode()}
			class="prevent-select styleButtons"
		>
			{#if $darkMode == 0}
				<FaSun />
			{:else if $darkMode == 1}
				<FaRegMoon />
			{:else}
				<FaAdjust />
			{/if}
		</div>

		<div
			class:glowing={$glowing}
			class="prevent-select styleButtons"
			id="glowingButton"
			role="button"
			on:click={() => toggleGlowing()}
		>
			<FaFire />
		</div>
	{/if}
</main>

<style is:global>
	:root {
		/* -------------- Sizes ------------- */

		--globalWidth: 80ch;

		/* ------------- Colors ------------- */

		--accent: 33, 150, 243;

		--lightForeGround: 68, 68, 68;
		--lightBackGround: 250, 250, 250;
		--lightBackGround2: 234, 234, 235;
		--darkForeGround: 255, 255, 255;
		--darkBackGround: 40, 44, 52;
		--darkBackGround2: 33, 37, 43;

		--foreground: var(--darkForeGround);
		--background: var(--darkBackGround);
		--background2: var(--darkBackGround2);

		--glowingButtonOpacity: 0.5;
	}

	:global(html) {
		font-family: Poppins;
		background-attachment: fixed;
		background-image: linear-gradient(135deg, rgba(var(--background)), rgba(var(--background2)));
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}

	:global(.prevent-select) {
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.styleButtons {
		position: fixed;
		width: 28px;
		height: 28px;
		/* border-radius: 50%; */
		cursor: pointer;
		padding: 0.22rem;
		background-color: rgba(var(--foreground), 0.1);
		color: rgba(var(--foreground), 0.8);
		box-shadow: inset 0 0 2px 1px rgba(var(--foreground), 0.2);
		padding: 10px;
		right: 15px;
	}
	.styleButtons:first-of-type {
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
	}
	.styleButtons:last-of-type {
		border-bottom-left-radius: 15px;
		border-bottom-right-radius: 15px;
	}

	#darkModeButton {
		bottom: 58px;
	}

	#glowingButton {
		bottom: 10px;
		color: rgba(255, 255, 255, 0.6);
		transition: background-color 0.5s ease-in-out;
	}
	#glowingButton.glowing {
		background-size: 400%;
		background-position: 0%;
		background-image: linear-gradient(
			90deg,
			rgba(255, 0, 0, var(--glowingButtonOpacity)) 0%,
			rgba(255, 154, 0, var(--glowingButtonOpacity)) 10%,
			rgba(208, 222, 33, var(--glowingButtonOpacity)) 20%,
			rgba(79, 220, 74, var(--glowingButtonOpacity)) 30%,
			rgba(63, 218, 216, var(--glowingButtonOpacity)) 40%,
			rgba(47, 201, 226, var(--glowingButtonOpacity)) 50%,
			rgba(28, 127, 238, var(--glowingButtonOpacity)) 60%,
			rgba(95, 21, 242, var(--glowingButtonOpacity)) 70%,
			rgba(186, 12, 248, var(--glowingButtonOpacity)) 80%,
			rgba(251, 7, 217, var(--glowingButtonOpacity)) 90%,
			rgba(255, 0, 0, var(--glowingButtonOpacity)) 100%
		);
		animation: scrolling 60s infinite;
		animation-timing-function: linear;
	}
	#glowingButton:not(.glowing) {
		color: rgba(var(--foreground), 0.8);
	}
	@keyframes scrolling {
		0% {
			background-position: 0%;
		}
		50% {
			background-position: 200%;
		}
		100% {
			background-position: 400%;
		}
	}
</style>
