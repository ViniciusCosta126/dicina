export const galleryCarouselArrowPosition = (wrapper, currentItem) => {
	const controls = wrapper.querySelector('.tns-controls');

	if (controls) {
		const image = currentItem.querySelector('.gallery-item__image');

		const imageRect = image.getBoundingClientRect();
		const controlsRect = controls.getBoundingClientRect();

		// set top position to controls
		const paddingTop = window.innerWidth >= 1024 ? 20 : 50;
		const galleryTopPos = wrapper.offsetTop;
		const imageHeight = imageRect.height;
		controls.style.top = `${paddingTop + galleryTopPos + imageHeight - controlsRect.height}px`;

		// set left position to controls
		const imageLeftPos = imageRect.left;
		const imageWidth = imageRect.width;
		console.log('currentItem: ', currentItem);
		console.log('imageLeftPos: ', imageLeftPos);
		console.log('imageWidth: ', imageWidth);
		controls.style.left = `${imageLeftPos + imageWidth - controlsRect.width}px`;

		//set opacity 1
		controls.style.opacity = 1;
	}
};

document.addEventListener(
	'DOMContentLoaded',
	function () {
		const carouselGallerys = document.querySelectorAll('.gallery-carousel');

		if (carouselGallerys.length) {
			carouselGallerys.forEach((carouselGallery) => {
				const galleryItems = carouselGallery.querySelectorAll('.gallery-item');

				if (galleryItems.length) {
					galleryItems.forEach((galleryItem, index) => {
						const galleryItemModal = galleryItem.querySelector('.modal-container');

						if (galleryItemModal) {
							const bodyWrapper = document.querySelector('.entry-content');
							bodyWrapper.appendChild(galleryItemModal);
						}

						if (index === 0) {
							setTimeout(() => {
								galleryCarouselArrowPosition(carouselGallery, galleryItem);
							}, 300);
						}
					});
				}
			});
		}
	},
	false
);
