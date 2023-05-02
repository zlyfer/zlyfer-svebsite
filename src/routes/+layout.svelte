<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-interactive-supports-focus -->

<script>
	import FaRegMoon from 'svelte-icons/fa/FaRegMoon.svelte';
	import FaSun from 'svelte-icons/fa/FaSun.svelte';
	import FaAdjust from 'svelte-icons/fa/FaAdjust.svelte';

	import { onMount } from 'svelte';
	let darkMode = 2;
	let systemDarkMode = true;

	onMount(() => {
		const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		systemDarkMode = darkModeQuery.matches;
		updateTheme();
		darkModeQuery.addListener((e) => {
			systemDarkMode = e.matches;
			updateTheme();
		});
	});

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
</script>

<div role="button" id="darkModeButton" on:click={() => cycleDarkMode()} class="prevent-select">
	{#if darkMode == 0}
		<FaSun />
	{:else if darkMode == 1}
		<FaRegMoon />
	{:else}
		<FaAdjust />
	{/if}
</div>

<slot />

<style is:global>
	:root {
		/* ---------------------------------- */
		/*              CONSTANTS             */
		/* ---------------------------------- */
		/* -------------- Sizes ------------- */
		--globalWidth: 80ch;
		/* ------------- Colors ------------- */
		--lightForeGround: 68, 68, 68;
		--lightBackGround: 250, 250, 250;
		--lightBackGround2: 234, 234, 235;

		--darkForeGround: 255, 255, 255;
		--darkBackGround: 40, 44, 52;
		--darkBackGround2: 33, 37, 43;
		/* ---------------------------------- */
		/*               GLOBALS              */
		/* ---------------------------------- */
		--accent: 76, 175, 80;
		--foreground: var(--darkForeGround);
		--background: var(--darkBackGround);
		--background2: var(--darkBackGround2);
	}

	:global(.prevent-select) {
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
	}

	:global(html) {
		font-family: system-ui, sans-serif;
		/* background-color: rgba(var(--background), 1); */
		background-attachment: fixed;
		background-image: linear-gradient(135deg, rgba(var(--background)), rgba(var(--background2)));
	}
	:global(.socialCards) {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15ch, 1fr));
		gap: 1rem;
		padding: 0;
	}
	:global(.projectCards) {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(30ch, 1fr));
		gap: 1rem;
		padding: 0;
	}

	#darkModeButton {
		position: fixed;
		top: 1rem;
		right: 1rem;
		width: 1.8rem;
		height: 1.8rem;
		border-radius: 50%;
		background-color: rgba(var(--foreground), 1);
		color: rgba(var(--background), 1);
		cursor: pointer;
		padding: 0.2rem;
	}
</style>
