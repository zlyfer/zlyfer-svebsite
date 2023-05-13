import { writable } from 'svelte/store';

export const darkMode = writable('auto');
export const _isDarkMode = writable(true);
export const animation = writable('true');
