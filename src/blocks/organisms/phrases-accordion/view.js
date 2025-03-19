document.addEventListener('DOMContentLoaded', function () {
	const PhraseAccordion = document.querySelector('.phrase-accordion');

	if (PhraseAccordion) {
		const details = document.querySelectorAll('details');
		details[0].open = true;

		details.forEach((targetDetail) => {
			targetDetail.addEventListener('click', () => {
				details.forEach((detail) => {
					if (detail !== targetDetail) {
						detail.removeAttribute('open');
					}
				});
			});
		});
	}
});
