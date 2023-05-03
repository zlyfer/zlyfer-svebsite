<script>
	/* ------------- Imports ------------ */

	import { onMount } from 'svelte';

	/* -------------- Icons ------------- */

	import FaRegMoon from 'svelte-icons/fa/FaRegMoon.svelte';
	import FaSun from 'svelte-icons/fa/FaSun.svelte';
	import FaAdjust from 'svelte-icons/fa/FaAdjust.svelte';
	import FaFire from 'svelte-icons/fa/FaFire.svelte';

	/* --------- Store Variables -------- */

	import { _glowing } from '../stores.js';

	/* ------------ Variables ----------- */

	let glowing = false;
	let darkMode = 2;
	let systemDarkMode = true;

	/* ------- Store Subscriptions ------ */

	_glowing.subscribe((value) => {
		glowing = value;
	});

	/* ----------- Life Cycles ---------- */

	onMount(() => {
		const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		systemDarkMode = darkModeQuery.matches;
		updateTheme();
		darkModeQuery.addListener((e) => {
			systemDarkMode = e.matches;
			updateTheme();
		});
	});

	/* ---------------------------------- */
	/*              DARKMODE              */
	/* ---------------------------------- */

	function cycleDarkMode() {
		darkMode++;
		if (darkMode > 2) {
			darkMode = 0;
		}
		updateTheme();
		console.log(darkMode);
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
				// @ts-ignore
				root.style.setProperty('--foreground', lightForeGround);
				// @ts-ignore
				root.style.setProperty('--background', lightBackGround);
				// @ts-ignore
				root.style.setProperty('--background2', lightBackGround2);
			} else {
				// @ts-ignore
				root.style.setProperty('--foreground', darkForeGround);
				// @ts-ignore
				root.style.setProperty('--background', darkBackGround);
				// @ts-ignore
				root.style.setProperty('--background2', darkBackGround2);
			}
		}
	}

	function isDarkMode() {
		return darkMode == 1 || (darkMode == 2 && systemDarkMode);
	}

	/* ---------------------------------- */
	/*               GLOWING              */
	/* ---------------------------------- */

	function toggleGlowing() {
		_glowing.update((v) => !v);
	}
</script>

<main>
	<!-- svelte-ignore a11y-interactive-supports-focus -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class:glowing
		class="prevent-select styleButtons"
		id="glowingButton"
		role="button"
		on:click={() => toggleGlowing()}
	>
		<FaFire />
	</div>

	<!-- svelte-ignore a11y-interactive-supports-focus -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		role="button"
		id="darkModeButton"
		on:click={() => cycleDarkMode()}
		class="prevent-select styleButtons"
	>
		{#if darkMode == 0}
			<FaSun />
		{:else if darkMode == 1}
			<FaRegMoon />
		{:else}
			<FaAdjust />
		{/if}
	</div>
</main>

<slot />

<style is:global>
	:root {
		/* -------------- Sizes ------------- */

		--globalWidth: 80ch;

		/* ------------- Colors ------------- */

		--accent: 76, 175, 80;

		--lightForeGround: 68, 68, 68;
		--lightBackGround: 250, 250, 250;
		--lightBackGround2: 234, 234, 235;
		--darkForeGround: 255, 255, 255;
		--darkBackGround: 40, 44, 52;
		--darkBackGround2: 33, 37, 43;

		--foreground: var(--darkForeGround);
		--background: var(--darkBackGround);
		--background2: var(--darkBackGround2);
	}

	:global(html) {
		font-family: system-ui, sans-serif;
		background-attachment: fixed;
		background-image: linear-gradient(135deg, rgba(var(--background)), rgba(var(--background2)));
	}

	:global(.prevent-select) {
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.styleButtons {
		position: fixed;
		top: 1rem;
		width: 1.8rem;
		height: 1.8rem;
		border-radius: 50%;
		cursor: pointer;
		padding: 0.22rem;
		color: rgba(var(--background), 1);
		background-color: rgba(var(--foreground), 1);
	}
	.styleButtons:active {
		transform: scale(0.95);
	}

	#darkModeButton {
		right: 1rem;
	}

	#glowingButton {
		right: 4rem;
	}
	#glowingButton.glowing {
		background-size: 400%;
		background-position: 0%;
		background-image: linear-gradient(
			90deg,
			rgba(255, 0, 0, 1) 0%,
			rgba(255, 154, 0, 1) 10%,
			rgba(208, 222, 33, 1) 20%,
			rgba(79, 220, 74, 1) 30%,
			rgba(63, 218, 216, 1) 40%,
			rgba(47, 201, 226, 1) 50%,
			rgba(28, 127, 238, 1) 60%,
			rgba(95, 21, 242, 1) 70%,
			rgba(186, 12, 248, 1) 80%,
			rgba(251, 7, 217, 1) 90%,
			rgba(255, 0, 0, 1) 100%
		);
		animation: scrolling 60s infinite;
		animation-timing-function: linear;
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
