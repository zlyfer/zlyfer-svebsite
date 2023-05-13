<script>
	// @ts-nocheck

	/* ------------- Imports ------------ */
	/* -------- Component Imports ------- */
	/* -------------- Icons ------------- */
	/* --------- Store Variables -------- */

	import { animation } from '../store.js';

	/* ----- Component Subscriptions ---- */
	/* ------------ Variables ----------- */
	/* ------- Store Subscriptions ------ */
	/* ----------- Life Cycles ---------- */
	/* ------------ Functions ----------- */
</script>

<main class:animation={$animation}>
	<div class="seperator" />
</main>

<style>
	.seperator {
		width: 100%;
		height: 2px;
		background: rgba(var(--foreground), 30%);
	}
</style>
