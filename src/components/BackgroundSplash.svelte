<script lang="ts">
	import { onMount } from 'svelte';

	export let width: number;
	export let height: number;
	export let rotation = 0;
	export let top = 'auto';
	export let left = 'auto';
	export let bottom = 'auto';
	export let right = 'auto';
	export let gradientColors: { stop: number; color: string }[];

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	$: {
		if (canvas) {
			canvas.style.setProperty('--rotation', `${rotation}deg`);
			canvas.style.setProperty('--top', top);
			canvas.style.setProperty('--left', left);
			canvas.style.setProperty('--bottom', bottom);
			canvas.style.setProperty('--right', right);
		}
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		drawGradient();
	});

	function drawGradient() {
		const width = canvas.width;
		const height = canvas.height;

		ctx.clearRect(0, 0, width, height);

		const gradient = ctx.createLinearGradient(0, 0, width, height);
		gradientColors.forEach(({ stop, color }) => {
			gradient.addColorStop(stop, color);
		});

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, width, height);
	}
</script>

<canvas bind:this={canvas} {width} {height} />

<style>
	canvas {
		position: fixed;
		filter: blur(100px);
		will-change: transform, filter;
		transform: translateZ(0) rotate(var(--rotation));
		top: var(--top);
		left: var(--left);
		bottom: var(--bottom);
		right: var(--right);
		z-index: -1;
	}
</style>
