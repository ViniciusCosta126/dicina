document.addEventListener(
	'DOMContentLoaded',
	function () {
		let pos = { left: 0, x: 0 };
		let ele = document.querySelector('.scroll-x-viewport');

		const mouseDownHandler = function (e) {
			const touchClientX = e.touches ? e.touches[0].clientX : 0;
			pos = {
				// The current scroll
				left: ele.scrollLeft,
				// Get the current mouse position
				x: e.clientX || touchClientX,
			};

			document.addEventListener('mousemove', mouseMoveHandler);
			document.addEventListener('mouseup', mouseUpHandler);

			document.addEventListener('touchmove', mouseMoveHandler);
			document.addEventListener('touchend', mouseUpHandler);
		};

		// Listen mouse down
		ele.addEventListener('mousedown', mouseDownHandler);
		ele.addEventListener('touchstart', mouseDownHandler, { passive: true });

		const mouseMoveHandler = function (e) {
			const touchClientX = e.touches ? e.touches[0].clientX : 0;
			// How far the mouse has been moved
			const dx = (e.clientX || touchClientX) - pos.x;

			// Scroll the element
			ele.scrollLeft = pos.left - dx;
		};

		// Remove listeners on mouseup
		const mouseUpHandler = function () {
			document.removeEventListener('mousemove', mouseMoveHandler);
			document.removeEventListener('mouseup', mouseUpHandler);

			document.removeEventListener('touchmove', mouseMoveHandler);
			document.removeEventListener('touchend', mouseUpHandler);
		};
	},
	false
);
