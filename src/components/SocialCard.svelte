<script>
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

<li class="ProjectCard" style:--typeColor={typeColor} style:--typeColorCounter={typeColorCounter}>
	<a {href} target="_blank">
		<h2>
			{title}
		</h2>
	</a>
</li>

<style>
	.ProjectCard {
		list-style: none;
		display: flex;
		padding: 0.25rem;
		background-image: none;
		background-size: 400%;
		border-radius: 0.6rem;
		background-position: 100%;
		transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1);
		box-shadow: inset 0 0 0 3px rgba(var(--typeColor), 0.4);
	}

	.ProjectCard > a {
		width: 100%;
		text-decoration: none;
		line-height: 1.4;
		padding: 1rem 1.3rem;
		border-radius: 0.35rem;
		/* color: white; */
		color: rgba(var(--foreground), 1);
		opacity: 0.8;
	}

	h2 {
		margin: 0;
		font-size: 1.25rem;
		text-align: center;
		transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
	}

	/* .ProjectCard {
		background-position: 0%;
		background-image: linear-gradient(
			45deg,
			rgb(var(--typeColor)),
			rgb(var(--typeColor)),
			rgb(var(--typeColorCounter)) 35%
		);
		box-shadow: inset 0 0 0 3px rgba(var(--typeColor), 0.8);
		filter: brightness(1.1);
	}

	.ProjectCard:is(:hover, :focus-within) {
		background-position: 15%;
		background-image: linear-gradient(
			45deg,
			rgb(var(--typeColor)),
			rgb(var(--typeColor)),
			rgb(var(--typeColorCounter)) 35%
		);
		box-shadow: inset 0 0 0 3px rgba(var(--typeColor), 0.8);
		filter: brightness(1.1);
	} */

	@media (hover: none) and (pointer: coarse) {
		.ProjectCard {
			background-position: 0;
			background-image: linear-gradient(
				45deg,
				rgb(var(--typeColor)),
				rgb(var(--typeColorCounter)) 30%
			);
			box-shadow: inset 0 0 0 3px rgba(var(--typeColor), 0.8);
			filter: brightness(1.1);
		}
		.ProjectCard h2 {
			color: white;
		}
	}

	.ProjectCard:is(:hover, :focus-within) {
		background-position: 0;
		background-image: linear-gradient(
			45deg,
			rgb(var(--typeColor)),
			rgb(var(--typeColorCounter)) 30%
		);
		box-shadow: inset 0 0 0 3px rgba(var(--typeColor), 0.8);
		filter: brightness(1.1);
	}

	.ProjectCard:is(:hover, :focus-within) h2 {
		color: white;
	}
</style>
