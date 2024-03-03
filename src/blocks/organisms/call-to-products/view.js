document.addEventListener('DOMContentLoaded', () => {
	const btnsvg = document.querySelector('.btn-svg');
	const btn = document.querySelector('.container-title ');
	const callToProductSection = document.querySelector('.call-to-products');
	if (btn) {
		const content = document.querySelector('.content-container');
		const carouselcontainer = document.querySelector('.carousel-container');
		btn.addEventListener('click', () => {
			if (content.classList.contains('open')) {
				content.classList.remove('open');
				carouselcontainer.classList.remove('open');
				btnsvg.classList.remove('open');
			} else {
				content.classList.add('open');
				btnsvg.classList.add('open');
				carouselcontainer.classList.add('open');
			}
		});
	}

	if (callToProductSection) {
		const ScrollTrigger = window.ScrollTrigger;
		const containerTitle = callToProductSection.querySelector('.container-title');
		ScrollTrigger.create({
			trigger: callToProductSection,
			start: 'top bottom-=110px',
			onToggle: (self) =>
				self.isActive ? containerTitle.classList.add('active') : containerTitle.classList.remove('active'),
			endTrigger: 'html',
		});
	}
});
