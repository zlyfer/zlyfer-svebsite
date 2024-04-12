<script>
	// @ts-nocheck

	/* ------------- Imports ------------ */

	import { onMount } from 'svelte';

	/* -------- Component Imports ------- */

	/* -------------- Icons ------------- */

	import FaGithub from 'svelte-icons/fa/FaGithub.svelte';

	/* --------- Store Variables -------- */

	import { animation } from '../store.js';

	/* ----- Component Subscriptions ---- */

	export let title;
	export let href;
	export let type;

	/* ------------ Variables ----------- */

	const typeColor = 'var(--' + type + ')';
	const typeColorCounter = 'var(--' + type + '-counter)';

	/* ----------- Life Cycles ---------- */

	onMount(() => {});

	/* ------------ Functions ----------- */
</script>

<main
	class="socialCard"
	class:animation={$animation}
	style:--typeColor={typeColor}
	style:--typeColorCounter={typeColorCounter}
>
	<a class="link" {href} target="_blank">
		<h2 class="title">
			<div class="link-icon">
				<FaGithub />
			</div>
			<span class="link-title">{title}</span>
		</h2>
	</a>
</main>

<style>
	.link {
		display: inline-flex;
		cursor: pointer;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 100%;
		border-radius: 99em;
		position: relative;
		z-index: 1;
		overflow: hidden;
		transform-origin: center left;
		transition: width 0.2s ease-in;
		text-decoration: none;
		color: inherit;
	}
	.link:before {
		position: absolute;
		z-index: -1;
		content: '';
		display: block;
		border-radius: 99em;
		width: 0%;
		height: 100%;
		top: 0;
		transform: translateX(0%);
		transition: transform 0.2s ease-in;
		transform-origin: center right;
		background-color: #eee;
	}
	.link:hover,
	.link:focus {
		outline: 0;
		width: 100%;
	}
	.link:hover:before,
	.link:hover .link-title {
		width: 100%;
		/* transform: translateX(0%); */
		transform: scale(1);
	}
	.link-icon {
		color: var(--color);
		font-size: 27px !important;
		display: block;
		flex-shrink: 0;
		left: 18px;
		position: absolute;
	}
	.link-title {
		color: var(--color);
		/* transform: translateX(100%); */
		transform: scale(0);
		transition: transform 0.2s ease-in;
		display: block;
		text-align: center;
		text-indent: 20px;
		width: 100%;
	}
</style>
