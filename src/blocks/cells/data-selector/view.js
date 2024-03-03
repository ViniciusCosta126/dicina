export const changeDate = (value, type, item) => {
	//Remove mensagem de erro se houver
	const parent = item.closest('.custom-select');
	const error = parent.querySelector('.alert-msg');
	error.innerHTML = '';

	if (type === 'day') {
		const day = parseInt(value);
		const selectorParent = item.closest('.data-selector');
		const months = selectorParent.querySelectorAll('[data-type="month"]');

		if (months.length > 0) {
			const select = selectorParent.querySelector('[name="month"]');
			const selectedMonth = select.getAttribute('data-option-selected');

			months.forEach((month) => {
				const limit = parseInt(month.dataset.limit);
				const currentMonth = month.dataset.value;

				// If the selected day does not exist in the selected month, then clear the month picker
				if (currentMonth === selectedMonth) {
					if (day > limit) {
						select.setAttribute('data-option-selected', '');

						const selectText = select.querySelector('.custom-select__label');
						const selectTextPlaceholder = selectText.dataset.placeholder;
						selectText.innerHTML = selectTextPlaceholder;
					}
				}

				// If the selected day does not exist in the month then hide the month from the selector
				if (day > limit) {
					month.classList.add('hide');
				} else {
					month.classList.remove('hide');
				}
			});
		}
	}
};
