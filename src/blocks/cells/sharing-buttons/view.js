document.addEventListener(
	'DOMContentLoaded',
	function () {
		const shareButtons = document.querySelectorAll('.share-button');
		const openCloseds = document.querySelectorAll('.sharing-buttons--closed');

		if (shareButtons.length) {
			shareButtons.forEach(function (button) {
				if (button.classList.contains('copy-icon')) {
					const tooltip = button.querySelector('.tooltiptext');
					//copy 2 clipboard
					function copy2Clipboard() {
						// Getting a current URL
						var copyUrl = window.location.href;

						// Request permission to access clipboard
						navigator.permissions.query({ name: 'clipboard-write' }).then(function (result) {
							if (result.state === 'granted' || result.state === 'prompt') {
								// Copy text to clipboard
								navigator.clipboard
									.writeText(copyUrl)
									.then(function () {
										// Change the visibility
										tooltip.style.opacity = 1;
										// Wait 2 seconds and close the alert
										setTimeout(function () {
											tooltip.style.opacity = 0;
										}, 2000);
									})
									.catch(function (error) {
										console.error('Erro ao copiar para a área de transferência:', error);
									});
							}
						});
					}

					button.addEventListener('click', copy2Clipboard);
				} else if (button.classList.contains('twitter-icon')) {
					//do nothing!
				} else {
					let concatHref = button.href + button.baseURI;
					button.href = concatHref;
				}
			});
		}

		if (openCloseds.length) {
			openCloseds.forEach((openClosed) => {
				openClosed.onclick = () => {
					const toOpen = openClosed.closest('.sharing-buttons').querySelector('.sharing-buttons--icons');

					toOpen.classList.toggle('opened');
				};
			});
		}
	},
	false
);
