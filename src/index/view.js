// Documeentação Lib GSAP: https://greensock.com/docs/
// import { gsap, ScrollTrigger, CustomEase } from 'gsap/all.js';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, CustomEase);

window.DOMContentLoaded = false;
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.CustomEase = CustomEase;

document.addEventListener('DOMContentLoaded', function () {
	window.DOMContentLoaded = true;
	const isAdminPage = document.querySelector('body').classList.contains('wp-admin') ? true : false;

	if (isAdminPage) {
		// TO DO: Carregar scripts e estilos no painel apenas quando o bloco for inserido na página
		// Obs.: O problema que encontrei foi não ter a nomenclatura da categoria, apenas o nome do bloco
		// https://github.com/WordPress/gutenberg/issues/8655
		console.log('admin script');

		// Array of scripts that need to be loaded into the panel
		const scripts = [];

		// Create script loadout
		function loadScript(scriptUrl) {
			const script = document.createElement('script');
			script.src = scriptUrl;
			script.id = 'youtube-script';

			const firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

			return new Promise((res, rej) => {
				script.onload = function () {
					res();
				};
				script.onerror = function () {
					rej();
				};
			});
		}

		if (scripts.length > 0) {
			scripts.forEach((script) => {
				// Call script loading
				loadScript(script)
					.then(() => {
						console.warn(script, ': loaded');
					})
					.catch(() => {
						console.error('Script loading failed! Handle this error');
					});
			});
		}
	}
});

export function pushDataLayer(data) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push(data);
}
