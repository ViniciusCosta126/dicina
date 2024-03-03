// If Needs to import any script:
import { tns } from 'tiny-slider';

document.addEventListener(
	'DOMContentLoaded',
	function () {
		const wrapperPost = document.querySelector('.post-single-content');

		if (wrapperPost) {
			const texts = wrapperPost.querySelectorAll('.entry-content > p');

			if (texts.length) {
				texts.forEach((text) => {
					if (text.nextElementSibling) {
						const nextTag = text.nextElementSibling.tagName;

						if (nextTag == 'UL' || nextTag == 'OL') {
							text.classList.add('before-list');
						} else if (nextTag == 'FIGURE') {
							text.classList.add('before-figure');
						} else if (nextTag != 'P' && !text.classList.contains('typography')) {
							text.classList.add('last-of-paragraph');
						}
					}
				});
			}

			const gallerys = wrapperPost.querySelectorAll('.wp-block-gallery.has-nested-images');

			if (gallerys.length) {
				gallerys.forEach((gallery) => {
					const items = gallery.querySelectorAll('.wp-block-image');
					const slideWrapper = document.createElement('div');
					slideWrapper.classList.add('wp-block-gallery-content');
					gallery.appendChild(slideWrapper);

					items.forEach((item) => {
						item.classList.remove('wp-block-image');
						item.classList.add('gallery-image');
						slideWrapper.appendChild(item);
					});

					tns({
						container: slideWrapper,
						nav: false,
						loop: true,
						autoHeight: true,
						swipeAngle: false,
						slideBy: 'page',
						mouseDrag: true,
						startIndex: 0,
						speed: 500,
						items: 1,
					});
				});
			}

			const quotes = wrapperPost.querySelector('.wp-block-quote');
			if (quotes) {
				const createSvg = (classQuote) => {
					const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
					const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

					iconSvg.setAttribute('fill', '#EBC535');
					iconSvg.setAttribute('height', '42');
					iconSvg.setAttribute('width', '60');
					iconSvg.setAttribute('viewBox', '0 0 60 42');
					iconSvg.classList.add(`quotes-icon`);
					iconSvg.classList.add(`${classQuote}`);

					iconPath.setAttribute('d', 'M60 42V0L37.5 21v21H60Zm-37.5 0V0L0 21v21h22.5Z');

					iconSvg.appendChild(iconPath);

					return iconSvg;
				};

				const firstIcon = createSvg('quote-first');
				const lastIcon = createSvg('quote-last');

				quotes.prepend(firstIcon);
				quotes.append(lastIcon);
			}

			const productBanner = wrapperPost.querySelector('.banner-product');
			if (productBanner) {
				wrapperPost.classList.add('with-product');
				wrapperPost.querySelector('.container-product-banner').appendChild(productBanner);
			} else {
				const containerBanner = wrapperPost.querySelector('.container-product-banner');
				containerBanner.remove();
			}
		}
	},
	false
);
