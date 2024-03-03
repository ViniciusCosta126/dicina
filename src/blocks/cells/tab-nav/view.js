document.addEventListener(
	'DOMContentLoaded',
	function () {
		const tabNav = document.querySelector('.tab-nav');

		if (tabNav) {
			const header = document.querySelector('.header');
			const headerHeight = tabNav.getBoundingClientRect().height + header.getBoundingClientRect().height;
			const colLabsHero = document.querySelector('.collabs-hero');
			const heroHeight = colLabsHero ? colLabsHero.getBoundingClientRect().height - headerHeight : 0;

			if (!tabNav) return;
			let lastScrollTop = 0;

			const checkScrollPosition = () => {
				const currentScrollTop = window.pageYOffset;

				if (currentScrollTop > lastScrollTop) {
					tabNav.classList.remove('tab-nav--background');
					tabNav.classList.add('tab-nav--hidden');
				} else {
					if (currentScrollTop <= 0) {
						tabNav.classList.remove('tab-nav--hidden');
						tabNav.classList.remove('tab-nav--background');
						return;
					}

					tabNav.classList.remove('tab-nav--hidden');
					tabNav.classList.add('tab-nav--background');
				}

				lastScrollTop = currentScrollTop;
			};

			// first check
			if (window.scrollY >= lastScrollTop) {
				checkScrollPosition();
			}

			window.addEventListener('scroll', checkScrollPosition);
		}
	},
	false
);
