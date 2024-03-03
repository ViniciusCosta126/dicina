document.addEventListener(
	'DOMContentLoaded',
	function () {
		const bodyWrapper = document.querySelector('.entry-content');
		const depositionWrappers = document.querySelectorAll('.testimony-of-personalities');

		if (depositionWrappers.length) {
			depositionWrappers.forEach((depositionWrapper) => {
				const modals = depositionWrapper.querySelectorAll('.modal');

				if (modals.length) {
					modals.forEach((modal) => {
						bodyWrapper.appendChild(modal);
					});
				}
			});
		}
	},
	false
);
