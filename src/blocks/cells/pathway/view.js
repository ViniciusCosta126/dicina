document.addEventListener(
	'DOMContentLoaded',
	function () {
		const bigMenuBtn = document.querySelector('.open-big-menu .button');
		bigMenuBtn.addEventListener('click', function () {
			document.querySelector('.partners').classList.toggle('open');
			document.querySelector('.big-menu__header__btn').classList.add('open');
		});
	},
	false
);
