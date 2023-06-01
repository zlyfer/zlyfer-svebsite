<script>
	// @ts-nocheck

	/* ------------- Imports ------------ */

	import { onMount } from 'svelte';

	/* -------- Component Imports ------- */

	import Seperator from '../components/Seperator.svelte';
	import ChapterTitle from '../components/ChapterTitle.svelte';
	import SocialCard from '../components/SocialCard.svelte';
	import SkillCard from '../components/SkillCard.svelte';
	import ProjectCard from '../components/ProjectCard.svelte';

	/* -------------- Icons ------------- */

	/* --------- Store Variables -------- */

	import { _isDarkMode } from '../store.js';
	import { animation } from '../store.js';

	/* ----- Component Subscriptions ---- */

	/* ------------ Variables ----------- */

	// NOTE: tags = ['p5.js', 'vue', 'node.js', 'php', 'sql', 'game', 'animation', 'finished', 'wip', 'discontinued', 'discord',]
	const projects = [
		{
			name: 'asteroids',
			tags: ['finished', 'p5.js', 'game'],
			description:
				'An arcade-style Asteroids game with auto generated vertex-based asteroids and infinite border.'
		},
		{
			name: 'snake2',
			tags: ['finished', 'p5.js', 'game'],
			description: 'A gridless snake game. More visual pleasing successor of my first attempt.'
		},

		{
			name: 'connect-four',
			tags: ['discontinued', 'p5.js', 'game'],
			description: 'Connect Four game. I was mostly interested in the win-detection algorithm.'
		},
		{
			name: 'square',
			tags: ['finished', 'p5.js', 'animation'],
			description: 'Rainbow shapes animation with 5 different modifiers that change over time.'
		},
		{
			name: 'lissajous-curve-table',
			tags: ['finished', 'p5.js', 'animation'],
			description: 'A visualisation of the lissajous curve table. Inspired by The Coding Train.'
		},
		{
			name: 'condot',
			tags: ['finished', 'p5.js', 'animation'],
			description: 'Slow and calming background animation.'
		},
		{
			name: 'low-poly-art',
			tags: ['finished', 'p5.js', 'animation'],
			description: 'Colorful art using vertex based shapes.'
		},
		{
			name: 'barnsley-fern',
			tags: ['finished', 'p5.js', 'animation'],
			description: 'The Barnsley Fern fractal - visualized in color.'
		},
		{
			name: 'Material-Clock',
			tags: ['finished', 'p5.js', 'animation'],
			description: 'Simplistic material-style clock with milliseconds.'
		},
		{
			name: 'snake',
			tags: ['finished', 'p5.js', 'game'],
			description: 'A grid-based snake game with many options and speedrun-potential (seeds).'
		},
		{
			name: 'flicker',
			tags: ['discontinued', 'p5.js', 'game'],
			description: 'Colorful balls to flick around. First experiments with p5.js and vectors.'
		},
		{
			name: 'vertex-based-shapes',
			tags: ['finished', 'p5.js', 'animation'],
			description: 'Shapes made out of vertices that can be controlled with parameters.'
		},
		{
			name: 'cells',
			tags: ['discontinued', 'p5.js', 'animation'],
			description: 'Simulation of cells absorbing each other and dividing themselves.'
		}
	];

	/* ----------- Life Cycles ---------- */

	onMount(() => {
		_isDarkMode.subscribe((value) => {});
	});

	/* ------------ Functions ----------- */

	function getAge() {
		const birthDate = new Date('1998-06-24T00:00:00.000Z');
		const ageDifMs = Date.now() - birthDate.getTime();
		const ageDate = new Date(ageDifMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<main class:darkMode={$_isDarkMode} class:animation={$animation}>
	<div id="welcome">
		<div id="welcomeImgContainer">
			<div id="welcomeImg" />
		</div>
		<div class="info">
			<span class="text">
				Hello there,
				<br />
				<code>Frederik Shull</code> aka <code>zlyfer</code> here!
				<br />
				I am a <code>{getAge()}</code> y/o <code>software developer</code>
				<br />
				Feel free to look around!
			</span>
		</div>
	</div>

	<Seperator />

	<ChapterTitle text="socials" zoomEffect="true" />

	<ul class="socialCards">
		<li><SocialCard href="https://dynchan.net" title="DynChan" type="dynchan" /></li>
		<li><SocialCard href="https://github.com/zlyfer" title="GitHub" type="github" /></li>
		<li>
			<SocialCard href="https://instagram.com/zlyfer.arts/" title="Instagram" type="instagram" />
		</li>
		<li><SocialCard href="https://www.tiktok.com/@zlyfer2" title="TikTok" type="tiktok" /></li>
		<li><SocialCard href="https://www.youtube.com/@zlyfer" title="Youtube" type="youtube" /></li>
		<li><SocialCard href="https://twitch.tv/zlyfer2" title="Twitch" type="twitch" /></li>
		<li><SocialCard href="https://twitter.com/zIyfer" title="Twitter" type="twitter" /></li>
		<li>
			<SocialCard
				href="https://www.linkedin.com/in/frederik-shull-aa4b44228/"
				title="LinkedIn"
				type="linkedin"
			/>
		</li>
	</ul>

	<!-- <Seperator />

	<ChapterTitle text="work in progress" zoomEffect="true" /> -->

	<!-- <Seperator />

	<ChapterTitle text="knowledge" zoomEffect="true" />

	<SkillCard /> -->

	<Seperator />

	<ChapterTitle text="some projects" zoomEffect="true" />

	<ul class="projectCards">
		<li>
			<ProjectCard
				title="DynChan"
				description="Discord Bot for fully dynamic voice/text channels!"
				tags={['wip', 'discord', 'vue', 'node.js', 'php', 'sql']}
				url="https://dynchan.net/"
				github="https://github.com/dynchan"
			/>
		</li>
		{#each projects as project}
			<li>
				<ProjectCard
					title={project.name}
					description={project.description}
					tags={project.tags}
					url="/project/{project.name}"
					github="https://github.com/zlyfer/{project.name}"
				/>
			</li>
		{/each}
	</ul>

	<span class="badge no-select">
		made with ❤ by zlyfer | <a href="/imprint">imprint</a>
	</span>
</main>

<style>
	main {
		margin: 2rem auto;
		padding: 5rem;
		max-width: var(--globalWidth);
		border-radius: 22px;
		border: 1px solid rgba(var(--accent), 50%);
		background-color: rgba(255, 255, 255, 0.2);
	}
	main.darkMode {
		background-color: rgba(255, 255, 255, 0.1);
	}

	a {
		color: rgba(var(--accent), 1);
		text-decoration: none;
	}

	/* ---------- Welcome Card ---------- */

	#welcomeImg {
		width: 65vw;
		height: 65vw;
		max-width: 55ch;
		max-height: 55ch;
		aspect-ratio: 1/1 !important;
		margin: 2.5rem auto;
		box-shadow: inset 0 0 5px 2px var(--glowColor);
		border-radius: 20px;
		background-image: url('/logo.webp');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		border: 2px solid var(--glowColor);
		filter: drop-shadow(0 0 0.2rem var(--glowColor));
		animation: fadeImage 20s ease-in-out infinite;
	}
	.animation #welcomeImg {
		animation: animation 5s ease-in-out infinite, fadeImage 20s ease-in-out infinite;
	}
	#welcome .info {
		margin: 1rem auto 2.5rem auto;
		text-align: center;
	}
	#welcome .text {
		font-size: 1.3rem;
		color: rgba(var(--foreground), 90%);
		line-height: 150%;
	}

	code {
		font-size: 0.875em;
		font-weight: bold;
		background: rgba(var(--accent), 20%);
		color: rgb(var(--accent));
		border-radius: 5px;
		padding: 0.2em 0.4em;
	}

	/* -------------- Cards ------------- */

	ul {
		list-style-type: none;
	}

	.socialCards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(17ch, 1fr));
		gap: 0.7rem;
		padding: 0 5px;
	}
	.projectCards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(30ch, 1fr));
		gap: 1rem;
		padding: 0 5px;
	}

	/* -------------- Badge ------------- */

	span.badge {
		display: block;
		width: fit-content;
		margin: 35vh auto 50px auto;
		text-align: center;
		font-size: 1.5rem;
		display: block;
		font-weight: 600;
		padding: 3px 15px;
		border-radius: 2rem;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		-moz-backdrop-filter: blur(10px);
		color: rgba(0, 0, 0, 0.4);
		background-color: rgba(0, 0, 0, 0.1);
	}
	.darkMode span.badge {
		color: rgba(255, 255, 255, 0.5);
		background-color: rgba(255, 255, 255, 0.1);
	}

	/* -------- Responsive Design ------- */

	@media (max-width: 875px) {
		.socialCards {
			grid-template-columns: repeat(auto-fit, minmax(30ch, 1fr));
		}
	}
	@media (max-width: 775px) {
		.socialCards {
			grid-template-columns: repeat(auto-fit, minmax(25ch, 1fr));
		}
	}
	@media (max-width: 600px) {
		.socialCards {
			grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));
		}
	}
	@media (max-width: 450px) {
		.socialCards {
			gap: 0.5rem;
			grid-template-columns: repeat(auto-fit, minmax(15ch, 1fr));
		}
	}

	@media (max-width: 705px) {
		main {
			width: 100%;
			margin: 0;
			padding: 0;
		}
	}
	@media (max-width: 500px) {
		#welcome .text {
			font-size: 1rem;
		}
	}
	@media (max-width: 350px) {
		#welcome .text {
			font-size: 0.8rem;
		}
	}
	@media (max-width: 300px) {
		#welcome .text {
			font-size: 0.7rem;
		}
	}

	/* ----------- Animations ----------- */

	@keyframes fadeImage {
		0% {
			background-image: url('/selfie.webp');
			--glowColor: var(--glowSelfie);
			-webkit-filter: opacity(1) drop-shadow(0 0 0.2rem var(--glowColor));
		}
		45% {
			background-image: url('/selfie.webp');
			--glowColor: var(--glowSelfie);
			-webkit-filter: opacity(1) drop-shadow(0 0 0.45rem var(--glowColor));
		}
		47% {
			-webkit-filter: opacity(0.5) drop-shadow(0 0 0.46rem var(--glowColor));
		}
		50% {
			background-image: url('/logo.webp');
			--glowColor: var(--glowLogo);
			-webkit-filter: opacity(1) drop-shadow(0 0 0.5rem var(--glowColor));
		}
		95% {
			background-image: url('/logo.webp');
			--glowColor: var(--glowLogo);
			-webkit-filter: opacity(1) drop-shadow(0 0 0.46rem var(--glowColor));
		}
		97% {
			-webkit-filter: opacity(0.5) drop-shadow(0 0 0.45rem var(--glowColor));
		}
	}
	@keyframes animation {
		0% {
			filter: drop-shadow(0 0 0.2rem var(--glowColor));
			box-shadow: inset 0 0 5px 2px var(--glowColor);
		}
		50% {
			filter: drop-shadow(0 0 0.5rem var(--glowColor));
			box-shadow: inset 0 0 12px 2px var(--glowColor);
		}
		100% {
			filter: drop-shadow(0 0 0.2rem var(--glowColor));
			box-shadow: inset 0 0 5px 2px var(--glowColor);
		}
	}
</style>
