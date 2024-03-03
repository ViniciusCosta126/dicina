document.addEventListener('DOMContentLoaded', function () {
	const ScrollTrigger = window.ScrollTrigger;
	const strip = document.querySelector('.what-motivates-you .strip');

	if (strip) {
		ScrollTrigger.create({
			trigger: strip,
			start: `top+=300 bottom`,
			endTrigger: 'html',
			onToggle: (self) => {
				self.isActive ? strip.classList.add('active') : strip.classList.remove('active');
			},
		});
	}
});
