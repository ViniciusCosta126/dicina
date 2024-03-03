import { tns } from 'tiny-slider';

document.addEventListener(
	'DOMContentLoaded',
	function () {
		const menuWrapper = document.querySelector('.navigation-journey');

		// Conferindo se o usuário está em uma página de anos
		const currentPath = window.location.pathname;
		let isGrandPrixPage,
			isMemoirs = false;
		let yearPath = '';

		if (
			currentPath.indexOf('formula-1') > -1 ||
			currentPath.indexOf('formula-3') > -1 ||
			currentPath.indexOf('formula-ford') > -1 ||
			currentPath.indexOf('kart') > -1
		) {
			const allpaths = currentPath.split('/');
			const validPaths = allpaths.filter((item) => item !== '');

			if (validPaths.length > 3) {
				isGrandPrixPage = true;
				yearPath = validPaths[2];
			}
		}

		if (currentPath.indexOf('memorias-de-um-campeao') > -1) {
			isMemoirs = true;
		}

		if (menuWrapper) {
			const menuItems = menuWrapper.querySelectorAll('.menu-item');
			const submenus = menuWrapper.querySelectorAll('.sub-menu');

			if (submenus.length) {
				// loop inicial em todos os submenus
				submenus.forEach((submenu) => {
					const submenuWrapper = document.createElement('div');
					submenuWrapper.classList.add('sub-menu-content');

					const button = document.createElement('button');
					button.innerHTML = 'Voltar';
					button.classList.add('nav-back');

					submenu.parentElement.appendChild(submenuWrapper);
					submenuWrapper.appendChild(button);
					submenuWrapper.appendChild(submenu);

					// Click do botão voltar
					button.onclick = () => {
						const parent = button.parentElement;
						parent.classList.remove('active-child');
						const lastParent = button.closest('.active-parent');
						lastParent.classList.remove('active-parent');
						lastParent.classList.add('active-child');
					};
				});
			}

			if (menuItems.length) {
				// initial loop on all menu items
				menuItems.forEach((item) => {
					const link = item.querySelector('a');

					// when going through all the menu items
					// if you are in a Grand Prix, you must activate the years menu
					if (isGrandPrixPage) {
						const hrefLink = link.getAttribute('href');

						if (
							hrefLink.indexOf('formula-1') > -1 ||
							hrefLink.indexOf('formula-3') > -1 ||
							hrefLink.indexOf('formula-ford') > -1 ||
							hrefLink.indexOf('kart') > -1
						) {
							const allpaths = hrefLink.split('/');
							const validPaths = allpaths.filter((item) => item !== '');

							if (validPaths[4] == yearPath) {
								item.classList.add('current-menu-item');
							}
						}
					}

					if (isMemoirs) {
						const hrefLink = link.getAttribute('href');
						const allpaths = hrefLink.split('/');
						const validPaths = allpaths.filter((item) => item !== '');

						if (validPaths[3] == 'fora-das-pistas' || validPaths[3] == 'off-the-slopes') {
							item.classList.add('current-menu-item');
						}
					}

					// when going through all the menu items
					// checks if the item was active
					if (item.classList.contains('current-menu-item')) {
						{
							// Rules
							// If there is a submenu
							// Add 'active-parent' class for parents (menu and submenus)
							// Add 'active-child' class to child (submenu)
							//--------------
							// If there are no submenus
							// Add 'active-child' class for direct parent
							// Add 'active-parent' class for top parents
						}

						// Check if it has a submenu
						const hasSubmenu = item.contains(item.querySelector('.sub-menu'));

						// Loop to get all parent submenus directly linked to the active item
						let notParent = true;
						let subParents = [];
						let element = item;
						while (notParent) {
							if (
								element.parentNode.classList.contains('sub-menu-content') ||
								element.parentNode.classList.contains('menu')
							) {
								subParents.unshift(element.parentNode);
							}

							if (element.parentNode.classList.contains('menu')) {
								notParent = false;
							}

							element = element.parentNode;
						}

						if (hasSubmenu) {
							// if there is a submenu:
							// add 'active-parent' class for parents (menu and submenus)
							subParents.forEach((subParent) => {
								subParent.classList.add('active-parent');
							});

							// add 'active-child' class to child
							item.querySelector('.sub-menu-content').classList.add('active-child');
						} else {
							// if there is no submenu:
							// add 'active-parent' class for parents (menu and submenus),
							subParents.forEach((subParent) => {
								subParent.classList.add('active-parent');
							});
							const parent = item.closest('.sub-menu-content');

							// add the parent 'active-child' class directly from the item,
							parent.classList.remove('active-parent');
							parent.classList.add('active-child');
						}
					}

					// check if the link is empty
					// if it is, avoid the click event and create a function to open the submenu
					if (link.getAttribute('href') === '/' || link.getAttribute('href') === '/en/') {
						link.onclick = (e) => {
							e.preventDefault();
							const parentLinkMenu = link.closest('.active-child');
							const parentLink = link.parentElement;

							parentLinkMenu.classList.remove('active-child');
							parentLinkMenu.classList.add('active-parent');
							parentLink.querySelector('.sub-menu-content').classList.add('active-child');
						};
					}

					// checks if it is a number or a text
					// if it's number then add class lunk-year
					if (!isNaN(link.innerHTML)) {
						item.classList.add('link-year');

						if (!item.parentElement.classList.contains('years-list')) {
							item.parentElement.classList.add('years-list');
						}
					}
				});

				// Get the list of years to create a carousel
				const yearsList = document.querySelectorAll('.years-list');

				if (yearsList.length) {
					yearsList.forEach((slide) => {
						const allItems = slide.querySelectorAll('.link-year');
						let isCenter = false;

						if (allItems.length < 4) {
							isCenter = true;
							slide.classList.add('center-slide');

							if (allItems.length >= 2) {
								slide.classList.add('center-scroll');
							}
						} else {
							// Create the carousel only if there are more than 4 items
							const slider = tns({
								container: slide,
								center: isCenter,
								nav: false,
								mouseDrag: false,
								swipeAngle: false,
								speed: 400,
								items: 4,
								loop: false,
								slideBy: 1,
								responsive: {
									0: {
										controls: false,
										items: 4,
									},
									768: {
										controls: true,
										items: 5,
									},
									1024: {
										items: 6,
									},
								},
							});
						}
					});
				}
			}
		}
	},
	false
);
