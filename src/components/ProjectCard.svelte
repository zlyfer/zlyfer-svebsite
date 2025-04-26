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
	export let description;
	export let url;
	export let github;
	export let cardColor = 'rgba(var(--backgroundCounter), 0.8)';
	export let tags = [];

	/* ------------ Variables ----------- */

	/* ------- Store Subscriptions ------ */

	/* ----------- Life Cycles ---------- */

	onMount(() => {});

	/* ------------ Functions ----------- */
</script>

<main class="projectCard" class:animation={$animation} style:--cardColor={cardColor}>
	<a {...url ? { href: url, target: url.startsWith('/project') ? null : '_blank' } : {}}>
		<a class="githubIcon" href={github} target="_blank">
			<div>
				<FaGithub />
			</div>
		</a>
		<h2>
			{title}
		</h2>
		<p>
			{description}
		</p>
		{#each tags as tag}
			<span class="tag {tag}">{tag}</span>
		{/each}
	</a>
</main>

<style>
	:root {
		--cutout-size: 80px;
	}

	.projectCard {
		list-style: none;
		display: flex;
		padding: 0.25rem;
		background-image: none;
		background-size: 400%;
		background-position: 100%;
		transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.2s;
		box-shadow: inset 0 0 0 3px rgba(var(--foreground), 0.1);
		border-radius: 20px;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		position: relative;
		min-height: 205px;
	}
	.projectCard:hover:not(:has(.githubIcon:hover)) {
		background-position: 0;
		background-image: linear-gradient(45deg, var(--cardColor), rgb(var(--background)) 40%);
		box-shadow: inset 0 0 0 3px rgba(var(--foreground), 0.1);
		/* filter: brightness(1.1) drop-shadow(0 0 0.3rem var(--cardColor)); */
	}

	/* .projectCard.animation:hover {
		animation: animation 3s infinite;
	} */
	.projectCard > a {
		width: 100%;
		text-decoration: none;
		line-height: 1.4;
		padding: 1rem 1.3rem;
		border-radius: 0.35rem;
		color: var(--cardColor);
		opacity: 0.8;
	}
	.projectCard:hover:not(:has(.githubIcon:hover)) h2,
	.projectCard:hover:not(:has(.githubIcon:hover)) p {
		color: #eee;
		text-shadow: rgba(var(--darkBackground), 1) 2px 1px 7px;
	}

	h2 {
		margin: 0;
		font-size: 1.25rem;
		transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
		text-transform: capitalize;
	}
	p {
		margin-top: 0.5rem;
		color: rgba(var(--foreground), 1);
		font-family: 'Courier New', Courier, monospace;
		font-weight: bold;
		font-size: 17px;
	}

	span.tag {
		float: left;
		padding: 5px 12px;
		font-size: 0.9rem;
		font-weight: 600;
		border-radius: 15px;
		color: rgba(0, 0, 0, 0.5);
		background-color: rgba(var(--foreground), 1);
		margin: 2px 2px;
		width: auto;
		max-width: auto;
	}
	span.finished {
		background-color: #5fba62;
	}
	span.wip {
		background-color: #fdd835;
	}
	span.discontinued {
		background-color: #f46e62;
	}
	span.game {
		background-color: #2b9af3;
	}
	span.animation {
		background-color: #c27fd1;
	}
	span.discord {
		background-color: #8790f2;
	}
	span.p5\.js {
		background-color: #f16a94;
	}
	span.node\.js {
		background-color: #6ca267;
	}
	span.php {
		background-color: #8893c3;
	}
	span.sql {
		background-color: #1fb5ff;
	}
	span.vue {
		background-color: #41b883;
	}
	span.ionic {
		background-color: #3880ff;
	}
	span.angular {
		background-color: #dd0031;
	}
	span.sveltekit {
		background-color: #ff3e00;
	}
	span.subsonic {
		background-color: #ffd320;
	}
	span.vanilla {
		background-color: #ebdda5;
	}
	span.gaming {
		background-color: #935cc7;
	}

	.githubIcon {
		width: 1.5rem;
		height: 1.5rem;
		position: absolute;
		top: 14px;
		right: 15px;
		color: rgba(var(--foreground), 1);
		transition: color 0.2s;
		background: rgba(var(--foreground), 0.1);
		padding: 5px;
		border-radius: 10px;
		border: 2px solid rgba(var(--foreground), 0.1);
	}
	.githubIcon:hover {
		background: rgba(var(--foreground), 0.2);
		border: 2px solid rgba(var(--foreground), 0.2);
	}

	/* @keyframes animation {
		0% {
			filter: brightness(1.1) drop-shadow(0 0 0rem var(--cardColor));
		}
		50% {
			filter: brightness(1.1) drop-shadow(0 0 0.3rem var(--cardColor));
		}
		100% {
			filter: brightness(1.1) drop-shadow(0 0 0rem var(--cardColor));
		}
	} */
</style>
