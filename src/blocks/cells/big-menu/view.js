// Documentação:
// https://www.npmjs.com/package/tiny-slider#usage
// http://ganlanyuan.github.io/tiny-slider/demo/

import { tns } from 'tiny-slider';

document.addEventListener('DOMContentLoaded', function () {
	const slider = tns({
		container: '.big-menu__content',
		nav: true,
		navContainer: '.big-menu__dots',
		mouseDrag: true,
		controls: false,
		items: 1,
		loop: false,
		edgePadding: 15,
		mode: 'gallery',
		autoplay: true,
		autoplayButton: false,
		autoplayButtonOutput: false,
		responsive: {
			768: {
				controlsContainer: document.querySelector('.big-menu__dots'),
				slideBy: 'page',
				autoplay: false,
			},
		},
	});

	const dots = tns({
		container: '.big-menu__dots',
		nav: false,
		mouseDrag: true,
		controls: false,
		loop: false,
		edgePadding: 0,
		autoWidth: true,
		items: 3,
		slideBy: 'page',
		autoplay: false,
		responsive: {
			768: {
				items: 4,
			},
		},
	});

	const dots_nav = document.querySelectorAll('.big-menu__dots__dot');
	if (window.innerWidth < 960) {
		dots_nav.forEach(function (dot_nav, index) {
			dot_nav.addEventListener('click', function (e) {
				e.preventDefault();
				dots.goTo(index);
			});
		});
	} else {
		dots_nav.forEach(function (dot_nav, index) {
			dot_nav.addEventListener('mouseenter', function () {
				slider.goTo(index);
			});
		});
	}

	const closeHeader = document.querySelector('.big-menu__header__btn');
	closeHeader.addEventListener('click', function () {
		document.querySelector('.partners').classList.remove('open');
		closeHeader.classList.remove('open');
	});
});
