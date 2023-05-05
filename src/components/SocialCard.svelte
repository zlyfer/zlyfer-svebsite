<script>
	// @ts-nocheck

	/* ------------- Imports ------------ */

	import { onMount } from 'svelte';

	/* -------- Component Imports ------- */

	/* -------------- Icons ------------- */

	/* --------- Store Variables -------- */

	import { _darkMode } from '../stores.js';
	import { _glowing } from '../stores.js';

	/* ----- Component Subscriptions ---- */

	export let title;
	export let href;
	export let type;

	/* ------------ Variables ----------- */

	let darkMode;
	let glowing;
	const typeColor = 'var(--' + type + ')';
	const typeColorCounter = 'var(--' + type + '-counter)';

	/* ----------- Life Cycles ---------- */

	onMount(() => {
		_darkMode.subscribe((value) => {
			darkMode = value;
		});
		_glowing.subscribe((value) => {
			glowing = value;
		});
	});

	/* ------------ Functions ----------- */
</script>

<main>
	<li
		class="socialCard"
		class:glowing
		style:--typeColor={typeColor}
		style:--typeColorCounter={typeColorCounter}
	>
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
	.socialCard:is(:hover, :focus-within) {
		background-position: 0;
		background-image: linear-gradient(
			45deg,
			rgb(var(--typeColor)),
			rgb(var(--typeColorCounter)) 30%
		);
		border: 5px solid rgba(var(--typeColor), 1);
		transform: scale(1.05);
	}
	.socialCard.glowing:is(:hover, :focus-within) {
		animation-name: glowing;
		animation-duration: 5s;
		animation-iteration-count: infinite;
	}
	.socialCard:is(:hover, :focus-within) h2 {
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
				rgb(var(--typeColor)),
				rgb(var(--typeColorCounter)) 30%
			);
			border: 5px solid rgba(var(--typeColor), 1);
			filter: brightness(1.1) drop-shadow(0 0 0.25rem rgba(var(--typeColor), 1));
		}
		.title {
			color: white;
		}
	}

	@keyframes glowing {
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
