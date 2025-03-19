import { gsap, ScrollTrigger, CustomEase } from 'gsap/all.js';
import { tns } from 'tiny-slider';

document.addEventListener(
	'DOMContentLoaded',
	function () {
		gsap.registerPlugin(ScrollTrigger);
		gsap.registerPlugin(CustomEase);

		const sectionAnimatedSocialBig = document.querySelector('.big-numbers-carousel');
		const isLoop = sectionAnimatedSocialBig.getAttribute('data-loop') === 'true' ? true : false;
		const speed = parseInt(sectionAnimatedSocialBig.getAttribute('data-speed'));
		const autoplayTimeout = parseInt(sectionAnimatedSocialBig.getAttribute('data-autoplayTimeout'));
		const wrapper = document.querySelector('.big-numbers-carousel .carousel-content-social');

		const sliderConfigs = {
			container: wrapper,
			nav: false,
			loop: isLoop,
			slideBy: 1,
			mouseDrag: false,
			startIndex: 0,
			autoplay: true,
			autoplayButtonOutput: false,
			speed: speed,
			autoplayTimeout: autoplayTimeout,
			autoWidth: false,
			items: 1,
			controlsText: [
				'',
				'<svg width="74" height="62" viewBox="0 0 74 62" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 47.1L34.9189 52L56 31L34.9189 10L30 14.9L46.0743 31L30 47.1Z" fill="white"/><path d="M8 47.1L12.9189 52L34 31L12.9189 10L8 14.9L24.0743 31L8 47.1Z" fill="white"/></svg>',
			],
			responsive: {
				0: {
					controls: true,
				},
				1366: {
					controls: false,
				},
			},
		};

		const socialSlider = tns(sliderConfigs);
		socialSlider.pause();

		if (!document.querySelector('.big-mobile')) {
			ScrollTrigger.create({
				trigger: wrapper,
				start: 'center center',
				endTrigger: 'html',
				onToggle: () => {
					socialSlider.goTo(1);
				},
			});
		}

		ScrollTrigger.create({
			trigger: wrapper,
			start: 'top bottom',
			endTrigger: 'html',
			onToggle: () => {
				socialSlider.goTo(0);
				socialSlider.play();
			},
		});
	},
	false
);
