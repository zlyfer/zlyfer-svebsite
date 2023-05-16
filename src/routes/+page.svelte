<script>
	// @ts-nocheck

	/* ------------- Imports ------------ */

	import { onMount, onDestroy } from 'svelte';
	import P5 from 'p5-svelte';

	/* -------- Component Imports ------- */

	import ChapterTitle from '../components/ChapterTitle.svelte';
	import ProjectCard from '../components/ProjectCard.svelte';
	import Seperator from '../components/Seperator.svelte';
	import SkillCard from '../components/SkillCard.svelte';
	import SocialCard from '../components/SocialCard.svelte';

	/* -------------- Icons ------------- */

	/* --------- Store Variables -------- */

	import { _isDarkMode } from '../store.js';
	import { animation } from '../store.js';

	/* ----- Component Subscriptions ---- */

	/* ------------ Variables ----------- */

	// tags = ['p5.js', 'vue', 'node.js', 'php', 'sql', 'game', 'animation', 'finished', 'wip', 'discontinued', 'discord',]
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

	var removeP5 = false;

	/* ----------- Life Cycles ---------- */

	onMount(() => {
		_isDarkMode.subscribe((value) => {});
	});

	onDestroy(() => {
		removeP5 = true;
	});

	/* ------------ Functions ----------- */

	function getAge() {
		const birthDate = new Date('1998-06-24T00:00:00.000Z');
		const ageDifMs = Date.now() - birthDate.getTime();
		const ageDate = new Date(ageDifMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	function isTouchDevice() {
		if (typeof window === 'undefined') return false;
		return (
			'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
		);
	}

	/* -------------- P5.js ------------- */

	const sketch = (p5) => {
		class Dot {
			constructor(x, y) {
				this.id = Math.floor(Math.random() * 99999999);
				this.pos = p5.createVector(x, y);
				this.vel = p5.createVector(0, 0.15);
				this.vel.rotate(p5.random(-p5.PI, p5.PI));
				this.connections = [];
			}

			update() {
				this.move();
				this.draw();
			}

			move() {
				this.pos.add(this.vel);
				if (this.pos.x < 5 || this.pos.x > p5.width - 5) this.vel.x *= -1;
				if (this.pos.y < 5 || this.pos.y > p5.height - 5) this.vel.y *= -1;
				if (this.pos.x < 0 || this.pos.x > p5.width || this.pos.y < 0 || this.pos.y > p5.height) {
					this.pos = p5.createVector(p5.random(5, p5.width - 5), p5.random(5, p5.height - 5));
				}
			}

			draw() {
				p5.push();
				p5.noFill();
				p5.strokeWeight(2);
				p5.stroke(fgColor, 255);
				p5.translate(this.pos.x, this.pos.y);
				p5.point(0, 0);
				p5.pop();
			}

			drawConnections(dots, full) {
				let counter = 0;
				dots.forEach((d) => {
					if (d.connections.includes(this.id)) return;
					let distance = d.pos.dist(this.pos);
					if (d !== this && distance < connectionDistance) {
						if (!this.connections.includes(d.id)) this.connections.push(d.id);
						counter++;
						if (counter < 10) {
							p5.push();
							if (full) {
								p5.strokeWeight(0.5);
								p5.stroke([...fgColor.map((c) => c), ...[255]]);
							} else {
								p5.strokeWeight(p5.map(distance, 0, connectionDistance, 0.5, 0.1));
								p5.stroke(fgColor, p5.map(distance, 0, connectionDistance, 255, 0));
							}
							p5.line(this.pos.x, this.pos.y, d.pos.x, d.pos.y);
							p5.pop();
						}
					} else {
						this.connections = this.connections.filter((c) => c !== d.id);
					}
				});
			}
		}

		const connectionDistance = 150;
		var lowSpec = false;
		var fgColor;
		var bgColor;
		var killSwitch = 0;
		var dots;
		// var lastFrameRate = 0;

		function setColor() {
			const rootStyle = getComputedStyle(document.querySelector(':root'));
			fgColor = rootStyle
				.getPropertyValue('--foreground')
				.split(', ')
				.map((x) => parseInt(x));
			bgColor = rootStyle
				.getPropertyValue('--background')
				.split(', ')
				.map((x) => parseInt(x));
		}

		function initDots() {
			dots = [];
			const initAmount = Math.min((p5.width * p5.height) / Math.pow(100, 2), 300);
			const amount = lowSpec ? initAmount / 2 : initAmount;
			for (let i = 0; i < amount; i++) {
				dots.push(new Dot(p5.random(5, p5.width, -5), p5.random(5, p5.height - 5)));
			}
		}

		p5.setup = () => {
			setColor();
			p5.createCanvas(p5.windowWidth, p5.windowHeight);
			initDots();
		};

		p5.windowResized = () => {
			p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
			initDots();
			killSwitch = 0;
		};

		// function showFPS() {
		// 	if (p5.frameCount % 10 == 0) {
		// 		lastFrameRate = Math.floor(p5.frameRate());
		// 	}
		// 	p5.push();
		// 	p5.fill(255);
		// 	p5.stroke(0);
		// 	p5.strokeWeight(1);
		// 	p5.textSize(12);
		// 	p5.text(lastFrameRate, 10, 20);
		// 	p5.pop();
		// }

		p5.draw = () => {
			if (removeP5) p5.remove();
			setColor();
			p5.background(bgColor);
			p5.frameRate(120);
			if (killSwitch < 10) {
				const fps = Math.floor(p5.frameRate());
				if (fps != 0 && fps < 30) {
					killSwitch++;
				} else if (fps >= 30) {
					killSwitch = 0;
				}
				dots.forEach((d) => {
					if ($animation) {
						d.update();
					}
					if (p5.dist(d.pos.x, d.pos.y, p5.mouseX, p5.mouseY) < 200) {
						d.drawConnections(dots, true);
					} else {
						d.drawConnections(dots, false);
					}
				});
			} else {
				if (!lowSpec) {
					lowSpec = true;
					initDots();
					killSwitch = 0;
				}
			}
			// showFPS();
		};
	};
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<main class:animation={$animation}>
	{#if !isTouchDevice()}
		<div id="p5">
			<P5 {sketch} />
		</div>
	{/if}
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
				Feel free to look around
				<img class="svgIcon" alt="heart" src="./heart.svg" />
			</span>
		</div>
	</div>

	<!-- <Seperator /> -->

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
</main>

<style>
	#p5 {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	main {
		margin: auto;
		padding: 5rem;
		max-width: var(--globalWidth);
		margin-bottom: 130px !important;
	}

	#welcome {
		display: grid;
		position: relative;
		background: rgba(var(--accent), 10%);
		border: 5px solid rgba(var(--accent), 50%);
		border-radius: 5px;
		backdrop-filter: blur(var(--blur));
		-webkit-backdrop-filter: blur(var(--blur));
		-moz-backdrop-filter: blur(var(--blur));
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
		background-image: url('/selfie.webp');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		border: 1px solid var(--glowColor);
		animation: fadeImage 20s ease-in-out infinite;
		filter: drop-shadow(0 0 0.2rem var(--glowColor));
	}
	.animation #welcomeImg {
		background-image: url('/selfie.webp');
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
		border-radius: 5px;
		padding: 0.2em 0.4em;
	}

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
			background-image: url('/selfie.webp');
			--glowColor: var(--glowSelfie);
			opacity: 1;
		}
		45% {
			background-image: url('/selfie.webp');
			--glowColor: var(--glowSelfie);
			opacity: 1;
		}
		47% {
			opacity: 0.5;
		}
		50% {
			background-image: url('/logo.webp');
			--glowColor: var(--glowLogo);
			opacity: 1;
		}
		95% {
			background-image: url('/logo.webp');
			--glowColor: var(--glowLogo);
			opacity: 1;
		}
		97% {
			opacity: 0.5;
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
