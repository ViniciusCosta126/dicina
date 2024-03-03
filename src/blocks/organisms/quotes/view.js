document.addEventListener('DOMContentLoaded', function () {
	//Effect on text
	const frase = document.querySelector('.frase');
	if (frase) {
		const text = document.querySelector('.frase__text__textone');
		const opening = document.querySelector('.frase__text__opening');
		const closing = document.querySelector('.frase__text__closing');
		const words = text.textContent.split(' ');
		text.innerHTML = words.map((word) => `<span>${word}</span>`).join(' ');
		const wordSpans = text.querySelectorAll('span');

		//Paralax on photos
		const photos = document.querySelectorAll(
			'.frase__images__mobileimage, .frases__images__deskimageOne, .frases__images__deskimageTwo'
		);
		const observer = new IntersectionObserver(callback, options);
		const targetElement = photos;
		let lastScrollTop = 0;

		//Mobile text effect function
		function handleFraseEvent() {
			this.classList.add('active');
			opening.classList.add('fade-in');

			wordSpans.forEach((span, index) => {
				setTimeout(() => {
					span.classList.add('fade-in');
				}, index * 300);
			});

			setTimeout(() => {
				closing.classList.add('fade-in');
			}, wordSpans.length * 300);
		}

		// Observer for effect on paralax photos
		targetElement.forEach((item) => {
			observer.observe(item);
		});

		const options = {
			threshold: 0.9, // 50% of the element needs to be visible
		};

		function callback(entries, observer) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('reveal');
					entry.target.classList.add('visible');
				} else {
					entry.target.classList.remove('visible');
				}
			});
		}
		//End of observer paralax photos

		window.addEventListener('scroll', function () {
			//Mobile Animation

			// Observer for text effects desktop
			const observerText = new IntersectionObserver(
				callbackText,
				optionsText
			);
			const optionsText = {
				threshold: 0.9,
			};

			wordSpans.forEach((item) => {
				observerText.observe(item);
			});

			function callbackText(entries, observerText) {
				const windowHeight = window.innerHeight;
				entries.forEach((entry, index) => {
					if (entry.isIntersecting) {
						opening.classList.add('fade-in');
						const spanTop =
							entry.target.getBoundingClientRect().top;
						if (spanTop < windowHeight - 40 * (index + 1)) {
							entry.target.classList.add('fade-in');
							if (index + 1 === wordSpans.length) {
								closing.classList.add('fade-in');
							}
						} else {
							entry.target.classList.remove('fade-in');
							closing.classList.remove('fade-in');
						}
					}
				});
			}
			//End of observer for text effects on desktop

			//Effect of photos going up and down with scroll
			const scrollTop =
				window.pageYOffset || document.documentElement.scrollTop;

			if (scrollTop > lastScrollTop) {
				targetElement.forEach((item) => {
					item.classList.add('up');
					item.classList.remove('down');
					text.classList.add('up');
					text.classList.remove('down');
				});
			} else {
				targetElement.forEach((item) => {
					item.classList.add('down');
					item.classList.remove('up');
					text.classList.add('down');
					text.classList.remove('up');
				});
			}
			lastScrollTop = scrollTop;
		});
	}
});
