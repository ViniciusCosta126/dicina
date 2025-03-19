import { pushDataLayer } from '../index/view';

export const getFormFields = (formClass, field) => {
	return document.querySelectorAll(formClass + ' ' + field);
};

function addEventOnFields(fields, event, functionName, bindItem = '') {
	for (let i = 0; i < fields.length; i++) {
		fields[i].addEventListener(
			event,
			function () {
				functionName(this, bindItem);
			},
			false
		);
	}
}

function input_dataLayer(element, formName) {
	if (first) {
		first = false;
		var data_first = {
			event: 'formInteraction',
			action: 'startedFillingOut',
			formName: formName,
		};
		pushDataLayer(data_first);
	}

	var data = {
		event: 'formInteraction',
		action: 'filledField',
		label: element.getAttribute('aria-label'),
		value: element.value,
		formName: formName,
	};
	pushDataLayer(data);
}

// Validate Form
function formValidateInputChange(element) {
	validateInput(element);
}

// Get Custom Select
function getCustomSelect(form) {
	const customSelect = form.querySelector('.custom-select');
	if (!customSelect) return false;
	const optionSelected = customSelect.getAttribute('data-option-selected');
	if (!optionSelected) return false;
	const customSelectName = customSelect.getAttribute('name');
	return {
		[customSelectName]: optionSelected,
	};
}

// Submit
export const formValidateAndSend = (form, wrapForm, errorMessage, errorElement, formName, inputs, selects = false, e) => {
	clearMessages(form);
	errorElement.classList.remove('visible');
	var valSelects = selects ? validateSelects(form, selects, errorMessage) : true;
	var valInputs = inputs ? validateInputs(form, inputs, errorMessage) : true;

	if (valInputs && valSelects) {
		sendLeads(form, wrapForm, errorElement, formName);
	}
};

function sendLeads(form, wrapForm, errorElement, formName) {
	form.classList.remove('sended');
	errorElement.classList.remove('visible');

	var formData = new FormData(form);
	var object = {};
	if (getCustomSelect(form)) {
		object = {
			...getCustomSelect(form),
		};
	}
	formData.forEach(function (value, key) {
		object[key] = value;
	});
	var json = JSON.stringify(object);

	let sendButton = form.querySelector('input[type="submit"]');
	sendButton.classList.add('sending');
	if (sendButton) {
		sendButton.disabled = true;
		fetch(form.getAttribute('action'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: json,
		}).then(function (response) {
			console.log(response);
			if (response.ok) {
				console.log('form enviado');
				sendButton.classList.remove('sending');

				form.classList.add('sended');
				form.reset();
				let data = {
					event: 'formInteraction',
					action: 'formSubmitted',
					formName: formName,
				};
				pushDataLayer(data);
			} else {
				console.log('erro');
				errorElement.classList.add('visible');
			}
			sendButton.disabled = false;
		});
	}
}

function clearMessages(form) {
	var messages = form.querySelectorAll('.alert-msg');
	for (let i = 0; i < messages.length; i++) {
		messages[i].innerHTML = '';
	}
}

function validateSelects(parent, fields, errorMessage) {
	var validate = true;
	for (let i = 0; i < fields.length; i++) {
		var item = fields[i];
		if (!validateSelect(parent, item, errorMessage)) {
			validate = false;
		}
	}
	return validate;
}

function validateSelect(parent, item, errorMessage) {
	const optionSelected = item.getAttribute('data-option-selected');
	if (optionSelected === null || optionSelected === '') {
		formErrorMessages(parent, item, errorMessage);
		return false;
	}
	return true;
}

function validateInputs(parent, fields, errorMessage) {
	var validate = true;
	for (let i = 0; i < fields.length; i++) {
		if (!validateInput(parent, fields[i], errorMessage)) {
			validate = false;
		}
	}
	return validate;
}

function validateInput(parent, input, errorMessage) {
	var validateMessage = validateField(input, errorMessage);
	if (validateMessage != '') {
		formErrorMessages(parent, input, validateMessage);
		return false;
	}
	if (input.getAttribute('type') == 'text' || input.getAttribute('type') == 'email') {
		formErrorMessages(parent, input, '');
	}
	return true;
}

function validateField(field, errorMessage) {
	if (field.getAttribute('type') == 'checkbox' && field.hasAttribute('required') && !field.checked) {
		return errorMessage;
	}

	if (field.getAttribute('type') == 'email' && field.hasAttribute('required')) {
		if (field.value === '') {
			return errorMessage;
		}

		if (/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(field.value)) {
			return '';
		} else {
			return field.getAttribute('error-msg') || errorMessage;
		}
	}

	if (field.hasAttribute('required') && field.value == '') {
		return errorMessage;
	}

	if (field.hasAttribute('pattern') && !validatePattern(field.value, field.getAttribute('pattern'))) {
		return field.getAttribute('error-msg') || errorMessage;
	}

	if (field.hasAttribute('not-allow') && validatePattern(field.value, field.getAttribute('not-allow'))) {
		return field.getAttribute('error-msg') || errorMessage;
	}

	if (field.hasAttribute('max-size') && validateSize(field.value, field.getAttribute('max-size')))
		return field.getAttribute('error-msg') || errorMessage;

	return '';
}

function validatePattern(text, pattern) {
	var re = new RegExp(pattern);
	return re.test(String(text).toLowerCase());
}

function validateSize(text, max_size) {
	return text.length > max_size;
}

function formErrorMessages(parent, field, message) {
	var fieldName = field.getAttribute('name');
	var el = parent.querySelector('.' + fieldName + '_input_label .alert-msg');
	el.innerHTML = message;
}
