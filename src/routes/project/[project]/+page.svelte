<script>
	// @ts-nocheck

	/* ------------ Page Data ----------- */

	/** @type {import('./$types').PageData} */
	export let data;

	/* ------------- Imports ------------ */

	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	/* -------- Component Imports ------- */
	/* -------------- Icons ------------- */

	import IoMdArrowRoundBack from 'svelte-icons/io/IoMdArrowRoundBack.svelte';

	/* --------- Store Variables -------- */
	/* ----- Component Subscriptions ---- */
	/* ------------ Variables ----------- */
	/* ------- Store Subscriptions ------ */
	/* ----------- Life Cycles ---------- */

	onMount(() => {});

	/* ------------ Functions ----------- */

	const preserveScroll = (url) => {
		goto(url, {
			noscroll: true
		});
	};
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<main>
	{#if $page.route.id.startsWith('/project')}
		<a id="backButton" href="/">
			<IoMdArrowRoundBack />
		</a>
	{/if}
	<iframe title="Project" src="https://projects.zlyfer.net/{data.project}" />
</main>

<style>
	:global(html) {
		margin-bottom: 0;
	}

	#backButton {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
		width: 2rem;
		height: 2rem;
		padding: 0.5rem;
		background-color: #222;
		color: #999;
		border-radius: 50%;
		border: 2px solid #eee;
		cursor: pointer;
	}
	#backButton:hover {
		background-color: #eee;
		border-color: #222;
		transform: scale(0.95);
	}

	main {
		height: 100vh;
		width: 100vw;
	}
	iframe {
		border: none;
		height: 100%;
		width: 100%;
	}
</style>
