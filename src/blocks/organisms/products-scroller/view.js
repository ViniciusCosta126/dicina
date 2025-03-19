// Documentação:
// https://www.npmjs.com/package/tiny-slider#usage
// http://ganlanyuan.github.io/tiny-slider/demo/

import { tns } from 'tiny-slider';

document.addEventListener('DOMContentLoaded', function () {
	const products = document.querySelector('.products__carousel');

	if (products) {
		const slider = tns({
			container: products,
			nav: true,
			navContainer: '.products__dots',
			mouseDrag: true,
			controls: false,
			items: 1,
			center: true,
			loop: false,
			edgePadding: 15,
		});

		const secondRow = document.querySelectorAll('.desktop .wrapper-row .products__carousel__card');

		secondRow.forEach((item, idx) => {
			if (idx > 2) {
				document.querySelector('.desktop .wrapper-row.second').append(item);
			}
		});

		const homeProductsSection = document.querySelector('.products');
		const screenWidth = window.innerWidth;
		const ScrollTrigger = window.ScrollTrigger;
		productScroller(ScrollTrigger, homeProductsSection, screenWidth);
	}
});

const productScroller = (ScrollTrigger, homeProductsSection, screenWidth) => {
	const homeProducts = homeProductsSection.querySelector('.desktop');
	const secondLine = homeProducts.querySelector('.carousel-container .wrapper-row.second');

	if (screenWidth >= 1024) {
		ScrollTrigger.create({
			trigger: homeProductsSection,
			start: 'center center',
			endTrigger: 'html',
			onToggle: () => {
				execute();
			},
		});

		const execute = () => {
			const subtitle = homeProducts.querySelector('.text-wrapper .subtitle-wrapper');
			secondLine.classList.toggle('show');
			secondLine.classList.toggle('hide');
			subtitle.classList.toggle('second');
		};
	}
};
