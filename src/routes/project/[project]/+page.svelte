<script>
	// @ts-nocheck

	/* ------------ Page Data ----------- */

	export let data;

	/* ------------- Imports ------------ */

	import { onMount } from 'svelte';

	/* -------- Component Imports ------- */
	/* -------------- Icons ------------- */

	/* --------- Store Variables -------- */
	/* ----- Component Subscriptions ---- */
	/* ------------ Variables ----------- */
	/* ------- Store Subscriptions ------ */
	/* ----------- Life Cycles ---------- */

	onMount(() => {});

	/* ------------ Functions ----------- */
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<main>
	<iframe title="Project" src="https://projects.zlyfer.net/{data.project}" />
</main>

<style>
	:global(html) {
		margin-bottom: 0;
	}

	main {
		height: 100vh;
		width: 100vw;
	}
	iframe {
		display: block;
		border: none;
		height: 100%;
		width: 100%;
	}
</style>
