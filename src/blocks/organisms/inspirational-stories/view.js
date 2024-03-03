document.addEventListener(
	'DOMContentLoaded',
	function () {
		const wrapper = document.querySelector('.inspirational-stories');

		if (wrapper) {
			const currentSlide = wrapper.querySelector('.inspirational-stories .stories .tns-slide-active');

			positionArrows(currentSlide);

			// --- Inspirational Stories - Início
			const inspirationalStories = document.querySelector('.inspirational-stories .lightspeed-text__container');
			if (inspirationalStories) {
				const ScrollTrigger = window.ScrollTrigger;
				const gsap = window.gsap;
				inspirationalAnim(ScrollTrigger, gsap, inspirationalStories);
			}
			// --- Inspirational Stories - Fim
		}
	},
	false
);

export function positionArrows(currentSlide) {
	const PADDING = 16;
	const WIDTH_ARROW_BUTTON = 27;
	if (currentSlide === null) return;
	const wrapper = document.querySelector('.inspirational-stories');

	const controls = wrapper.querySelector('.inspirational-stories .stories .tns-controls ');
	const item = currentSlide.querySelector('.wrapper__text_controls');
	const itemWidth = item.getBoundingClientRect().width;
	const itemHeight = item.getBoundingClientRect().height;
	const content = currentSlide.querySelector('.inspirational-item__content');

	if (controls) {
		controls.style.width = itemWidth + PADDING * 2 + WIDTH_ARROW_BUTTON * 2 + 'px';
		const textTop = item.offsetTop;
		const topPos = currentSlide.clientHeight - content.clientHeight;

		controls.style.top = topPos + textTop + (itemHeight - controls.offsetHeight) / 2 + 'px';

		if (window.innerWidth > 960) {
			controls.style.left = content.offsetLeft - PADDING - WIDTH_ARROW_BUTTON + 'px';
		} else {
			controls.style.left = '50%';
			controls.style.transform = 'translateX(-50%)';
		}
	}
}

export const inspirationalAnim = (ScrollTrigger, gsap, wrapperContent) => {
	const wrapper = document.querySelector('.inspirational-stories .lightspeed-text');
	const wrapperP = document.querySelector('.inspirational-stories .lightspeed-text p');
	const wrapperStories = document.querySelector('.inspirational-stories .stories');

	const timeline = gsap.timeline({});
	const timeline2 = gsap.timeline({});
	const timeline3 = gsap.timeline({});

	ScrollTrigger.matchMedia({
		'(max-width: 1023px)': function () {
			timeline.fromTo(
				wrapperContent,
				{
					y: 0,
				},
				{
					y: 220,
				}
			);

			ScrollTrigger.create({
				animation: timeline,
				trigger: wrapperStories,
				start: `top+=150px bottom`,
				end: `center+=300px bottom`,
				scrub: true,
			});

			timeline3.fromTo(
				wrapperContent,
				{
					x: -500,
					scale: 0.6,
				},
				{
					x: 0,
					scale: 1,
				}
			);

			ScrollTrigger.create({
				animation: timeline3,
				trigger: wrapperStories,
				start: `top-=150px bottom`,
				end: `center-=300px bottom`,
				scrub: true,
			});

			timeline2.fromTo(
				wrapperP,
				{
					opacity: 1,
				},
				{
					opacity: 0,
				}
			);

			ScrollTrigger.create({
				animation: timeline2,
				trigger: wrapper,
				start: `top+=150px bottom`,
				end: `center+=300px bottom`,
				scrub: true,
			});
		},
		'(min-width: 1024px)': function () {
			timeline.fromTo(
				wrapperContent,
				{
					scale: 1,
				},
				{
					scale: 0.35,
				}
			);

			ScrollTrigger.create({
				animation: timeline,
				trigger: wrapper,
				start: `top+=250px top`,
				end: `bottom+=410px bottom`,
				scrub: true,
			});

			timeline2.fromTo(
				wrapperContent,
				{
					y: 0,
				},
				{
					y: 410,
				}
			);

			ScrollTrigger.create({
				animation: timeline2,
				trigger: wrapperStories,
				start: `top+=150px bottom`,
				end: `center+=300px bottom`,
				scrub: true,
			});
		},
	});
};
