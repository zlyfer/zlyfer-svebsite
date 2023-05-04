<script>
	/* ------------- Imports ------------ */

	import { onMount } from 'svelte';

	/* -------- Component Imports ------- */

	import ProjectCard from '../components/ProjectCard.svelte';
	import SocialCard from '../components/SocialCard.svelte';
	import Seperator from '../components/Seperator.svelte';

	/* --------- Store Variables -------- */

	import { _glowing } from '../stores.js';

	/* ------------ Variables ----------- */

	let glowing = false;

	/* ------- Store Subscriptions ------ */

	_glowing.subscribe((value) => {
		glowing = value;
	});

	/* ----------- Life Cycles ---------- */

	onMount(() => {});

	function getAge() {
		const birthDate = new Date('1998-06-24T00:00:00.000Z');
		const ageDifMs = Date.now() - birthDate.getTime();
		const ageDate = new Date(ageDifMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}
</script>

<main>
	<div id="welcome">
		<div id="welcomeImg" class:glowing />
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

	<Seperator />

	<span class="chapterTitle">WIP</span>

	<!-- <Seperator />

	<span class="chapterTitle">Skills</span>

	<Seperator />

	<span class="chapterTitle">Projects</span>

	<ul class="projectCards">
		<ProjectCard
			href="_blank"
			title="Dummy Project Card"
			body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
		/>
		<ProjectCard
			href="_blank"
			title="Dummy Project Card"
			body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
		/>
		<ProjectCard
			href="_blank"
			title="Dummy Project Card"
			body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
		/>
		<ProjectCard
			href="_blank"
			title="Dummy Project Card"
			body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
		/>
	</ul> -->
</main>

<style>
	:root {
		/* ------------- Socials ------------ */

		--glowLogo: #4caf50;
		--glowSelfie: #b38786;
		--glowColor: var(--glowLogo);

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
	}

	@media (max-width: 740px) {
		main {
			width: 100%;
			margin: 0;
			padding: 0;
		}
	}

	#welcome {
		border: 5px solid rgba(var(--accent), 50%);
		background: rgba(var(--accent), 10%);
		border-radius: 20px;
		display: grid;
		position: relative;
		padding: 0 1rem;
	}

	#welcomeImg {
		width: 50%;
		aspect-ratio: 1/1;
		margin: 2.5rem auto 1.5rem auto;
		border-radius: 30%;
		border: 5px solid var(--glowColor);
		box-shadow: inset 0 2px 5px var(--glowColor);
		background-image: url('/logo.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		animation: fadeImage 20s ease-in-out infinite;
	}
	#welcomeImg.glowing {
		animation: swapGlowColors 20s steps(1, end) infinite, glowing 5s ease-in-out infinite,
			fadeImage 20s ease-in-out infinite;
	}
	#welcome .info {
		margin: 1rem auto 2.5rem auto;
		text-align: center;
	}
	#welcome .text {
		font-size: 1.3rem;
		color: rgba(var(--foreground), 90%);
		font-family: Poppins;
		line-height: 150%;
	}
	#welcome .svgIcon {
		height: 1.85rem;
		position: absolute;
		margin-left: 5px;
		margin-top: 0px;
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

	code {
		font-size: 0.875em;
		font-weight: bold;
		background: rgba(var(--accent), 20%);
		color: rgb(var(--accent));
		border-radius: 10px;
		padding: 0.2em 0.4em;
	}

	.chapterTitle {
		font-size: 2.8rem;
		font-weight: bold;
		color: rgba(var(--foreground), 90%);
		display: block;
		text-align: center;
		margin: 1rem auto 2.5rem;
		text-transform: uppercase;
	}

	.socialCards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15ch, 1fr));
		gap: 1rem;
		padding-left: 0;
	}
	.projectCards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(30ch, 1fr));
		gap: 1rem;
		padding: 0;
	}

	@media (min-width: 438px) and (max-width: 582px) {
		.socialCards,
		.projectCards {
			grid-template-columns: repeat(auto-fit, minmax(22ch, 1fr));
		}
	}

	@keyframes swapGlowColors {
		0% {
			--glowColor: var(--glowLogo);
		}
		50% {
			--glowColor: var(--glowSelfie);
		}
	}
	@keyframes fadeImage {
		0% {
			background-image: url('/logo.png');
			opacity: 1;
		}
		45% {
			background-image: url('/logo.png');
			opacity: 1;
		}
		47% {
			opacity: 0.5;
		}
		50% {
			background-image: url('/selfie.jpg');
			opacity: 1;
		}
		95% {
			background-image: url('/selfie.jpg');
			opacity: 1;
		}
		97% {
			opacity: 0.5;
		}
	}
	@keyframes glowing {
		0% {
			filter: drop-shadow(0 0 0.1rem var(--glowColor));
		}
		50% {
			filter: drop-shadow(0 0 0.8rem var(--glowColor));
		}
		100% {
			filter: drop-shadow(0 0 0.1rem var(--glowColor));
		}
	}
</style>
