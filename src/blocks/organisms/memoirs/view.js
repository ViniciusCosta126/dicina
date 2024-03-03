export const memoirs = (wrapper) => {
	if (wrapper.length) {
		wrapper.forEach((memory) => {
			const form = memory.querySelector('.data-selector');

			form.addEventListener('submit', async function (event) {
				event.preventDefault();

				const daySelect = form.querySelector('[name="day"]');
				const monthSelect = form.querySelector('[name="month"]');

				const day = daySelect.getAttribute('data-option-selected');
				const month = monthSelect.getAttribute('data-option-selected');

				if (day && month) {
					const submitButton = form.querySelector('[type="submit"]');
					submitButton.classList.add('loading');

					const clearMonth = month.trim();
					const monthsKeys = {
						Janeiro: '01',
						January: '01',
						Fevereiro: '02',
						February: '02',
						Março: '03',
						March: '03',
						Abril: '04',
						April: '04',
						Maio: '05',
						May: '05',
						Junho: '06',
						June: '06',
						Julho: '07',
						July: '07',
						Agosto: '08',
						August: '08',
						Setembro: '09',
						September: '09',
						Outubro: '10',
						October: '10',
						Novembro: '11',
						November: '11',
						Dezembro: '12',
						December: '12',
					};
					const numberMonth = monthsKeys[clearMonth];

					const memoryContent = await getMemoirs(day, numberMonth);
					window.location.replace(memoryContent);
				} else {
					if (!day) {
						const errorMsg = daySelect.getAttribute('error-msg');
						const error = daySelect.querySelector('.alert-msg');
						error.innerHTML = errorMsg;
					}

					if (!month) {
						const errorMsg = monthSelect.getAttribute('error-msg');
						const error = monthSelect.querySelector('.alert-msg');
						error.innerHTML = errorMsg;
					}
				}
			});
		});
	}
};

export const getMemoirs = async (day, month) => {
	const query = `&day=${day}&month=${month}`;

	const baseUrl = window?.location.origin;
	const response = await fetch(`${baseUrl}/wp-admin/admin-ajax.php?action=loadMemoirs${query}`, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});

	const data = await response.json();

	return data;
};

document.addEventListener(
	'DOMContentLoaded',
	function () {
		const wrappers = document.querySelectorAll('.memoirs');

		memoirs(wrappers);
	},
	false
);
