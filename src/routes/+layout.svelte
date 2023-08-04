<script>
	// @ts-nocheck

	/* ------------ Page Data ----------- */

	/* ------------- Imports ------------ */

	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import P5 from 'p5-svelte';

	/* -------- Component Imports ------- */

	/* -------------- Icons ------------- */

	import FaRegMoon from 'svelte-icons/fa/FaRegMoon.svelte';
	import FaSun from 'svelte-icons/fa/FaSun.svelte';
	import FaAdjust from 'svelte-icons/fa/FaAdjust.svelte';
	import FaFire from 'svelte-icons/fa/FaFire.svelte';
	import IoMdArrowRoundBack from 'svelte-icons/io/IoMdArrowRoundBack.svelte';

	/* --------- Store Variables -------- */

	import { darkMode } from '../store.js';
	import { _isDarkMode } from '../store.js';
	import { animation } from '../store.js';

	/* ----- Component Subscriptions ---- */

	/* ------------ Variables ----------- */

	let systemDarkMode;
	let removeP5 = false;
	const backButtonRoutes = ['/imprint', '/project/'];

	/* ----------- Life Cycles ---------- */

	onMount(() => {
		console.log(`Window Size: ${window.innerWidth}x${window.innerHeight}`);

		const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		systemDarkMode = darkModeQuery.matches;
		darkModeQuery.addListener((e) => {
			systemDarkMode = e.matches;
			updateTheme();
		});

		darkMode.subscribe((value) => {
			_isDarkMode.update((v) => isDarkMode());
			updateTheme();
		});
		animation.subscribe((value) => {});

		initVariables();
	});

	onDestroy(() => {
		removeP5 = true;
	});

	/* ------------ Functions ----------- */

	function initVariables() {
		const _darkMode = localStorage.getItem('darkMode') || $darkMode;
		darkMode.update((v) => _darkMode);
		const _animation = (localStorage.getItem('animation') || $animation) === 'true';
		animation.update((v) => _animation);
	}

	function isTouchDevice() {
		if (typeof window === 'undefined') return false;
		return (
			'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
		);
	}

	/* ---------------------------------- */
	/*              DARKMODE              */
	/* ---------------------------------- */

	function isDarkMode() {
		return $darkMode == 'dark' || ($darkMode == 'auto' && systemDarkMode);
	}

	function cycleDarkMode() {
		const states = ['auto', 'dark', 'light'];
		const index = states.indexOf($darkMode);
		const nextIndex = (index + 1) % states.length;
		darkMode.update((v) => states[nextIndex]);

		localStorage.setItem('darkMode', $darkMode);
		updateTheme();
	}

	function updateTheme() {
		const root = document.querySelector(':root');

		if (root) {
			const rootStyle = getComputedStyle(root);
			const lightForeGround = rootStyle.getPropertyValue('--lightForeGround');
			const lightBackGround = rootStyle.getPropertyValue('--lightBackGround');
			const lightBackGround2 = rootStyle.getPropertyValue('--lightBackGround2');
			const darkForeGround = rootStyle.getPropertyValue('--darkForeGround');
			const darkBackGround = rootStyle.getPropertyValue('--darkBackGround');
			const darkBackGround2 = rootStyle.getPropertyValue('--darkBackGround2');

			if (isDarkMode()) {
				root.style.setProperty('--foreground', darkForeGround);
				root.style.setProperty('--background', darkBackGround);
				root.style.setProperty('--background2', darkBackGround2);
			} else {
				root.style.setProperty('--foreground', lightForeGround);
				root.style.setProperty('--background', lightBackGround);
				root.style.setProperty('--background2', lightBackGround2);
			}
		}
	}

	/* ---------------------------------- */
	/*              ANIMATION             */
	/* ---------------------------------- */

	function toggleAnimation() {
		animation.update((v) => !v);
		localStorage.setItem('animation', $animation);
	}

	/* ---------------------------------- */
	/*                P5JS                */
	/* ---------------------------------- */

	const sketch = (p5) => {
		class Dot {
			constructor(x, y) {
				this.id = Math.floor(Math.random() * 10000);
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
				this.connections = [];
				dots.forEach((d) => {
					// if (this.connections.length >= 2) return;
					// if (this.connections.length > 10) return;
					if (this.id == d.id) return;
					if (d.connections.includes(this.id)) return;
					let distance = d.pos.dist(this.pos);
					if (distance > connectionDistance) return;
					// else this.connections = this.connections.filter((c) => c !== d.id);
					if (!this.connections.includes(d.id)) this.connections.push(d.id);
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
				});
			}
		}

		const connectionDistance = 150;
		let lowSpec = false;
		let fgColor;
		let bgColor;
		let killSwitch = 0;
		let dots;

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
			const initAmount = Math.min((p5.width * p5.height) / Math.pow(90, 2), 500);
			const amount = lowSpec ? initAmount / 2 : initAmount;
			for (let i = 0; i < amount; i++) {
				dots.push(new Dot(p5.random(5, p5.width, -5), p5.random(5, p5.height - 5)));
			}
		}

		p5.setup = () => {
			p5.frameRate(60);
			setColor();
			p5.createCanvas(p5.windowWidth, p5.windowHeight);
			initDots();
		};

		p5.windowResized = () => {
			p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
			initDots();
			killSwitch = 0;
		};

		// var lastFrameRate = 0;
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

