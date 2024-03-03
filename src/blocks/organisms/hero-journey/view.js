document.addEventListener('DOMContentLoaded', function () {
	const button = document.querySelector('#go-to-section-2');

	if (button) {
		button.onclick = () => {
			window.scrollTo({ top: window.innerHeight-142, behavior: 'smooth' });
		};
	}
});
