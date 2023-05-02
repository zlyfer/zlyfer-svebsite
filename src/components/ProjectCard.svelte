<script>
	/**
	 * @type {string}
	 */
	export let href;
	/**
	 * @type {string}
	 */
	export let title;
	/**
	 * @type {string}
	 */
	export let body;
</script>

<li class="ProjectCard">
	<a {href} target="_blank">
		<h2>
			{title}
		</h2>
		<p>
			{body}
		</p>
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
		box-shadow: inset 0 0 0 3px rgba(var(--foreground), 0.1);
	}

	.ProjectCard > a {
		width: 100%;
		text-decoration: none;
		line-height: 1.4;
		padding: 1rem 1.3rem;
		border-radius: 0.35rem;
		color: rgba(var(--foreground), 1);
		opacity: 0.8;
	}

	h2 {
		margin: 0;
		font-size: 1.25rem;
		transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
	}

	p {
		margin-top: 0.5rem;
		margin-bottom: 0;
		color: rgba(var(--foreground), 1);
	}

	.ProjectCard:is(:hover, :focus-within) {
		background-position: 0;
		background-image: linear-gradient(45deg, rgb(var(--accent)), rgb(var(--background)) 40%);
		box-shadow: inset 0 0 0 3px rgba(var(--foreground), 0.5);
		filter: brightness(1.1);
	}

	.ProjectCard:is(:hover, :focus-within) h2,
	.ProjectCard:is(:hover, :focus-within) p {
		color: white;
	}
</style>