<slot />

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<main class:animation={$animation}>
	<div id="blurLayer" />
	<div class="bgSplash" id="splash1" />
	<div class="bgSplash" id="splash2" />

	<!-- {#if !isTouchDevice()}
		<div id="p5">
			<P5 {sketch} />
		</div>
	{/if} -->

	{#if backButtonRoutes.some((route) => $page.route.id.startsWith(route))}
		<a id="backButton" href="/">
			<IoMdArrowRoundBack />
		</a>
	{/if}

	<div id="styleButtons">
		{#if !$page.route.id.startsWith('/project')}
			<div id="darkModeButton" class="no-select styleButton" on:click={() => cycleDarkMode()}>
				{#if $darkMode == 'auto'}
					<FaAdjust />
				{:else if $darkMode == 'dark'}
					<FaRegMoon />
				{:else if $darkMode == 'light'}
					<FaSun />
				{/if}
			</div>

			<div id="animationButton" class="no-select styleButton" on:click={() => toggleAnimation()}>
				<FaFire />
			</div>
		{/if}
	</div>
</main>

<style is:global>
	:root {
		/* -------------- Misc ------------- */

		--globalWidth: 80ch;
		--blur: 15px;
		--animationButtonOpacity: 0.5;

		/* ------------- Colors ------------- */

		--accent: 33, 150, 243;
		/* ---------------- - --------------- */
		--lightForeGround: 68, 68, 68;
		--lightBackGround: 250, 250, 250;
		--lightBackGround2: 234, 234, 235;
		--darkForeGround: 255, 255, 255;
		--darkBackGround: 40, 44, 52;
		--darkBackGround2: 33, 37, 43;
		/* ---------------- - --------------- */
		--foreground: var(--darkForeGround);
		--background: var(--darkBackGround);
		--background2: var(--darkBackGround2);

		--glowLogo: #4caf50;
		--glowSelfie: #b38786;
		--glowColor: var(--glowSelfie);

		/* ------------- Socials ------------ */

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

	/* ------------- Global ------------- */

	:global(html) {
		font-family: Poppins;
		background-attachment: fixed;
		background-color: rgba(var(--background), 1);
		background-image: linear-gradient(135deg, rgba(var(--background)), rgba(var(--background2)));
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}

	:global(.no-select) {
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(*::selection) {
		/* background: rgba(var(--accent), 0.8); */
		background: #fd2448;
		color: rgba(var(--lightBackGround), 1);
		/* background-color: transparent; */
		/* text-shadow: rgba(var(--accent), 1) 0 0 10px; */
	}

	/* -------------- P5js -------------- */

	#p5 {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	/* ----------- Back Button ---------- */

	#backButton {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
		width: 2rem;
		height: 2rem;
		padding: 0.5rem;
		border-radius: 50%;
		cursor: pointer;
		border: 2px solid;
		background-color: rgba(var(--background));
		color: rgba(var(--foreground), 0.8);
		border-color: rgba(var(--foreground), 0.8);
	}
	#backButton:hover {
		background-color: rgba(var(--foreground));
		color: rgba(var(--background), 0.8);
		border-color: rgba(var(--background), 0.8);
		transform: scale(0.95);
	}

	/* ---- Colorful Blur Background ---- */

	.bgSplash {
		position: fixed;
		z-index: -2;
		filter: blur(100px);
	}

	#splash1 {
		top: 10%;
		left: 10%;
		height: 30vh;
		aspect-ratio: 1/1;
		background: linear-gradient(
			45deg,
			hsla(339, 100%, 55%, 1) 0%,
			hsla(33, 94%, 57%, 1) 47%,
			hsla(197, 100%, 64%, 1) 100%
		);
	}

	#splash2 {
		bottom: 5vh;
		right: 25vh;
		height: 50vh;
		width: 20vh;
		background: linear-gradient(
			45deg,
			hsla(225, 100%, 68%, 1) 0%,
			hsla(57, 100%, 71%, 1) 49%,
			hsla(339, 100%, 55%, 1) 100%
		);
		transform: rotate(45deg);
	}

	#blurLayer {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(80px);
		-webkit-backdrop-filter: blur(80px);
		-moz-backdrop-filter: blur(80px);
		z-index: -1;
	}

	/* ---------- Style Buttons --------- */

	#styleButtons div:first-child {
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
	}
	#styleButtons div:last-child {
		border-bottom-left-radius: 15px;
		border-bottom-right-radius: 15px;
	}

	.styleButton {
		position: fixed;
		width: 28px;
		height: 28px;
		cursor: pointer;
		padding: 0.22rem;
		background-color: rgba(var(--foreground), 0.1);
		color: rgba(var(--foreground), 0.8);
		box-shadow: inset 0 0 2px 1px rgba(var(--foreground), 0.2);
		padding: 10px;
		right: 15px;
		backdrop-filter: blur(var(--blur));
		-webkit-backdrop-filter: blur(var(--blur));
		-moz-backdrop-filter: blur(var(--blur));
	}

	.styleButton:hover {
		filter: brightness(0.8);
	}

	#darkModeButton {
		bottom: 58px;
	}

	#animationButton {
		bottom: 10px;
		color: rgba(255, 255, 255, 0.6);
		transition: background-color 0.5s ease-in-out;
	}
	.animation #animationButton {
		background-size: 400%;
		background-position: 0%;
		background-image: linear-gradient(
			90deg,
			rgba(255, 0, 0, var(--animationButtonOpacity)) 0%,
			rgba(255, 154, 0, var(--animationButtonOpacity)) 10%,
			rgba(208, 222, 33, var(--animationButtonOpacity)) 20%,
			rgba(79, 220, 74, var(--animationButtonOpacity)) 30%,
			rgba(63, 218, 216, var(--animationButtonOpacity)) 40%,
			rgba(47, 201, 226, var(--animationButtonOpacity)) 50%,
			rgba(28, 127, 238, var(--animationButtonOpacity)) 60%,
			rgba(95, 21, 242, var(--animationButtonOpacity)) 70%,
			rgba(186, 12, 248, var(--animationButtonOpacity)) 80%,
			rgba(251, 7, 217, var(--animationButtonOpacity)) 90%,
			rgba(255, 0, 0, var(--animationButtonOpacity)) 100%
		);
		animation: scrolling 60s infinite;
		animation-timing-function: linear;
	}
	:not(.animation) #animationButton {
		color: rgba(var(--foreground), 0.8);
	}

	/* ------------ Keyframes ----------- */

	@keyframes scrolling {
		0% {
			background-position: 0%;
		}
		50% {
			background-position: 200%;
		}
		100% {
			background-position: 400%;
		}
	}
</style>
