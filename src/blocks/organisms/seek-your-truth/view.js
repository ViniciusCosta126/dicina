document.addEventListener('DOMContentLoaded', function () {
	const gsap = window.gsap;
	const ScrollTrigger = window.ScrollTrigger;
	const screenWidth = window.innerWidth;

	// BUSQUE
	const timeline = gsap.timeline({});
	timeline.fromTo(
		'#texto1SYT',
		{
			y: '50vh',
			autoAlpha: 0,
		},
		{
			y: '0',
			autoAlpha: 1,
			ease: 'expo.out',
		}
	);

	ScrollTrigger.create({
		animation: timeline,
		start: 'top bottom',
		trigger: '#texto1SYT',
		scrub: true,
	});

	// SUA
	const timeline2 = gsap.timeline({});
	timeline2.fromTo(
		'#texto2SYT',
		{
			y: '50vh',
			autoAlpha: 0,
		},
		{
			y: '0',
			autoAlpha: 1,
			ease: 'expo.out',
		}
	);

	ScrollTrigger.create({
		animation: timeline2,
		start: 'top bottom',
		trigger: '#texto2SYT',
		scrub: true,
	});

	// VERDADE
	const timeline3 = gsap.timeline({});
	timeline3.fromTo(
		'#texto3SYT',
		{
			y: '50vh',
			autoAlpha: 0,
		},
		{
			y: '0',
			autoAlpha: 1,
			ease: 'expo.out',
		}
	);
	ScrollTrigger.create({
		animation: timeline3,
		start: 'top bottom',
		trigger: '#texto3SYT',
		scrub: true,
	});

	if (screenWidth < 768) {
		// --------  VIDEO SUBINDO em dispositivos móveis --------------

		const video = gsap.timeline({});
		video.fromTo(
			'.seek-your-truth__video',
			{
				autoAlpha: 0,
				scale: 0.3,
			},
			{
				y: '-100vh',
				autoAlpha: 1,
				scale: 1,
			}
		);
		ScrollTrigger.create({
			animation: video,
			ease: 'expo.out',
			pin: '.seek-your-truth__content',
			start: 'top-=100vh center+=100vh',
			end: 'bottom center-=100vh',
			trigger: '#texto1SYT',
			scrub: true,
		});
	} else if (screenWidth < 1180) {
		// --------  VIDEO SUBINDO em dispositivos imóveis --------------
		const video = gsap.timeline({});
		video.fromTo(
			'.seek-your-truth__video',
			{
				autoAlpha: 0,
				scale: 0.3,
			},
			{
				y: '-72vh',
				autoAlpha: 1,
				scale: 1,
			}
		);
		ScrollTrigger.create({
			animation: video,
			ease: 'expo.out',
			pin: '.seek-your-truth__content',
			start: 'top-=72vh center',
			end: 'bottom top',
			trigger: '#texto1SYT',
			scrub: true,
		});
	} else if (screenWidth < 2180) {
		// --------  VIDEO SUBINDO em dispositivos imóveis --------------

		const video = gsap.timeline({});
		video.fromTo(
			'.seek-your-truth__video',
			{
				autoAlpha: 0,
				scale: 0.3,
			},
			{
				y: '-72vh',
				autoAlpha: 1,
				scale: 1,
			}
		);

		ScrollTrigger.create({
			animation: video,
			ease: 'expo.out',
			pin: '.seek-your-truth__content',
			start: 'top-=72vh center',
			end: 'bottom+=720vh top',
			trigger: '#texto1SYT',
			scrub: true,
		});
	} else {
		// --------  VIDEO SUBINDO em telas 4k --------------
		const video = gsap.timeline({});
		video.fromTo(
			'.seek-your-truth__video',
			{
				autoAlpha: 0,
				scale: 0.3,
			},
			{
				y: '-72vh',
				autoAlpha: 1,
				scale: 1,
			}
		);
		ScrollTrigger.create({
			animation: video,
			ease: 'expo.out',
			pin: '.seek-your-truth__content',
			start: 'top-=24vh center',
			end: 'bottom+=2000vh top',
			trigger: '#texto1SYT',
			scrub: true,
		});
	} //endif
});
