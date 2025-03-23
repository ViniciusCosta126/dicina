// If Needs to import any script:
// import { tns } from 'tiny-slider';

document.addEventListener("DOMContentLoaded", function () {
	const buttons = document.querySelectorAll('.icon-button');

	buttons.forEach(button => {

		button.addEventListener('click', function () {
			const faqItem = button.closest('.faq-item');
			faqItem.classList.toggle('open');
		});
	});
});
