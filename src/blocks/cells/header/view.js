document.addEventListener(
	'DOMContentLoaded',
	function () {
		// select elements
		const header = document.querySelector('.header');
		const navbar = header.querySelector('.navbar');
		const hamburguer_btn = header.querySelector('.header__menu_btn');
		const mainContainer = header.querySelector('.main-container');

		const className = 'sticky';
		const scrollTrigger = 0;

		// Get class to check if start tranparent or not
		const header_sticky = header.classList.contains('sticky');
		const header_show = header.classList.contains('ever-visible');

		// To check if main container has show class when open menu
		let needShow = false;

		// toggle nav open/close
		header.querySelector('.header__menu_btn').addEventListener('click', function () {
			if (header.classList.contains('open')) header.classList.toggle('close');
			else header.classList.remove('close');

			header.classList.toggle('open');
			navbar.classList.toggle('open');
			hamburguer_btn.classList.toggle('open');
			// document.querySelector('html').classList.toggle('not-scroll');

			// Check if need to hide menu buttons
			const isTransparent = mainContainer.classList.contains('show');

			// ReAdd show class
			if (needShow) {
				needShow = false;
				mainContainer.classList.add('show');
			}

			// Remove show class
			if (isTransparent) {
				needShow = true;
				mainContainer.classList.remove('show');
			}
		});

		// select submenus
		const sub_menus = document.querySelectorAll('.desktop .menu-item-has-children > a, .mobile .menu-item-has-children > a');

		// iterate submenus
		sub_menus.forEach((sub_menu) => {
			const arrow = document.createElement('div');
			arrow.classList.add('arrow');
			sub_menu.after(arrow);

			// toggle submenu open/close
			arrow.addEventListener('click', function (event) {
				arrow.classList.toggle('up');
				sub_menu.parentElement.querySelector('.sub-menu').classList.toggle('open');
			});
		});

		// on window scroll
		if (!header_sticky) {
			// when header_sticky === true, don't change at scroll
			window.onscroll = function () {
				checkScrollPosition();
			};
		}

		const checkScrollPosition = () => {
			// make header opaque when scroll down
			if (window.scrollY > scrollTrigger) {
				// add sticky class
				header.classList.add(className);

				if (!header_show) {
					// add show classes
					mainContainer.classList.add('show');
				}
			} else {
				// remove sticky class
				header.classList.remove(className);

				if (!header_show) {
					// make header transparent
					mainContainer.classList.remove('show');
				}
			}
		};

		// first check
		if (window.scrollY > scrollTrigger) {
			checkScrollPosition();
		}

		// Function to search
		const searchButton = header.querySelector('.search-button');
		if (searchButton) {
			// open and close
			searchButton.addEventListener('click', () => {
				const searchSection = header.querySelector('.search-section');
				const closeButton = searchSection.querySelector('.close-button');
				searchSection.classList.add('open');
				closeButton.addEventListener('click', () => {
					searchSection.classList.remove('open');
				});
			});

			// submit forms when users press "enter"
			const input = document.getElementById('q');
			input.addEventListener('keypress', function (event) {
				if (event.key === 'Enter') {
					event.preventDefault();
					document.getElementById('searchSubmit').click();
				}
			});
		}
	},
	false
);
