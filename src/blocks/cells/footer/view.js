document.addEventListener(
	'DOMContentLoaded',
	function () {
		const buttons = document.querySelectorAll('.footer .menu-footer-container .menu > .menu-item > a');
		buttons.forEach((button) => {
			button.addEventListener('click', function (event) {
				event.preventDefault();
				button.classList.toggle('open');
				button.parentElement.querySelector('.sub-menu').classList.toggle('open');
			});
		});

		const socialIcons = document.querySelectorAll('.footer__upper__social__links .menu > .menu-item');
		const hrElement = document.getElementById('margin-hr');
		const hrElementDesk = document.getElementById('margin-desk');
		let lastOpenElement = null;
		let liElements = null;
		let totalHeight = 0;
		socialIcons.forEach((icon) => {
			icon.addEventListener('click', function (event) {
				event.preventDefault();

				if (lastOpenElement && lastOpenElement != icon) {
					lastOpenElement.classList.remove('open');
					const ul = lastOpenElement.querySelector('ul');
					if (ul) {
						ul.classList.remove('open');
					}
				}

				icon.classList.toggle('open');
				liElements = icon.querySelectorAll('.sub-menu > .menu-item');
				liElements.forEach((item) => {
					totalHeight += item.offsetHeight;
					item.addEventListener('click', (event) => {
						event.stopImmediatePropagation();
					});
				});
				lastOpenElement = icon;

				icon.classList.contains('open')
					? (hrElement.style.marginTop = totalHeight + 32 + 'px')
					: (hrElement.style.marginTop = '40px');

				icon.classList.contains('open')
					? (hrElementDesk.style.marginTop = totalHeight + 32 + 'px')
					: (hrElementDesk.style.marginTop = '10px');
				totalHeight = 0;
			});
		});
	},
	false
);
