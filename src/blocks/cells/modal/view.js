document.addEventListener(
	'DOMContentLoaded',
	function () {
		const modalButtons = document.querySelectorAll('.open-modal');
		if (modalButtons.length) {
			modalButtons.forEach((modalButton) => {
				modalButton.addEventListener('click', () => {
					const openId = modalButton.dataset.id;
					const forceLandsape = modalButton.dataset.landsape == 'true' ? true : false;

					const toOpen = document.getElementById(openId);
					toOpen.classList.add('open');

					if (forceLandsape) {
						screen.orientation.lock('landscape');
					}
				});
			});
		}

		const modals = document.querySelectorAll('.modal');
		if (modals.length) {
			modals.forEach((modal) => {
				const closeButton = modal.querySelector('.modal-close-button');

				closeButton.onclick = () => {
					const closeId = closeButton.dataset.id;
					const forceLandsape = closeButton.dataset.landsape == 'true' ? true : false;
					const toClose = document.getElementById(closeId);
					toClose.classList.remove('open');

					if (forceLandsape) {
						screen.orientation.lock('natural');
					}
				};
			});
		}
	},
	false
);
