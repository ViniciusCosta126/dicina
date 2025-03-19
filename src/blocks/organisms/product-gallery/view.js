document.addEventListener(
	'DOMContentLoaded',
	function () {
		const updateBgImage = ({ product, item }) => {
			const sreenWidth = window.innerWidth;
			const imageMobile = item.dataset.imagemobile;
			const imageDesk = item.dataset.imagedesk;
			const imageEl = product.querySelector('.product-gallery-full-image');

			if (imageEl) {
				imageEl.classList.remove('transition');

				setTimeout(() => {
					imageEl.classList.add('transition');

					if (sreenWidth < 768) {
						imageEl.style.backgroundImage = `url('${imageMobile}')`;
					} else {
						imageEl.style.backgroundImage = `url('${imageDesk}')`;
					}
				}, 100);

				setTimeout(() => {
					imageEl.classList.remove('transition');
				}, 2000);
			}
		};

		const products = document.querySelectorAll('.product-gallery');

		products.forEach((product) => {
			const items = product.querySelectorAll('.product-image');

			items.forEach((item, index) => {
				if (index === 0) {
					updateBgImage({ product, item });
				}

				item.onclick = () => {
					if (!item.classList.contains('active')) {
						updateBgImage({ product, item });

						items.forEach((button) => {
							button.classList.remove('active');
							item.classList.add('active');
						});
					}
				};
			});
		});
	},
	false
);
