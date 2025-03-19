document.addEventListener('DOMContentLoaded', function () {
	// --- Seção Gallery scroll - Início
	const galleryScroll = document.querySelector('.scroll-gallery');
	if (galleryScroll) {
		const gsap = window.gsap;
		const ScrollTrigger = window.ScrollTrigger;

		galleryScrollAnim(gsap, ScrollTrigger, galleryScroll);
		galleryScrollText();
	}
	// ---  Seção Gallery scroll (Senna) - Fim
});

export const galleryScrollAnim = (gsap, ScrollTrigger, section) => {
	const text = document.querySelector('.scroll-gallery__container');
	const images = document.querySelectorAll('.scroll-gallery__image');

	const timeline = gsap.timeline({});
	timeline.fromTo(
		section,
		{
			top: 0,
		},
		{
			top: 0,
		}
	);

	ScrollTrigger.create({
		animation: timeline,
		trigger: section,
		start: 'top top',
		end: 'bottom bottom',
		pin: text,
		pinSpacing: false,
	});

	const tl = [];
	images.forEach((image, index) => {
		tl[index] = gsap.timeline({});
		tl[index].fromTo(
			image,
			{
				opacity: 0,
				scale: 0.5,
			},
			{
				opacity: 1,
				scale: 1,
			}
		);

		ScrollTrigger.create({
			animation: tl[index],
			trigger: image,
			start: 'top 90%',
			end: 'bottom center',
			scrub: true,
		});
	});
};

export const galleryScrollText = () => {
	const firstline = document.querySelector('.scroll-gallery__container p');

	if (firstline) {
		firstline.classList.add('active');
		function loopText() {
			const activeLine = document.querySelector('.scroll-gallery__container p.active');
			activeLine.classList.remove('active');
			if (activeLine.nextElementSibling) {
				activeLine.nextElementSibling.classList.add('active');
			} else {
				firstline.classList.add('active');
			}
		}

		setInterval(loopText, 5000); // change text every 5 seconds
	}
};
