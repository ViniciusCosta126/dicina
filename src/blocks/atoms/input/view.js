

document.addEventListener(
	'DOMContentLoaded',
	function (e) {
		const customSelects = document.querySelectorAll('.custom-select');

		if (customSelects) {
			customSelects.forEach((select) => {
				const customSelectLabel = select.querySelector('.custom-select__label');
				const customOptions = select.querySelectorAll('.custom-select__options li');

				customSelectLabel.addEventListener('click', function () {
					customSelects.forEach((selectItem) => {
						if (selectItem !== select) {
							selectItem.classList.remove('custom-select--open');
						}
					});

					select.classList.toggle('custom-select--open');
				});

				customOptions.forEach((option) => {
					option.addEventListener('click', function () {
						const type = option.dataset.type;
						customSelectLabel.innerHTML = option.dataset.value;
						select.setAttribute('data-option-selected', option.dataset.value);
						select.classList.remove('custom-select--open');
					});
				});
			});
		}
	},
	false
);
