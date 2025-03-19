document.addEventListener('DOMContentLoaded', function () {
	const ScrollTrigger = window.ScrollTrigger;
	const lightspeedTexts = document.querySelectorAll('.lightspeed-text .container> *');

	if (lightspeedTexts.length > 0) {
		lightspeedTexts.forEach((lightspeedText) => {
			const gspStart = lightspeedText.getAttribute('data-gspStart');

			ScrollTrigger.create({
				trigger: lightspeedText,
				start: gspStart,
				endTrigger: 'html',
				onToggle: (self) => {
					self.isActive ? lightspeedText.classList.add('wiggle') : lightspeedText.classList.remove('wiggle');
				},
			});
		});
	}
});
