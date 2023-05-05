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
	export let zoomEffect;

	/* ------------ Variables ----------- */

	let darkMode;
	let glowing;
	let hoveredLetterIndex = null;
	let letters = [];

	/* ----------- Life Cycles ---------- */

	onMount(() => {
		_darkMode.subscribe((value) => {
			darkMode = value;
		});
		_glowing.subscribe((value) => {
			glowing = value;
		});

		letters = title.split('');
		for (let i = 0; i < 5; i++) {
			letters.push(' ');
			letters.unshift(' ');
		}
	});

	/* ------------ Functions ----------- */

	function handleMouseOver(event) {
		if (zoomEffect === 'true') {
			hoveredLetterIndex = parseInt(event.target.getAttribute('data-index'));
		}
	}

	function handleMouseLeave() {
		if (zoomEffect === 'true') {
			hoveredLetterIndex = null;
		}
	}

	function getLetterClass(i, hoveredLetterIndex) {
		const distance = Math.abs(hoveredLetterIndex - i);
		if (hoveredLetterIndex && distance === 0) {
			return 'hovered';
		} else if (hoveredLetterIndex && distance <= 5) {
			return `hovered-${distance}`;
		} else {
			return '';
		}
	}
</script>

<main>
	<span class="chapterTitle">
		{#each letters as letter, i}
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<span
				class="letter {getLetterClass(i, hoveredLetterIndex)}"
				on:mouseover={handleMouseOver}
				on:mouseleave={handleMouseLeave}
				data-index={i}
			>
				{letter}
			</span>
		{/each}
	</span>
</main>

<style>
	:root {
		--fontSize: 48;
		--glowStrength: 0.5;
	}

	.chapterTitle {
		color: rgba(var(--foreground), 90%);
		cursor: default;
		display: block;
		font-size: 2.8rem;
		font-weight: bold;
		height: 64px;
		line-height: 2ch;
		/* margin: 1rem auto 2.5rem; */
		margin-bottom: 1rem;
		text-align: center;
		text-transform: uppercase;
		white-space: pre;
	}

	.letter {
		font-size: calc(var(--fontSize) * 0.5px);
		transition: font-size 0.3s, filter 0.1s;
	}
	.letter.hovered {
		font-size: calc(var(--fontSize) * 1px);
		filter: drop-shadow(0 0 calc(var(--glowStrength) * 1rem) rgba(var(--foreground), 100%));
	}
	.letter.hovered-1 {
		font-size: calc(var(--fontSize) * 0.9px);
		filter: drop-shadow(0 0 calc(var(--glowStrength) * 1rem) rgba(var(--foreground), 80%));
	}
	.letter.hovered-2 {
		font-size: calc(var(--fontSize) * 0.8px);
		filter: drop-shadow(0 0 calc(var(--glowStrength) * 1rem) rgba(var(--foreground), 60%));
	}
	.letter.hovered-3 {
		font-size: calc(var(--fontSize) * 0.7px);
		filter: drop-shadow(0 0 calc(var(--glowStrength) * 1rem) rgba(var(--foreground), 40%));
	}
	.letter.hovered-4 {
		font-size: calc(var(--fontSize) * 0.6px);
		filter: drop-shadow(0 0 calc(var(--glowStrength) * 1rem) rgba(var(--foreground), 20%));
	}
	.letter.hovered-5 {
		font-size: calc(var(--fontSize) * 0.5px);
		/* filter: drop-shadow(0 0 calc(var(--glowStrength) * 1rem) rgba(var(--foreground), 0%)); */
	}
</style>
