document.addEventListener(
	'DOMContentLoaded',
	function () {
		const textContent = document.querySelectorAll('.partner-item.about');
		const screenHeight = window.innerHeight;

		const updateImageHeight = (item, height) => {
			const image = item.closest('.about-partner').querySelector('.partner-item.image');
			image.style.height = `${height}px`;

			window.onresize = function () {
				const newHeight = item.clientHeight;
				image.style.height = `${newHeight}px`;
			};
		};

		if (textContent) {
			textContent.forEach((item) => {
				const height = item.clientHeight;

				if (height > screenHeight) {
					updateImageHeight(item, height);
				}
			});
		}
	},
	false
);
