export const activateButon = (button, wrapper) => {
	// Set width and position to active tab bar
	if (wrapper) {
		const barItem = wrapper.querySelector('.tab-bar .tab-bar-item');

		if (barItem) {
			const barWidth = button.getBoundingClientRect().width;
			const position = button.offsetLeft;
			barItem.style.width = `${barWidth}px`;
			barItem.style.left = `${position}px`;
		}
	}
};

document.addEventListener(
	'DOMContentLoaded',
	function () {
		const tabButtons = document.querySelectorAll('.tab-buttons');

		if (tabButtons.length) {
			tabButtons.forEach((item) => {
				// Set initial width to active tab bar
				const activeButton = item.querySelector('.button.tab-button.active');
				const barItem = item.querySelector('.tab-bar .tab-bar-item');

				if (barItem) {
					const barWidth = activeButton.getBoundingClientRect().width;
					barItem.style.width = `${barWidth}px`;
				}
			});
		}
	},
	false
);
