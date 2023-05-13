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

	onMount(() => {});

	/* ------------ Functions ----------- */
</script>

<main
	class:animation={$animation}
	style:--typeColor={typeColor}
	style:--typeColorCounter={typeColorCounter}
>
	<li class="socialCard" class:animation={$animation}>
		<a {href} target="_blank">
			<h2 class="title">
				{title}
			</h2>
		</a>
	</li>
</main>

<style>
	.socialCard {
		list-style: none;
		display: flex;
		background-image: none;
		background-size: 400%;
		border-radius: 0.6rem;
		background-position: 100%;
		transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
		border: 5px solid rgba(var(--typeColor), 0.4);
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		backdrop-filter: blur(var(--blur));
		-webkit-backdrop-filter: blur(var(--blur));
		-moz-backdrop-filter: blur(var(--blur));
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
	.animation .socialCard:hover {
		background-position: 0;
		background-image: linear-gradient(
			45deg,
			rgb(var(--typeColor)),
			rgb(var(--typeColorCounter)) 30%
		);
		border: 5px solid rgba(var(--typeColor), 1);
		transform: scale(1.05);
	}
	.animation .socialCard.animation:hover {
		animation-name: animation;
		animation-duration: 5s;
		animation-iteration-count: infinite;
	}
	.animation .socialCard:hover h2 {
		color: white;
	}

	.title {
		margin: 0;
		font-size: 1.25rem;
		text-align: center;
		transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
	}

	@media (hover: none) and (pointer: coarse) {
		.socialCard {
			background-position: 0;
			background-image: linear-gradient(
				45deg,
				rgba(var(--typeColor), 30%),
				rgba(var(--typeColorCounter), 30%) 30%
			);
			border: 5px solid rgba(var(--typeColor), 1);
		}
		.title {
			color: rgba(var(--foreground), 1);
		}
	}

	@keyframes animation {
		0% {
			filter: brightness(1.1) drop-shadow(0 0 0rem rgba(var(--typeColor), 1));
		}
		25% {
			filter: brightness(1.1) drop-shadow(0 0 0.5rem rgba(var(--typeColor), 1));
		}
		50% {
			filter: brightness(1.1) drop-shadow(0 0 0rem rgba(var(--typeColor), 1));
		}
		75% {
			filter: brightness(1.1) drop-shadow(0 0 0.5rem rgba(var(--typeColorCounter), 1));
		}
		100% {
			filter: brightness(1.1) drop-shadow(0 0 0rem rgba(var(--typeColorCounter), 1));
		}
	}
</style>
