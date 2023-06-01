// @ts-nocheck

/** @type {import('./$types').PageLoad} */
/** @type {import('./$types').LayoutServerLoad} */

export function load({ page }) {
	console.log(page);

	return { page };
}
