import { formValidateAndSend, getFormFields } from '../../../js/forms.js';

const newsLetter = () => {
	const wrapForm = document.querySelector('.community');
	const form = document.querySelector('.community__form');
	const errorElement = form.querySelector('.error_message');
	const inputs = getFormFields('.community__form', 'input');
	const errorMessage = form.getAttribute('data-msg');

	let sendButton = form.querySelector('input[type="submit"]');

	if (sendButton) {
		sendButton.addEventListener('click', function (event) {
			event.preventDefault();

			formValidateAndSend(form, wrapForm, errorMessage, errorElement, 'Newsletter', inputs);
		});
	}
};

window.addEventListener('load', newsLetter);
