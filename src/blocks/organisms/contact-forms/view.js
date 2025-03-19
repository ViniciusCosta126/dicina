import { formValidateAndSend, getFormFields } from '../../../js/forms.js';

document.addEventListener(
	'DOMContentLoaded',
	function () {
		const wrapForm = document.querySelector('.contact-forms');
		const form = document.querySelector('.contact-forms__form');
		const errorElement = form.querySelector(".error_message");
		const inputs = getFormFields('.contact-forms', 'input');
		const selects = getFormFields('.contact-forms', '.custom-select');
		const errorMessage = form.getAttribute('data-msg');

		let sendButton = form.querySelector('input[type="submit"]');
		sendButton.addEventListener('click', function (event) {
			event.preventDefault();

			formValidateAndSend(form, wrapForm, errorMessage, errorElement, 'Contato', inputs, selects);

		});
	},
	false
);
