// Component function
export const updateHeight = (tabs, button, content, isEditor = false) => {
	const tabsContent = tabs.querySelector('.tabs-contents');
	const tabsButton = button.closest('.tabs-buttons');
	const contentHeight = content.getBoundingClientRect().height;
	const buttonsHeight = tabsButton.getBoundingClientRect().height;

	// Update position and sizes to active-bar
	const tabsButtonContent = button.closest('.tabs-buttons-content');
	const tabBar = tabsButton.querySelector('.tab-bar');
	const activeBar = tabsButton.querySelector('.tab-bar-item');
	const buttonsContentRect = tabsButtonContent.getBoundingClientRect();
	const buttonRect = button.getBoundingClientRect();
	tabBar.style.width = `${buttonsContentRect.width - 1}px`;
	activeBar.style.width = `${buttonRect.width}px`;
	activeBar.style.left = `${buttonRect.left - buttonsContentRect.left}px`;

	tabsContent.style.height = `${contentHeight}px`;

	if (!isEditor) {
		tabs.style.height = `${contentHeight + buttonsHeight}px`;
	} else {
		tabs.style.height = `${contentHeight + buttonsHeight + 45}px`;
	}
};

const updateActive = (tabs, button, content) => {
	const allItems = tabs.querySelectorAll('.tabs-item');

	// Remove a classe active de todos os allItems
	allItems.forEach((itemWrapper) => {
		itemWrapper.classList.remove('active');
	});

	// Adiciona a classe active no item selecionado
	button.classList.add('active');
	content.classList.add('active');
	updateHeight(tabs, button, content);
};

const tabs = () => {
	const tabs = document.querySelectorAll('.tabs');

	if (tabs.length) {
		tabs.forEach((tabWrapper) => {
			const buttons = tabWrapper.querySelectorAll('.tabs-item.button-tab');

			if (buttons.length) {
				buttons.forEach((button, index) => {
					const id = button.dataset.id;
					const content = tabWrapper.querySelector(`.tabs-contents [data-id="${id}"]`);

					button.onclick = () => {
						updateActive(tabWrapper, button, content);
					};

					if (index === 0) {
						updateActive(tabWrapper, button, content);
					}
				});
			}
		});
	}
};

// Flag to avoid duplicate function loading
let functionLoaded = false;

// Load function when in front-end (render.php)
document.addEventListener(
	'DOMContentLoaded',
	function () {
		if (!functionLoaded) {
			tabs();
			functionLoaded = true;
		}
	},
	false
);

// Load function when in panel
if (window.DOMContentLoaded) {
	if (!functionLoaded) {
		tabs();
		functionLoaded = true;
	}
}
