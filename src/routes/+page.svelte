<script>
	// @ts-nocheck

	/* ------------- Imports ------------ */

	import { onMount } from 'svelte';

	/* -------- Component Imports ------- */

	import ChapterTitle from '../components/ChapterTitle.svelte';
	import ProjectCard from '../components/ProjectCard.svelte';
	import Seperator from '../components/Seperator.svelte';
	import SkillCard from '../components/SkillCard.svelte';
	import SocialCard from '../components/SocialCard.svelte';

	/* -------------- Icons ------------- */

	/* --------- Store Variables -------- */

	import { _darkMode } from '../stores.js';
	import { _glowing } from '../stores.js';

	/* ----- Component Subscriptions ---- */

	/* ------------ Variables ----------- */

	let darkMode;
	let glowing;
	// tags = ['p5.js', 'vue', 'node.js', 'php', 'slim', 'sql', 'game', 'animation', 'finished', 'wip', 'discontinued', 'discord',]
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
			tags: ['discontinued', 'game'],
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
			tags: ['discontinued', 'animation'],
			description: 'Simulation of cells absorbing each other and dividing themselves.'
		}
	];

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

	function getAge() {
		const birthDate = new Date('1998-06-24T00:00:00.000Z');
		const ageDifMs = Date.now() - birthDate.getTime();
		const ageDate = new Date(ageDifMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<main>
	<div id="welcome">
		<div id="welcomeImgContainer">
			<div id="welcomeImg" class:glowing />
		</div>
		<div class="info">
			<span class="text">
				Hello there,
				<br />
				<code>Frederik Shull</code> aka <code>zlyfer</code> here!
				<br />
				I am a <code>{getAge()}</code> y/o <code>software developer</code>
				<br />
				Feel free to look around
				<img class="svgIcon" alt="heart" src="./heart.svg" />
			</span>
		</div>
	</div>

	<!-- <Seperator /> -->

	<ChapterTitle text="socials" zoomEffect="true" />

	<ul class="socialCards">
		<SocialCard href="https://dynchan.net" title="DynChan" type="dynchan" />
		<SocialCard href="https://github.com/zlyfer" title="GitHub" type="github" />
		<SocialCard href="https://www.instagram.com/zlyfer.arts/" title="Instagram" type="instagram" />
		<SocialCard href="https://www.tiktok.com/@zlyfer2" title="TikTok" type="tiktok" />
		<SocialCard href="https://www.youtube.com/@zlyfer" title="Youtube" type="youtube" />
		<SocialCard href="https://twitch.tv/zlyfer2" title="Twitch" type="twitch" />
		<SocialCard href="https://twitter.com/zIyfer" title="Twitter" type="twitter" />
		<SocialCard
			href="https://www.linkedin.com/in/frederik-shull-aa4b44228/"
			title="LinkedIn"
			type="linkedin"
		/>
	</ul>

	<!-- <Seperator />

	<ChapterTitle text="work in progress" zoomEffect="true" /> -->

	<!-- <Seperator />

	<ChapterTitle text="knowledge" zoomEffect="true" />

	<SkillCard /> -->

	<Seperator />

	<ChapterTitle text="some projects" zoomEffect="true" />

	<ul class="projectCards">
		<ProjectCard
			title="DynChan"
			description="Discord Bot for fully dynamic voice/text channels!"
			tags={['wip', 'discord', 'vue', 'node.js', 'php', 'slim', 'sql']}
			url="https://dynchan.net/"
			github="https://github.com/dynchan"
		/>
		{#each projects as project}
			<ProjectCard
				title={project.name}
				description={project.description}
				tags={project.tags}
				url="/project/{project.name}"
				github="https://github.com/zlyfer/{project.name}"
			/>
		{/each}
	</ul>
</main>

<style>
	:root {
		/* ------------- Socials ------------ */

		--glowLogo: #4caf50;
		--glowSelfie: #b38786;
		--glowColor: var(--glowSelfie);

		--dynchan: 76, 175, 80;
		--dynchan-counter: 55, 71, 79;
		--github: 120, 120, 120;
		--github-counter: 22, 27, 34;
		--instagram: 193, 53, 132;
		--instagram-counter: 244, 181, 84;
		--tiktok: 254, 44, 85;
		--tiktok-counter: 37, 244, 238;
		--youtube: 223, 32, 22;
		--youtube-counter: 200, 200, 200;
		--twitch: 138, 68, 240;
		--twitch-counter: 200, 200, 200;
		--twitter: 9, 155, 240;
		--twitter-counter: 200, 200, 200;
		--linkedin: 10, 102, 194;
		--linkedin-counter: 200, 200, 200;
	}

	main {
		margin: auto;
		padding: 5rem;
		max-width: var(--globalWidth);
		margin-bottom: 100px;
	}

	#welcome {
		display: grid;
		position: relative;
		background: rgba(var(--accent), 10%);
		border: 5px solid rgba(var(--accent), 50%);
		border-radius: 5px;
	}

	#welcomeImgContainer {
		width: 50%;
		aspect-ratio: 1/1;
		margin: 2.5rem auto 1.5rem auto;
		box-shadow: 0 0 0 2px rgba(var(--accent), 50%);
		border: 30px solid rgba(var(--background), 100%);
		background: rgba(var(--background), 100%);
		border-radius: 60px;
	}

	#welcomeImg {
		width: 100%;
		height: 100%;
		aspect-ratio: 1/1;
		box-shadow: inset 0 0 5px 2px var(--glowColor);
		border-radius: 50px;
		background-image: url('/selfie.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		border: 1px solid var(--glowColor);
		animation: fadeImage 20s ease-in-out infinite;
		filter: drop-shadow(0 0 0.2rem var(--glowColor));
	}
	#welcomeImg.glowing {
		background-image: url('/selfie.jpg');
		animation: glowing 5s ease-in-out infinite, fadeImage 20s ease-in-out infinite;
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
	#welcome .svgIcon {
		height: 1.85rem;
		position: absolute;
		margin-left: 5px;
		margin-top: 0px;
	}

	code {
		font-size: 0.875em;
		font-weight: bold;
		background: rgba(var(--accent), 20%);
		color: rgb(var(--accent));
		border-radius: 10px;
		padding: 0.2em 0.4em;
	}

	.socialCards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(17ch, 1fr));
		gap: 0.7rem;
		padding-left: 0;
	}
	.projectCards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(30ch, 1fr));
		gap: 1rem;
		padding: 0;
	}

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

	@media (max-width: 705px) {
		main {
			width: 100%;
			margin: 0;
			padding: 0;
		}
	}
	@media (max-width: 500px) {
		#welcome .svgIcon {
			height: 1.3rem;
		}
		#welcome .text {
			font-size: 1rem;
		}
	}
	@media (max-width: 350px) {
		#welcome .svgIcon {
			margin-top: 2px;
			height: 1.2rem;
		}
		#welcome .text {
			font-size: 0.8rem;
		}
	}
	@media (max-width: 300px) {
		#welcome .svgIcon {
			height: 1.1rem;
		}
		#welcome .text {
			font-size: 0.7rem;
		}
	}

	@keyframes fadeImage {
		0% {
			background-image: url('/selfie.jpg');
			--glowColor: var(--glowSelfie);
			opacity: 1;
		}
		45% {
			background-image: url('/selfie.jpg');
			--glowColor: var(--glowSelfie);
			opacity: 1;
		}
		47% {
			opacity: 0.5;
		}
		50% {
			background-image: url('/logo.png');
			--glowColor: var(--glowLogo);
			opacity: 1;
		}
		95% {
			background-image: url('/logo.png');
			--glowColor: var(--glowLogo);
			opacity: 1;
		}
		97% {
			opacity: 0.5;
		}
	}
	@keyframes glowing {
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
