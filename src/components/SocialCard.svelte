<script>
	// @ts-nocheck

	/* ------------- Imports ------------ */

	import { onMount } from 'svelte';

	/* -------- Component Imports ------- */

	/* -------------- Icons ------------- */

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

	/* ------------ Functions ----------- */
</script>

<main
	class="socialCard"
	class:animation={$animation}
	style:--typeColor={typeColor}
	style:--typeColorCounter={typeColorCounter}
>
	<a {href} target="_blank">
		<h2 class="title">
			{title}
		</h2>
	</a>
</main>

<style>
	.socialCard {
		list-style: none;
		display: flex;
		background-image: none;
		background-size: 400%;
		border-radius: 30px;
		background-position: 100%;
		transition: background-position 0.5s cubic-bezier(0.22, 1, 0.36, 1);
		box-shadow: inset 0 0 0 5px rgba(var(--typeColor), 0.5);
	}
	.socialCard > a {
		width: 100%;
		text-decoration: none;
		line-height: 1.4;
		padding: 1rem 1.3rem;
		border-radius: 0.35rem;
		color: rgba(var(--foreground), 1);
		opacity: 0.8;
	}
	.socialCard:hover {
		background-position: -5px;
		background-image: linear-gradient(
			45deg,
			rgb(var(--typeColor)),
			rgb(var(--typeColorCounter)) 30%
		);
		box-shadow: 0 0 5px 2px rgba(var(--typeColor), 1);
	}

	.socialCard:hover .title {
		color: rgba(var(--darkForeground), 1);
	}

	.title {
		margin: 0;
		font-size: 1.25rem;
		text-align: center;
		transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
	}

	@media (hover: none) and (pointer: coarse) {
		.socialCard {
			background-position: -5px;
			background-image: linear-gradient(
				45deg,
				rgb(var(--typeColor)),
				rgb(var(--typeColorCounter)) 30%
			);
			box-shadow: 0 0 5px 2px rgba(var(--typeColor), 1);
		}

		.socialCard .title {
			color: rgba(var(--darkForeground), 1);
			text-shadow: 0 0 1px rgba(var(--darkBackground), 1);
		}
	}
</style>
