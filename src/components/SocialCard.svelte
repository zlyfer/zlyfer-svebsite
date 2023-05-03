<script>
	/* --------- Store Variables -------- */

	import { _glowing } from '../stores.js';

	/* ------------ Variables ----------- */

	let glowing = false;

	/* ------- Store Subscriptions ------ */

	_glowing.subscribe((value) => {
		glowing = value;
	});

	/**
	 * @type {string}
	 */
	export let title;
	/**
	 * @type {string}
	 */
	export let href;
	/**
	 * @type {string}
	 */
	export let type;

	const typeColor = 'var(--' + type + ')';
	const typeColorCounter = 'var(--' + type + '-counter)';
</script>

<main>
	<li
		class="SocialCard"
		class:glowing
		style:--typeColor={typeColor}
		style:--typeColorCounter={typeColorCounter}
	>
		<a {href} target="_blank">
			<h2>
				{title}
			</h2>
		</a>
	</li>
</main>

<style>
	.SocialCard {
		list-style: none;
		display: flex;
		padding: 0.25rem;
		background-image: none;
		background-size: 400%;
		border-radius: 0.6rem;
		background-position: 100%;
		transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
		box-shadow: inset 0 0 0 5px rgba(var(--typeColor), 0.4);
	}
	.SocialCard > a {
		width: 100%;
		text-decoration: none;
		line-height: 1.4;
		padding: 1rem 1.3rem;
		border-radius: 0.35rem;
		color: rgba(var(--foreground), 1);
		opacity: 0.8;
	}
	.SocialCard:is(:hover, :focus-within) {
		background-position: 0;
		background-image: linear-gradient(
			45deg,
			rgb(var(--typeColor)),
			rgb(var(--typeColorCounter)) 30%
		);
		box-shadow: inset 0 0 0 3px rgba(var(--typeColor), 1);
		transform: scale(1.05);
	}
	.SocialCard.glowing:is(:hover, :focus-within) {
		animation-name: glowing;
		animation-duration: 5s;
		animation-iteration-count: infinite;
	}
	.SocialCard:is(:hover, :focus-within) h2 {
		color: white;
	}

	@media (hover: none) and (pointer: coarse) {
		.SocialCard {
			background-position: 0;
			background-image: linear-gradient(
				45deg,
				rgb(var(--typeColor)),
				rgb(var(--typeColorCounter)) 30%
			);
			box-shadow: inset 0 0 0 3px rgba(var(--typeColor), 0.8);
			filter: brightness(1.1) drop-shadow(0 0 0.25rem rgba(var(--typeColor), 1));
		}
		.SocialCard h2 {
			color: white;
		}
	}

	h2 {
		margin: 0;
		font-size: 1.25rem;
		text-align: center;
		transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
	}

	@keyframes glowing {
		0% {
			filter: brightness(1.1) drop-shadow(0 0 0rem rgba(var(--typeColor), 1));
		}
		25% {
			filter: brightness(1.1) drop-shadow(0 0 0.5rem rgba(var(--typeColor), 1));
		}
		50% {
			filter: brightness(1.1) drop-shadow(0 0 0rem rgba(var(--typeColor), 1));
		}
		75% {
			filter: brightness(1.1) drop-shadow(0 0 0.5rem rgba(var(--typeColorCounter), 1));
		}
		100% {
			filter: brightness(1.1) drop-shadow(0 0 0rem rgba(var(--typeColorCounter), 1));
		}
	}
</style>
