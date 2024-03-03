export const adjustControlsPosition = () => {
	const textCarousel = document.querySelector('[data-id="text-with-image-carousel"]');

	if (textCarousel) {
		const screenWidth = window.innerWidth;

		const tnsControls = textCarousel.querySelector('.tns-controls');
		const activeElement = textCarousel.querySelector('.carousel-content .tns-slide-active');
		const variant = activeElement.classList[1];
		const position = activeElement.classList[3];

		let paddingValue = 0;

		if (screenWidth < 768) {
			paddingValue = 0;
		} else if (screenWidth < 1024) {
			if (variant === 'simple-title-text') {
				paddingValue = 0;
			} else {
				paddingValue = 25;
			}
		} else if (screenWidth < 1366) {
			if (variant === 'simple-title-text') {
				paddingValue = 10;
			} else {
				paddingValue = 25;
			}
		} else {
			if (variant === 'simple-title-text') {
				paddingValue = 34;
			} else {
				paddingValue = 40;
			}
		}

		if (screenWidth > 768) {
			const prevButton = tnsControls.querySelector('[data-controls="prev"');
			const nextButton = tnsControls.querySelector('[data-controls="next"');

			if (tnsControls) {
				if (position === 'left') {
					prevButton.style.marginLeft = '0';
					nextButton.style.marginRight = `${paddingValue}%`;
				} else if (position === 'right') {
					prevButton.style.marginLeft = `${paddingValue}%`;
					nextButton.style.marginRight = '0';
				} else if (position === 'center' && screenWidth >= 768) {
					prevButton.style.marginLeft = `5%`;
					nextButton.style.marginRight = '5%';
				} else {
					prevButton.style.marginLeft = `0`;
					nextButton.style.marginRight = '0';
				}
			}
		} else {
			tnsControls.style.paddingLeft = '0';
			tnsControls.style.paddingRight = '0';
		}
	}
};

document.addEventListener(
	'DOMContentLoaded',
	function () {
		// Chama a função quando a página carrega e quando um slide é trocado
		const wrapper = document.querySelector('.carousel-text-section');

		if (wrapper) {
			const itens = wrapper.querySelectorAll('.text-with-image');

			// Functions to set the minimum width for the item and avoid layout breaks
			const screenWidth = window.innerWidth;
			const docWidth = wrapper.getBoundingClientRect().width;
			const scrollBarWidth = screenWidth - docWidth;

			if (itens.length) {
				itens.forEach((item) => {
					item.style.minWidth = `calc(100vw - ${scrollBarWidth}px)`;
				});
			}

			setTimeout(() => {
				adjustControlsPosition();
			}, 2000);
		}
	},
	false
);
