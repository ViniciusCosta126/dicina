import { PlayVideoBg } from '../../atoms/video-background/view.js';

document.addEventListener('DOMContentLoaded', function () {
	const ScrollTrigger = window.ScrollTrigger;
	const gsap = window.gsap;

	const inspire = document.querySelector('.inspire-histories .lightspeed-text');
	const videoInspire = document.querySelector('.inspire-histories .video-background video');
	if (inspire) {
		animationsInspireHistories(ScrollTrigger, gsap, inspire);
	}

	if (videoInspire) {
		PlayVideoBg(ScrollTrigger, gsap, videoInspire);
	}
});

export const animationsInspireHistories = (ScrollTrigger, gsap, wrapper) => {
	const wrapperContent = document.querySelector('.inspire-histories .lightspeed-text__container');

	const timeline2 = gsap.timeline({});
	const timeline3 = gsap.timeline({});

	ScrollTrigger.matchMedia({
		'(min-width: 768px)': function () {
			timeline2.fromTo(
				wrapperContent,
				{
					scale: 1,
				},
				{
					scale: 0.5,
				}
			);

			ScrollTrigger.create({
				animation: timeline2,
				trigger: wrapper,
				start: `top+=250px top`,
				end: `bottom+=400px bottom+=400px`,
				scrub: true,
			});

			timeline3.fromTo(
				wrapperContent,
				{
					y: 0,
				},
				{
					y: 350,
				}
			);

			ScrollTrigger.create({
				animation: timeline3,
				trigger: wrapper,
				start: `bottom+=400px bottom+=200px`,
				end: `botoom+=1200px bottom`,
				scrub: true,
			});
		},
	});
};
