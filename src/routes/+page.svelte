<script>
	// @ts-nocheck

	/* ------------- Imports ------------ */

	import { onMount } from 'svelte';

	/* -------- Component Imports ------- */

	import Seperator from '@components/Seperator.svelte';
	import ChapterTitle from '@components/ChapterTitle.svelte';
	import SocialCard from '@components/SocialCard.svelte';
	import SkillCard from '@components/SkillCard.svelte';
	import ProjectCard from '@components/ProjectCard.svelte';

	/* -------------- Icons ------------- */

	/* --------- Store Variables -------- */

	import { _isDarkMode } from '../store.js';
	import { animation } from '../store.js';

	/* ----- Component Subscriptions ---- */

	/* ------------ Variables ----------- */

	const otherProjects = [
		{
			name: 'asteroids',
			tags: ['p5.js', 'game'],
			description:
				'An arcade-style Asteroids game with auto generated vertex-based asteroids and infinite border.'
		},
		{
			name: 'snake2',
			tags: ['p5.js', 'game'],
			description: 'A gridless snake game. More visual pleasing successor of my first attempt.'
		},

		{
			name: 'connect-four',
			tags: ['discontinued', 'p5.js', 'game'],
			description: 'Connect Four game. I was mostly interested in the win-detection algorithm.'
		},
		{
			name: 'square',
			tags: ['p5.js', 'animation'],
			description: 'Rainbow shapes animation with 5 different modifiers that change over time.'
		},
		{
			name: 'lissajous-curve-table',
			tags: ['p5.js', 'animation'],
			description: 'A visualisation of the lissajous curve table. Inspired by The Coding Train.'
		},
		{
			name: 'condot',
			tags: ['p5.js', 'animation'],
			description: 'Slow and calming background animation.'
		},
		{
			name: 'low-poly-art',
			tags: ['p5.js', 'animation'],
			description: 'Colorful art using vertex based shapes.'
		},
		{
			name: 'barnsley-fern',
			tags: ['p5.js', 'animation'],
			description: 'The Barnsley Fern fractal - visualized in color.'
		},
		{
			name: 'Material-Clock',
			tags: ['p5.js', 'animation'],
			description: 'Simplistic material-style clock with milliseconds.'
		},
		{
			name: 'snake',
			tags: ['p5.js', 'game'],
			description: 'A grid-based snake game with many options and speedrun-potential (seeds).'
		},
		{
			name: 'flicker',
			tags: ['discontinued', 'p5.js', 'game'],
			description: 'Colorful balls to flick around. First experiments with p5.js and vectors.'
		},
		{
			name: 'vertex-based-shapes',
			tags: ['p5.js', 'animation'],
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

<main class:darkMode={$_isDarkMode}>
	<div id="welcome">
		<div id="welcomeImg" />
		<div class="info">
			<span class="text">
				Hello there,
				<br />
				<code>Frederik Shull</code> aka <code>zlyfer</code> here!
				<br />
				I am a <code>{getAge()}</code> y/o <code>software developer</code> .
				<br />
				Feel free to look around~
			</span>
		</div>
	</div>

	<Seperator />
	<ChapterTitle text="socials" zoomEffect="true" />

	<ul class="socialCards">
		<li><SocialCard href="https://github.com/zlyfer" title="GitHub" type="github" /></li>
		<li>
			<SocialCard href="https://instagram.com/zlyfer.arts/" title="Instagram" type="instagram" />
		</li>
		<li><SocialCard href="https://www.tiktok.com/@zlyfer2" title="TikTok" type="tiktok" /></li>
		<li><SocialCard href="https://www.youtube.com/@zlyfer" title="Youtube" type="youtube" /></li>
		<li><SocialCard href="https://twitch.tv/zlyfer2" title="Twitch" type="twitch" /></li>
		<li>
			<SocialCard href="https://steamcommunity.com/id/zlyfer" title="Steam" type="steam" />
		</li>
		<li><SocialCard href="https://twitter.com/zIyfer" title="Twitter" type="twitter" /></li>
		<li>
			<SocialCard
				href="https://www.linkedin.com/in/frederik-shull-aa4b44228/"
				title="LinkedIn"
				type="linkedin"
			/>
		</li>
	</ul>

	<!-- <Seperator /> -->
	<!-- <ChapterTitle text="knowledge" zoomEffect="true" /> -->

	<Seperator />
	<ChapterTitle text="full stack projects" zoomEffect="true" />

	<ul class="projectCards">
		<li>
			<ProjectCard
				title="league of legends arena checklist"
				description="Keep track of your #1 wins in League of Legends Arena!"
				cardColor="#db4f47"
				tags={['wip', 'gaming', 'vanilla', 'php', 'sql']}
				url="https://lolarena.zlyfer.net/"
				github="https://github.com/zlyfer/lolarena"
			/>
		</li>
		<li>
			<ProjectCard
				title="DynChan"
				description="Discord Bot for fully dynamic voice/text channels!"
				cardColor="#448aff"
				tags={['wip', 'discord', 'vue', 'node.js', 'php', 'sql']}
				url="https://dynchan.net/"
				github="https://github.com/dynchan"
			/>
		</li>
		<li>
			<ProjectCard
				title="UnGunWiz"
				description="PUBG Weapon Stats & Charts! Available as Android App."
				cardColor="#9d61d5"
				tags={['wip', 'ionic', 'angular', 'php', 'sql']}
				url="https://ungunwiz.net/"
				github="https://github.com/ungunwiz"
			/>
		</li>
	</ul>

	<Seperator />
	<ChapterTitle text="also working on" zoomEffect="true" />

	<ul class="projectCards">
		<li>
			<ProjectCard
				title="Portfolio"
				description="This website. Built with SvelteKit!"
				cardColor="#ea7fa1"
				tags={['wip', 'sveltekit']}
				url="https://zlyfer.net/"
				github="https://github.com/zlyfer/zlyfer-svebsite"
			/>
		</li>

		<li>
			<ProjectCard
				title="SubChordium"
				description="A Discord bot that browses and plays music from one or multiple Subsonic servers."
				cardColor="#ffc419"
				tags={['wip', 'discord', 'node.js', 'subsonic']}
				github="https://github.com/zlyfer/subchordium"
			/>
		</li>
	</ul>

	<Seperator />
	<ChapterTitle text="other projects" zoomEffect="true" />

	<ul class="projectCards">
		{#each otherProjects as project}
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

	<span class="badge">
		made with <span style="color: #e57a9b;">❤</span> by zlyfer | <a href="/imprint">imprint</a>
	</span>
</main>

<style>
	main {
		margin: 2rem auto;
		padding: 5rem;
		max-width: var(--globalWidth);
		border-radius: 22px;
		border: 5px solid rgba(var(--accent), 50%);
		background-color: rgba(255, 255, 255, 0.2);
	}
	main.darkMode {
		background-color: rgba(255, 255, 255, 0.1);
	}

	a {
		color: rgba(var(--accent), 0.7);
		filter: brightness(1.1);
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
		border-radius: 20px;
		background-image: url('/selfie.webp');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		box-shadow: 0 0 0px 4px rgba(var(--accent), 50%);
	}

	#welcome .info {
		margin: 1rem auto 2.5rem auto;
		text-align: center;
	}
	#welcome .text {
		font-size: 1.3rem;
		font-weight: 600;
		color: rgba(var(--foreground), 70%);
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
		/* margin: 35vh auto 8rem auto; */
		margin: 8rem auto 0 auto;
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

	@media (max-width: 120ch) {
		main {
			margin: 0;
			border-radius: 0;
			border: 1px solid transparent;
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
		span.badge {
			font-size: 1.2rem;
		}
	}
	@media (max-width: 350px) {
		#welcome .text {
			font-size: 0.8rem;
		}
		span.badge {
			font-size: 1rem;
		}
	}
	@media (max-width: 300px) {
		#welcome .text {
			font-size: 0.7rem;
		}
		span.badge {
			font-size: 0.8rem;
		}
	}
</style>
