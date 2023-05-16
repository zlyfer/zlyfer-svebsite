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
	export let cardColor = '#2196f3';
	export let tags = [];

	/* ------------ Variables ----------- */

	/* ------- Store Subscriptions ------ */

	/* ----------- Life Cycles ---------- */

	onMount(() => {});

	/* ------------ Functions ----------- */
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<main class="projectCard" class:animation={$animation} style:--cardColor={cardColor}>
	<!-- <li > -->
	<a href={url} target={url.startsWith('/project') ? null : '_blank'}>
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
	<!-- </li> -->
	<div class="githubBar">
		<a href={github} target="_blank">
			<div class="githubIcon">
				<FaGithub />
			</div>
			GitHub
		</a>
	</div>
</main>

<style>
	.projectCard {
		list-style: none;
		display: flex;
		padding: 0.25rem;
		padding-bottom: 3.5rem;
		background-image: none;
		background-size: 400%;
		background-position: 100%;
		transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.2s;
		box-shadow: inset 0 0 0 3px rgba(var(--foreground), 0.1);
		border-radius: 20px;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		backdrop-filter: blur(var(--blur));
		-webkit-backdrop-filter: blur(var(--blur));
		-moz-backdrop-filter: blur(var(--blur));
	}
	.projectCard > a {
		width: 100%;
		text-decoration: none;
		line-height: 1.4;
		padding: 1rem 1.3rem;
		border-radius: 0.35rem;
		color: var(--cardColor);
		opacity: 0.8;
	}
	.projectCard:hover {
		background-position: 0;
		background-image: linear-gradient(45deg, var(--cardColor), rgb(var(--background)) 40%);
		box-shadow: inset 0 0 0 3px rgba(var(--foreground), 0.5);
		filter: brightness(1.1) drop-shadow(0 0 0.3rem var(--cardColor));
	}
	.projectCard.animation:hover {
		animation: animation 3s infinite;
	}
	.projectCard:hover h2,
	.projectCard:hover p {
		color: #eee;
	}
	.projectCard:hover .githubBar {
		box-shadow: inset 0 0 0 3px #eee;
		color: #eee;
	}
	.projectCard:hover .githubIcon {
		color: #eee;
	}
	.projectCard:hover a {
		color: #eee;
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
		color: black;
		background-color: rgba(var(--foreground), 1);
		margin: 2px 2px;
		width: auto;
		max-width: auto;
	}
	span.tag:hover {
		filter: brightness(1.1);
	}
	span.finished {
		background-color: #4caf50;
	}
	span.wip {
		background-color: #fdd835;
	}
	span.discontinued {
		background-color: #f44336;
	}
	span.game {
		background-color: #2196f3;
	}
	span.animation {
		background-color: #b668ca;
	}
	span.discord {
		background-color: #606ceb;
	}
	span.p5\.js {
		background-color: #ed225d;
	}
	span.node\.js {
		background-color: #68a063;
	}
	span.php {
		background-color: #6a75af;
	}
	span.sql {
		background-color: #0084c2;
	}
	span.vue {
		background-color: #41b883;
	}

	.githubBar {
		width: calc(100% - 15px);
		height: 2.5rem;
		text-align: center;
		margin-top: 3px;
		position: absolute;
		bottom: 0px;
		left: 0;
		margin: 7.5px 7.5px;
		box-shadow: inset 0 0 0 3px rgba(var(--foreground), 0.1);
		border-radius: 15px;
		background-color: rgba(var(--foreground), 0.1);
		transition: box-shadow 0.2s;
	}

	.animation .githubBar:hover {
		background-color: rgba(var(--background), 0.1);
	}
	.githubBar a {
		text-decoration: none;
		line-height: 2.5rem;
		font-weight: bold;
		color: rgba(var(--foreground), 1);
		display: block;
		transition: color 0.2s;
	}
	.githubIcon {
		width: 1.5rem;
		height: 1.5rem;
		margin-right: 0.5rem;
		vertical-align: middle;
		position: absolute;
		margin-top: 0.4rem;
		margin-left: 1rem;
		color: rgba(var(--foreground), 1);
		transition: color 0.2s;
	}

	@keyframes animation {
		0% {
			filter: brightness(1.1) drop-shadow(0 0 0rem var(--cardColor));
		}
		50% {
			filter: brightness(1.1) drop-shadow(0 0 0.3rem var(--cardColor));
		}
		100% {
			filter: brightness(1.1) drop-shadow(0 0 0rem var(--cardColor));
		}
	}
</style>
