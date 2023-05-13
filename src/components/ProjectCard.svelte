<script>
	// @ts-nocheck

	/* ------------- Imports ------------ */

	import { onMount } from 'svelte';

	/* -------- Component Imports ------- */

	/* -------------- Icons ------------- */

	import FaGithub from 'svelte-icons/fa/FaGithub.svelte';

	/* --------- Store Variables -------- */

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

<main>
	<li class="projectCard" style:--cardColor={cardColor}>
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
	</li>
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
		padding-bottom: 1.5rem;
		background-image: none;
		background-size: 400%;
		background-position: 100%;
		transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.2s;
		box-shadow: inset 0 0 0 3px rgba(var(--foreground), 0.1);
		border-radius: 5px;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		-moz-backdrop-filter: blur(8px);
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
	.projectCard:is(:hover, :focus-within) {
		background-position: 0;
		background-image: linear-gradient(45deg, var(--cardColor), rgb(var(--background)) 40%);
		box-shadow: inset 0 0 0 3px rgba(var(--foreground), 0.5);
		filter: brightness(1.1);
		transform: scale(0.99);
	}
	.projectCard:is(:hover, :focus-within) h2,
	.projectCard:is(:hover, :focus-within) p {
		color: white;
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
		color: rgba(var(--background), 1);
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
		color: #eee;
	}
	span.wip {
		background-color: #fdd835;
		color: #222;
	}
	span.discontinued {
		background-color: #f44336;
		color: #eee;
	}
	span.game {
		background-color: #2196f3;
		color: #eee;
	}
	span.animation {
		background-color: #963caf;
		color: #eee;
	}
	span.discord {
		background-color: #5562ea;
		color: #eee;
	}
	span.p5\.js {
		background-color: #ed225d;
		color: #eee;
	}
	span.node\.js {
		background-color: #68a063;
		color: #eee;
	}
	span.php {
		background-color: #4f5b93;
		color: #eee;
	}
	span.sql {
		background-color: #005c85;
		color: #eee;
	}
	span.vue {
		background-color: #41b883;
		color: #eee;
	}

	.githubBar {
		width: 100%;
		height: 2.5rem;
		text-align: center;
		margin-top: 3px;
		box-shadow: inset 0 0 0 3px rgba(var(--foreground), 0.1);
		border-radius: 5px;
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
		background-color: rgba(var(--foreground), 0.1);
		transition: transform 0.2s;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		-moz-backdrop-filter: blur(8px);
	}
	.githubBar:hover {
		background-color: rgba(var(--foreground), 0.2);
		transform: scale(0.99);
	}
	.githubBar > a {
		text-decoration: none;
		line-height: 2.5rem;
		font-weight: bold;
		color: rgba(var(--foreground), 1);
		display: block;
		border-radius: 5px;
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
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
	}
</style>
