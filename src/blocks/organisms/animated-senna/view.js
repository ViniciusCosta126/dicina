document.addEventListener('DOMContentLoaded', function () {
	const gsap = window.gsap;
	const ScrollTrigger = window.ScrollTrigger;
	const CustomEase = window.CustomEase;
	const animatedSenna = document.querySelector('.animated-senna');

	if (animatedSenna) {
		function changeActive() {
			let active = animatedSenna.querySelector('.show');
			active.classList.remove('show');
			active.nextElementSibling
				? (active = active.nextElementSibling)
				: (active = animatedSenna.querySelector('.from-text'));
			active.classList.add('show');
		}

		setInterval(() => {
			changeActive();
		}, 2500);

		if (screen.width < 1024) {
			window.onresize = function () {
				const textWrapper = animatedSenna.querySelector('.text-wrapper');
				textWrapper.style.bottom = '5vh';
			};
		}

		animatedSennaFunction(gsap, ScrollTrigger, CustomEase, animatedSenna);
	}

	function animatedSennaFunction(gsap, ScrollTrigger, CustomEase, sectionAnimatedSenna) {
		const sennaSvg = sectionAnimatedSenna.querySelector('.senna-svg');
		const contentWrapper = sectionAnimatedSenna.querySelector('.content-wrapper');
		contentWrapper.style.height = sennaSvg.getBoundingClientRect().height + 'px';

		ScrollTrigger.create({
			trigger: sectionAnimatedSenna,
			start: 'top top',
			end: 'bottom bottom',
			pin: contentWrapper,
		});

		ScrollTrigger.create({
			trigger: sectionAnimatedSenna,
			start: 'bottom bottom',
			endTrigger: 'html',
			onToggle: (self) => {
				self.isActive
					? sectionAnimatedSenna.classList.add('pin-bottom')
					: sectionAnimatedSenna.classList.remove('pin-bottom');
			},
		});

		const timeline = gsap.timeline({});
		timeline.fromTo(
			sennaSvg,
			{
				width: '100vw',
			},
			{
				width: '9000vw',
				ease: CustomEase.create('custom', 'M0,0 C0.5,0.084 0.581,0.152 0.625,0.178 0.72,0.235 0.9,0.23 1,1 '),
			}
		);

		ScrollTrigger.create({
			animation: timeline,
			trigger: sectionAnimatedSenna,
			start: `top top`,
			end: `bottom bottom`,
			scrub: true,
		});

		ScrollTrigger.create({
			trigger: sectionAnimatedSenna,
			start: 'bottom-=300 bottom',
			endTrigger: 'html',
			onToggle: (self) => {
				self.isActive ? contentWrapper.classList.add('active') : contentWrapper.classList.remove('active');
			},
		});
	}
});
