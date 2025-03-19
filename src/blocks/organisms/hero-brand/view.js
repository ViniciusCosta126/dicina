// If Needs to import any script:
import { tns } from 'tiny-slider';

document.addEventListener(
	'DOMContentLoaded',
	function () {
		var slider = tns({
			container: '.hero-brand__content',
			nav: false,
			navContainer: false,
			mouseDrag: true,
			controls: true,
			items: 1,
			loop: false,
			axis: 'vertical',
			slideBy: 'page',
			autoplay: false,
			autoplayButton: false,
			autoplayButtonOutput: false,
		});

		const carousel = document.querySelector('.hero-brand__content');
		carousel.addEventListener('wheel', handleMouseWheel);
		function handleMouseWheel(event) {

			const direction = Math.sign(event.deltaY);

			const index = slider.getInfo().index;
			const totalSlides = slider.getInfo().slideCount;

			if (direction > 0) {
				slider.goTo('next');
				if (index === totalSlides - 1) {
				} else {
					event.preventDefault();
				}
			} else if (direction < 0) {
				event.preventDefault();
				slider.goTo('prev');
			}
		}
	},
	false
);
