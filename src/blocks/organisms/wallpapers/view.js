const downloadImage = async (caminho_imagem) => {
	var link = document.createElement('a');
	link.href = caminho_imagem;

	// Specify the name of the download file
	link.download = caminho_imagem;

	// Add link to document body (no need to render)downloadable file
	link.style.display = 'none';
	document.body.appendChild(link);

	// Click on the link
	link.click();

	// Remove the temporary link from the document body
	document.body.removeChild(link);
};

document.addEventListener('DOMContentLoaded', () => {
	const wrapperWallpapers = document.querySelectorAll('.wallpapers');
	const bodyWrapper = document.querySelector('.entry-content');

	if (wrapperWallpapers.length) {
		wrapperWallpapers.forEach((wrapperWallpaper) => {
			// Passes all modals out of the section
			const modals = wrapperWallpaper.querySelectorAll('.modal');
			if (modals) {
				modals.forEach((modal) => {
					bodyWrapper.appendChild(modal);
				});
			}

			// Download action
			const wallpaperItems = wrapperWallpaper.querySelectorAll('.wallpaper-card');
			if (wallpaperItems.length) {
				wallpaperItems.forEach((wallpaperItem) => {
					const downButton = wallpaperItem.querySelector('.download-button');

					downButton.onclick = () => {
						const modalId = wallpaperItem.querySelector('.thumb').dataset.id;
						const imgModal = document.querySelector(`#${modalId} .wallpaper-img-modal`);
						downloadImage(imgModal.getAttribute('src'));
					};
				});
			}
		});
	}
});
