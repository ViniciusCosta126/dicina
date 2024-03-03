document.addEventListener('DOMContentLoaded', function () {
	const button = document.querySelector('#go-to-sectio-2');

	if (button) {
		button.onclick = () => {
			window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
		};
	}
});
