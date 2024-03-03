import Typed from 'typed.js';

document.addEventListener('DOMContentLoaded', function () {
	const gsap = window.gsap;
	const ScrollTrigger = window.ScrollTrigger;
	const screenWidth = window.screenWidth;

	// Typing
	let typingContent = document.querySelector('#seek-typing-content');
	const textContent = typingContent.textContent.split(',');

	typingContent.innerHTML = '';

	if (typingContent && textContent.length) {
		const fixedTexts = textContent.map((item) => {
			const trimStart = item.trimStart();
			const capitalized = trimStart.charAt(0).toUpperCase() + trimStart.slice(1);
			const breakLine = capitalized.replaceAll(' ', '<br />');
			return breakLine;
		});

		new Typed(typingContent, {
			strings: fixedTexts,
			typeSpeed: 55,
			backSpeed: 30,
			backDelay: 2000,
			startDelay: 0,
			loop: true,
		});
	}

	// Video
	const video_wrapper = document.querySelector('.seek-your-truth__video');
	const video = document.querySelector('.seek-your-truth__video video');
	if (video_wrapper && video) {
		if (screenWidth > 768) {
			const tl = gsap.timeline({});
			tl.fromTo(
				video,
				{
					top: 100,
					opacity: 0,
					scale: 0.3,
				},
				{
					top: 0,
					opacity: 1.0,
					scale: 1.0,
				}
			);
			ScrollTrigger.create({
				animation: tl,
				trigger: video_wrapper,
				start: 'top bottom',
				end: 'top top+=100px',
				scrub: true,
				markers: true,
			});
		} else {
			const tl = gsap.timeline({});
			tl.fromTo(
				video,
				{
					top: 40,
					opacity: 0,
					scale: 0.3,
				},
				{
					top: 0,
					opacity: 1,
					scale: 1,
				}
			);

			ScrollTrigger.create({
				animation: tl,
				trigger: video_wrapper,
				start: 'top bottom',
				end: 'center center',
				scrub: true,
			});
		}
	}
});
