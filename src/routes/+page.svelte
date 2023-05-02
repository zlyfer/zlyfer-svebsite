<script>
	import ProjectCard from '../components/ProjectCard.svelte';
	import SocialCard from '../components/SocialCard.svelte';
	import Seperator from '../components/Seperator.svelte';
</script>

<main>
	<div class="welcome">
		<img alt="zlyfer logo" src="./logo.png" />
		<div class="info">
			<!-- <span class="name">zlyfer</span> -->
			<!-- <br /> -->
			<span class="text">
				Hello there!
				<br />
				I am Frederik Shull also known as <code>zlyfer</code>
				<br />
				Feel free to look around &#x1F49A;
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
	</ul>
</main>

<style>
	:root {
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
		--youtube-counter: 211, 139, 135;
		--twitch: 138, 68, 240;
		--twitch-counter: 202, 164, 255;
		--twitter: 9, 155, 240;
		--twitter-counter: 150, 150, 150;
		--linkedin: 10, 102, 194;
		--linkedin-counter: 150, 150, 150;
	}

	main {
		margin: auto;
		padding: 5rem;
		max-width: var(--globalWidth);
	}

	.welcome {
		border: 5px solid rgba(var(--accent), 50%);
		background: rgba(var(--accent), 10%);
		border-radius: 20px;
		display: grid;
	}

	.welcome img {
		width: 50%;
		border-radius: 30%;
		margin: 2.5rem auto 1.5rem auto;
		border: 5px solid rgb(var(--foreground));
	}

	.welcome .info {
		margin: 1rem auto 2.5rem auto;
		text-align: center;
	}

	.welcome .info .text {
		font-size: 1.3rem;
		color: rgba(var(--foreground), 90%);
		font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
			Bitstream Vera Sans Mono, Courier New, monospace;
		line-height: 120%;
	}

	code {
		font-size: 0.875em;
		font-weight: bold;
		background: rgba(var(--accent), 20%);
		color: rgb(var(--accent));
		border-radius: 5px;
		padding: 0.3em 0.45em;
		font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
			Bitstream Vera Sans Mono, Courier New, monospace;
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
</style>
