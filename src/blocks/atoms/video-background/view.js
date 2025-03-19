export const PlayVideoBg = (ScrollTrigger, gsap, video) => {
	gsap.registerPlugin(ScrollTrigger);

	ScrollTrigger.create({
		trigger: video,
		start: 'top bottom',
		endTrigger: 'html',
		onToggle: () => {
			video.play();
		},
	});
};
