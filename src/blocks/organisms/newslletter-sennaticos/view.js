import { formValidateAndSend, getFormFields } from '../../../js/forms.js';

const newsLetterSennaticos = () => {
	const wrapForm = document.querySelector('#newsletter-sennaticos');
	const form = document.getElementById('newslletter-sennaticos-form');
	const errorElement = form.querySelector('.error_message');
	const inputs = getFormFields('#newslletter-sennaticos-form', 'input');
	const errorMessage = form.getAttribute('data-msg');
	const sendButton = form.querySelector('input[type="submit"]');

	if (sendButton) {
		sendButton.addEventListener('click', function (event) {
			event.preventDefault();
			formValidateAndSend(form, wrapForm, errorMessage, errorElement, 'Newsletter', inputs);

			setTimeout(() => {
				const returned_messages = document.querySelectorAll('.return_message');
				returned_messages.forEach((item) => {
					item.style.display = 'none';
				});
			}, 5000);
		});
	}
};

window.addEventListener('load', newsLetterSennaticos);
